import mongoose, { Schema, Document } from 'mongoose';

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
}

const contactSubmissionSchema = new Schema<IContactSubmission>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'archived'], default: 'unread' },
}, { timestamps: true });

export const ContactSubmission = mongoose.model<IContactSubmission>('ContactSubmission', contactSubmissionSchema);
