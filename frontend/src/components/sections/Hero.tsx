"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, Download, Terminal, Database, Layout, ImageIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Reveal } from "../motion/Reveal";
import { ScrambleText } from "../motion/ScrambleText";
import { MagneticButton } from "../motion/MagneticButton";
import { Parallax } from "../motion/Parallax";
import { Grain } from "../motion/Grain";
import { TiltCard } from "../motion/TiltCard";

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <section 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-32 pb-32 bg-background group"
      onMouseMove={handleMouseMove}
    >
      <Grain />
      
      {/* Interactive Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(79, 70, 229, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Background Parallax Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <Parallax speed={0.8} className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
        <Parallax speed={1.2} className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-ink/5 rounded-full blur-[120px]" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-20">
            {/* Status & Time */}
            <Reveal delay={0.1}>
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8">
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
            <h1 className="text-display mb-6 tracking-tight flex flex-col items-center lg:items-start leading-[1.1]">
              <span className="block text-ink"><ScrambleText text="Building digital products" delay={0.2} /></span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ink via-accent to-ink bg-[length:200%_auto] animate-gradient pb-2">
                <ScrambleText text="that inspire & perform." delay={0.4} />
              </span>
            </h1>

            {/* Subheading */}
            <Reveal delay={0.6}>
              <p className="text-h3 text-muted max-w-xl mx-auto lg:mx-0 mb-12 font-sans font-normal leading-relaxed">
                I'm <span className="text-ink font-medium">Niraj Kushwaha</span>, a Full-Stack Developer from Kathmandu specializing in modern web experiences.
              </p>
            </Reveal>

            {/* CTA Buttons in a Glass Container */}
            <Reveal delay={0.8}>
              <div className="flex flex-col sm:flex-row items-center gap-4 p-2 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl sm:rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                <MagneticButton strength={0.2} className="h-14 px-8 text-body flex items-center justify-center gap-2 w-full sm:w-auto rounded-2xl sm:rounded-full">
                  Explore my work
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <MagneticButton variant="ghost" strength={0.2} className="h-14 px-8 text-body flex items-center justify-center gap-2 border-none hover:bg-white/50 w-full sm:w-auto rounded-2xl sm:rounded-full">
                  Download CV
                  <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 3D Parallax Image & Floating Icons */}
          <div className="relative w-full max-w-md mx-auto lg:max-w-full flex justify-center items-center">
            
            {/* Draggable Floating Tech Icons */}
            <motion.div 
              drag dragSnapToOrigin whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[-10%] z-30 w-16 h-16 bg-white/80 backdrop-blur-md border border-hairline rounded-2xl flex items-center justify-center shadow-lg cursor-grab"
            >
              <Layout className="text-accent" size={28} />
            </motion.div>
            
            <motion.div 
              drag dragSnapToOrigin whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] left-[-5%] z-30 w-20 h-20 bg-white/80 backdrop-blur-md border border-hairline rounded-2xl flex items-center justify-center shadow-lg cursor-grab"
            >
              <Terminal className="text-ink" size={32} />
            </motion.div>

            <motion.div 
              drag dragSnapToOrigin whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-[25%] right-[-5%] z-30 w-14 h-14 bg-white/80 backdrop-blur-md border border-hairline rounded-2xl flex items-center justify-center shadow-lg cursor-grab"
            >
              <Database className="text-muted" size={24} />
            </motion.div>

            {/* 3D Parallax Image Placeholder */}
            <Reveal delay={0.6} className="w-full">
              <TiltCard className="w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-white/40 backdrop-blur-sm z-10 pointer-events-none" />
                <div className="w-full h-full bg-surface border border-hairline flex flex-col items-center justify-center text-muted relative overflow-hidden group">
                  {/* Grid overlay for the placeholder */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <ImageIcon size={48} className="mb-4 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  <span className="font-medium relative z-20">Your 3D Image Here</span>
                  <span className="text-small opacity-70 relative z-20 mt-2 text-center px-6">Replace this placeholder with your photo in the code</span>
                </div>
              </TiltCard>
            </Reveal>
          </div>

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
