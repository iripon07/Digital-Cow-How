import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createAdmin = async (admin: IUser): Promise<IUser | null> => {
  const checkPhoneNumber = await User.findOne({
    phoneNumber: admin.phoneNumber,
  });
  if (checkPhoneNumber) {
    throw new ApiError(httpStatus.CONFLICT, `Already use this number`);
  }
  admin.role = 'admin';
  const createdAdmin = await User.create(admin);
  const result = await User.findById(createdAdmin._id);
  if (!createdAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create admin`);
  }
  return result;
};

export const AdminServices = {
  createAdmin,
};
