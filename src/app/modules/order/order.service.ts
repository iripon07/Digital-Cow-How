import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../error/ApiError';
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';

const createOrder = async (
  token:string,
  password:string,
  cow: string,
): Promise<IOrder | null> => {
  const userInfo = (await jwt.verify(token, config.jwt.secret as Secret)) as JwtPayload

  const isUserExist = await User.isUserExist(userInfo?.phoneNumber)
  if (!isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, `User doesn't exist`);
  }
  const isPasswordMatched = await User.isPasswordMatch(password, isUserExist.password as string)
  if(!isPasswordMatched){
    throw new ApiError(httpStatus.UNAUTHORIZED, `Password does not exist!`)
  }
  const isCowExist = Cow.findById(cow)
  if (!isCowExist) {
    throw new ApiError(httpStatus.CONFLICT, `Cow doesn't exist`);
  }

const user = await User.findById(isUserExist.id);



  if (user?.budget && isCowExist?.price as number>= user?.budget) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      `You haven't enough for buying your desired cow`,
    );
  }
  if (isCowExist?.label === 'sold') {
    throw new ApiError(httpStatus.FORBIDDEN, `Opss! Cow has already sold out`);
  }
  let createdOrder;
  const session = await mongoose.startSession();
  try {
    await Cow.findByIdAndUpdate(
      {
        _id: cow,
      },
      { label: 'sold' },
      { session },
    );
    await User.findByIdAndUpdate(
      { _id: isCowExist.seller },
      { $inc: { income: isCowExist.price } },
      { session },
    );

    await User.findByIdAndUpdate(
      { _id: isUserExist.id },
      {
        $inc: { budget: isCowExist.price}
      },
      { session },
    );
    createdOrder = await Order.create([{ cow, buyer: isUserExist.id }], {
      session,
    });
    if (!createdOrder) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed t create order');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  const order = Order.findById(createdOrder[0]._id)
    .populate({
      path: 'cow',
      model: 'Cow',
    })
    .populate({
      path: 'buyer',
      model: 'User',
    });
  return order;
};

const getOrders = async (): Promise<IOrder[] | null> => {
  const result = await Order.find();
  return result;
};

const getSingleOrder = async (id:string, token:string) => {
  const userInfo = (await jwt.verify(token, config.jwt.secret as Secret)) as JwtPayload
  const user = await User.findOne({phoneNumber: userInfo?.phoneNumber})
  const order = await Order.findById(id).populate(['cow', 'buyer'])
  if(!order){
    throw new ApiError(httpStatus.CONFLICT, 'No order with this id')
  }
  const cow = await Cow.findById(order.cow)
  if(user?.role !== 'admin' && 
  user?.id !== order?.buyer.id.toString() &&
  user?.id !== cow?.seller.toString()){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
  }
  return order;
};

export const OrderServices = {
  createOrder,
  getOrders,
  getSingleOrder,
};
