import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { CowServices } from './cow.service';

const createCow = async (req: Request, res: Response) => {
  const { seller } = req.body;
  const cow = req.body;
  const result = await CowServices.createCow(seller, cow);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
};

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const result = await CowServices.getAllCows();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow are retrieved successfully',
    data: result,
  });
});


const getSingleCow = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await CowServices.getSingleCow(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
};

const updateCow = async (req: Request, res: Response) => {
  const { seller } = req.body;
  const cow = req.body;
  const result = await CowServices.createCow(seller, cow);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
};
const deleteCow = async (req: Request, res: Response) => {
  const { seller } = req.body;
  const cow = req.body;
  const result = await CowServices.createCow(seller, cow);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
};
export const CowControllers = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
