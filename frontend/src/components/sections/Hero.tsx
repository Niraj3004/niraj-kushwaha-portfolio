"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Terminal, Database, Layout } from "lucide-react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Reveal } from "../motion/Reveal";
import { ScrambleText } from "../motion/ScrambleText";
import { MagneticButton } from "../motion/MagneticButton";
import { Parallax } from "../motion/Parallax";
import { Grain } from "../motion/Grain";

const TimeWidget = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(new Date()));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-small text-muted font-medium bg-white/60 backdrop-blur-md border border-hairline rounded-full px-4 py-1.5 shadow-sm">
      <span>📍 Kathmandu, Nepal</span>
      <span className="w-1 h-1 rounded-full bg-muted/50 mx-1"></span>
      <span className="w-[60px] text-left">{time || "---"}</span>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20 pb-32 bg-background">
      <Grain />
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Background Parallax Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <Parallax speed={0.8} className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
        <Parallax speed={1.2} className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-ink/5 rounded-full blur-[120px]" />
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden max-w-7xl mx-auto">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[10%] w-12 h-12 bg-white/80 backdrop-blur-sm border border-hairline rounded-2xl flex items-center justify-center shadow-sm"
        >
          <Layout className="text-accent" size={20} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] left-[15%] w-16 h-16 bg-white/80 backdrop-blur-sm border border-hairline rounded-2xl flex items-center justify-center shadow-sm"
        >
          <Terminal className="text-ink" size={24} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] right-[10%] w-14 h-14 bg-white/80 backdrop-blur-sm border border-hairline rounded-2xl flex items-center justify-center shadow-sm"
        >
          <Database className="text-muted" size={24} />
        </motion.div>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Status & Time */}
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <Badge variant="outline" className="px-4 py-1.5 border-hairline bg-white/60 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for new projects
              </Badge>
              <TimeWidget />
            </div>
          </Reveal>

          {/* Main Headline */}
          <h1 className="text-display mb-6 tracking-tight flex flex-col items-center leading-[1.1]">
            <span className="block text-ink"><ScrambleText text="Building digital products" delay={0.2} /></span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ink via-accent to-ink bg-[length:200%_auto] animate-gradient pb-2">
              <ScrambleText text="that inspire & perform." delay={0.4} />
            </span>
          </h1>

          {/* Subheading */}
          <Reveal delay={0.6}>
            <p className="text-h3 text-muted max-w-2xl mx-auto mb-12 font-sans font-normal leading-relaxed">
              I'm <span className="text-ink font-medium">Niraj Kushwaha</span>, a Full-Stack Developer from Kathmandu specializing in modern web experiences.
            </p>
          </Reveal>

          {/* CTA Buttons in a Glass Container */}
          <Reveal delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-2 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl sm:rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <MagneticButton strength={0.2} className="h-14 px-8 text-body flex items-center gap-2 w-full sm:w-auto rounded-2xl sm:rounded-full">
                Explore my work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton variant="ghost" strength={0.2} className="h-14 px-8 text-body flex items-center gap-2 border-none hover:bg-white/50 w-full sm:w-auto rounded-2xl sm:rounded-full">
                Download CV
                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-small text-muted uppercase tracking-widest text-[10px]">Scroll</span>
        <div className="w-[1px] h-12 bg-hairline relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-ink absolute top-0"
            animate={{ top: ["-50%", "150%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
};
