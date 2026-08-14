import { Router } from 'express';
import { HomepageController } from '../controllers/homepage.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler';
import { upload } from '../utils/multer';

const router = Router();

router.get('/', asyncErrorHandler(HomepageController.get));

router.patch(
  '/',
  authMiddleware,
  upload.single('photo'),
  asyncErrorHandler(HomepageController.update)
);

export default router;
