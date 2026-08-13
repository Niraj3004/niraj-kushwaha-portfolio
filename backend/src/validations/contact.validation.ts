import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  // Honeypot field (should be empty for real users)
  website: z.string().max(0, 'Spam detected').optional(),
});
