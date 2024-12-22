import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground: React.FC = React.memo(() => {
  const [particleCount, setParticleCount] = useState(10);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setParticleCount(document.hidden ? 5 : 20);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl"
          animate={{
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            y: [`-10vh`, `110vh`],
            scale: [0.5, 1.5],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 50}px`,
            height: `${10 + Math.random() * 50}px`,
            background: `radial-gradient(
              circle, 
              rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3) 0%, 
              rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.1) 100%
            )`
          }}
        />
      ))}
    </motion.div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

