"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { Code, Type, Download, MapPin, Music, Check, Copy, Volume2, Globe, Terminal, Briefcase, Coffee, Keyboard } from "lucide-react";
import confetti from "canvas-confetti";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";
import { CountUp } from "../motion/CountUp";
import { useLocalTime } from "@/hooks/useLocalTime";
import { MagneticButton } from "../motion/MagneticButton";
import { BentoCard } from "../ui/BentoCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
};
const lineVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

export const About = ({ data }: { data?: any }) => {
  const shouldReduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'text' | 'code'>('text');
  const [copied, setCopied] = useState(false);
  const [age, setAge] = useState<string>("21.00000000");
  const [matrixMode, setMatrixMode] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);
  const localTime = useLocalTime();

  // Dynamic Age Calculator
  useEffect(() => {
    const birthDate = new Date("2003-04-30T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const ageInYears = (now - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
      setAge(ageInYears.toFixed(8));
    }, 50);
    return () => clearInterval(interval);
  }, []);

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
    x.set(e.clientX - rect.left / rect.width - 0.5);
    y.set(e.clientY - rect.top / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  // Easter Egg Copy
  const copyName = () => {
    navigator.clipboard.writeText("Niraj Kushwaha");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Audio Play Mock
  const playAudio = () => {
    setPlayingAudio(true);
    setTimeout(() => setPlayingAudio(false), 1500);
  };

  // Cursor Spotlight Effect on Bio
  const bioRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleBioMouseMove = (e: React.MouseEvent) => {
    if (bioRef.current) {
      const rect = bioRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  // Confetti on Stats
  const fireConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#4F46E5', '#10B981', '#F59E0B'] });
  };

  const bioP1 = data?.bioParagraph1 || "I'm Niraj — a full-stack developer from Kathmandu who likes turning messy real-world problems into clean, usable products. I work across the MERN stack and React Native, and I'm increasingly focused on AI-assisted and agentic systems.";
  const bioP2 = data?.bioParagraph2 || "I'm studying BSc (Hons) Computing at Islington College, and much of what I build is aimed at helping Nepal's students, merchants, and communities.";
  const firstLetter = bioP1.charAt(0);
  const restOfP1 = bioP1.slice(1);

  return (
    <section id="about" className={`py-32 relative text-selection-accent transition-colors duration-1000 ${matrixMode ? 'bg-black text-green-500 font-mono' : 'bg-white text-ink'}`}>
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <SectionHeading heading="About me" className="mb-0" />
          
          {/* Secret Matrix Toggle */}
          <button 
            onClick={() => setMatrixMode(!matrixMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-colors ${matrixMode ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-surface text-muted hover:text-ink'}`}
          >
            <Terminal size={14} /> {matrixMode ? "System: Compromised" : "System: Secure"}
          </button>
        </div>

        {/* 20-FEATURE BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[120px] md:auto-rows-[150px]">

          {/* 1. Main Photo Card (Col Span 1, Row Span 3) */}
          <BentoCard delay={0.1} className="md:col-span-1 md:row-span-3 p-0! group cinematic-grain relative" style={{ perspective: "1000px" }}>
            <motion.div
              style={{ rotateX: shouldReduceMotion ? 0 : rotateX, rotateY: shouldReduceMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
              className="w-full h-full relative"
            >
              {/* Spotify UI Pill */}
              <div className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-2">
                <Music size={12} className="text-green-400 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[8px] text-white/70 uppercase leading-none">Playing</span>
                  <span className="text-[10px] text-white font-medium leading-none mt-0.5">Blinding Lights</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-4 left-4 z-30 bg-white/90 backdrop-blur-md text-ink text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                Available
              </div>

              {/* Image Crossfade */}
              {data?.photo ? (
                <>
                  <img src={data.photo} alt="Profile Grayscale" className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 transition-opacity duration-700 ease-in-out group-hover:opacity-0" />
                  <img src={data.photo} alt="Profile Color" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105" />
                </>
              ) : (
                <div className="absolute inset-0 bg-ink/5 flex items-center justify-center text-muted font-medium text-xs">[Photo]</div>
              )}
            </motion.div>
          </BentoCard>

          {/* 2. Bio Card with Spotlight (Col Span 2 or 3, Row Span 2) */}
          <BentoCard 
            delay={0.2} 
            className="md:col-span-2 lg:col-span-2 md:row-span-2 relative overflow-hidden group"
          >
            <div ref={bioRef} onMouseMove={handleBioMouseMove} className="absolute inset-0 z-0">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 40%)` }} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold font-display">Niraj Kushwaha</h3>
                  <button onClick={playAudio} className="w-6 h-6 rounded-full bg-hairline flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                    {playingAudio ? <span className="flex gap-0.5"><span className="w-0.5 h-2 bg-current animate-pulse"></span><span className="w-0.5 h-3 bg-current animate-pulse delay-75"></span><span className="w-0.5 h-2 bg-current animate-pulse delay-150"></span></span> : <Volume2 size={12} />}
                  </button>
                </div>
                
                <div className="flex items-center bg-white rounded-full p-1 border border-hairline">
                  <button onClick={() => setViewMode('text')} className={`px-3 py-1 rounded-full text-xs font-medium ${viewMode === 'text' ? 'bg-surface shadow-sm text-ink' : 'text-muted'}`}>Text</button>
                  <button onClick={() => setViewMode('code')} className={`px-3 py-1 rounded-full text-xs font-medium ${viewMode === 'code' ? 'bg-ink text-white' : 'text-muted'}`}>Code</button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {viewMode === 'text' ? (
                  <div className="text-sm text-ink/70 leading-relaxed space-y-4">
                    <p className="relative"><span className="float-left text-5xl font-black text-ink leading-[0.8] pr-2 pt-1 uppercase font-display">{firstLetter}</span>{restOfP1}</p>
                    <p>{bioP2}</p>
                  </div>
                ) : (
                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-[#1e1e1e] text-white/90 p-4 rounded-xl font-mono text-xs leading-loose">
                    <motion.p variants={lineVariants}><span className="text-pink-400">const</span> dev = {'{'}</motion.p>
                    <motion.p variants={lineVariants} className="pl-4"><span className="text-sky-300">name</span>: <button onClick={copyName} className="text-amber-300 hover:text-amber-200">"{copied ? "Copied!" : "Niraj"}"</button>,</motion.p>
                    <motion.p variants={lineVariants} className="pl-4"><span className="text-sky-300">stack</span>: [<span className="text-amber-300">"MERN"</span>, <span className="text-amber-300">"Next.js"</span>],</motion.p>
                    <motion.p variants={lineVariants}>{'}'};</motion.p>
                  </motion.div>
                )}
              </div>
            </div>
          </BentoCard>

          {/* 3. Location & Time Card */}
          <BentoCard delay={0.3} className="md:col-span-1 md:row-span-1 flex flex-col justify-between items-center text-center">
            <Globe className="text-accent/20 absolute -bottom-4 -right-4 w-32 h-32" strokeWidth={1} />
            <div className="w-full flex justify-between items-center z-10">
              <span className="text-xs font-medium uppercase tracking-widest text-muted">Local Time</span>
              <MapPin size={14} className="text-accent" />
            </div>
            <div className="text-2xl font-display font-bold z-10">{localTime || "--:--"}</div>
            <div className="text-xs font-medium text-ink/70 z-10">Kathmandu, Nepal</div>
          </BentoCard>

          {/* 4. Social Links Card */}
          <BentoCard delay={0.4} className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center gap-4 bg-ink text-white">
            <span className="text-xs font-medium uppercase tracking-widest text-white/50 absolute top-4 left-4">Connect</span>
            <div className="flex gap-4 z-10">
              <MagneticButton strength={0.3} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </MagneticButton>
              <MagneticButton strength={0.3} className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0077b5] flex items-center justify-center transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </MagneticButton>
            </div>
          </BentoCard>

          {/* 5. Age Ticker Card */}
          <BentoCard delay={0.5} className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-muted absolute top-4 left-4">Age</span>
            <div className="text-2xl font-mono font-bold text-accent">{age}</div>
            <div className="text-xs font-medium text-ink/50 mt-1">Years old</div>
          </BentoCard>

          {/* 6. GitHub Contribution Mock */}
          <BentoCard delay={0.6} className="md:col-span-2 md:row-span-1 flex flex-col justify-between">
            <div className="flex justify-between items-center w-full mb-2">
              <span className="text-xs font-medium uppercase tracking-widest text-muted">Contributions</span>
              <span className="text-xs font-medium text-ink">342 commits</span>
            </div>
            <div className="grid grid-cols-12 gap-1 w-full h-full opacity-60">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className={`w-full aspect-square rounded-sm ${Math.random() > 0.7 ? 'bg-green-500' : Math.random() > 0.4 ? 'bg-green-300' : 'bg-hairline'}`} />
              ))}
            </div>
          </BentoCard>

          {/* 7. Stats & Resume Download */}
          <BentoCard delay={0.7} className="md:col-span-3 lg:col-span-4 md:row-span-1 flex flex-col sm:flex-row justify-between items-center gap-6 cursor-pointer hover:bg-hairline/50 transition-colors" onClick={fireConfetti}>
            <div className="flex gap-8 md:gap-16 w-full justify-around sm:justify-start">
              {(data?.stats || []).map((stat: any, i: number) => (
                <div key={i} className="flex flex-col gap-1 items-center sm:items-start pointer-events-none">
                  {stat.isNumber ? (
                    <div className="flex items-baseline gap-1">
                      <CountUp end={parseInt(stat.value) || 0} className="text-3xl font-black text-ink font-display" />
                      <span className="text-accent font-bold">+</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-black text-ink font-display">{stat.value}</div>
                  )}
                  <span className="text-[10px] uppercase tracking-widest text-muted font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
            <MagneticButton strength={0.2} className="group relative overflow-hidden bg-ink text-white rounded-full px-8 h-12 flex items-center justify-center font-medium shadow-xl hover:shadow-2xl transition-all flex-shrink-0">
              <span className="flex items-center gap-2 group-hover:-translate-y-10 transition-transform duration-300 text-sm">
                <Download size={14} /> Download CV
              </span>
              <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-300 bg-accent text-white text-sm">
                <Download size={14} className="animate-bounce" /> PDF • 1.2MB
              </span>
            </MagneticButton>
          </BentoCard>

          {/* 8. Draggable Fun Facts (Absolute positioned within a bento) */}
          <BentoCard delay={0.8} className="md:col-span-1 md:row-span-1 overflow-visible! bg-transparent border-0! p-0!">
            <motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} className="w-full h-full bg-yellow-100 rounded-3xl p-6 flex flex-col justify-center items-center shadow-sm cursor-grab active:cursor-grabbing hover:rotate-3 transition-transform">
              <Coffee className="text-yellow-600 mb-2" size={24} />
              <span className="text-sm font-bold text-yellow-900 text-center">Coffee Dependent</span>
            </motion.div>
          </BentoCard>
          
          <BentoCard delay={0.9} className="md:col-span-1 md:row-span-1 overflow-visible! bg-transparent border-0! p-0!">
            <motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} className="w-full h-full bg-purple-100 rounded-3xl p-6 flex flex-col justify-center items-center shadow-sm cursor-grab active:cursor-grabbing hover:-rotate-3 transition-transform">
              <Keyboard className="text-purple-600 mb-2" size={24} />
              <span className="text-sm font-bold text-purple-900 text-center">Keyboard Enthusiast</span>
            </motion.div>
          </BentoCard>

          {/* 9. Tech Marquee */}
          <BentoCard delay={1.0} className="md:col-span-2 md:row-span-1 flex flex-col justify-center overflow-hidden">
            <span className="text-xs font-medium uppercase tracking-widest text-muted absolute top-4 left-4 z-10 bg-surface pr-2">Core Stack</span>
            <div className="flex gap-4 mt-4 opacity-70">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }} 
                transition={{ ease: "linear", duration: 10, repeat: Infinity }}
                className="flex gap-8 whitespace-nowrap items-center font-mono text-sm font-medium"
              >
                <span>React</span> • <span>Next.js</span> • <span>Node.js</span> • <span>MongoDB</span> • <span>Framer Motion</span> • <span>Tailwind</span> • <span>TypeScript</span> • 
                <span>React</span> • <span>Next.js</span> • <span>Node.js</span> • <span>MongoDB</span> • <span>Framer Motion</span> • <span>Tailwind</span> • <span>TypeScript</span>
              </motion.div>
            </div>
          </BentoCard>

        </div>
      </Container>
    </section>
  );
};
