"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Reveal } from "../motion/Reveal";
import { TextReveal } from "../motion/TextReveal";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { MagneticButton } from "../motion/MagneticButton";
import { Parallax } from "../motion/Parallax";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Background Parallax Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <Parallax speed={0.8} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <Parallax speed={1.2} className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-surface rounded-full blur-[80px]" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Availability Badge */}
          <Reveal delay={0.1}>
            <Badge variant="outline" className="mb-8 px-4 py-2 border-hairline bg-white/50 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for new projects
            </Badge>
          </Reveal>

          {/* Main Headline */}
          <h1 className="text-display mb-6 tracking-tight">
            <TextReveal text="Crafting digital experiences that" delay={0.2} />
            <br />
            <TextReveal text="inspire and perform." delay={0.4} />
          </h1>

          {/* Subheading */}
          <Reveal delay={0.6}>
            <p className="text-h3 text-muted max-w-2xl mx-auto mb-12 font-sans font-normal">
              I'm Niraj Kushwaha, a Full-Stack Developer from Kathmandu specializing in React, Next.js, and Node.js.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Stagger delay={0.8} className="flex flex-col sm:flex-row items-center gap-6">
            <StaggerItem>
              <MagneticButton strength={0.3} className="h-14 px-8 text-body flex items-center gap-2">
                View my work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </StaggerItem>
            <StaggerItem>
              <MagneticButton variant="ghost" strength={0.2} className="h-14 px-8 text-body flex items-center gap-2">
                Download Resume
                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              </MagneticButton>
            </StaggerItem>
          </Stagger>
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
