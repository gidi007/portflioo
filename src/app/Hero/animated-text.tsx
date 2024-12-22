'use client';

import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const titleVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    } 
  },
  exit: { 
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: { 
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    } 
  },
};

const letterVariants = {
  initial: { opacity: 0, y: 10 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.02,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  })
};

type AnimatedTitleProps = {
  text: string;
  className?: string;
};

const AnimatedTitle = memo(({ text, className = "" }: AnimatedTitleProps) => (
  <motion.div
    className={`${className} overflow-hidden whitespace-nowrap`}
    variants={titleVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        custom={index}
        variants={letterVariants}
        initial="initial"
        animate="animate"
        className="inline-block"
        style={{
          marginLeft: char === " " ? "0.2em" : "0.02em",
          marginRight: char === " " ? "0.2em" : "0.02em"
        }}
      >
        {char}
      </motion.span>
    ))}
  </motion.div>
));

AnimatedTitle.displayName = "AnimatedTitle";

const EnhancedAnimatedText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const titles = [
    {
      content: "Creative Technologist",
      className: "bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent"
    },
    {
      content: "Frontend Architect",
      className: "bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent"
    },
    {
      content: "UI/UX Engineer",
      className: "bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent"
    },
    {
      content: "Full Stack Developer",
      className: "bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className="w-full">
      <div className="relative flex flex-col items-center lg:items-start">
        <div className="relative h-[40px] sm:h-[48px] lg:h-[56px] overflow-hidden w-full">
          <AnimatePresence mode="wait">
            <AnimatedTitle
              key={currentIndex}
              text={titles[currentIndex].content}
              className={`${titles[currentIndex].className} text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight absolute left-0 right-0 text-center lg:text-left`}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default memo(EnhancedAnimatedText);