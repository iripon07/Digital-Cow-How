import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserZodSchema),
  UserControllers.createUser,
);

export const UserAuthRoutes = router;
