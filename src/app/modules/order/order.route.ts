import express from 'express';
import { OrderControllers } from './order.controller';
const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getOrders);
router.get('/:id', OrderControllers.getSingleOrder);

export const OrderRoutes = router;
