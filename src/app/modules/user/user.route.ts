import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
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
  validateRequest(UserValidation.updateUserZodSchema), UserControllers.updateMyProfile
);

//Get All Users by Admin
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserControllers.getAllUsers);

//Get Single User by Admin
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.getSingleUser);

//Update User by Admin
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.updateUser);

//Delete User by Admin
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.deleteUser);

export const UserRoutes = router;
