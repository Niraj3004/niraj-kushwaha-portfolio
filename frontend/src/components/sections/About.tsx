"use client";

import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";
import { CountUp } from "../motion/CountUp";
import { Marquee } from "../motion/Marquee";
import { TiltCard } from "../motion/TiltCard";

export const About = () => {
  const stats = [
    { label: "Years Experience", value: 3, prefix: "+" },
    { label: "Projects Completed", value: 40, prefix: "+" },
    { label: "Client Satisfaction", value: 100, suffix: "%" },
  ];

  return (
    <section id="about" className="py-32 bg-surface overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Left Column: Heading & Visual */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start flex flex-col gap-12">
            <SectionHeading 
              eyebrow="About Me" 
              heading="Driven by curiosity, fueled by coffee." 
              className="mb-0"
            />
            
            <TiltCard className="hidden lg:block aspect-square max-w-sm w-full mx-auto">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent border border-hairline p-8 flex items-end justify-start shadow-sm backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-h3 font-display font-semibold mb-2">Let's build</div>
                  <div className="text-small text-muted">Something amazing together.</div>
                </div>
              </div>
            </TiltCard>
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

            {/* Tech Stack Ribbon */}
            <Reveal delay={0.4}>
              <div className="pt-8">
                <h4 className="text-small text-ink font-semibold uppercase tracking-wider mb-6">Core Technologies</h4>
                <div className="-mx-6 md:-mx-12 overflow-hidden">
                  <Marquee speed="normal" className="py-2">
                    {[
                      "Next.js", "React", "TypeScript", "Node.js", "Express", 
                      "MongoDB", "Tailwind CSS", "Framer Motion", "GSAP", "PostgreSQL"
                    ].map((tech, i) => (
                      <div key={`${tech}-${i}`} className="px-8 py-3 bg-white border border-hairline rounded-full text-small text-ink font-medium whitespace-nowrap shadow-sm mx-2">
                        {tech}
                      </div>
                    ))}
                  </Marquee>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
