import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';

const router = express.Router();
router.post(
  '/signup',
  validateRequest(AuthValidations.createUserZodSchema),
  AuthControllers.createUser,
);
router.post('/login', AuthControllers.loginUser);

export const AuthRoutes = router;
