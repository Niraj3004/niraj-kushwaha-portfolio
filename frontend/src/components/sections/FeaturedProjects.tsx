import Link from "next/link";
import { ArrowRight, ExternalLink, Code } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Reveal } from "../motion/Reveal";

// Hardcoded fallback data based on the F6 prompt
const FALLBACK_PROJECTS = [
  {
    _id: "irc",
    title: "IRC Platform",
    slug: "irc-platform",
    summary: "A full-stack website for the Islington Research Community: public site, member portal, and admin.",
    techTags: ["Next.js", "Express", "MongoDB", "JWT"],
    images: [{ url: "" }],
    liveLink: "#",
    githubLink: "#",
  },
  {
    _id: "opportunity",
    title: "Opportunity Radar",
    slug: "opportunity-radar",
    summary: "A members-only AI agent that auto-discovers grants, CFPs, hackathons & more for a research community.",
    techTags: ["React", "Express", "Agent", "LLM extraction"],
    images: [{ url: "" }],
    liveLink: "#",
    githubLink: "#",
  },
  {
    _id: "freefire",
    title: "Free Fire Tournament Platform",
    slug: "free-fire-tournament-platform",
    summary: "An esports platform with wallet, results, leaderboards & a full admin operation.",
    techTags: ["React", "Firebase", "Cloud Functions"],
    images: [{ url: "" }],
    liveLink: "#",
    githubLink: "#",
  },
  {
    _id: "digitalkhata",
    title: "Digital Khata",
    slug: "digital-khata",
    summary: "A digital ledger (udharo) SaaS for Nepali merchants.",
    techTags: ["MERN", "React Native"],
    images: [{ url: "" }],
    liveLink: "#",
    githubLink: "#",
  },
];

async function getFeaturedProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?featured=true`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    
    if (!res.ok) throw new Error("Failed to fetch projects");
    
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      return data.data;
    }
    return FALLBACK_PROJECTS;
  } catch (error) {
    console.log("Backend API not reachable. Using fallback projects data for Featured Projects.");
    return FALLBACK_PROJECTS;
  }
}

import { ProjectCard } from "../ui/ProjectCard";

export const FeaturedProjects = async () => {
  const projects = await getFeaturedProjects();

  return (
    <section id="projects" className="py-32 relative bg-slate-50 text-slate-900">
      <Container>
        <SectionHeading 
          eyebrow="Selected Work"
          heading="Featured Projects"
        />

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-16">
          {projects.slice(0, 3).map((project: any, index: number) => {
            const isFeatured = index === 0; // First item is the hero featured item
            return (
              <div 
                key={project._id}
                className={isFeatured ? "col-span-1 md:col-span-2" : "col-span-1"}
              >
                <ProjectCard 
                  project={project} 
                  featured={isFeatured}
                  delay={index}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
