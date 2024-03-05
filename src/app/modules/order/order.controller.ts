import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { password, cow } = req.body;
  const token = req?.headers?.authorization as string;
  const result = await OrderServices.createOrder(token, password, cow);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getOrders();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Orders retrieved successfully`,
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const token = req?.headers?.authorization as string;
  const result = await OrderServices.getSingleOrder(id, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getOrders,
  getSingleOrder,
};
