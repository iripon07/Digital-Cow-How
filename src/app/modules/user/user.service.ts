import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

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

export const UserServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
