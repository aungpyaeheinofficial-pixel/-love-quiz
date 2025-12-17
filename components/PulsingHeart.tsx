import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const PulsingHeart: React.FC = () => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-20"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Heart size={300} className="text-romantic-500 fill-romantic-500" />
    </motion.div>
  );
};