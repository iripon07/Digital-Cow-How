import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { OrderServices } from "./order.service";
import sendResponse from "../../../Shared/sendResponse";
import httpStatus from "http-status";


const createOrder = catchAsync(async (req:Request, res:Response) => {
 
  const {cow, buyer} = req.body
  const result = await OrderServices.createOrder(cow, buyer);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getOrders = async () => {};

const getSingleOrder = async () => {};

export const OrderControllers = {
  createOrder,
  getOrders,
  getSingleOrder,
};
