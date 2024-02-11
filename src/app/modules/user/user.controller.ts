import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserServices.createUser(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User created successfully`,
    data: result,
  });
});

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
  const id = req.query.id;
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

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
