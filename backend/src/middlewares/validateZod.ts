import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateZod = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const zodError = error as any;
        const errors = (zodError.errors || zodError.issues).map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return res.status(400).json({ success: false, message: 'Validation failed', errors });
      }
      next(error);
    }
  };
};
