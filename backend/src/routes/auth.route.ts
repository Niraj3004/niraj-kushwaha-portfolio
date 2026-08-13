import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateZod } from '../middlewares/validateZod';
import { loginSchema } from '../validations/auth.validation';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler';

const router = Router();

router.post('/login', asyncErrorHandler(validateZod(loginSchema)), asyncErrorHandler(AuthController.login));
router.get('/me', authMiddleware, asyncErrorHandler(AuthController.getMe));

export default router;
