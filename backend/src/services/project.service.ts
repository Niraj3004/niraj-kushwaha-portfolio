import { Project, IProject } from '../models/project.model';
import { slugify } from '../utils/slugify';
import { uploadToCloudinary } from '../utils/upload';

export class ProjectService {
  static async getAll() {
    return Project.find().sort({ order: 1, createdAt: -1 });
  }

  static async getBySlug(slug: string) {
    const project = await Project.findOne({ slug });
    if (!project) throw { statusCode: 404, message: 'Project not found' };
    return project;
  }

  static async create(data: Partial<IProject>, files: Express.Multer.File[]) {
    data.slug = slugify(data.title!);
    
    // Check if slug exists
    const existing = await Project.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now()}`;
    }

    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer, 'portfolio/projects'));
      data.images = await Promise.all(uploadPromises);
    }

    if (typeof data.techTags === 'string') {
      try { data.techTags = JSON.parse(data.techTags); }
      catch { data.techTags = (data.techTags as any).split(',').map((t: string) => t.trim()); }
    }

    return Project.create(data);
  }

  static async update(id: string, data: Partial<IProject>, files: Express.Multer.File[]) {
    if (data.title) {
      data.slug = slugify(data.title);
      const existing = await Project.findOne({ slug: data.slug, _id: { $ne: id } });
      if (existing) data.slug = `${data.slug}-${Date.now()}`;
    }

    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer, 'portfolio/projects'));
      const newImages = await Promise.all(uploadPromises);
      data.images = newImages; // In a real app, you might want to append or handle existing images
    }

    if (typeof data.techTags === 'string') {
      try { data.techTags = JSON.parse(data.techTags); }
      catch { data.techTags = (data.techTags as any).split(',').map((t: string) => t.trim()); }
    }

    const project = await Project.findByIdAndUpdate(id, data, { new: true });
    if (!project) throw { statusCode: 404, message: 'Project not found' };
    return project;
  }

  static async delete(id: string) {
    const project = await Project.findByIdAndDelete(id);
    if (!project) throw { statusCode: 404, message: 'Project not found' };
    return project;
  }
}
