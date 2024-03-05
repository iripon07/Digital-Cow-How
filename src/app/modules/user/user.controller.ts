import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { IUser } from './user.interface';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Users retrieved successfully`,
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserServices.getSingleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User retrieved successfully`,
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const updatedData = req.body;
  const result = await UserServices.updateUser(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User created successfully`,
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserServices.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User deleted successfully`,
    data: result,
  });
});

const myProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req?.headers?.authorization as string;
  const result = await UserServices.myProfile(token);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User's profile retrieved successfully`,
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req?.headers?.authorization as string;
  const user = req.body;

  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  const result = await UserServices.updateMyProfile(token, user);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User's profile updated successfully`,
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  myProfile,
  updateMyProfile,
};
