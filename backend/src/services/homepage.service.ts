import { Homepage, IHomepage } from '../models/homepage.model';
import { uploadToCloudinary } from '../utils/upload';

export class HomepageService {
  static async get() {
    let homepage = await Homepage.findOne();
    if (!homepage) {
      // Create default if none exists
      homepage = await Homepage.create({
        skills: [
          { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java"] },
          { category: "Frontend", items: ["React", "Next.js", "React Native", "Tailwind", "Framer Motion"] },
          { category: "Backend", items: ["Node.js", "Express", "MongoDB", "MySQL"] },
          { category: "AI & Cloud", items: ["Prompt engineering", "AI-assisted development", "AWS (Academy)"] }
        ],
        timeline: [
          { year: "Present", title: "AI & Full-Stack Development", subtitle: "Independent Projects & Freelance", description: "Building agentic systems, AI-assisted tools, and SaaS applications using Next.js, Express, and React Native. Focused on solving real-world problems in Nepal." },
          { year: "2023 - Present", title: "BSc (Hons) Computing", subtitle: "Islington College, Kathmandu", description: "Studying core computer science concepts, software engineering principles, and advanced algorithms. Active member of the Islington Research Community (IRC)." },
          { year: "2024", title: "AWS Academy Graduate", subtitle: "Cloud Foundations & Architecture", description: "Completed comprehensive training on AWS cloud services, covering deployment, security, and scalable infrastructure architecture." },
          { year: "2023", title: "MERN Stack Specialization", subtitle: "Intensive Training & Bootcamp", description: "Mastered MongoDB, Express, React, and Node.js. Built multiple full-stack applications including e-commerce platforms and management systems." },
          { year: "2022", title: "The Beginning", subtitle: "Self-Taught Journey", description: "Wrote my first lines of code. Started with HTML/CSS and JavaScript, quickly moving into modern frontend frameworks and backend development." }
        ],
        services: [
          { title: "Web Apps", description: "Performant, accessible, and scalable web applications built with Next.js, React, and Node.js.", icon: "globe" },
          { title: "Mobile Apps", description: "Cross-platform mobile experiences using React Native, bridging the gap between web and mobile.", icon: "smartphone" },
          { title: "AI & Automation", description: "Intelligent agentic systems, LLM integrations, and custom automations that solve real problems.", icon: "bot" }
        ],
        about: {
          photo: "",
          bioParagraph1: "I'm Niraj — a full-stack developer from Kathmandu who likes turning messy real-world problems into clean, usable products. I work across the MERN stack and React Native, and I'm increasingly focused on AI-assisted and agentic systems.",
          bioParagraph2: "I'm studying BSc (Hons) Computing at Islington College, and much of what I build is aimed at helping Nepal's students, merchants, and communities.",
          stats: [
            { value: "4", label: "Projects Shipped", isNumber: true },
            { value: "dot", label: "MERN + React Native", isNumber: false },
            { value: "dot", label: "AI-assisted development", isNumber: false }
          ]
        }
      });
    }
    return homepage;
  }

  static async update(data: Partial<IHomepage>, file?: Express.Multer.File) {
    let homepage = await Homepage.findOne();
    if (!homepage) {
      homepage = await Homepage.create({});
    }

    if (file) {
      const photoUrl = await uploadToCloudinary(file.buffer, 'portfolio/settings');
      if (!data.about) data.about = homepage.about;
      data.about.photo = photoUrl;
    }

    // Since we're replacing arrays completely on update from the frontend, we just use findByIdAndUpdate
    const updated = await Homepage.findByIdAndUpdate(homepage._id, data, { new: true });
    return updated;
  }
}
