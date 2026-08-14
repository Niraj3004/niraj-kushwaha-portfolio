"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const LocalTimeBadge = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Kathmandu timezone is Asia/Kathmandu
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(`Kathmandu, NP • ${formatted} NST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!time) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-hairline bg-surface/50 backdrop-blur-md text-sm font-medium text-muted hover:text-ink transition-colors cursor-default"
    >
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
      </div>
      {time}
    </motion.div>
  );
};
