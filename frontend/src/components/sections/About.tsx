"use client";

import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";
import { CountUp } from "../motion/CountUp";

export const About = () => {
  const stats = [
    { label: "Years Experience", value: 3, prefix: "+" },
    { label: "Projects Completed", value: 40, prefix: "+" },
    { label: "Client Satisfaction", value: 100, suffix: "%" },
  ];

  return (
    <section id="about" className="py-32 bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionHeading 
              eyebrow="About Me" 
              heading="Driven by curiosity, fueled by coffee." 
              className="mb-0"
            />
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 space-y-12">
            <Reveal>
              <div className="prose prose-lg text-body text-muted space-y-6 max-w-none">
                <p>
                  I'm a passionate full-stack developer based in Kathmandu, Nepal. With a strong foundation in modern web technologies, I bridge the gap between design and engineering to build pixel-perfect, performant applications.
                </p>
                <p>
                  My journey began with a curiosity about how the web works, which quickly evolved into a career of solving complex problems. I specialize in the MERN stack and Next.js, always focusing on clean architecture, scalable APIs, and intuitive user interfaces.
                </p>
                <p>
                  When I'm not writing code, you can find me exploring new tech trends, contributing to open source, or hiking through the beautiful trails of Nepal.
                </p>
              </div>
            </Reveal>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-hairline">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.2 + i * 0.1}>
                  <div className="flex flex-col gap-2">
                    <div className="text-h2 font-display text-ink">
                      <CountUp 
                        end={stat.value} 
                        prefix={stat.prefix} 
                        suffix={stat.suffix} 
                        duration={2.5} 
                      />
                    </div>
                    <span className="text-small text-muted font-medium uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Tech Stack */}
            <Reveal delay={0.4}>
              <div className="pt-8 space-y-4">
                <h4 className="text-small text-ink font-semibold uppercase tracking-wider">Core Technologies</h4>
                <div className="flex flex-wrap gap-3">
                  {["Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Framer Motion"].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-white border border-hairline rounded-full text-small text-ink">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
