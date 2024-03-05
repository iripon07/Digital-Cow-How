import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AdminValidations.createAdminZodSchema),
  AdminControllers.createAdmin,
);

export const AdminRoutes = router;
