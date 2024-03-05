import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

//Get Profile by Admin, Buyer, and Seller
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserControllers.myProfile,
);

//Update Profile by Admin, Buyer, and Seller
router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  validateRequest(UserValidation.updateUserZodSchema),
  UserControllers.updateMyProfile,
);

router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.patch('/:id', UserControllers.updateUser);
router.delete('/:id', UserControllers.deleteUser);

export const UserRoutes = router;
