import mongoose, { Schema, Document } from 'mongoose';

export interface IHomepage extends Document {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    description: string;
  };
  about: {
    photo: string;
    bioParagraph1: string;
    bioParagraph2: string;
    stats: {
      value: string;
      label: string;
      isNumber: boolean;
    }[];
  };
  skills: {
    category: string;
    items: string[];
  }[];
  timeline: {
    year: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
}

const homepageSchema = new Schema<IHomepage>({
  hero: {
    badge: { type: String, default: 'Available for new projects' },
    headline: { type: String, default: 'Crafting digital experiences that' },
    subheadline: { type: String, default: 'inspire and perform.' },
    description: { type: String, default: "I'm Niraj Kushwaha, a Full-Stack Developer from Kathmandu specializing in React, Next.js, and Node.js." },
  },
  about: {
    photo: { type: String, default: '' },
    bioParagraph1: { type: String, default: "I'm Niraj — a full-stack developer from Kathmandu who likes turning messy real-world problems into clean, usable products. I work across the MERN stack and React Native, and I'm increasingly focused on AI-assisted and agentic systems." },
    bioParagraph2: { type: String, default: "I'm studying BSc (Hons) Computing at Islington College, and much of what I build is aimed at helping Nepal's students, merchants, and communities." },
    stats: [{
      value: { type: String },
      label: { type: String },
      isNumber: { type: Boolean, default: false }
    }]
  },
  skills: [{
    category: { type: String },
    items: [{ type: String }]
  }],
  timeline: [{
    year: { type: String },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String }
  }],
  services: [{
    title: { type: String },
    description: { type: String },
    icon: { type: String }
  }]
}, { timestamps: true });

export const Homepage = mongoose.model<IHomepage>('Homepage', homepageSchema);
