import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  author: string;
  role: string;
  quote: string;
  avatar?: string;
}

const testimonialSchema = new Schema<ITestimonial>({
  author: { type: String, required: true },
  role: { type: String, required: true },
  quote: { type: String, required: true },
  avatar: { type: String },
}, { timestamps: true });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
