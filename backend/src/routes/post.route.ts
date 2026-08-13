import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateZod } from '../middlewares/validateZod';
import { postSchema } from '../validations/content.validation';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler';
import { upload } from '../utils/multer';

const router = Router();

router.get('/', asyncErrorHandler(PostController.getAll));
router.get('/:slug', asyncErrorHandler(PostController.getBySlug));

router.post(
  '/',
  authMiddleware,
  upload.single('coverImage'),
  validateZod(postSchema),
  asyncErrorHandler(PostController.create)
);

router.patch(
  '/:id',
  authMiddleware,
  upload.single('coverImage'),
  validateZod(postSchema.partial()),
  asyncErrorHandler(PostController.update)
);

router.delete('/:id', authMiddleware, asyncErrorHandler(PostController.delete));

export default router;
