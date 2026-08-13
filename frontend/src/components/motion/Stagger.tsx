"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerProps {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  as?: any;
}

export const Stagger = ({ children, delay = 0, staggerDelay = 0.08, className, as = "div" }: StaggerProps) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion.create(as);

  return (
    <Component
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </Component>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  as?: any;
}

export const StaggerItem = ({ children, className, as = "div" }: StaggerItemProps) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion.create(as);

  return (
    <Component
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </Component>
  );
};
