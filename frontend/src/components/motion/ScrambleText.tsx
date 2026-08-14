"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;
    
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((char, index) => {
            if (index < iteration || char === " ") {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        setIsScrambling(false);
      }

      iteration += 1 / 3; // Controls speed of unscrambling
    }, 30);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []);

  return (
    <motion.span
      className={className}
      onMouseEnter={scramble}
      style={{ display: "inline-block" }}
    >
      {displayText}
    </motion.span>
  );
};
