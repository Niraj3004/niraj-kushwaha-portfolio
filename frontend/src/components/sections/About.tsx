"use client";

import { useState } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Type } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";
import { CountUp } from "../motion/CountUp";

export const About = ({ data }: { data?: any }) => {
  const shouldReduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'text' | 'code'>('text');

  // 3D Tilt Effect Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const bioP1 = data?.bioParagraph1 || "I'm Niraj — a full-stack developer from Kathmandu who likes turning messy real-world problems into clean, usable products. I work across the MERN stack and React Native, and I'm increasingly focused on AI-assisted and agentic systems.";
  const bioP2 = data?.bioParagraph2 || "I'm studying BSc (Hons) Computing at Islington College, and much of what I build is aimed at helping Nepal's students, merchants, and communities.";

  // Extract first letter for the drop cap
  const firstLetter = bioP1.charAt(0);
  const restOfP1 = bioP1.slice(1);

  return (
    <section id="about" className="py-32 bg-white relative">
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 relative">
          
          {/* Left Column: Sticky Image with 3D Tilt */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 flex-shrink-0 z-10" style={{ perspective: "1000px" }}>
            <motion.div
              style={{
                rotateX: shouldReduceMotion ? 0 : rotateX,
                rotateY: shouldReduceMotion ? 0 : rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-surface cursor-crosshair group shadow-2xl"
            >
              <div className="absolute inset-0 z-10 pointer-events-none group-hover:bg-gradient-to-tr from-white/10 to-transparent transition-colors duration-500" />
              {data?.photo ? (
                <img 
                  src={data.photo} 
                  alt="Profile" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
              ) : (
                <div className="absolute inset-0 bg-ink/5 flex items-center justify-center text-muted font-medium">
                  [Profile Photo - Edit in Admin]
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Scrolling Content */}
          <div className="w-full lg:w-7/12 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
              <SectionHeading heading="About me" className="mb-0" />
              
              {/* View Toggle */}
              <div className="flex items-center bg-surface rounded-full p-1 border border-hairline w-fit">
                <button 
                  onClick={() => setViewMode('text')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-small font-medium transition-colors ${viewMode === 'text' ? 'bg-white shadow-sm text-ink' : 'text-muted hover:text-ink'}`}
                >
                  <Type size={14} /> Text
                </button>
                <button 
                  onClick={() => setViewMode('code')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-small font-medium transition-colors ${viewMode === 'code' ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}
                >
                  <Code size={14} /> Code
                </button>
              </div>
            </div>

            <Reveal delay={0.2}>
              <div className="min-h-[250px]">
                {viewMode === 'text' ? (
                  // Text View with Drop Cap
                  <div className="text-body text-ink/70 leading-relaxed max-w-2xl space-y-6">
                    <p className="relative">
                      <span className="float-left text-7xl font-black text-ink leading-[0.8] pr-4 pt-2 uppercase font-display">
                        {firstLetter}
                      </span>
                      {restOfP1}
                    </p>
                    <p>{bioP2}</p>
                  </div>
                ) : (
                  // Code View
                  <div className="bg-ink text-white/90 p-6 rounded-2xl font-mono text-sm leading-loose overflow-x-auto shadow-xl">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <p><span className="text-purple-400">const</span> <span className="text-blue-300">developer</span> = {'{'}</p>
                    <p className="pl-6"><span className="text-green-300">name</span>: <span className="text-yellow-300">"Niraj Kushwaha"</span>,</p>
                    <p className="pl-6"><span className="text-green-300">role</span>: <span className="text-yellow-300">"Full Stack Developer"</span>,</p>
                    <p className="pl-6"><span className="text-green-300">location</span>: <span className="text-yellow-300">"Kathmandu, Nepal"</span>,</p>
                    <p className="pl-6"><span className="text-green-300">stack</span>: [<span className="text-yellow-300">"MERN"</span>, <span className="text-yellow-300">"React Native"</span>, <span className="text-yellow-300">"Next.js"</span>],</p>
                    <p className="pl-6"><span className="text-green-300">currentFocus</span>: <span className="text-yellow-300">"AI-assisted agentic systems"</span>,</p>
                    <p className="pl-6"><span className="text-green-300">mission</span>: <span className="text-yellow-300">"Build clean, usable products that solve real-world problems."</span></p>
                    <p>{'}'};</p>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Premium Stats Grid */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 mt-16 border-t border-hairline">
                {(data?.stats || []).map((stat: any, i: number) => (
                  <div key={i} className="flex flex-col gap-2">
                    {stat.isNumber ? (
                      <div className="flex items-baseline gap-1">
                        <CountUp end={parseInt(stat.value) || 0} className="text-4xl lg:text-5xl font-black text-ink font-display" />
                        <span className="text-accent font-bold text-xl">+</span>
                      </div>
                    ) : (
                      <div className="text-4xl lg:text-5xl font-black text-ink font-display">
                        {stat.value}
                      </div>
                    )}
                    <span className="text-xs uppercase tracking-widest text-muted font-semibold">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Extra padding to allow scrolling past the sticky image */}
            <div className="h-32 lg:h-64" />
          </div>
        </div>
      </Container>
    </section>
  );
};
