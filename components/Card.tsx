import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        relative overflow-hidden
        w-full max-w-md p-8 
        bg-white/40 backdrop-blur-xl 
        border border-white/60 
        shadow-[0_8px_32px_0_rgba(244,63,94,0.15)] 
        rounded-3xl
        text-center
        flex flex-col items-center justify-center gap-6
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};