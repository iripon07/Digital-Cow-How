import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { AdminServices } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const admin = req.body;
  const result = await AdminServices.createAdmin(admin);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admin created successfully`,
    data: result,
  });
});



export const AdminControllers = {
  createAdmin
};
