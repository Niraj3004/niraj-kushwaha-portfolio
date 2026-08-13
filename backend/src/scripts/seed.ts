import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { env } from '../config/env.config';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { hashPassword } from '../utils/hash';
import { slugify } from '../utils/slugify';

dotenv.config();

const MONGO_URI = env.MONGO_URI || 'mongodb://localhost:27017/niraj';

const seedProjects = [
  {
    title: 'IRC Platform',
    summary: 'A full-stack website for the Islington Research Community: public site, member portal, and admin.',
    description: 'A full-stack website for the Islington Research Community: public site, member portal, and admin.',
    techTags: ['Next.js', 'Express', 'MongoDB', 'JWT'],
    featured: true,
    order: 1
  },
  {
    title: 'Opportunity Radar',
    summary: 'A members-only AI agent that auto-discovers grants, CFPs, hackathons & more for a research community.',
    description: 'A members-only AI agent that auto-discovers grants, CFPs, hackathons & more for a research community.',
    techTags: ['React', 'Express', 'Agent', 'LLM extraction'],
    featured: true,
    order: 2
  },
  {
    title: 'Free Fire Tournament Platform',
    summary: 'An esports platform with wallet, results, leaderboards & a full admin operation.',
    description: 'An esports platform with wallet, results, leaderboards & a full admin operation.',
    techTags: ['React', 'Firebase', 'Cloud Functions'],
    featured: true,
    order: 3
  },
  {
    title: 'Digital Khata',
    summary: 'A digital ledger (udharo) SaaS for Nepali merchants.',
    description: 'A digital ledger (udharo) SaaS for Nepali merchants.',
    techTags: ['MERN', 'React Native'],
    featured: true,
    order: 4
  }
];

const runSeed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to DB');

    // Seed Admin
    const adminEmail = 'admin@niraj.com';
    const adminPassword = 'password123';
    
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const passwordHash = await hashPassword(adminPassword);
      admin = await User.create({ email: adminEmail, passwordHash });
      console.log(`✅ Admin seeded. Login: ${adminEmail} | Password: ${adminPassword}`);
    } else {
      console.log(`✅ Admin already exists. Login: ${adminEmail} | Password: ${adminPassword}`);
    }

    // Seed Projects
    for (const projectData of seedProjects) {
      const slug = slugify(projectData.title);
      const existingProject = await Project.findOne({ slug });
      
      if (!existingProject) {
        await Project.create({ ...projectData, slug });
        console.log(`✅ Project seeded: ${projectData.title}`);
      } else {
        console.log(`✅ Project already exists: ${projectData.title}`);
      }
    }

    console.log('🌱 Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

runSeed();
