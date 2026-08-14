"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";

const DEFAULT_TIMELINE_DATA = [
  { year: "Present", title: "AI & Full-Stack Development", subtitle: "Independent Projects & Freelance", description: "Building agentic systems, AI-assisted tools, and SaaS applications using Next.js, Express, and React Native. Focused on solving real-world problems in Nepal." },
  { year: "2023 - Present", title: "BSc (Hons) Computing", subtitle: "Islington College, Kathmandu", description: "Studying core computer science concepts, software engineering principles, and advanced algorithms. Active member of the Islington Research Community (IRC)." },
  { year: "2024", title: "AWS Academy Graduate", subtitle: "Cloud Foundations & Architecture", description: "Completed comprehensive training on AWS cloud services, covering deployment, security, and scalable infrastructure architecture." },
  { year: "2023", title: "MERN Stack Specialization", subtitle: "Intensive Training & Bootcamp", description: "Mastered MongoDB, Express, React, and Node.js. Built multiple full-stack applications including e-commerce platforms and management systems." },
  { year: "2022", title: "The Beginning", subtitle: "Self-Taught Journey", description: "Wrote my first lines of code. Started with HTML/CSS and JavaScript, quickly moving into modern frontend frameworks and backend development." }
];

export const Timeline = ({ data }: { data?: any[] }) => {
  const timelineData = (data && data.length > 0) ? data : DEFAULT_TIMELINE_DATA;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth the scroll progress so the line draws elegantly
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-32 bg-surface">
      <Container>
        <SectionHeading 
          eyebrow="Journey"
          heading="Experience & Education"
        />

        <div className="relative mt-24 max-w-4xl mx-auto" ref={containerRef}>
          {/* The static background line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-hairline -translate-x-1/2" />
          
          {/* The animated drawing line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-accent -translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24 relative z-10">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={index} delay={0.2}>
                  <div className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Empty space for alternating layout on desktop */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-surface border-4 border-accent -translate-x-1/2 mt-1.5 shadow-[0_0_0_4px_var(--color-surface)]" />

                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                      <span className="inline-block px-3 py-1 bg-white border border-hairline rounded-full text-xs font-semibold text-accent mb-4">
                        {item.year}
                      </span>
                      <h3 className="text-h3 font-display mb-2">{item.title}</h3>
                      <h4 className="text-body font-medium text-ink mb-4">{item.subtitle}</h4>
                      <p className="text-body text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
