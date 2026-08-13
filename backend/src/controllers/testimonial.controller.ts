import { Request, Response } from 'express';
import { TestimonialService } from '../services/testimonial.service';
import { sendResponse } from '../utils/response';

export class TestimonialController {
  static async getAll(req: Request, res: Response) {
    const data = await TestimonialService.getAll();
    sendResponse(res, 200, true, 'Testimonials fetched successfully', data);
  }

  static async create(req: Request, res: Response) {
    const data = await TestimonialService.create(req.body, req.file);
    sendResponse(res, 201, true, 'Testimonial created successfully', data);
  }

  static async update(req: Request, res: Response) {
    const data = await TestimonialService.update(req.params.id as string, req.body, req.file);
    sendResponse(res, 200, true, 'Testimonial updated successfully', data);
  }

  static async delete(req: Request, res: Response) {
    const data = await TestimonialService.delete(req.params.id as string);
    sendResponse(res, 200, true, 'Testimonial deleted successfully', data);
  }
}
