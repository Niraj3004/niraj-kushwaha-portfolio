"use client";

import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Marquee } from "../motion/Marquee";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { Badge } from "../ui/Badge";
import { Reveal } from "../motion/Reveal";

const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "React Native", "Tailwind", "Framer Motion"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "MySQL"],
  },
  {
    category: "AI & Cloud",
    skills: ["Prompt engineering", "AI-assisted development", "AWS (Academy)"],
  },
];

// Combine all skills for the marquee
const ALL_SKILLS = SKILL_GROUPS.flatMap((group) => group.skills);

export const Skills = () => {
  return (
    <section id="skills" className="py-32 overflow-hidden">
      <Container>
        <SectionHeading 
          eyebrow="Capabilities"
          heading="Skills & Tech Stack"
          align="center"
        />
      </Container>

      {/* Marquee Rows */}
      <div className="flex flex-col gap-6 mb-24 mt-8">
        <Marquee speed="normal" direction="left" className="py-2">
          {ALL_SKILLS.map((skill, i) => (
            <Badge 
              key={`row1-${i}`} 
              variant="outline" 
              className="text-body py-3 px-6 mx-3 bg-white border-hairline hover:-translate-y-1 hover:border-accent hover:text-accent transition-all duration-300 cursor-default"
            >
              {skill}
            </Badge>
          ))}
        </Marquee>
        
        <Marquee speed="normal" direction="right" className="py-2">
          {[...ALL_SKILLS].reverse().map((skill, i) => (
            <Badge 
              key={`row2-${i}`} 
              variant="outline" 
              className="text-body py-3 px-6 mx-3 bg-white border-hairline hover:-translate-y-1 hover:border-accent hover:text-accent transition-all duration-300 cursor-default"
            >
              {skill}
            </Badge>
          ))}
        </Marquee>
      </div>

      {/* Grouped Grid */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.category} delay={0.1 * i}>
              <div className="space-y-6">
                <h4 className="text-small font-semibold text-ink uppercase tracking-wider border-b border-hairline pb-4">
                  {group.category}
                </h4>
                <Stagger className="flex flex-col gap-3">
                  {group.skills.map((skill) => (
                    <StaggerItem key={skill}>
                      <span className="text-muted text-body hover:text-accent transition-colors duration-200">
                        {skill}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
