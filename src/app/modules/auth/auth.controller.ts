import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await AuthServices.createUser(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User created successfully`,
    data: result,
  });
});

const loginUser = catchAsync(async () => {
  // const admin = req.body;
  // const result = await AuthServices.loginUser;
  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: `Admin created successfully`,
  //   data: result,
  // });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
