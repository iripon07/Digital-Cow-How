import { Request, RequestHandler, Response } from 'express'
import { UserServices } from './user.service'
import catchAsync from '../../../Shared/catchAsync'

const createUser:RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await UserServices.createUser(body)
  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

export const UserControllers = {
  createUser,
}
