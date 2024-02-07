import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const result = await UserServices.createUser(user);
  try {
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
    // res.status(400).json({
    //   error:err
    // })
  }
};

export const UserControllers = {
  createUser,
};
