import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { AuthServices } from './auth.service';
import { ILoginUserResponse } from './auth.interface';

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

const loginUser = catchAsync(async (req:Request, res:Response) => {
  const {...loginData} = req.body
  const result = await AuthServices.loginUser(loginData);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User login successfully`,
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
