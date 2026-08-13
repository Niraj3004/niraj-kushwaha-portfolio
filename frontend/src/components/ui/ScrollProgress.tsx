"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  
  // Smooth out the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8 
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-8 z-50 mix-blend-difference text-white"
    >
      <button 
        onClick={scrollToTop}
        className="relative w-14 h-14 rounded-full flex items-center justify-center group overflow-hidden"
        aria-label="Scroll to top"
      >
        <div className="absolute inset-0 bg-ink/20 dark:bg-white/20 rounded-full" />
        
        {/* SVG Progress Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <motion.circle
            cx="28"
            cy="28"
            r="26"
            className="stroke-accent fill-none stroke-[3px]"
            style={{ pathLength: scaleX }}
          />
        </svg>

        <ArrowUp size={24} className="relative z-10 group-hover:-translate-y-1 transition-transform" />
      </button>
    </motion.div>
  );
};
