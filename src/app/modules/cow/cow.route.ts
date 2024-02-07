import express from 'express';
import { CowControllers } from './cow.controller';

const router = express.Router();

router.post('/create-cow', CowControllers.createCow);

export const CowRoutes = router;
