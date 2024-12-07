import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Define animation variants using the correct Framer Motion Variants type
const textVariants: Variants = {
  initial: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  hover: {
    y: -5,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const hoverVariants: Variants = {
  initial: {
    y: 30,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  hover: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

// Memoized static text component
const StaticGradientText = memo(() => (
  <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
    Favour
  </span>
));

StaticGradientText.displayName = "StaticGradientText";

// Memoized animated text content
const AnimatedContent = memo(({ isHovered }: { isHovered: boolean }) => (
  <AnimatePresence mode="wait" initial={false}>
    {!isHovered ? (
      <motion.span
        className="text-gray-400 dark:text-gray-600"
        initial="initial"
        animate="initial"
        exit="hover"
        variants={textVariants}
      >
        BAWA
      </motion.span>
    ) : (
      <motion.span
        className="flex items-center gap-2 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-transparent bg-clip-text"
        initial="initial"
        animate="hover"
        exit="initial"
        variants={hoverVariants}
      >
        <span>&apos;s</span>
        <span>Portfolio</span>
      </motion.span>
    )}
  </AnimatePresence>
));

AnimatedContent.displayName = "AnimatedContent";

export const EnhancedAnimatedText = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Delay mounting slightly to ensure proper hydration
    const timer = setTimeout(() => {
      setMounted(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  // Avoid layout shift during hydration
  if (!mounted) {
    return (
      <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
        <StaticGradientText />
      </h1>
    );
  }

  return (
    <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight flex items-center gap-4">
      <StaticGradientText />
      <div
        className="relative inline-flex items-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatedContent isHovered={isHovered} />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
    </h1>
  );
};

export default memo(EnhancedAnimatedText);