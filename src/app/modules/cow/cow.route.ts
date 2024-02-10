import express from 'express';
import { CowControllers } from './cow.controller';

const router = express.Router();

router.post('/', CowControllers.createCow);
router.get('/', CowControllers.getAllCows);
router.get('/:id', CowControllers.getSingleCow);
router.patch('/:id', CowControllers.updateCow);
router.delete('/:id', CowControllers.deleteCow);

export const CowRoutes = router;
