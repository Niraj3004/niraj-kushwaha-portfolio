"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code, ExternalLink } from "lucide-react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { SectionHeading } from "../ui/SectionHeading";

interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  techTags: string[];
  images: { url: string }[];
  liveLink?: string;
  githubLink?: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

import { ProjectCard } from "../ui/ProjectCard";

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.techTags?.forEach((tag) => tags.add(tag)));
    return ["All", ...Array.from(tags).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.techTags?.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <section className="py-32 bg-surface relative" id="all-projects">
      <Container>
        <SectionHeading 
          eyebrow="My Work"
          heading="All Projects"
          subheading="A comprehensive list of things I've built, from small experiments to full-stack applications."
        />

        {/* Sticky Glassmorphic Filter Pill */}
        <div className="sticky top-24 z-50 flex justify-center mb-16 pointer-events-none">
          <div className="pointer-events-auto flex flex-wrap justify-center gap-1.5 md:gap-2 p-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-full overflow-x-auto custom-scrollbar">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === tag 
                    ? "text-white shadow-md" 
                    : "text-muted hover:text-ink hover:bg-black/5"
                }`}
              >
                {activeFilter === tag && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-ink rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project._id} project={project} delay={index % 6} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-24 text-center text-muted font-display text-lg"
              >
                No projects found for the selected filter.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};
