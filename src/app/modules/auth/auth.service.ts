import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create user`);
  }
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;
  const isUserExist = await User.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `User does not exist!`);
  }
  //Match password
  if (
    isUserExist?.password &&
    !User.isPasswordMatch(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Password does not match`);
  }
  const { phoneNumber: UserPhoneNumber, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { phoneNumber: UserPhoneNumber, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { phoneNumber: UserPhoneNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, `Invalid refresh toke`);
  }

  const isUserExist = await User.isUserExist(verifiedToken.phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const nesAccessToken = jwtHelpers.createToken(
    {
      phoneNumber: isUserExist?.phoneNumber,
      role: isUserExist?.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: nesAccessToken,
  };
};

export const AuthServices = {
  createUser,
  loginUser,
  refreshToken,
};
