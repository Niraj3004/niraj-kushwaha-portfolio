import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateZod } from '../middlewares/validateZod';
import { projectSchema } from '../validations/content.validation';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler';
import { upload } from '../utils/multer';

const router = Router();

router.get('/', asyncErrorHandler(ProjectController.getAll));
router.get('/:slug', asyncErrorHandler(ProjectController.getBySlug));

router.post(
  '/',
  authMiddleware,
  upload.array('images', 5),
  validateZod(projectSchema),
  asyncErrorHandler(ProjectController.create)
);

router.patch(
  '/:id',
  authMiddleware,
  upload.array('images', 5),
  validateZod(projectSchema.partial()),
  asyncErrorHandler(ProjectController.update)
);

router.delete('/:id', authMiddleware, asyncErrorHandler(ProjectController.delete));

export default router;
