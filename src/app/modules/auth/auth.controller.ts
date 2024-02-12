import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import config from '../../../config';
import { ILoginUserResponse } from './auth.interface';
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

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loginUser(loginData);
  const { refreshToken, ...others } = result;

  //set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User login successfully`,
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  //set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

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
  refreshToken,
};
