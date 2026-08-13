import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  description: z.string().min(1, 'Description is required'),
  techTags: z.union([z.string(), z.array(z.string())]).optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  repoUrl: z.string().url().optional().or(z.literal('')),
  featured: z.preprocess((val) => val === 'true' || val === true, z.boolean()).optional(),
  order: z.preprocess((val) => Number(val) || 0, z.number()).optional(),
});

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  body: z.string().min(1, 'Body is required'),
  publishedAt: z.string().datetime().optional(),
});

export const testimonialSchema = z.object({
  author: z.string().min(1, 'Author is required'),
  role: z.string().min(1, 'Role is required'),
  quote: z.string().min(1, 'Quote is required'),
});
