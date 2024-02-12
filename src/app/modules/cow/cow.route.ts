import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CowControllers } from './cow.controller';
import { CowValidations } from './cow.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidations.createCowZodSchema),
  CowControllers.createCow,
);
router.get('/', CowControllers.getAllCows);
router.get('/:id', CowControllers.getSingleCow);
router.patch(
  '/:id',
  validateRequest(CowValidations.updateCowZodSchema),
  CowControllers.updateCow,
);
router.delete('/:id', CowControllers.deleteCow);

export const CowRoutes = router;
