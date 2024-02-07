import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  if (!user) {
    throw new Error(`Failed to create user`);
  }
  return result;
};

const getAllUsers = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[] | null>> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;

  const result = await User.find().sort().skip(skip).limit(limit);
  const total = await User.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ id });
  return result;
};

const updateUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  if (!user) {
    throw new Error(`Failed to create user`);
  }
  return result;
};

const deleteUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  if (!user) {
    throw new Error(`Failed to create user`);
  }
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
