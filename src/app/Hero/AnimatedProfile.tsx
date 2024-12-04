import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedProfileProps {
  onClick?: () => void;
  className?: string;
}

const AnimatedProfile: React.FC<AnimatedProfileProps> = ({ onClick, className }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] 
                 rounded-full overflow-hidden cursor-pointer group ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%/60% 30% 70% 40%",
          "30% 60% 70% 40%/50% 60% 30% 60%",
          "60% 40% 30% 70%/60% 30% 70% 40%"
        ]
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1
      }}
      style={{
        border: '4px solid',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-primary/20 
                    dark:from-white/10 dark:to-primary/10 blur-2xl opacity-50 
                    group-hover:opacity-75 transition-all duration-500" />
      
      <motion.div
        className="relative w-full h-full shadow-2xl"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <Image
          src="/placeholder.png"
          alt="Profile"
          fill
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
          className="object-cover transition-all duration-500 
                   group-hover:scale-105 group-hover:brightness-110"
          priority
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent 
                     opacity-0 group-hover:opacity-100 transition-all duration-500 
                     flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <span className="text-white text-lg md:text-xl font-semibold 
                         transform translate-y-4 group-hover:translate-y-0 
                         transition-all duration-500">
            View About Me
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedProfile;