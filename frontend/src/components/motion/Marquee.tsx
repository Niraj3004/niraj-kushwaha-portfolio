"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee = ({
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: MarqueeProps) => {
  const shouldReduceMotion = useReducedMotion();

  const speedMap = {
    fast: 20,
    normal: 40,
    slow: 60,
  };

  const duration = speedMap[speed];
  const isLeft = direction === "left";

  if (shouldReduceMotion) {
    return (
      <div className={cn("flex flex-wrap gap-4 overflow-hidden", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden flex w-full group", className)}>
      <motion.div
        className="flex whitespace-nowrap shrink-0 min-w-full"
        animate={{
          x: isLeft ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
        style={{
          display: "flex",
        }}
      >
        <div className={cn("flex shrink-0 px-4", pauseOnHover && "group-hover:[animation-play-state:paused]")}>
          {children}
        </div>
      </motion.div>
      <motion.div
        className="flex whitespace-nowrap shrink-0 min-w-full"
        animate={{
          x: isLeft ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
        style={{
          display: "flex",
        }}
        aria-hidden="true"
      >
        <div className={cn("flex shrink-0 px-4", pauseOnHover && "group-hover:[animation-play-state:paused]")}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
