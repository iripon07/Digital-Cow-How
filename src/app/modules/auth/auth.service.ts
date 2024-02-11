import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create user`);
  }
  return result;
};
const loginUser = async (payload: ILoginUser) => {
  const { phoneNumber, password } = payload;
  const user = new User();

  const isUserExist = await user.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `User does not exist!`);
  }

  //Match password
  if (
    isUserExist?.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Password does not match`);
  } 
  // return {
  //   accessToken
  // }

};

export const AuthServices = {
  createUser,
  loginUser,
};
