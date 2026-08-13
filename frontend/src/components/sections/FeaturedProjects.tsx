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
    console.error("Error fetching projects, using fallback:", error);
    return FALLBACK_PROJECTS;
  }
}

export const FeaturedProjects = async () => {
  const projects = await getFeaturedProjects();

  return (
    <section id="projects" className="py-32">
      <Container>
        <SectionHeading 
          eyebrow="Selected Work"
          heading="Featured Projects"
        />

        <div className="space-y-32 mt-16">
          {projects.map((project: any, index: number) => {
            const isEven = index % 2 === 0;
            const imageUrl = project.images?.[0]?.url || "";

            return (
              <div 
                key={project._id}
                className={`flex flex-col gap-12 lg:gap-16 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                  <Reveal>
                    <Link href={`/projects/${project.slug}`} className="block group rounded-2xl overflow-hidden bg-surface aspect-[4/3] relative">
                      {/* Image placeholder or actual image */}
                      <div className="absolute inset-0 bg-hairline/50 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                        {imageUrl ? (
                          <img src={imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted font-medium">
                            [Project Image Placeholder]
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500" />
                    </Link>
                  </Reveal>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <Reveal delay={0.2}>
                    <h3 className="text-h2 font-display">
                      <Link href={`/projects/${project.slug}`} className="hover:text-accent transition-colors">
                        {project.title}
                      </Link>
                    </h3>
                  </Reveal>
                  
                  <Reveal delay={0.3}>
                    <p className="text-body text-muted leading-relaxed">
                      {project.summary}
                    </p>
                  </Reveal>

                  <Reveal delay={0.4}>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techTags?.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs bg-transparent border-hairline hover:border-accent hover:text-accent transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Reveal>

                  <Reveal delay={0.5}>
                    <div className="flex items-center gap-6 pt-4">
                      <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-small font-semibold hover:text-accent transition-colors group">
                        Case Study
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-muted hover:text-ink transition-colors">
                          <ExternalLink size={20} />
                          <span className="sr-only">Live Site</span>
                        </a>
                      )}
                      
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-muted hover:text-ink transition-colors">
                          <Code size={20} />
                          <span className="sr-only">Source Code</span>
                        </a>
                      )}
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
