import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import pick from '../../../Shared/pick';
import sendResponse from '../../../Shared/sendResponse';
import { paginationFields } from '../../../constant/pagination';
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
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserServices.getAllUsers(paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Users retrieved successfully`,
    meta: result?.meta,
    data: result?.data,
  });
});

// const getSingleUser = catchAsync(async (req: Request, res: Response) => {
//   const d = req.params.id;
//   const result = await UserServices.getSingleUser();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: `User created successfully`,
//     data: result,
//   });
// });

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserServices.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User created successfully`,
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserServices.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User created successfully`,
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  // getSingleUser,
  updateUser,
  deleteUser,
};
