import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create user`);
  }
  return result;
};

const loginUser = async (payload:ILoginUser) => {

const {phoneNumber, password} = payload

const isUserExist = await User.findOne({phoneNumber}, {phoneNumber:1, password:1}).lean()
if(!isUserExist){
  throw new ApiError(httpStatus.NOT_FOUND, `You are not exist!`)
}
//Match password
const isPasswordMatched = await bcrypt.compare(password, isUserExist?.password)
if(!isPasswordMatched){
  throw new ApiError(httpStatus.UNAUTHORIZED, `Password does not match`)
}
console.log(isUserExist);

};

export const AuthServices = {
  createUser,
  loginUser,
};
