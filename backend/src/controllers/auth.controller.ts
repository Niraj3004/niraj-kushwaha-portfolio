import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { sendResponse } from '../utils/response';
import { AuthRequest } from '../middlewares/auth.middleware';

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const data = await AuthService.login(email, password);
    sendResponse(res, 200, true, 'Logged in successfully', data);
  }

  static async getMe(req: AuthRequest, res: Response) {
    if (!req.user) {
      return sendResponse(res, 401, false, 'User not found');
    }
    const userData = { id: req.user._id, email: req.user.email };
    sendResponse(res, 200, true, 'User profile fetched successfully', { user: userData });
  }
}
