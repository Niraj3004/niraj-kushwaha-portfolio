import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  publishedAt?: Date;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  body: { type: String, required: true },
  coverImage: { type: String },
  publishedAt: { type: Date },
}, { timestamps: true });

export const Post = mongoose.model<IPost>('Post', postSchema);
