import { ReactNode } from "react";
import { motion } from "framer-motion";

export const BentoCard = ({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`relative rounded-3xl bg-surface border border-hairline overflow-hidden p-6 sm:p-8 flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
};
