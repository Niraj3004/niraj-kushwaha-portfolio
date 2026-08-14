"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { MagneticButton } from "../motion/MagneticButton";

export const Hero = ({ data }: { data?: any }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 250]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);

  // Fallbacks
  const headline = data?.headline || "Webdesigner";
  const subheadline = data?.subheadline || "& Photographer";
  const badge = data?.badge || "👋 my name is Niraj and I am a freelance";
  const desc = data?.description || "based in Kathmandu, Nepal.";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-32 bg-white">
      <Container className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        {/* Top Text */}
        <Reveal delay={0.1}>
          <p className="text-body text-ink/70 font-medium mb-12">
            {badge}
          </p>
        </Reveal>

        <div className="relative w-full flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh]">
          {/* Solid Text (Background layer) */}
          <motion.h1 
            style={{ y: y1 }}
            className="text-[15vw] md:text-[12vw] font-black leading-none tracking-tighter text-ink text-center absolute top-0 md:top-10 z-0"
          >
            {headline}
          </motion.h1>

          {/* Portrait Image (Middle layer) */}
          <motion.div 
            style={{ y: y2, scale }}
            className="relative z-10 w-[280px] h-[350px] sm:w-[400px] sm:h-[500px] md:w-[500px] md:h-[600px] mt-24 md:mt-32"
          >
            <img 
              src="/niraj.png" 
              alt="Niraj Kushwaha" 
              className="w-full h-full object-cover md:object-contain filter grayscale drop-shadow-2xl" 
            />
          </motion.div>

          {/* Hollow Text (Foreground layer, overlapping image) */}
          <motion.h1 
            style={{ y: y1 }}
            className="text-[15vw] md:text-[12vw] font-black leading-none tracking-tighter text-outline text-center absolute bottom-10 md:bottom-20 z-20 pointer-events-none"
          >
            {subheadline}
          </motion.h1>
        </div>

        {/* Bottom Text */}
        <Reveal delay={0.4}>
          <p className="text-body text-ink/70 font-medium mt-16 md:mt-8 relative z-30">
            {desc}
          </p>
        </Reveal>

        {/* CTA Buttons */}
        <Stagger delay={0.6} className="flex flex-col sm:flex-row items-center gap-6 mt-10 relative z-30">
          <StaggerItem>
            <MagneticButton strength={0.3} className="h-14 px-8 text-body flex items-center gap-2 bg-ink text-white hover:bg-ink/90">
              View my work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </StaggerItem>
          <StaggerItem>
            <MagneticButton variant="ghost" strength={0.2} className="h-14 px-8 text-body flex items-center gap-2 border border-hairline">
              Contact me
            </MagneticButton>
          </StaggerItem>
        </Stagger>

      </Container>
    </section>
  );
};
