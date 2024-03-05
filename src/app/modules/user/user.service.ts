import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id:id });
  return result;
};

const updateUser = async (id:string, updatedData: Partial<IUser>): Promise<IUser | null> => {
  const isExist = await User.findOne({_id:id})
  if(!isExist){
    throw new ApiError(httpStatus.NOT_FOUND, `Invalid id, user doesn't exits`)
  }
  console.log(updatedData);
  const result = await User.create(user);
  if (!user) {
    throw new Error(`Failed to create user`);
  }
  return result;
};

const deleteUser = async (id:string):Promise<IUser|null> => {
  const result = await User.findByIdAndDelete({_id:id});
  return result;
};


const myProfile = async (token: string): Promise<IUser | null> => {
  const userInfo = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
  const result = await User.findOne({ phoneNumber: userInfo?.phoneNumber });
  if(!result){
    throw new ApiError(httpStatus.CONFLICT, 'Your profile does not exist!')
  }
  return result;
};

export const UserServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  myProfile,
};
