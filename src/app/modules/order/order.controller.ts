import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body;
  const result = await OrderServices.createOrder(cow, buyer);
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

const getSingleOrder = async () => {};

export const OrderControllers = {
  createOrder,
  getOrders,
  getSingleOrder,
};
