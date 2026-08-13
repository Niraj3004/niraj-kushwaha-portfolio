import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateZod } from '../middlewares/validateZod';
import { contactSchema } from '../validations/contact.validation';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiter specifically for contact form to prevent spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message: { success: false, message: 'Too many messages sent from this IP, please try again after an hour' },
});

router.post(
  '/',
  contactLimiter,
  validateZod(contactSchema),
  asyncErrorHandler(ContactController.submitMessage)
);

router.get('/', authMiddleware, asyncErrorHandler(ContactController.getAll));
router.patch('/:id', authMiddleware, asyncErrorHandler(ContactController.updateStatus));

export default router;
