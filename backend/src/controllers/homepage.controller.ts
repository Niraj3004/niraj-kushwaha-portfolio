import { Request, Response } from 'express';
import { HomepageService } from '../services/homepage.service';
import { sendResponse } from '../utils/response';

export class HomepageController {
  static async get(req: Request, res: Response) {
    const data = await HomepageService.get();
    sendResponse(res, 200, true, 'Homepage config fetched successfully', data);
  }

  static async update(req: Request, res: Response) {
    let parsedBody = req.body;
    
    // If formData, parse nested JSON strings back into objects/arrays
    if (typeof parsedBody.hero === 'string') parsedBody.hero = JSON.parse(parsedBody.hero);
    if (typeof parsedBody.about === 'string') parsedBody.about = JSON.parse(parsedBody.about);
    if (typeof parsedBody.skills === 'string') parsedBody.skills = JSON.parse(parsedBody.skills);
    if (typeof parsedBody.timeline === 'string') parsedBody.timeline = JSON.parse(parsedBody.timeline);
    if (typeof parsedBody.services === 'string') parsedBody.services = JSON.parse(parsedBody.services);

    const data = await HomepageService.update(parsedBody, req.file);
    sendResponse(res, 200, true, 'Homepage config updated successfully', data);
  }
}
