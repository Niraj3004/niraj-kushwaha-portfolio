import { Router } from 'express';
import { TestimonialController } from '../controllers/testimonial.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateZod } from '../middlewares/validateZod';
import { testimonialSchema } from '../validations/content.validation';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler';
import { upload } from '../utils/multer';

const router = Router();

router.get('/', asyncErrorHandler(TestimonialController.getAll));

router.post(
  '/',
  authMiddleware,
  upload.single('avatar'),
  validateZod(testimonialSchema),
  asyncErrorHandler(TestimonialController.create)
);

router.patch(
  '/:id',
  authMiddleware,
  upload.single('avatar'),
  validateZod(testimonialSchema.partial()),
  asyncErrorHandler(TestimonialController.update)
);

router.delete('/:id', authMiddleware, asyncErrorHandler(TestimonialController.delete));

export default router;
