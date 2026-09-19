import { ReactNode } from "react";
import { motion } from "framer-motion";

export const BentoCard = ({ 
  children, 
  className = "",
  delay = 0,
  onClick,
  style
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.7, delay: delay * 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl bg-surface border border-hairline overflow-hidden p-6 sm:p-8 flex flex-col ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </motion.div>
  );
};
