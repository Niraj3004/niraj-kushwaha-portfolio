import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

// Fallback project details if API is down
const FALLBACK_PROJECTS: Record<string, any> = {
  "irc-platform": {
    title: "IRC Platform",
    summary: "A full-stack website for the Islington Research Community: public site, member portal, and admin.",
    description: "The IRC Platform solves the problem of disjointed communication and resource sharing among researchers. I built the entire stack using Next.js for the frontend and Express for the backend, focusing on a secure JWT-based member portal.",
    role: "Full-Stack Developer",
    techTags: ["Next.js", "Express", "MongoDB", "JWT"],
    images: [{ url: "" }],
    liveLink: "#",
    githubLink: "#",
  },
  "opportunity-radar": {
    title: "Opportunity Radar",
    summary: "A members-only AI agent that auto-discovers grants, CFPs, hackathons & more.",
    description: "Researchers spend hours looking for grants. Opportunity Radar uses an LLM-based agent to scrape, categorize, and alert members to relevant opportunities automatically.",
    role: "AI/Backend Engineer",
    techTags: ["React", "Express", "Agent", "LLM extraction"],
    images: [{ url: "" }],
    liveLink: "#",
    githubLink: "#",
  },
  "free-fire-tournament-platform": {
    title: "Free Fire Tournament Platform",
    summary: "An esports platform with wallet, results, leaderboards & a full admin operation.",
    description: "Managing local esports tournaments was a manual, spreadsheet-heavy task. This platform automates wallet management, brackets, and real-time leaderboards using Firebase Cloud Functions.",
    role: "Lead Developer",
    techTags: ["React", "Firebase", "Cloud Functions"],
    images: [{ url: "" }],
    liveLink: "#",
    githubLink: "#",
  },
  "digital-khata": {
    title: "Digital Khata",
    summary: "A digital ledger (udharo) SaaS for Nepali merchants.",
    description: "Many local shops in Nepal still use paper notebooks to track credit (udharo). Digital Khata brings this online with a React Native app that syncs offline-first with a Node.js backend.",
    role: "Mobile App Developer",
    techTags: ["MERN", "React Native"],
    images: [{ url: "" }],
    liveLink: "#",
    githubLink: "#",
  }
};

async function getProjectBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch project");
    }
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(`Backend API not reachable. Using fallback project data for ${slug}.`);
    return FALLBACK_PROJECTS[slug] || null;
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <SmoothScroll>
      <main className="bg-white min-h-screen pt-32 pb-32">
        <Container>
          {/* Back button */}
          <Link href="/projects" className="inline-flex items-center gap-2 text-muted hover:text-ink transition-colors mb-12 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <Reveal>
              <h1 className="text-display font-display mb-6">{project.title}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-h3 text-muted font-sans font-normal leading-relaxed">
                {project.summary}
              </p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3 mt-8">
                {project.techTags?.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-sm px-4 py-1 border-hairline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Hero Image */}
        <Reveal delay={0.3}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 h-[50vh] md:h-[70vh]">
            <div className="w-full h-full rounded-3xl overflow-hidden relative bg-surface">
              <Parallax speed={0.9} className="absolute inset-0">
                {project.images?.[0]?.url ? (
                  <img 
                    src={project.images[0].url} 
                    alt={project.title} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-[120%] -mt-[10%] flex items-center justify-center text-muted font-medium bg-hairline/30">
                    [Project Hero Image]
                  </div>
                )}
              </Parallax>
            </div>
          </div>
        </Reveal>

        {/* Details */}
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
            {/* Meta */}
            <div className="md:col-span-4 space-y-8">
              <Reveal delay={0.1}>
                <div>
                  <h4 className="text-small font-semibold text-ink uppercase tracking-wider mb-2">Role</h4>
                  <p className="text-body text-muted">{project.role || "Full-Stack Developer"}</p>
                </div>
              </Reveal>
              
              <Reveal delay={0.2}>
                <div>
                  <h4 className="text-small font-semibold text-ink uppercase tracking-wider mb-2">Links</h4>
                  <div className="flex flex-col gap-3">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-body text-muted hover:text-accent transition-colors">
                        <ExternalLink size={16} /> Live Site
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-body text-muted hover:text-accent transition-colors">
                        <Code size={16} /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Content */}
            <div className="md:col-span-8">
              <Reveal delay={0.3}>
                <div className="prose prose-lg prose-zinc max-w-none text-muted">
                  <h3 className="text-ink">The Challenge</h3>
                  <p>{project.description || "Project description goes here."}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </main>
    </SmoothScroll>
  );
}
