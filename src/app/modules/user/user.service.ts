import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { IUser } from './user.interface';
import { User } from './user.model';

const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Invalid id, user doesn't exits`);
  }
  const isNumberExist = await User.findOne({
    phoneNumber: payload?.phoneNumber,
  });
  if (isNumberExist) {
    throw new ApiError(httpStatus.CONFLICT, 'This number already used');
  }
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

const myProfile = async (token: string): Promise<IUser | null> => {
  const userInfo = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  const result = await User.findOne({ phoneNumber: userInfo?.phoneNumber });
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile does not exist!');
  }
  return result;
};

const updateMyProfile = async (
  token: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const userInfo = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  if (payload.phoneNumber && payload.role) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Can not change phoneNumber and role',
    );
  }
  const result = await User.findOneAndUpdate(
    {
      phoneNumber: userInfo?.phoneNumber,
    },
    payload,
    { new: true },
  );

  return result;
};

export const UserServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  myProfile,
  updateMyProfile,
};
