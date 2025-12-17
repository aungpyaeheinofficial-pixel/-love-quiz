import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const FloatingHearts: React.FC = () => {
  // Generate random floating hearts
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100, // Random horizontal position
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
    size: Math.random() * 20 + 10
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0"
          style={{ left: `${heart.left}%` }}
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: -500, // Float upwards off screen
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
        >
          <Heart 
            className="text-romantic-300/50 fill-romantic-300/50" 
            size={heart.size} 
          />
        </motion.div>
      ))}
    </div>
  );
};