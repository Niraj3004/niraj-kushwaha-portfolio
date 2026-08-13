import { Request, Response } from 'express';
import { PostService } from '../services/post.service';
import { sendResponse } from '../utils/response';

export class PostController {
  static async getAll(req: Request, res: Response) {
    const data = await PostService.getAll();
    sendResponse(res, 200, true, 'Posts fetched successfully', data);
  }

  static async getBySlug(req: Request, res: Response) {
    const data = await PostService.getBySlug(req.params.slug as string);
    sendResponse(res, 200, true, 'Post fetched successfully', data);
  }

  static async create(req: Request, res: Response) {
    const data = await PostService.create(req.body, req.file);
    sendResponse(res, 201, true, 'Post created successfully', data);
  }

  static async update(req: Request, res: Response) {
    const data = await PostService.update(req.params.id as string, req.body, req.file);
    sendResponse(res, 200, true, 'Post updated successfully', data);
  }

  static async delete(req: Request, res: Response) {
    const data = await PostService.delete(req.params.id as string);
    sendResponse(res, 200, true, 'Post deleted successfully', data);
  }
}
