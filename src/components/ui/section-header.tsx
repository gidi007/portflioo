import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface AnimatedHeaderProps {
  title: string;
  shadowText: string;
  highlight?: string;
  interval?: number;
  className?: string;
}

export const SectionHeader = ({
  title,
  shadowText,
  highlight,
  interval = 3000,
  className = '',
}: AnimatedHeaderProps) => {
  const [isActive, setIsActive] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [autoplay, setAutoplay] = useState(!isMobile);

  useEffect(() => {
    setAutoplay(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setIsActive((prev) => !prev);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, autoplay]);

  const handleInteraction = useCallback(() => {
    if (isMobile) {
      setIsActive((prev) => !prev);
    }
  }, [isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setAutoplay(false);
      setIsActive(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setAutoplay(true);
      setIsActive(false);
    }
  }, [isMobile]);

  const variants = {
    hidden: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  return (
    <div
      className={`relative select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleInteraction}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleInteraction()}
    >
      <div className="relative h-24 md:h-32 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={isActive ? 'title' : 'shadow'}
            className="absolute inset-0 flex items-center justify-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tight
              ${isActive ? 'text-foreground' : 'text-muted-foreground/20'}`}
            >
              {(isActive ? title : shadowText).split('').map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  {char}
                </motion.span>
              ))}
              {isActive && highlight && (
                <motion.span
                  className="text-primary ml-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {highlight}
                </motion.span>
              )}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 mt-2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {isMobile && (
        <div className="mt-2 text-center text-sm text-muted-foreground">
        </div>
      )}
    </div>
  );
};

// Custom hook for media queries
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export default SectionHeader;