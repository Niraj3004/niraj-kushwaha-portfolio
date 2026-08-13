import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.config';

export const generateToken = (payload: object): string => {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as any };
  return jwt.sign(payload, env.JWT_SECRET, options);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, env.JWT_SECRET);
};
