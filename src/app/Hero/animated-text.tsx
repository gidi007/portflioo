import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Define animation variants
const textVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

const underlineVariants: Variants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  exit: { scaleX: 0 },
};

// Memoized gradient text
const StaticGradientText = memo(() => (
  <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
    Favour
  </span>
));

StaticGradientText.displayName = "StaticGradientText";

// Memoized animated text component
const AnimatedContent = memo(({ text, className }: { text: string; className: string }) => (
  <motion.span
    className={className}
    initial="initial"
    animate="animate"
    exit="exit"
    variants={textVariants}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {text}
  </motion.span>
));

AnimatedContent.displayName = "AnimatedContent";

export const EnhancedAnimatedText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const texts = [
    { content: "BAWA", className: "text-gray-400 dark:text-gray-600" },
    { content: "'s Portfolio", className: "bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-transparent bg-clip-text" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight flex items-center gap-4">
      <StaticGradientText />
      <div className="relative inline-flex items-center">
        <AnimatePresence mode="wait">
          <AnimatedContent
            key={currentIndex}
            text={texts[currentIndex].content}
            className={texts[currentIndex].className}
          />
        </AnimatePresence>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"
          variants={underlineVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
    </h1>
  );
};

export default memo(EnhancedAnimatedText);
