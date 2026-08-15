"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { Code, Type, Download, MapPin, Music, Check, Copy, Volume2, Globe, Terminal, Briefcase, Coffee, Keyboard, TrendingUp, Users, Calendar, ArrowUpRight, Zap } from "lucide-react";
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
  const [bizYears, setBizYears] = useState<string>("0.00000000");
  const [hustleMode, setHustleMode] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);
  const localTime = useLocalTime();

  // Dynamic Years in Business Calculator (Assuming Evolvix founded in 2022)
  useEffect(() => {
    const foundedDate = new Date("2022-01-01T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const years = (now - foundedDate) / (1000 * 60 * 60 * 24 * 365.25);
      setBizYears(years.toFixed(8));
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

  const bioP1 = data?.bioParagraph1 || "I'm Niraj — a tech entrepreneur and the founder of Evolvix Infotech. We build highly scalable web platforms, mobile applications, and AI-driven automation systems to help modern businesses operate faster and smarter.";
  const bioP2 = data?.bioParagraph2 || "When I'm not leading my team in Kathmandu or closing deals, I'm deep into architectural system design or studying at Islington College. My obsession is turning complex business problems into elegant, profitable products.";
  const firstLetter = bioP1.charAt(0);
  const restOfP1 = bioP1.slice(1);

  return (
    <section id="about" className={`py-32 relative text-selection-accent transition-colors duration-1000 ${hustleMode ? 'bg-ink text-white font-sans' : 'bg-surface text-ink'}`}>
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <SectionHeading heading="The Founder" className="mb-0" />
          
          {/* Secret Hustle Mode Toggle */}
          <button 
            onClick={() => setHustleMode(!hustleMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-lg ${hustleMode ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' : 'bg-white text-ink border border-hairline hover:bg-hairline'}`}
          >
            <Zap size={14} className={hustleMode ? "animate-pulse" : ""} /> {hustleMode ? "Hustle Mode: ON" : "Hustle Mode"}
          </button>
        </div>

        {/* 20-FEATURE CEO BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[120px] md:auto-rows-[150px]">

          {/* 1. Main Photo Card / Dual Image Crossfade (Col Span 1, Row Span 3) */}
          <BentoCard delay={0.1} className={`md:col-span-1 md:row-span-3 p-0! group cinematic-grain relative ${hustleMode ? 'border-red-500/30' : ''}`} style={{ perspective: "1000px" }}>
            <motion.div
              style={{ rotateX: shouldReduceMotion ? 0 : rotateX, rotateY: shouldReduceMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
              className="w-full h-full relative overflow-hidden rounded-3xl"
            >
              {/* Status Indicator */}
              <div className="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur-md text-ink text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                Free for 15-min chat
              </div>

              {/* Image Crossfade (Personal to Company Logo) */}
              <img src="/niraj2.jpeg" alt="Niraj CEO" onError={(e) => e.currentTarget.src = data?.photo || '/placeholder.jpg'} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0" />
              <div className="absolute inset-0 w-full h-full bg-ink flex flex-col items-center justify-center opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105 p-8 text-center">
                <img src="/logo.png" alt="Evolvix Infotech Logo" onError={(e) => e.currentTarget.style.display = 'none'} className="w-32 h-auto mb-4" />
                <h3 className="text-white font-display font-bold text-xl">Evolvix Infotech</h3>
                <p className="text-white/60 text-xs mt-2 uppercase tracking-widest">Est. 2022</p>
              </div>
            </motion.div>
          </BentoCard>

          {/* 2. Bio / Vision Card with Spotlight (Col Span 2 or 3, Row Span 2) */}
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
                  <span className={`text-xs font-semibold uppercase tracking-widest mt-1 ${hustleMode ? 'text-red-400' : 'text-accent'}`}>CEO & Founder @ Evolvix Infotech</span>
                </div>
                
                <div className={`flex items-center rounded-full p-1 border ${hustleMode ? 'bg-black/50 border-white/10' : 'bg-surface border-hairline'}`}>
                  <button onClick={() => setViewMode('text')} className={`px-3 py-1 rounded-full text-xs font-medium ${viewMode === 'text' ? (hustleMode ? 'bg-white/10 text-white' : 'bg-white shadow-sm text-ink') : 'text-muted'}`}>Story</button>
                  <button onClick={() => setViewMode('code')} className={`px-3 py-1 rounded-full text-xs font-medium ${viewMode === 'code' ? (hustleMode ? 'bg-red-500 text-white' : 'bg-ink text-white') : 'text-muted'}`}>Vision</button>
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
                    <motion.p variants={lineVariants}><span className={hustleMode ? 'text-green-500' : 'text-pink-400'}>class</span> <span className={hustleMode ? 'text-green-300' : 'text-blue-400'}>EvolvixInfotech</span> {'{'}</motion.p>
                    <motion.p variants={lineVariants} className="pl-4"><span className={hustleMode ? 'text-green-600' : 'text-sky-300'}>founder</span> = <button onClick={copyName} className={`transition-colors relative group ${hustleMode ? 'text-white hover:text-green-200' : 'text-amber-300 hover:text-amber-200'}`}>"{copied ? "Copied!" : "Niraj Kushwaha"}"</button>;</motion.p>
                    <motion.p variants={lineVariants} className="pl-4"><span className={hustleMode ? 'text-green-600' : 'text-sky-300'}>mission</span> = <span className={hustleMode ? 'text-green-400' : 'text-amber-300'}>"Empower businesses with scalable tech."</span>;</motion.p>
                    <motion.p variants={lineVariants} className="pl-4"><span className={hustleMode ? 'text-green-600' : 'text-sky-300'}>status</span> = <span className={hustleMode ? 'text-green-400' : 'text-amber-300'}>"Scaling globally"</span>;</motion.p>
                    <motion.p variants={lineVariants}>{'}'}</motion.p>
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

          {/* 4. "Book a Consultation" Magnetic CTA */}
          <BentoCard delay={0.4} className={`md:col-span-1 md:row-span-1 flex flex-col justify-center items-center gap-4 ${hustleMode ? 'bg-red-600 text-white border-red-500' : 'bg-accent text-white border-accent'}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 absolute top-4 left-4">Let's Talk</span>
            <MagneticButton strength={0.4} className="group relative w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <Calendar className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-display font-bold text-lg">Book Call</span>
              <ArrowUpRight className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </MagneticButton>
          </BentoCard>

          {/* 5. Live "Years in Business" Ticker */}
          <BentoCard delay={0.5} className={`md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center ${hustleMode ? 'bg-[#111] border-white/10' : 'bg-white'}`}>
            <span className="text-xs font-medium uppercase tracking-widest text-muted absolute top-4 left-4">Evolvix Era</span>
            <div className={`text-2xl font-mono font-bold ${hustleMode ? 'text-red-400' : 'text-accent'}`}>{bizYears}</div>
            <div className={`text-xs font-medium mt-1 ${hustleMode ? 'text-white/50' : 'text-ink/50'}`}>Years in Business</div>
          </BentoCard>

          {/* 6. Company Growth Spline Graph */}
          <BentoCard delay={0.6} className={`md:col-span-2 md:row-span-1 flex flex-col justify-between relative overflow-hidden ${hustleMode ? 'bg-[#111] border-white/10' : 'bg-white'}`}>
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-xs font-medium uppercase tracking-widest text-muted">Company Growth</span>
              <span className={`text-xs font-bold ${hustleMode ? 'text-red-400' : 'text-green-500'}`}>+124% YoY</span>
            </div>
            {/* SVG Mock Line Chart */}
            <svg className="absolute bottom-0 left-0 w-full h-2/3 opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,100 C20,80 40,90 60,40 C80,-10 100,20 100,20 L100,100 Z" fill={hustleMode ? "url(#redGrad)" : "url(#blueGrad)"} />
              <path d="M0,100 C20,80 40,90 60,40 C80,-10 100,20 100,20" fill="none" stroke={hustleMode ? "#ef4444" : "#3b82f6"} strokeWidth="2" />
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient>
                <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.5"/><stop offset="100%" stopColor="#ef4444" stopOpacity="0"/></linearGradient>
              </defs>
            </svg>
            <div className="z-10 flex items-end gap-2">
              <TrendingUp size={24} className={hustleMode ? 'text-white' : 'text-ink'} />
              <span className="text-sm font-medium">Scaling operations</span>
            </div>
          </BentoCard>

          {/* 7. Stats & Pitch Deck Download */}
          <BentoCard delay={0.7} className={`md:col-span-3 lg:col-span-4 md:row-span-1 flex flex-col sm:flex-row justify-between items-center gap-6 cursor-pointer transition-colors ${hustleMode ? 'bg-[#111] border-white/10 hover:bg-white/5' : 'bg-white hover:bg-hairline/50'}`} onClick={fireConfetti}>
            <div className="flex gap-8 md:gap-16 w-full justify-around sm:justify-start">
              <div className="flex flex-col gap-1 items-center sm:items-start pointer-events-none">
                <div className="flex items-baseline gap-1"><CountUp end={10} className="text-3xl font-black font-display" /><span className={hustleMode ? 'text-red-500' : 'text-accent font-bold'}>+</span></div>
                <span className="text-[10px] uppercase tracking-widest text-muted font-semibold">Global Clients</span>
              </div>
              <div className="flex flex-col gap-1 items-center sm:items-start pointer-events-none">
                <div className="flex items-baseline gap-1"><CountUp end={25} className="text-3xl font-black font-display" /><span className={hustleMode ? 'text-red-500' : 'text-accent font-bold'}>+</span></div>
                <span className="text-[10px] uppercase tracking-widest text-muted font-semibold">Products Shipped</span>
              </div>
              <div className="flex flex-col gap-1 items-center sm:items-start pointer-events-none">
                <div className="flex items-baseline gap-1"><CountUp end={5} className="text-3xl font-black font-display" /><span className={hustleMode ? 'text-red-500' : 'text-accent font-bold'}>+</span></div>
                <span className="text-[10px] uppercase tracking-widest text-muted font-semibold">Team Members</span>
              </div>
            </div>
            
            <MagneticButton strength={0.2} className={`group relative overflow-hidden rounded-full px-8 h-12 flex items-center justify-center font-medium shadow-xl hover:shadow-2xl transition-all flex-shrink-0 ${hustleMode ? 'bg-white text-black' : 'bg-ink text-white'}`}>
              <span className="flex items-center gap-2 group-hover:-translate-y-10 transition-transform duration-300 text-sm">
                <Briefcase size={14} /> Pitch Deck
              </span>
              <span className={`absolute inset-0 flex items-center justify-center gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-300 text-sm ${hustleMode ? 'bg-red-600 text-white' : 'bg-accent text-white'}`}>
                <Download size={14} className="animate-bounce" /> PDF • 2.4MB
              </span>
            </MagneticButton>
          </BentoCard>

          {/* 8. Draggable Fun Facts (Absolute positioned within a bento) */}
          <BentoCard delay={0.8} className="md:col-span-1 md:row-span-1 overflow-visible! bg-transparent border-0! p-0!">
            <motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} className="w-full h-full bg-[#fde68a] rounded-3xl p-6 flex flex-col justify-center items-center shadow-sm cursor-grab active:cursor-grabbing hover:rotate-3 transition-transform">
              <Coffee className="text-yellow-700 mb-2" size={24} />
              <span className="text-sm font-bold text-yellow-900 text-center">34 Coffees/Wk</span>
            </motion.div>
          </BentoCard>
          
          <BentoCard delay={0.9} className="md:col-span-1 md:row-span-1 overflow-visible! bg-transparent border-0! p-0!">
            <motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} className={`w-full h-full rounded-3xl p-6 flex flex-col justify-center items-center shadow-sm cursor-grab active:cursor-grabbing hover:-rotate-3 transition-transform ${hustleMode ? 'bg-red-900' : 'bg-[#e0e7ff]'}`}>
              <Users className={hustleMode ? 'text-red-300 mb-2' : 'text-indigo-600 mb-2'} size={24} />
              <span className={`text-sm font-bold text-center ${hustleMode ? 'text-white' : 'text-indigo-900'}`}>Deal Maker</span>
            </motion.div>
          </BentoCard>

          {/* 9. Business Stack Marquee */}
          <BentoCard delay={1.0} className={`md:col-span-2 md:row-span-1 flex flex-col justify-center overflow-hidden ${hustleMode ? 'bg-[#111] border-white/10' : 'bg-white'}`}>
            <span className="text-xs font-medium uppercase tracking-widest text-muted absolute top-4 left-4 z-10 bg-inherit pr-2">Business Stack</span>
            <div className="flex gap-4 mt-4 opacity-70">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }} 
                transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                className="flex gap-8 whitespace-nowrap items-center font-display font-bold text-lg"
              >
                <span>AWS</span> • <span>Stripe</span> • <span>Notion</span> • <span>Figma</span> • <span>Linear</span> • <span>Next.js</span> • <span>Vercel</span> • 
                <span>AWS</span> • <span>Stripe</span> • <span>Notion</span> • <span>Figma</span> • <span>Linear</span> • <span>Next.js</span> • <span>Vercel</span>
              </motion.div>
            </div>
          </BentoCard>

        </div>
      </Container>
    </section>
  );
};
