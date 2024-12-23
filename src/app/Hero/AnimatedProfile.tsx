'use client'

import React, { useState, useCallback } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  }, [mouseX, mouseY]);

  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setIsTouched(false), 150);
  }, []);

  const resetMousePosition = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const profileVariants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      y: 20
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={profileVariants}
      className={cn(
        "relative w-full h-full",
        "perspective-1000",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        resetMousePosition();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          rotateX,
          rotateY
        }}
      >
        <motion.div
          className={cn(
            "w-full h-full relative overflow-hidden cursor-pointer",
            "transform-gpu backface-hidden",
            "rounded-full lg:rounded-2xl", // Circular on mobile, rounded corners on desktop
            "ring-4 ring-neutral-200/50 dark:ring-neutral-800/50", // Subtle ring effect
            "bg-gradient-to-br from-neutral-50 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" // Gradient background
          )}
          animate={{
            scale: isHovered || isTouched ? 1.02 : 1,
            boxShadow: isHovered || isTouched 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 8px 24px -8px rgba(0, 0, 0, 0.15)' 
              : '0 20px 40px -12px rgba(0, 0, 0, 0.2), 0 4px 16px -8px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ 
            duration: 0.4,
            type: "spring",
            stiffness: 200
          }}
          onClick={onClick}
        >
          <motion.div
            className="relative w-full h-full transform-gpu"
            animate={{
              scale: isHovered || isTouched ? 1.03 : 1
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={imageSrc}
                alt={alt}
                fill
                sizes="(max-width: 640px) 230px, (max-width: 1024px) 320px, 45vw"
                className={cn(
                  "object-contain lg:object-cover transition-all duration-500",
                  "transform-gpu backface-hidden"
                )}
                priority
              />
            </div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isHovered || isTouched ? 1 : 0,
                y: isHovered || isTouched ? 0 : 10
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <motion.span
                className={cn(
                  "absolute left-1/2 bottom-8 -translate-x-1/2",
                  "text-white text-lg sm:text-xl font-semibold",
                  "whitespace-nowrap tracking-wide"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isHovered || isTouched ? 1 : 0,
                  y: isHovered || isTouched ? 0 : 10
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.1
                }}
              >
                View About Me
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

