import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  summary: string;
  description: string;
  techTags: string[];
  images: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  order: number;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  description: { type: String, required: true },
  techTags: [{ type: String }],
  images: [{ type: String }],
  liveUrl: { type: String },
  repoUrl: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Project = mongoose.model<IProject>('Project', projectSchema);
