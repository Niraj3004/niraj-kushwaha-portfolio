"use client";

import { motion } from "framer-motion";

export const Equalizer = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-hairline bg-surface/50 backdrop-blur-md cursor-default">
      <div className="flex items-end gap-1 h-3">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1 bg-accent rounded-t-sm"
            animate={{
              height: ["20%", "100%", "40%", "80%", "30%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-muted">Currently building</span>
    </div>
  );
};
