import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderControllers } from './order.controller';
const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.BUYER), OrderControllers.createOrder);
router.get('/', OrderControllers.getOrders);
router.get('/:id', OrderControllers.getSingleOrder);

export const OrderRoutes = router;
