import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { User } from '../user/user.model';
import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (_id: string, cow: ICow): Promise<ICow | null> => {
  const isExist = await User.findById(_id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not exist');
  }
  const result = (await Cow.create(cow)).populate('seller');
  if (!cow) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create cow`);
  }
  return result;
};

const getAllCows = async (): Promise<ICow[] | null> => {
  const result = await Cow.find()
  return result;
};

const getSingleCow = async (_id: string): Promise<ICow | null> => {
  const result = await Cow.findById(_id);
  return result;
};

const updateCow = async (_id: string, cow: ICow): Promise<ICow | null> => {
  const isExist = await User.findById(_id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not exist');
  }
  const result = (await Cow.create(cow)).populate('seller');
  if (!cow) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create cow`);
  }
  return result;
};

const deleteCow = async (_id: string, cow: ICow): Promise<ICow | null> => {
  const isExist = await User.findById(_id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not exist');
  }
  const result = (await Cow.create(cow)).populate('seller');
  if (!cow) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create cow`);
  }
  return result;
};


export const CowServices = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
