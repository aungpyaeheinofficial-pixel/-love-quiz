import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

import { STAGES } from './constants';
import { Card } from './components/Card';
import { HeartExplosion } from './components/HeartExplosion';
import { FloatingHearts } from './components/FloatingHearts';
import { PulsingHeart } from './components/PulsingHeart';

const App: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentStage = STAGES[currentStageIndex];
  const isFinished = currentStageIndex >= STAGES.length;

  useEffect(() => {
    // Reset reveal state when stage changes
    setIsRevealed(false);
  }, [currentStageIndex]);

  useEffect(() => {
    if (isRevealed) {
        // Trigger specific effects based on stage
        if (currentStageIndex === 0) {
            // Stage 1: Explosion is handled by mounting the component
        } else if (currentStageIndex === 2 || currentStageIndex === 4 || currentStageIndex === 6) {
            // Stage 3, 5, 7: Confetti
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#f43f5e', '#ffe4e6', '#ffffff']
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#f43f5e', '#ffe4e6', '#ffffff']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }
  }, [isRevealed, currentStageIndex]);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleNext = () => {
    if (currentStageIndex < STAGES.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
    } else {
        // Just loop back or stay? Let's stay finished.
        // Or could reset: setCurrentStageIndex(0);
    }
  };

  // Background Gradient Style
  const backgroundClass = "min-h-screen w-full bg-gradient-to-br from-romantic-100 via-romantic-200 to-romantic-300 animate-gradient bg-[length:200%_200%] flex items-center justify-center p-4 font-burmese";

  if (isFinished) {
      // Fallback if we exceeded stages, though UI prevents this
      return null; 
  }

  return (
    <div className={backgroundClass}>
      
      {/* Global Background Animations for specific stages */}
      <AnimatePresence>
        {isRevealed && (currentStageIndex === 1 || currentStageIndex === 3 || currentStageIndex === 4 || currentStageIndex === 5 || currentStageIndex === 6 || currentStageIndex === 7) && (
            <FloatingHearts key="floating-hearts" />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          <Card key={currentStage.id}>
             {/* Stage 3 & 5 & 7 specific background decoration inside card */}
            {isRevealed && (currentStageIndex === 2 || currentStageIndex === 4 || currentStageIndex === 6) && <PulsingHeart />}

            {/* Stage 1 & 4 & 6 & 8 specific decoration */}
            {isRevealed && (currentStageIndex === 0 || currentStageIndex === 3 || currentStageIndex === 5 || currentStageIndex === 7) && <HeartExplosion />}

            <div className="w-full relative z-10 flex flex-col items-center gap-6 min-h-[300px] justify-center">
                
                {/* Header Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-white/50 p-3 rounded-full shadow-sm"
                >
                    <Heart className="text-romantic-500 fill-romantic-500" size={32} />
                </motion.div>

                {/* Question */}
                <motion.h2 
                    className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed text-center drop-shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {currentStage.question}
                </motion.h2>

                {/* Answer Display */}
                <div className="h-24 w-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isRevealed ? (
                            <motion.div
                                key="answer"
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="text-xl md:text-2xl font-bold text-romantic-600 text-center px-4 py-2 bg-white/60 rounded-xl shadow-sm border border-romantic-100"
                            >
                                {currentStage.answer}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                className="text-gray-400 italic"
                            >
                                ...
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Buttons */}
                <div className="mt-4">
                    {!isRevealed ? (
                        <motion.button
                            onClick={handleReveal}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-romantic-500 hover:bg-romantic-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-romantic-500/30 transition-all text-lg flex items-center gap-2"
                        >
                            <Heart size={20} className="animate-pulse" />
                            {currentStage.buttonText}
                        </motion.button>
                    ) : (
                         currentStageIndex < STAGES.length - 1 && (
                            <motion.button
                                onClick={handleNext}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white hover:bg-gray-50 text-romantic-600 font-bold py-3 px-8 rounded-full shadow-lg border-2 border-romantic-100 transition-all text-lg flex items-center gap-2"
                            >
                                Next <ArrowRight size={20} />
                            </motion.button>
                         )
                    )}
                </div>
            </div>
          </Card>
        </AnimatePresence>
      </div>

      {/* Footer / Branding */}
      <div className="fixed bottom-4 text-romantic-800/40 text-sm font-medium">
        Made with ❤️ for သဲသဲ
      </div>
    </div>
  );
};

export default App;