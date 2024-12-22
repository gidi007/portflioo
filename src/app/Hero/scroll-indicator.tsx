import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator: React.FC = () => (
  <motion.div 
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronDown className="w-6 h-6 text-primary" />
    </motion.div>
    <motion.span 
      className="text-sm text-gray-500 dark:text-gray-400 mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      More about me!
    </motion.span>
  </motion.div>
);

