"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  width?: "fit-content" | "100%";
}

export const Reveal = ({ children, delay = 0, className, width = "fit-content" }: RevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div style={{ width }} className={cn("relative overflow-hidden", className)}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
