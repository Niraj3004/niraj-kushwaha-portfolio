"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useVelocity } from "framer-motion";
import { ArrowUpRight, Code, Terminal, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";
import { MagneticButton } from "../motion/MagneticButton";
import { CustomCursor } from "../motion/CustomCursor";
import { ScrambleText } from "../motion/ScrambleText";
import { LocalTimeBadge } from "../ui/LocalTimeBadge";
import { Equalizer } from "../ui/Equalizer";
import { FloatingBadge } from "../motion/FloatingBadge";
import { Marquee } from "../motion/Marquee";

export const Hero = ({ data }: { data?: any }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll Parallax
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  // Scroll Velocity (Skew effect)
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewY = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);

  // Mouse Tracking (Spotlight & 3D Tilt)
  const mouseX = useMotionValue(windowSize.width / 2);
  const mouseY = useMotionValue(windowSize.height / 2);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const spotlightX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const spotlightBackground = useMotionTemplate`radial-gradient(800px circle at ${spotlightX}px ${spotlightY}px, rgba(0, 0, 0, 0.04), transparent 80%)`;

  const rotateX = useTransform(mouseY, [0, windowSize.height || 1000], [5, -5]);
  const rotateY = useTransform(mouseX, [0, windowSize.width || 1000], [-5, 5]);

  // Fallbacks
  const headline = data?.headline || "NIRAJ KUSHWAHA";
  const subheadline = data?.subheadline || "FULL STACK DEVELOPER";
  const desc = data?.description || "based in Kathmandu, Nepal.";

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 bg-white selection:bg-ink selection:text-white"
    >
      <CustomCursor />

      {/* Spotlight & Ambient Volumetric Glow */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ background: spotlightBackground }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full z-0 pointer-events-none animate-pulse duration-[10s]"></div>

      {/* Infinite Top Marquee */}
      <div className="absolute top-0 left-0 w-full z-10 opacity-40">
        <Marquee speed="normal" direction="left" className="py-2 border-b border-hairline bg-surface/50 backdrop-blur-sm">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-xs font-mono tracking-widest text-ink mx-4 uppercase">
              • OPEN FOR WORK • FULL STACK DEVELOPER • KATHMANDU, NEPAL
            </span>
          ))}
        </Marquee>
      </div>

      <Container className="relative z-10 w-full h-full flex flex-col items-center justify-between min-h-[85vh]">
        
        {/* Top Badges */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start mt-8 mb-12 gap-4">
          <Reveal delay={0.1}>
            <LocalTimeBadge />
          </Reveal>
          <Reveal delay={0.2}>
            <Equalizer />
          </Reveal>
        </div>

        {/* Editorial Layout Container with 3D Tilt */}
        <motion.div 
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="relative w-full flex-grow flex items-center justify-center min-h-[60vh] md:min-h-[70vh]"
        >
          {/* Floating Tech Badges */}
          <FloatingBadge delay={0.5} yOffset={20} duration={5} className="top-[10%] left-[10%] md:left-[20%] hidden md:block">
            <Code size={18} className="text-accent" />
            <span className="text-sm font-semibold text-ink">React</span>
          </FloatingBadge>
          <FloatingBadge delay={0.7} yOffset={15} duration={6} className="top-[40%] right-[5%] md:right-[15%] hidden lg:block">
            <Terminal size={18} className="text-blue-500" />
            <span className="text-sm font-semibold text-ink">Next.js</span>
          </FloatingBadge>
          <FloatingBadge delay={0.9} yOffset={25} duration={4.5} className="bottom-[10%] left-[5%] md:left-[25%] hidden sm:block">
            <Zap size={18} className="text-amber-500" />
            <span className="text-sm font-semibold text-ink">Node.js</span>
          </FloatingBadge>

          {/* Solid Text (Background layer) with Hacker Scramble */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[15%] md:top-[20%] z-0 select-none uppercase w-full text-center hover-target"
          >
            <ScrambleText 
              text={headline} 
              className="text-[14vw] md:text-[9vw] font-black leading-[0.85] tracking-tight text-ink"
            />
          </motion.div>

          {/* Portrait Image (Middle layer) with Skew Distortion */}
          <motion.div 
            style={{ y: y2, scale, skewY }}
            className="relative z-10 w-[350px] h-[450px] sm:w-[500px] sm:h-[600px] md:w-[700px] md:h-[850px] mt-12 md:mt-24 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20 pointer-events-none h-full"></div>
            <img 
              src="/niraj.png" 
              alt="Niraj Kushwaha" 
              className="w-full h-full object-cover md:object-contain filter grayscale contrast-125 brightness-95" 
              style={{ objectPosition: 'center bottom' }}
            />
          </motion.div>

          {/* Hollow Text (Foreground layer, overlapping image) */}
          <motion.h1 
            style={{ y: y1 }}
            className="text-[14vw] md:text-[9vw] font-black leading-[0.85] tracking-tight text-outline text-center absolute bottom-[15%] md:bottom-[20%] z-30 pointer-events-none select-none uppercase w-full"
          >
            {subheadline}
          </motion.h1>
        </motion.div>

        {/* Bottom Section (Description & CTAs) */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between mt-12 md:mt-0 relative z-40">
          <Reveal delay={0.4} className="mb-8 md:mb-0 text-center md:text-left">
            <p className="text-h6 md:text-h5 text-ink/70 font-medium tracking-wide max-w-sm">
              {desc}
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex items-center gap-4">
              <MagneticButton strength={0.3} className="h-14 px-8 text-body font-semibold flex items-center gap-2 bg-ink text-white hover:bg-ink/90 rounded-full">
                Visit site
                <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>

      </Container>
    </section>
  );
};
