import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';
import { sendResponse } from '../utils/response';

export class ProjectController {
  static async getAll(req: Request, res: Response) {
    const data = await ProjectService.getAll();
    sendResponse(res, 200, true, 'Projects fetched successfully', data);
  }

  static async getBySlug(req: Request, res: Response) {
    const data = await ProjectService.getBySlug(req.params.slug as string);
    sendResponse(res, 200, true, 'Project fetched successfully', data);
  }

  static async create(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[] | undefined;
    const data = await ProjectService.create(req.body, files || []);
    sendResponse(res, 201, true, 'Project created successfully', data);
  }

  static async update(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[] | undefined;
    const data = await ProjectService.update(req.params.id as string, req.body, files || []);
    sendResponse(res, 200, true, 'Project updated successfully', data);
  }

  static async delete(req: Request, res: Response) {
    const data = await ProjectService.delete(req.params.id as string);
    sendResponse(res, 200, true, 'Project deleted successfully', data);
  }
}
