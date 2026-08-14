"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";
import { CountUp } from "../motion/CountUp";

export const About = ({ data }: { data?: any }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-32 bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Left Column: Image with clip-path reveal */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ clipPath: shouldReduceMotion ? "inset(0 0 0 0)" : "inset(100% 0 0 0)", scale: shouldReduceMotion ? 1 : 1.1 }}
              whileInView={{ clipPath: "inset(0 0 0 0)", scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-hairline"
            >
              {data?.photo ? (
                <img src={data.photo} alt="Profile" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-ink/5 flex items-center justify-center text-muted font-medium">
                  [Profile Photo - Edit in Admin]
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 space-y-8">
            <SectionHeading 
              heading="About me" 
              className="mb-0"
            />

            <Reveal delay={0.2}>
              <div className="text-body text-muted leading-relaxed max-w-2xl space-y-4">
                <p>
                  {data?.bioParagraph1 || "I'm Niraj — a full-stack developer from Kathmandu who likes turning messy real-world problems into clean, usable products. I work across the MERN stack and React Native, and I'm increasingly focused on AI-assisted and agentic systems."}
                </p>
                <p>
                  {data?.bioParagraph2 || "I'm studying BSc (Hons) Computing at Islington College, and much of what I build is aimed at helping Nepal's students, merchants, and communities."}
                </p>
              </div>
            </Reveal>

            {/* Stats Row */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-hairline">
                {(data?.stats || []).map((stat: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-small font-medium text-ink">
                    {stat.isNumber ? (
                      <CountUp end={parseInt(stat.value) || 0} suffix="+" className="text-h3 text-accent font-display" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                    )}
                    <span className="uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
