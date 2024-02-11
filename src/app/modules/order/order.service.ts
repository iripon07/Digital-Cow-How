import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../error/ApiError';
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (
  cow: string,
  buyer: string,
): Promise<IOrder | null> => {
  const isUserExist = await User.findById({ _id: buyer });
  if (!isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, `User doesn't exist`);
  }
  const isCowExist = await Cow.findById({ _id: cow });
  if (!isCowExist) {
    throw new ApiError(httpStatus.CONFLICT, `Cow doesn't exist`);
  }
  if (isUserExist?.budget < isCowExist?.price) {
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
      { _id: isUserExist._id },
      {
        $inc: { budget: -isCowExist.price },
      },
      { session },
    );
    createdOrder = await Order.create([{ cow, buyer: isUserExist._id }], {
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
  console.log(order);
  return order;
};

const getOrders = async (): Promise<IOrder[] | null> => {
  const result = await Order.find();
  return result;
};

const getSingleOrder = async () => {};

export const OrderServices = {
  createOrder,
  getOrders,
  getSingleOrder,
};
