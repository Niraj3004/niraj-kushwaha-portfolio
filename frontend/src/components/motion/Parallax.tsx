"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children?: React.ReactNode;
  speed?: number; // 1 = normal scroll, < 1 = slower (parallax up), > 1 = faster (parallax down)
  className?: string;
}

export const Parallax = ({ children, speed = 0.5, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate the vertical offset based on speed
  const yOffset = (1 - speed) * 100;
  
  // Transform scroll progress (0 to 1) into y translation
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${yOffset}%`]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div 
        ref={ref} 
        style={{ y: shouldReduceMotion ? 0 : y }} 
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
