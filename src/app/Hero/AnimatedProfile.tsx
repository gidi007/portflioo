/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
// Enhanced Animated Profile Component
interface AnimatedProfileProps {
  onClick?: () => void;
  className?: string;
  imageSrc: string;
  alt?: string;
}

export function AnimatedProfile({ 
  onClick, 
  className,
  imageSrc,
  alt = "Profile"
}: AnimatedProfileProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const profileVariants = {
    initial: { 
      scale: 0.9,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const borderVariants = {
    animate: {
      borderRadius: [
        "60% 40% 30% 70%/60% 30% 70% 40%",
        "30% 60% 70% 40%/50% 60% 30% 60%",
        "60% 40% 30% 70%/60% 30% 70% 40%"
      ]
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      variants={profileVariants}
      className={cn(
        "relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]",
        "mx-auto", // Center on mobile
        className
      )}
    >
      <motion.div
        className="w-full h-full rounded-full overflow-hidden cursor-pointer group"
        animate="animate"
        variants={borderVariants}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1
        }}
        style={{
          border: '4px solid',
          borderColor: 'rgba(var(--primary-rgb), 0.3)',
          boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.2)'
        }}
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-primary/20 dark:from-white/10 dark:to-primary/10 blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500" />
        
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
            priority
          />
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <span className="text-white text-lg md:text-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              View About Me
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}