import nodemailer from 'nodemailer';
import { env } from './env.config';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Assuming Gmail, change if different
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});
