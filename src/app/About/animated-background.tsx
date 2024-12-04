import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground = ({
  dotCount = 50, // Number of dots
  animationDuration = 20, // Base animation duration
  gradientColors = {
    from: 'from-primary/5',
    via: 'via-background',
    to: 'to-background',
  },
}) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientColors.from} ${gradientColors.via} ${gradientColors.to}`}
      />

      {/* SVG Grid */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary/20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Dots */}
      {[...Array(isMobile ? dotCount / 2 : dotCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/30 dark:bg-primary/50"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
          }}
          transition={{
            duration: animationDuration + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5, // Random delay for natural motion
          }}
        />
      ))}
    </div>
  );
};
