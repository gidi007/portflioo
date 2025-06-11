import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  'data-page': string;
  isActive: boolean;
  onClick?: () => void;
  index?: number;
}

export function NavItem({
  icon: Icon,
  label,
  isActive,
  onClick,
  index = 0
}: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    if (isActive && !hasInteracted) {
      setHasInteracted(true);
    }
  }, [isActive, hasInteracted]);

  const handleClick = useCallback(() => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    onClick?.();
  }, [onClick]);

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    setIsExpanding(true);
    setTimeout(() => setIsExpanding(false), 300);
  }, []);

  const itemVariants: Variants = {
    initial: {
      scale: 0.96,
      opacity: 0,
      y: 20
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: index * 0.1,
        mass: 0.8
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        mass: 0.6
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 0.8
      }
    }
  };

  const glowVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.1, 1],
      filter: "blur(8px)",
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  const labelVariants: Variants = {
    initial: {
      opacity: 0,
      y: 10,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const expandVariants: Variants = {
    collapsed: {
      width: "3rem",
      transition: {
        duration: 0.2,
        ease: [0.32, 0.72, 0, 1]
      }
    },
    expanded: {
      width: "auto",
      transition: {
        duration: 0.3,
        ease: [0.32, 0.72, 0, 1]
      }
    }
  };

  const iconVariants: Variants = {
    initial: { scale: 1 },
    pressed: { 
      scale: 0.85,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      onHoverStart={handleHoverStart}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
      variants={itemVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
    >
      {/* Mobile Layout */}
      <div className="lg:hidden touch-manipulation">
        <motion.div
          className={cn(
            "flex items-center justify-center w-14 h-14 rounded-full shadow-md",
            "transition-colors duration-300 relative",
            isActive || isHovered 
              ? "bg-primary text-white" 
              : "bg-gray-200 dark:bg-gray-700 text-foreground dark:text-gray-300"
          )}
          initial={false}
          animate={isPressed ? "pressed" : "initial"}
          variants={iconVariants}
        >
          <motion.div 
            className="relative z-10"
            animate={{ 
              scale: isPressed ? 0.9 : 1,
              transition: { type: "spring", stiffness: 500, damping: 15 }
            }}
          >
            <Icon className="w-6 h-6 font-bold" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              layoutId="mobile-active-bg"
              className={cn(
                "absolute inset-0 rounded-full",
                (isActive || isHovered) ? "bg-primary" : "bg-accent/50 dark:bg-accent/20"
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </AnimatePresence>

          <AnimatePresence>
            {(isActive || isHovered) && (
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-full"
                variants={glowVariants}
                initial="initial"
                animate="animate"
              />
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          <motion.span
            variants={labelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "absolute left-1/2 -translate-x-1/2 text-xs font-semibold mt-1",
              "transition-colors duration-200",
              (isActive || isHovered) ? "text-primary" : "text-foreground dark:text-gray-400"
            )}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <motion.div
          className={cn(
            "relative flex items-center h-12 cursor-pointer",
            "transition-all duration-300 overflow-hidden",
            "bg-opacity-80 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg"
          )}
          variants={expandVariants}
          animate={isHovered ? "expanded" : "collapsed"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              layoutId="desktop-active-bg"
              className={cn(
                "absolute inset-0 rounded-lg z-10",
                (isActive || isHovered) ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
              )}
            />
          </AnimatePresence>

          <motion.div 
            className="relative z-10 flex items-center px-3"
            layout
          >
            <motion.div
              className={cn(
                "flex items-center gap-3",
                "text-white font-semibold",
                (isActive || isHovered) 
                  ? "text-white" 
                  : "text-foreground dark:text-gray-300"
              )}
              animate={{ 
                x: isExpanding ? 4 : 0,
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
            >
              <motion.div
                animate={{ 
                  rotate: isHovered ? [0, -10, 10, 0] : 0,
                  transition: { duration: 0.5, ease: "easeInOut" }
                }}
              >
                <Icon className="w-6 h-6 font-bold flex-shrink-0" />
              </motion.div>
              
              <motion.span
                className="font-semibold whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : -10,
                  transition: { 
                    duration: 0.2,
                    ease: [0.32, 0.72, 0, 1]
                  }
                }}
              >
                {label}
              </motion.span>
            </motion.div>
          </motion.div>

          {(isActive || isHovered) && (
            <motion.div
              className="absolute inset-0 bg-primary/40 rounded-lg"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}