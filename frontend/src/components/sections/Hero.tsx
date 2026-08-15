"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Code, Terminal, Database, Layers } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";
import { MagneticButton } from "../motion/MagneticButton";
import { LocalTimeBadge } from "../ui/LocalTimeBadge";

export const Hero = ({ data }: { data?: any }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  // Fallbacks
  const headline = data?.headline || "NIRAJ KUSHWAHA";
  const subheadline = data?.subheadline || "FULL STACK DEVELOPER";
  const desc = data?.description || "based in Kathmandu, Nepal.";

  // Floating animation variants
  const floatingVariants = {
    animate: (custom: number) => ({
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: custom,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 bg-white selection:bg-ink selection:text-white">
      {/* Subtle Premium Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div custom={6} variants={floatingVariants} animate="animate" className="absolute top-[20%] left-[15%] text-ink/10">
          <Code size={48} strokeWidth={1.5} />
        </motion.div>
        <motion.div custom={8} variants={floatingVariants} animate="animate" className="absolute top-[60%] right-[20%] text-ink/10">
          <Terminal size={40} strokeWidth={1.5} />
        </motion.div>
        <motion.div custom={7} variants={floatingVariants} animate="animate" className="absolute bottom-[20%] left-[25%] text-ink/10">
          <Database size={56} strokeWidth={1.5} />
        </motion.div>
        <motion.div custom={9} variants={floatingVariants} animate="animate" className="absolute top-[30%] right-[10%] text-ink/10">
          <Layers size={32} strokeWidth={1.5} />
        </motion.div>
      </div>

      <Container className="relative z-10 w-full h-full flex flex-col items-center justify-between min-h-[85vh]">
        
        {/* Top Text (Live Badge) */}
        <Reveal delay={0.1} className="w-full flex justify-center md:justify-start">
          <LocalTimeBadge />
        </Reveal>

        {/* Editorial Layout Container */}
        <div className="relative w-full flex-grow flex items-center justify-center min-h-[60vh] md:min-h-[70vh]">
          
          {/* Solid Text (Background layer) */}
          <motion.h1 
            style={{ y: y1 }}
            className="text-[14vw] md:text-[9vw] font-black leading-[0.85] tracking-tight text-ink text-center absolute top-[15%] md:top-[20%] z-0 select-none uppercase w-full"
          >
            {headline}
          </motion.h1>

          {/* Portrait Image (Middle layer) */}
          <motion.div 
            style={{ y: y2, scale }}
            className="relative z-10 w-[350px] h-[450px] sm:w-[500px] sm:h-[600px] md:w-[700px] md:h-[850px] mt-12 md:mt-24 pointer-events-none"
          >
            {/* Soft gradient mask at the bottom so the image fades out smoothly */}
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
            className="text-[14vw] md:text-[9vw] font-black leading-[0.85] tracking-tight text-outline text-center absolute bottom-[15%] md:bottom-[20%] z-30 select-none uppercase w-full cursor-default"
          >
            {subheadline}
          </motion.h1>
        </div>

        {/* Bottom Section (Description & CTAs) */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between mt-12 md:mt-0 relative z-40">
          <Reveal delay={0.4} className="mb-8 md:mb-0 text-center md:text-left">
            <p className="text-h6 md:text-h5 text-ink/70 font-medium tracking-wide">
              {desc}
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex items-center gap-4">
              {/* Radar Pulse on CTA */}
              <div className="animate-radar-pulse rounded-full">
                <MagneticButton strength={0.3} className="h-14 px-8 text-body font-semibold flex items-center gap-2 bg-ink text-white hover:bg-ink/90 rounded-full relative z-10">
                  Visit site
                  <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>

      </Container>
    </section>
  );
};
