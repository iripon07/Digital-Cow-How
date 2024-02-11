import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();
router.post(
  '/signup',
  validateRequest(AuthValidations.createUserZodSchema),
  AuthControllers.createUser,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginZodSchema),
  AuthControllers.loginUser,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenZodSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
