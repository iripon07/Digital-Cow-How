import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { CowServices } from './cow.service';

const createCow = async (req: Request, res: Response, next: NextFunction) => {
  const cow = req.body;
  const result = await CowServices.createCow(cow);
  try {
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Cow created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CowControllers = {
  createCow,
};
