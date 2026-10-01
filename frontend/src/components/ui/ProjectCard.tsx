"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Code } from "lucide-react";
import { Badge } from "./Badge";
import { MagneticButton } from "../motion/MagneticButton";

const techLogos: Record<string, string> = {
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "Tailwind": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "MERN": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
};

interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  techTags: string[];
  images: { url: string }[];
  liveLink?: string;
  githubLink?: string;
  isLive?: boolean;
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  delay?: number;
}

export const ProjectCard = ({ project, featured = false, delay = 0 }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const imageUrl = project.images?.[0]?.url || "";

  // The huge featured card uses a slightly different layout
  if (featured) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        exit={{ opacity: 0, y: -40, transition: { duration: 0.2 } }}
        transition={{ duration: 0.8, delay: delay * 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-full"
      >
        <div 
          ref={cardRef}
          onMouseMove={(e) => { handleMouseMove(e); setIsHovered(true); }}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-[2.5rem] bg-white border border-slate-100 overflow-hidden p-3 group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-700 h-full"
          style={{ perspective: 1500 }}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

          <div className="flex flex-col lg:flex-row h-full">
            {/* Image Parallax Container */}
            <div className="w-full lg:w-[60%] p-4 relative h-[400px] lg:h-auto overflow-hidden">
              <motion.div 
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-full relative rounded-[1.5rem] overflow-hidden"
              >
                <div className="absolute inset-0 bg-slate-900/5 z-10 group-hover:bg-slate-900/0 transition-colors duration-500" />
                <motion.div style={{ x: translateX, y: translateY }} className="w-full h-full scale-110">
                  {imageUrl ? (
                    <img src={imageUrl} alt={project.title} className="w-full h-full object-cover shadow-2xl rounded-[1.5rem]" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center font-display text-slate-400">Image placeholder</div>
                  )}
                </motion.div>
                
                {/* Live Indicator */}
                {project.liveLink && (
                  <div className="absolute top-6 left-6 z-30 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl border border-slate-100/50">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
                    Live
                  </div>
                )}
              </motion.div>
            </div>

            {/* Content Container */}
            <div className="w-full lg:w-[40%] p-8 lg:p-12 flex flex-col justify-center relative z-10">
              {/* Background Watermark */}
              <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-[0.03] font-black text-8xl font-display uppercase leading-none overflow-hidden text-right select-none break-all w-[150%] text-slate-900">
                {project.title.substring(0, 4)}
              </div>

              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                <span>Featured Project</span>
                <span className="w-8 h-px bg-slate-200" />
                <span>2024</span>
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-display font-black mb-6 text-slate-900 drop-shadow-sm">
                {project.title}
              </h3>
              
              <p className="text-base text-slate-600 font-medium leading-relaxed mb-8 max-w-md">
                {project.summary}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {project.techTags?.map((tag) => (
                  <div key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                    {techLogos[tag] && <img src={techLogos[tag]} alt={tag} className="w-3.5 h-3.5 object-contain" />}
                    {tag}
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-6">
                <Link href={`/projects/${project.slug}`}>
                  <MagneticButton strength={0.3} className="px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm flex items-center gap-2 group/btn hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl shadow-slate-900/20">
                    View Case Study
                    <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </MagneticButton>
                </Link>
                
                {project.liveLink && (
                  <MagneticButton strength={0.2} className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all hover:shadow-md">
                    <a href={project.liveLink} target="_blank" rel="noreferrer"><ExternalLink size={18} /></a>
                  </MagneticButton>
                )}
                {project.githubLink && (
                  <MagneticButton strength={0.2} className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all hover:shadow-md">
                    <a href={project.githubLink} target="_blank" rel="noreferrer"><Code size={18} /></a>
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Standard Card Layout
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      exit={{ opacity: 0, y: -40, transition: { duration: 0.2 } }}
      transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full"
    >
      <div 
        ref={cardRef}
        onMouseMove={(e) => { handleMouseMove(e); setIsHovered(true); }}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-[2.5rem] bg-white border border-slate-100 overflow-hidden p-3 group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-700 flex flex-col"
        style={{ perspective: 1000 }}
      >
        <div className="w-full aspect-[4/3] p-3 pb-0 relative">
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="w-full h-full relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/0 transition-colors duration-500" />
            <motion.div style={{ x: translateX, y: translateY }} className="w-full h-full scale-110">
              {imageUrl ? (
                <img src={imageUrl} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-hairline flex items-center justify-center font-display text-muted">Image placeholder</div>
              )}
            </motion.div>

            {/* Live Indicator */}
            {project.liveLink && (
              <div className="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur-md text-ink text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span></span>
                Live
              </div>
            )}
          </motion.div>
        </div>

        <div className="p-6 lg:p-8 flex-1 flex flex-col z-10 relative">
          <h3 className="text-2xl font-display font-bold mb-3 text-slate-900 group-hover:text-slate-700 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-sm text-slate-600 line-clamp-2 mb-6">
            {project.summary}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8 mt-auto">
            {project.techTags?.map((tag) => (
              <div key={tag} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-[10px] font-semibold text-slate-700 uppercase tracking-wider">
                {techLogos[tag] && <img src={techLogos[tag]} alt={tag} className="w-3 h-3 object-contain" />}
                {tag}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-slate-600 transition-colors group/link">
              View Case Study
              <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
            
            <div className="flex gap-2">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors p-1">
                  <ExternalLink size={16} />
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors p-1">
                  <Code size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
