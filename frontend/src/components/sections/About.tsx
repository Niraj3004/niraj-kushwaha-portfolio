"use client";

import { useState } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { Code, Type, Download, MapPin, Music, Check, Copy } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";
import { CountUp } from "../motion/CountUp";
import { useLocalTime } from "@/hooks/useLocalTime";
import { MagneticButton } from "../motion/MagneticButton";

// Framer motion variants for typewriter effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  }
};

const lineVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

export const About = ({ data }: { data?: any }) => {
  const shouldReduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'text' | 'code'>('text');
  const [copied, setCopied] = useState(false);
  const localTime = useLocalTime();

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

  // Easter Egg Copy
  const copyName = () => {
    navigator.clipboard.writeText("Niraj Kushwaha");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Scroll Progress Border
  const { scrollYProgress } = useScroll();
  const borderProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const bioP1 = data?.bioParagraph1 || "I'm Niraj — a full-stack developer from Kathmandu who likes turning messy real-world problems into clean, usable products. I work across the MERN stack and React Native, and I'm increasingly focused on AI-assisted and agentic systems.";
  const bioP2 = data?.bioParagraph2 || "I'm studying BSc (Hons) Computing at Islington College, and much of what I build is aimed at helping Nepal's students, merchants, and communities.";

  const firstLetter = bioP1.charAt(0);
  const restOfP1 = bioP1.slice(1);

  return (
    <section id="about" className="py-32 bg-white relative text-selection-accent">
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 relative">
          
          {/* Left Column: Sticky Image with 3D Tilt & Cinematic Grain */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 flex-shrink-0 z-10 flex gap-4" style={{ perspective: "1000px" }}>
            
            {/* Magnetic Social Links Stack */}
            <div className="hidden lg:flex flex-col gap-4 mt-8">
              <MagneticButton strength={0.5} className="w-10 h-10 rounded-full bg-surface border border-hairline flex items-center justify-center text-ink/70 hover:text-ink hover:bg-hairline transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </MagneticButton>
              <MagneticButton strength={0.5} className="w-10 h-10 rounded-full bg-surface border border-hairline flex items-center justify-center text-ink/70 hover:text-[#0077b5] hover:bg-hairline transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </MagneticButton>
              <MagneticButton strength={0.5} className="w-10 h-10 rounded-full bg-surface border border-hairline flex items-center justify-center text-ink/70 hover:text-[#1DA1F2] hover:bg-hairline transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </MagneticButton>
            </div>

            <motion.div
              style={{
                rotateX: shouldReduceMotion ? 0 : rotateX,
                rotateY: shouldReduceMotion ? 0 : rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-surface cursor-crosshair group shadow-2xl cinematic-grain"
            >
              {/* SVG Scroll Progress Border */}
              <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none rounded-3xl" style={{ overflow: 'visible' }}>
                <motion.rect 
                  x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" 
                  rx="22" ry="22" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="4" 
                  pathLength={1} 
                  style={{ pathLength: borderProgress, strokeDasharray: "1", strokeDashoffset: useTransform(borderProgress, v => 1 - v) }}
                />
              </svg>

              {/* Spotify UI Pill */}
              <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="relative flex items-center justify-center">
                  <Music size={14} className="text-green-400 z-10" />
                  <span className="absolute w-full h-full rounded-full bg-green-400 animate-ping opacity-20"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/70 uppercase tracking-widest leading-none mb-1">Playing now</span>
                  <span className="text-xs text-white font-medium leading-none">Blinding Lights</span>
                </div>
              </div>

              {/* Hover Alternate Photo (Grayscale to Color crossfade) */}
              {data?.photo ? (
                <>
                  <img 
                    src={data.photo} 
                    alt="Profile Grayscale" 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 transition-opacity duration-700 ease-in-out group-hover:opacity-0" 
                  />
                  <img 
                    src={data.photo} 
                    alt="Profile Color" 
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105" 
                  />
                </>
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

            {/* Local Time Widget */}
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 mb-8 bg-surface w-fit px-4 py-2 rounded-full border border-hairline">
                <div className="relative flex items-center justify-center w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span className="text-xs font-medium text-ink/70 flex items-center gap-2">
                  <MapPin size={12} /> Kathmandu, Nepal <span className="text-ink/30">•</span> {localTime || "Calculating time..."}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                  {viewMode === 'text' ? (
                    // Text View with Drop Cap
                    <motion.div 
                      key="text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-body text-ink/70 leading-relaxed max-w-2xl space-y-6"
                    >
                      <p className="relative">
                        <span className="float-left text-[90px] font-black text-ink leading-[0.7] pr-4 pt-2 uppercase font-display">
                          {firstLetter}
                        </span>
                        {restOfP1}
                      </p>
                      <p>{bioP2}</p>
                    </motion.div>
                  ) : (
                    // Code View with Typewriter & Easter Egg
                    <motion.div 
                      key="code"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0 }}
                      className="bg-[#1e1e1e] text-white/90 p-6 sm:p-8 rounded-2xl font-mono text-sm sm:text-base leading-loose overflow-x-auto shadow-2xl border border-white/10"
                    >
                      <div className="flex gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <motion.p variants={lineVariants}><span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> = {'{'}</motion.p>
                      <motion.p variants={lineVariants} className="pl-6"><span className="text-sky-300">name</span>: <button onClick={copyName} className="text-amber-300 hover:text-amber-200 transition-colors relative group">"{copied ? "Copied!" : "Niraj Kushwaha"}"<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none flex items-center gap-1"><Copy size={10}/> Click to copy</span></button>,</motion.p>
                      <motion.p variants={lineVariants} className="pl-6"><span className="text-sky-300">role</span>: <span className="text-amber-300">"Full Stack Developer"</span>,</motion.p>
                      <motion.p variants={lineVariants} className="pl-6"><span className="text-sky-300">location</span>: <span className="text-amber-300">"Kathmandu, Nepal"</span>,</motion.p>
                      <motion.p variants={lineVariants} className="pl-6"><span className="text-sky-300">stack</span>: [<span className="text-amber-300">"MERN"</span>, <span className="text-amber-300">"React Native"</span>, <span className="text-amber-300">"Next.js"</span>],</motion.p>
                      <motion.p variants={lineVariants} className="pl-6"><span className="text-sky-300">currentFocus</span>: <span className="text-amber-300">"AI-assisted agentic systems"</span>,</motion.p>
                      <motion.p variants={lineVariants} className="pl-6"><span className="text-sky-300">mission</span>: <span className="text-amber-300">"Build clean, usable products that solve real-world problems."</span></motion.p>
                      <motion.p variants={lineVariants}>{'}'};</motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* Premium Stats Grid & Animated Resume Button */}
            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-16 mt-16 border-t border-hairline">
                <div className="flex gap-8 md:gap-16">
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

                {/* Animated Download Resume Button */}
                <MagneticButton strength={0.2} className="group relative overflow-hidden bg-ink text-white rounded-full px-8 h-14 flex items-center justify-center font-medium shadow-xl hover:shadow-2xl transition-all w-fit">
                  <span className="flex items-center gap-2 group-hover:-translate-y-10 transition-transform duration-300">
                    <Download size={18} /> Download CV
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-300 bg-accent text-white">
                    <Download size={18} className="animate-bounce" /> PDF • 1.2MB
                  </span>
                </MagneticButton>
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
