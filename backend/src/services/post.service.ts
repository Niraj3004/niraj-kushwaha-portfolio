import { Post, IPost } from '../models/post.model';
import { slugify } from '../utils/slugify';
import { uploadToCloudinary } from '../utils/upload';

export class PostService {
  static async getAll() {
    return Post.find().sort({ createdAt: -1 });
  }

  static async getBySlug(slug: string) {
    const post = await Post.findOne({ slug });
    if (!post) throw { statusCode: 404, message: 'Post not found' };
    return post;
  }

  static async create(data: Partial<IPost>, file?: Express.Multer.File) {
    data.slug = slugify(data.title!);
    
    const existing = await Post.findOne({ slug: data.slug });
    if (existing) data.slug = `${data.slug}-${Date.now()}`;

    if (file) {
      data.coverImage = await uploadToCloudinary(file.buffer, 'portfolio/posts');
    }

    return Post.create(data);
  }

  static async update(id: string, data: Partial<IPost>, file?: Express.Multer.File) {
    if (data.title) {
      data.slug = slugify(data.title);
      const existing = await Post.findOne({ slug: data.slug, _id: { $ne: id } });
      if (existing) data.slug = `${data.slug}-${Date.now()}`;
    }

    if (file) {
      data.coverImage = await uploadToCloudinary(file.buffer, 'portfolio/posts');
    }

    const post = await Post.findByIdAndUpdate(id, data, { new: true });
    if (!post) throw { statusCode: 404, message: 'Post not found' };
    return post;
  }

  static async delete(id: string) {
    const post = await Post.findByIdAndDelete(id);
    if (!post) throw { statusCode: 404, message: 'Post not found' };
    return post;
  }
}
