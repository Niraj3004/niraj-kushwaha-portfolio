import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore all projects by Niraj Kushwaha — full-stack web apps, mobile apps, and AI tools built for Nepal and beyond.",
  openGraph: {
    title: "Projects | Niraj Kushwaha",
    description: "Full-stack web apps, mobile apps, and AI tools built for Nepal and beyond.",
    url: "https://nirajkushwaha.com.np/projects",
  },
  alternates: { canonical: "https://nirajkushwaha.com.np/projects" },
};


// Fallback data if API is down
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

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) throw new Error("Failed to fetch projects");
    
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      return data.data;
    }
    return FALLBACK_PROJECTS;
  } catch (error) {
    console.log("Backend API not reachable. Using fallback projects data for Projects Grid.");
    return FALLBACK_PROJECTS;
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <SmoothScroll>
      <main className="flex-1 bg-white">
        <ProjectsGrid projects={projects} />
      </main>
    </SmoothScroll>
  );
}
