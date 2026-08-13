"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const ScrambleText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      return;
    }

    const chars = "!<>-_\\\\/[]{}—=+*^?#________";
    let iteration = 0;
    let interval: NodeJS.Timeout;
    
    // Wait for the delay
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText((prev) => 
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3; // Controls speed of unscrambling
      }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, delay, shouldReduceMotion]);

  return (
    <motion.span 
      className="inline-block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay }}
    >
      {displayText || text.replace(/./g, "\u00A0")}
    </motion.span>
  );
};
