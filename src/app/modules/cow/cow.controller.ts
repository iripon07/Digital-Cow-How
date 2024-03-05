import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import pick from '../../../Shared/pick';
import sendResponse from '../../../Shared/sendResponse';
import { paginationFields } from '../../../constant/pagination';
import { cowFilterableFields } from './cow.constant';
import { ICow } from './cow.interface';
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
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CowServices.getAllCows(filters, paginationOptions);
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowServices.getSingleCow(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
};

const updateCow = async (req: Request, res: Response) => {
  const id = req.params.id;
  const cow = req.body;
  const token = req?.headers?.authorization as string;
  const result = await CowServices.updateCow(id, cow, token);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully',
    data: result,
  });
};
const deleteCow = async (req: Request, res: Response) => {
  const id = req.params.id;
  const token = req?.headers?.authorization as string;
  const result = await CowServices.deleteCow(id, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully',
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
