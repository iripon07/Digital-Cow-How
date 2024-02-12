import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserControllers } from './user.controller';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserControllers.getAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.getSingleUser);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.updateUser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.deleteUser);

export const UserRoutes = router;
