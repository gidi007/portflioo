import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const EnhancedAnimatedText: React.FC = () => {
  const [isClient, setIsClient] = useState(false); // Ensure client-only rendering
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsClient(true); // Client-side only after hydration
  }, []);

  if (!isClient) {
    // Avoid mismatches by rendering static HTML initially
    return (
      <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Favour
        </span>
      </h1>
    );
  }

  return (
    <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight flex items-center gap-4">
      <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Favour
      </span>
      <div
        className="relative inline-flex items-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          {!isHovered && (
            <motion.span
              className="text-gray-400 dark:text-gray-600"
              initial="initial"
              animate="initial"
              exit="hover"
              variants={{
                initial: { y: 0, opacity: 1, scale: 1 },
                hover: {
                  y: -5,
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.4, ease: "easeInOut" },
                },
              }}
            >
              BAWA
            </motion.span>
          )}
          {isHovered && (
            <motion.span
              className="flex items-center gap-2 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-transparent bg-clip-text"
              initial="initial"
              animate="hover"
              exit="initial"
              variants={{
                initial: { y: 30, opacity: 0, scale: 0.9 },
                hover: {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.4, ease: "easeInOut" },
                },
              }}
            >
              <span>&apos;s</span>
              <span>Portfolio</span>
            </motion.span>
          )}
        </AnimatePresence>
        <motion.div
          className="h-0.5 mt-1 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
    </h1>
  );
};
