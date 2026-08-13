"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children?: React.ReactNode;
  speed?: number; // 1 = normal scroll, < 1 = slower (parallax up), > 1 = faster (parallax down)
  className?: string;
}

export const Parallax = ({ children, speed = 0.5, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const element = ref.current;
    if (!element) return;
    
    // Parallax effect using yPercent
    const yOffset = (1 - speed) * 100;
    
    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: yOffset,
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    
    return () => ctx.revert();
  }, [speed, shouldReduceMotion]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={ref} className="h-full w-full">
        {children}
      </div>
    </div>
  );
};
