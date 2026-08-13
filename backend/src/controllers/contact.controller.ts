import { Request, Response } from 'express';
import { ContactService } from '../services/contact.service';
import { sendResponse } from '../utils/response';

export class ContactController {
  static async submitMessage(req: Request, res: Response) {
    const data = await ContactService.submitMessage(req.body);
    sendResponse(res, 201, true, 'Message sent successfully', data);
  }

  static async getAll(req: Request, res: Response) {
    const data = await ContactService.getAll();
    sendResponse(res, 200, true, 'Messages fetched successfully', data);
  }

  static async updateStatus(req: Request, res: Response) {
    const data = await ContactService.updateStatus(req.params.id as string, req.body.status);
    sendResponse(res, 200, true, 'Message status updated successfully', data);
  }
}
