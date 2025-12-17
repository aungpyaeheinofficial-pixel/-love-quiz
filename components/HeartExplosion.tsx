import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const HeartExplosion: React.FC = () => {
  // Generate random positions for hearts to explode to
  const hearts = Array.from({ length: 20 }).map((_, i) => {
    const angle = (i / 20) * 360;
    const radius = Math.random() * 100 + 50;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    
    return { id: i, x, y, scale: Math.random() * 0.5 + 0.5 };
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: heart.x,
            y: heart.y,
            opacity: [0, 1, 0],
            scale: [0, heart.scale, 0],
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            times: [0, 0.2, 1]
          }}
        >
          <Heart className="text-romantic-500 fill-romantic-500" size={24} />
        </motion.div>
      ))}
    </div>
  );
};