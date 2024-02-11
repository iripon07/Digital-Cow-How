import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/create-admin',AdminControllers.createAdmin);

export const AdminRoutes = router;
