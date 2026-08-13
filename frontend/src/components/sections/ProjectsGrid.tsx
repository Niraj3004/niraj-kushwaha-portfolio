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

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique tags from all projects
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
    <Container className="py-32">
      <SectionHeading 
        eyebrow="My Work"
        heading="All Projects"
        subheading="A comprehensive list of things I've built, from small experiments to full-stack applications."
      />

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-16">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-4 py-2 rounded-full text-small font-medium transition-colors duration-300 ${
              activeFilter === tag 
                ? "bg-ink text-white" 
                : "bg-surface text-muted hover:text-ink border border-transparent hover:border-hairline"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                layout
                key={project._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col"
              >
                <Link href={`/projects/${project.slug}`} className="block relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface mb-6 border border-hairline">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    {project.images?.[0]?.url ? (
                      <img src={project.images[0].url} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted text-small bg-hairline/50">
                        [Project Image]
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500" />
                </Link>
                
                <h3 className="text-h3 font-display mb-3">
                  <Link href={`/projects/${project.slug}`} className="hover:text-accent transition-colors">
                    {project.title}
                  </Link>
                </h3>
                
                <p className="text-body text-muted line-clamp-2 mb-4">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techTags?.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-transparent border-hairline hover:border-accent hover:text-accent transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-6 pt-4 border-t border-hairline">
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-small font-semibold hover:text-accent transition-colors group/link">
                    View Details
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-muted hover:text-ink transition-colors">
                      <ExternalLink size={18} />
                      <span className="sr-only">Live Site</span>
                    </a>
                  )}
                  
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-muted hover:text-ink transition-colors">
                      <Code size={18} />
                      <span className="sr-only">Source Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-24 text-center text-muted"
            >
              No projects found for the selected filter.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Container>
  );
};
