"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { Code, Type, Download, MapPin, Music, Check, Copy, Volume2, Globe, Terminal, Briefcase, Coffee, Keyboard, TrendingUp, Users, Calendar, ArrowUpRight, Zap, BookOpen, Mail } from "lucide-react";
import confetti from "canvas-confetti";

const Facebook = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Github = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.2-3.8s-1.2-.4-3.9 1.4a12.8 12.8 0 0 0-7 0C6.2 2.8 5 3.2 5 3.2a5.5 5.5 0 0 0-.2 3.8 5.5 5.5 0 0 0-1.5 3.8c0 5 .1 6.2 3.1 6.5A4.8 4.8 0 0 0 5 18v4"></path>
  </svg>
);

const Linkedin = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Instagram = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
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
  const [hustleMode] = useState(false);
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
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#4F46E5', '#10B981', '#F59E0B', '#F43F5E'] });
  };

  const bioP1 = data?.bioParagraph1 || "I'm Niraj — a Full-Stack Developer (Node.js Backend focus), AI enthusiast, and Founder of Evolvix Infotech.";
  const bioP2 = data?.bioParagraph2 || "I build scalable apps with MERN & React Native. Currently studying at Islington College while scaling Evolvix and diving into Machine Learning.";
  const firstLetter = bioP1.charAt(0);
  const restOfP1 = bioP1.slice(1);

  return (
    <section id="about" className={`py-32 relative text-selection-accent transition-colors duration-1000 ${hustleMode ? 'bg-ink text-white font-sans' : 'bg-surface text-ink'}`}>
      <Container>
        <div className="flex flex-col items-center justify-center mb-16 gap-6 text-center">
          <SectionHeading heading="About Me" className="mb-0 mx-auto" />
        </div>

        {/* 20-FEATURE HYBRID BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[150px]">

          {/* 1. Main Photo Card / Dual Image Crossfade (Col Span 1, Row Span 3) */}
          <BentoCard delay={0.1} className={`row-span-2 md:col-span-1 md:row-span-3 p-0! group cinematic-grain relative ${hustleMode ? 'border-red-500/30' : ''}`} style={{ perspective: "1000px" }}>
            <motion.div
              style={{ rotateX: shouldReduceMotion ? 0 : rotateX, rotateY: shouldReduceMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
              className="w-full h-full relative overflow-hidden rounded-3xl"
            >
              {/* Status Indicator */}
              <div className="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur-md text-ink text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                Full Stack Developer
              </div>

              {/* Static Personal Image */}
              <img src="/niraj2.jpeg" alt="Niraj" onError={(e) => e.currentTarget.src = data?.photo || '/placeholder.jpg'} className="absolute inset-0 w-full h-full object-cover brightness-110" />
            </motion.div>
          </BentoCard>

          {/* 2. Bio / Code Card with Spotlight (Col Span 2 or 3, Row Span 2) */}
          <BentoCard 
            delay={0.2} 
            className={`md:col-span-2 lg:col-span-2 md:row-span-2 relative overflow-hidden group ${hustleMode ? 'bg-[#111] border-white/10' : 'bg-white'}`}
          >
            <div ref={bioRef} onMouseMove={handleBioMouseMove} className="absolute inset-0 z-0">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${hustleMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.08)'}, transparent 40%)` }} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold font-display">Niraj Kushwaha</h3>
                    <button onClick={playAudio} className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${hustleMode ? 'bg-white/10 hover:bg-red-500' : 'bg-hairline hover:bg-accent hover:text-white'}`}>
                      {playingAudio ? <span className="flex gap-0.5"><span className="w-0.5 h-2 bg-current animate-pulse"></span><span className="w-0.5 h-3 bg-current animate-pulse delay-75"></span><span className="w-0.5 h-2 bg-current animate-pulse delay-150"></span></span> : <Volume2 size={12} />}
                    </button>
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-widest mt-1 ${hustleMode ? 'text-red-400' : 'text-accent'}`}>Dev & Founder</span>
                </div>
                
                <div className={`flex items-center rounded-full p-1 border ${hustleMode ? 'bg-black/50 border-white/10' : 'bg-surface border-hairline'}`}>
                  <button onClick={() => setViewMode('text')} className={`px-3 py-1 rounded-full text-xs font-medium ${viewMode === 'text' ? (hustleMode ? 'bg-white/10 text-white' : 'bg-white shadow-sm text-ink') : 'text-muted'}`}>Story</button>
                  <button onClick={() => setViewMode('code')} className={`px-3 py-1 rounded-full text-xs font-medium ${viewMode === 'code' ? (hustleMode ? 'bg-red-500 text-white' : 'bg-ink text-white') : 'text-muted'}`}>Code</button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {viewMode === 'text' ? (
                  <div className={`text-sm leading-relaxed space-y-4 ${hustleMode ? 'text-white/80' : 'text-ink/70'}`}>
                    <p className="relative"><span className={`float-left text-5xl font-black leading-[0.8] pr-2 pt-1 uppercase font-display ${hustleMode ? 'text-white' : 'text-ink'}`}>{firstLetter}</span>{restOfP1}</p>
                    <p>{bioP2}</p>
                  </div>
                ) : (
                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className={`p-4 rounded-xl font-mono text-xs leading-loose ${hustleMode ? 'bg-black text-green-400' : 'bg-[#1e1e1e] text-white/90'}`}>
                    <motion.p variants={lineVariants}><span className={hustleMode ? 'text-green-500' : 'text-pink-400'}>const</span> <span className={hustleMode ? 'text-green-300' : 'text-blue-400'}>profile</span> = {'{'}</motion.p>
                    <motion.p variants={lineVariants} className="pl-4"><span className={hustleMode ? 'text-green-600' : 'text-sky-300'}>name</span>: <button onClick={copyName} className={`transition-colors relative group ${hustleMode ? 'text-white hover:text-green-200' : 'text-amber-300 hover:text-amber-200'}`}>"{copied ? "Copied!" : "Niraj Kushwaha"}"</button>,</motion.p>
                    <motion.p variants={lineVariants} className="pl-4"><span className={hustleMode ? 'text-green-600' : 'text-sky-300'}>company</span>: <span className={hustleMode ? 'text-green-400' : 'text-amber-300'}>"Evolvix Infotech"</span>,</motion.p>
                    <motion.p variants={lineVariants} className="pl-4"><span className={hustleMode ? 'text-green-600' : 'text-sky-300'}>education</span>: <span className={hustleMode ? 'text-green-400' : 'text-amber-300'}>"BSc Computing @ Islington"</span>,</motion.p>
                    <motion.p variants={lineVariants} className="pl-4"><span className={hustleMode ? 'text-green-600' : 'text-sky-300'}>stack</span>: [<span className={hustleMode ? 'text-green-400' : 'text-amber-300'}>"React Native"</span>, <span className={hustleMode ? 'text-green-400' : 'text-amber-300'}>"Next.js"</span>, <span className={hustleMode ? 'text-green-400' : 'text-amber-300'}>"MERN"</span>],</motion.p>
                    <motion.p variants={lineVariants}>{'}'};</motion.p>
                  </motion.div>
                )}
              </div>
            </div>
          </BentoCard>

          {/* 3. Location & Time Card */}
          <BentoCard delay={0.3} className={`md:col-span-1 md:row-span-1 flex flex-col justify-between items-center text-center ${hustleMode ? 'bg-[#111] border-white/10' : 'bg-white'}`}>
            <Globe className={`absolute -bottom-4 -right-4 w-32 h-32 ${hustleMode ? 'text-red-500/20' : 'text-accent/20'}`} strokeWidth={1} />
            <div className="w-full flex justify-between items-center z-10">
              <span className="text-xs font-medium uppercase tracking-widest text-muted">HQ Time</span>
              <MapPin size={14} className={hustleMode ? 'text-red-500' : 'text-accent'} />
            </div>
            <div className="text-2xl font-display font-bold z-10">{localTime || "--:--"}</div>
            <div className={`text-xs font-medium z-10 ${hustleMode ? 'text-white/60' : 'text-ink/70'}`}>Kathmandu, Nepal</div>
          </BentoCard>

          {/* 4. Education / Studies Card */}
          <BentoCard delay={0.4} className={`md:col-span-1 md:row-span-1 p-0! overflow-hidden ${hustleMode ? 'bg-[#111] border-white/10' : 'bg-white'}`}>
            <a href="https://islington.edu.np/" target="_blank" rel="noopener noreferrer" className="w-full h-full p-6 flex flex-col justify-center items-center gap-3 transition-colors hover:bg-black/5">
              <img src="/college%20logo.png" alt="Islington College" className="w-12 h-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
              <div className="text-center">
                <div className={`font-bold text-sm ${hustleMode ? 'text-white' : 'text-ink'}`}>BSc (Hons) in Computing</div>
                <div className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${hustleMode ? 'text-white/50' : 'text-accent'}`}>Islington College</div>
              </div>
            </a>
          </BentoCard>

          {/* 5. CEO & Founder Card */}
          <BentoCard delay={0.5} className={`md:col-span-1 md:row-span-1 p-0! overflow-hidden ${hustleMode ? 'bg-[#111] border-white/10' : 'bg-white'}`}>
            <a href="https://infotechevolvix.com" target="_blank" rel="noopener noreferrer" className="w-full h-full p-6 flex flex-col justify-center items-center text-center transition-colors hover:bg-black/5 relative group">
              <ArrowUpRight className={`absolute top-4 right-4 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${hustleMode ? 'text-white/50' : 'text-ink/30'}`} />
              <img src="/logo%20company.png" alt="Evolvix Infotech" className="h-12 w-auto object-contain mb-2" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
              <Briefcase className={`w-8 h-8 mb-2 hidden ${hustleMode ? 'text-red-400' : 'text-accent'}`} />
              <div className={`font-bold text-sm ${hustleMode ? 'text-white' : 'text-ink'}`}>CEO & Founder</div>
              <div className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${hustleMode ? 'text-white/50' : 'text-accent'}`}>Evolvix Infotech</div>
            </a>
          </BentoCard>

          {/* 6. GitHub Contribution Graph */}
          <BentoCard delay={0.6} className={`md:col-span-2 md:row-span-2 flex flex-col justify-between ${hustleMode ? 'bg-[#111] border-white/10' : 'bg-white'}`}>
            <div className="flex justify-between items-center w-full mb-4">
              <span className="text-xs font-medium uppercase tracking-widest text-muted flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> 
                Contributions
              </span>
              <span className={`text-xs font-bold ${hustleMode ? 'text-red-400' : 'text-ink'}`}>342 commits</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5 w-full h-full opacity-80 content-start">
              {Array.from({ length: 84 }).map((_, i) => {
                const seed = Math.sin(i + 1) * 10000;
                const rand = seed - Math.floor(seed);
                const color = rand > 0.7 
                  ? (hustleMode ? 'bg-red-500' : 'bg-green-500') 
                  : rand > 0.4 
                    ? (hustleMode ? 'bg-red-400' : 'bg-green-400') 
                    : (hustleMode ? 'bg-white/10' : 'bg-hairline');
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0.3, scale: 0.8 }}
                    animate={{ 
                      opacity: [0.3, 1, 0.3], 
                      scale: [0.9, 1.1, 0.9] 
                    }}
                    transition={{ 
                      duration: 2 + (rand * 2), 
                      repeat: Infinity, 
                      delay: (i % 12) * 0.05 + (i / 12) * 0.05, 
                      ease: "easeInOut" 
                    }}
                    whileHover={{ scale: 1.5, zIndex: 10, opacity: 1, transition: { duration: 0.2 } }}
                    className={`w-full aspect-square rounded-sm ${color} cursor-crosshair`} 
                  />
                );
              })}
            </div>
          </BentoCard>

          {/* 6.5 Social Links Card (Fills the gap in Row 4) */}
          <BentoCard delay={0.65} className={`md:col-span-2 md:row-span-1 flex flex-col justify-center items-center overflow-hidden ${hustleMode ? 'bg-[#111] border-white/10' : 'bg-white'}`}>
            <span className="text-xs font-medium uppercase tracking-widest text-muted absolute top-4 left-4 z-10">Connect</span>
            <div className="flex items-center justify-around w-full mt-4 z-10">
              {[
                { icon: Github, href: "https://github.com/Niraj3004", color: hustleMode ? "hover:text-white" : "hover:text-black", name: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/", color: "hover:text-blue-500", name: "LinkedIn" },
                { icon: Facebook, href: "https://facebook.com/", color: "hover:text-blue-600", name: "Facebook" },
                { icon: Instagram, href: "https://instagram.com/", color: "hover:text-pink-500", name: "Instagram" },
                { icon: Mail, href: "mailto:niraj@infotechevolvix.com", color: "hover:text-red-500", name: "Email" }
              ].map((social, i) => (
                <motion.a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={social.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + (i * 0.1), type: "spring", stiffness: 200, damping: 15 }}
                  whileHover={{ y: -5, scale: 1.15 }}
                  className={`text-muted transition-colors ${social.color}`}
                >
                  <social.icon size={28} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
            {/* Background animated circles */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className={`absolute -bottom-1/2 -right-1/4 w-full aspect-square rounded-full opacity-10 pointer-events-none blur-3xl ${hustleMode ? 'bg-red-500' : 'bg-blue-500'}`} 
            />
          </BentoCard>

          {/* 7. Stats & CV Download */}
          <BentoCard delay={0.7} className={`md:col-span-3 lg:col-span-4 md:row-span-1 flex flex-col sm:flex-row justify-between items-center gap-6 cursor-pointer transition-colors ${hustleMode ? 'bg-[#111] border-white/10 hover:bg-white/5' : 'bg-white hover:bg-hairline/50'}`} onClick={fireConfetti}>
            <div className="flex gap-8 md:gap-16 w-full justify-around sm:justify-start">
              <div className="flex flex-col gap-1 items-center sm:items-start pointer-events-none">
                <div className="flex items-baseline gap-1"><CountUp end={10} className="text-3xl font-black font-display" /><span className={hustleMode ? 'text-red-500' : 'text-accent font-bold'}>+</span></div>
                <span className="text-[10px] uppercase tracking-widest text-muted font-semibold">Global Clients</span>
              </div>
              <div className="flex flex-col gap-1 items-center sm:items-start pointer-events-none">
                <div className="flex items-baseline gap-1"><CountUp end={25} className="text-3xl font-black font-display" /><span className={hustleMode ? 'text-red-500' : 'text-accent font-bold'}>+</span></div>
                <span className="text-[10px] uppercase tracking-widest text-muted font-semibold">Projects Built</span>
              </div>
              <div className="flex flex-col gap-1 items-center sm:items-start pointer-events-none">
                <div className="flex items-baseline gap-1"><CountUp end={4} className="text-3xl font-black font-display" /><span className={hustleMode ? 'text-red-500' : 'text-accent font-bold'}>+</span></div>
                <span className="text-[10px] uppercase tracking-widest text-muted font-semibold">Years Exp</span>
              </div>
            </div>
            
            <MagneticButton strength={0.2} className={`group relative overflow-hidden rounded-full px-8 h-12 flex items-center justify-center font-medium shadow-xl hover:shadow-2xl transition-all flex-shrink-0 ${hustleMode ? 'bg-white text-black' : 'bg-ink text-white'}`}>
              <span className="flex items-center gap-2 group-hover:-translate-y-10 transition-transform duration-300 text-sm">
                <Download size={14} /> Download CV
              </span>
              <span className={`absolute inset-0 flex items-center justify-center gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-300 text-sm ${hustleMode ? 'bg-red-600 text-white' : 'bg-accent text-white'}`}>
                <Download size={14} className="animate-bounce" /> PDF • 1.2MB
              </span>
            </MagneticButton>
          </BentoCard>

          {/* 8. Draggable Fun Facts (Absolute positioned within a bento) */}
          <BentoCard delay={0.8} className="md:col-span-1 md:row-span-1 overflow-visible! bg-transparent border-0! p-0!">
            <motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} className="w-full h-full bg-[#fde68a] rounded-3xl p-6 flex flex-col justify-center items-center shadow-sm cursor-grab active:cursor-grabbing hover:rotate-3 transition-transform">
              <Coffee className="text-yellow-700 mb-2" size={24} />
              <span className="text-sm font-bold text-yellow-900 text-center">Coffee Dependent</span>
            </motion.div>
          </BentoCard>
          
          <BentoCard delay={0.9} className="md:col-span-1 md:row-span-1 overflow-visible! bg-transparent border-0! p-0!">
            <motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} className={`w-full h-full rounded-3xl p-6 flex flex-col justify-center items-center shadow-sm cursor-grab active:cursor-grabbing hover:-rotate-3 transition-transform ${hustleMode ? 'bg-red-900' : 'bg-purple-100'}`}>
              <Keyboard className={hustleMode ? 'text-red-300 mb-2' : 'text-purple-600 mb-2'} size={24} />
              <span className={`text-sm font-bold text-center ${hustleMode ? 'text-white' : 'text-purple-900'}`}>Keyboard Fanatic</span>
            </motion.div>
          </BentoCard>

          {/* 9. Hybrid Dev/Business Marquee */}
          <BentoCard delay={1.0} className={`md:col-span-2 md:row-span-1 flex flex-col justify-center overflow-hidden ${hustleMode ? 'bg-[#111] border-white/10' : 'bg-white'}`}>
            <span className="text-xs font-medium uppercase tracking-widest text-muted absolute top-4 left-4 z-10 bg-inherit pr-2">Core Tech Stack</span>
            <div className="flex gap-4 mt-6">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }} 
                transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                className="flex gap-4 whitespace-nowrap items-center"
              >
                {[
                  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
                  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
                  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
                  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
                  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
                  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
                  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
                  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
                  // Duplicate for seamless loop
                  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
                  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
                  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
                  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
                  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
                  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
                  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
                  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" }
                ].map((tech, i) => (
                  <div key={i} className="w-14 h-14 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center p-2.5 hover:scale-110 transition-transform">
                    <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
                  </div>
                ))}
              </motion.div>
            </div>
          </BentoCard>

        </div>
      </Container>
    </section>
  );
};
