"use client";

import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { Reveal } from "../motion/Reveal";

const DEFAULT_SKILL_GROUPS = [
  { category: "Languages", skills: ["JavaScript", "TypeScript", "Python", "Java"] },
  { category: "Frontend", skills: ["React", "Next.js", "React Native", "Tailwind", "Framer Motion"] },
  { category: "Backend", skills: ["Node.js", "Express", "MongoDB", "MySQL"] },
  { category: "AI & Cloud", skills: ["Prompt engineering", "AI-assisted development", "AWS (Academy)"] },
];

export const Skills = ({ data }: { data?: any[] }) => {
  const activeGroups = (data && data.length > 0) ? data.map(g => ({ category: g.category, skills: g.items })) : DEFAULT_SKILL_GROUPS;
  const allSkills = activeGroups.flatMap((group) => group.skills);
  return (
    <section id="skills" className="py-32 overflow-hidden">
      <Container>
        <SectionHeading 
          eyebrow="Capabilities"
          heading="Skills & Tech Stack"
          align="center"
        />
      </Container>

      {/* Grouped Grid */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
          {activeGroups.map((group, i) => (
            <Reveal key={group.category} delay={0.1 * i}>
              <div className="space-y-6">
                <h4 className="text-small font-semibold text-ink uppercase tracking-wider border-b border-hairline pb-4">
                  {group.category}
                </h4>
                <Stagger className="flex flex-col gap-3">
                  {group.skills.map((skill: any) => (
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
