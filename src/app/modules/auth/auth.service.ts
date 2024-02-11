import httpStatus from 'http-status';
import jwt,{ Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create user`);
  }
  return result;
};

const loginUser = async (payload: ILoginUser):Promise<ILoginUserResponse> => {
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
  const { role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { phoneNumber,role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { phoneNumber, role},
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async(token:string) =>{
  let verifiedToken = null
  try {
    verifiedToken = jwt.verify(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, `Invalid refresh toke`)
  }

  const { phoneNumber, role } = verifiedToken;
  const isUserExist = await User.isUserExist(phoneNumber)
  if(!isUserExist){
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

}



export const AuthServices = {
  createUser,
  loginUser,
  refreshToken,
};
