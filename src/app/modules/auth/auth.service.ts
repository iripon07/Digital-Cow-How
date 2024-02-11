import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds ),
  );
  const result = await User.create(user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create user`);
  }
  return result;
};

const loginUser = async () => {};

export const AuthServices = {
  createUser,
  loginUser,
};
