'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Images } from 'lucide-react';
import { AnimatedProfile } from './AnimatedProfile';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import EnhancedAnimatedText from './animated-text';
import { EnhancedContactModal } from './ContactModal';
import { AboutModal } from '../Hero/about-modal';
import { cn } from '@/lib/utils';

const images = [
  { src: '/images/hero-modal/pic1.jpg', alt: 'Website with stunning layout', link: '#' },
  { src: '/images/hero-modal/pic2.jpg', alt: 'Website with impressive styling', link: '#' },
  { src: '/images/hero-modal/pic3.jpg', alt: 'Website with modern UI', link: '#' },
  { src: '/images/hero-modal/pic4.jpg', alt: 'Website with responsive design', link: '#' }
];

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  });

  const contentOpacity = useTransform(scaleProgress, [0, 0.2], [1, 0]);
  const contentY = useTransform(scaleProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white to-amber-50 dark:from-neutral-900 dark:to-neutral-800">
      {/* Diagonal split background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-600 dark:to-amber-700 transform -skew-y-6 origin-top-right" style={{ top: '40%' }} />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="min-h-screen pt-16 sm:pt-20 pb-12 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">
          {/* Content container */}
          <motion.div
            className="flex-1 max-w-xl w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0 lg:order-1"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="w-full"
            >
              <EnhancedAnimatedText />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="w-full space-y-4 sm:space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                FAVOUR BAWA
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-500 dark:text-amber-400">
                Web Designer
              </h2>

              <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-lg">
                I&apos;m a Nigerian based web designer & front-end developer focused on crafting clean & user-friendly experiences, I am passionate about building excellent software that improves the lives of those around me.
              </p>
            </motion.div>

            {/* Buttons container */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4"
              variants={itemVariants}
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                className={cn(
                  "h-14 sm:h-16 px-8 sm:px-10 rounded-full",
                  "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700",
                  "text-white shadow-lg hover:shadow-xl",
                  "transition-all duration-300 hover:scale-105 active:scale-98",
                  "font-medium text-base sm:text-lg"
                )}
              >
                <span className="mr-3">View Projects</span>
                <Images className="w-6 h-6" />
              </Button>

              <EnhancedContactModal 
                className={cn(
                  "h-14 sm:h-16 px-8 sm:px-10 rounded-full",
                  "bg-white/80 hover:bg-white dark:bg-neutral-800/80 dark:hover:bg-neutral-800",
                  "text-amber-500 dark:text-amber-400",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-300 hover:scale-105 active:scale-98",
                  "font-medium text-base sm:text-lg"
                )}
              />
            </motion.div>
          </motion.div>

          {/* Profile container */}
          <motion.div
            className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] xl:max-w-[450px] aspect-square flex-shrink-0 mb-6 sm:mb-8 lg:mb-0 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              type: 'spring',
              stiffness: 100,
              damping: 20
            }}
          >
            <AnimatedProfile
              onClick={() => setIsAboutModalOpen(true)}
              className="w-full h-full shadow-2xl rounded-3xl cursor-pointer hover:scale-105 transition-transform duration-300"
              imageSrc="/placeholder.png"
              alt="Your Profile"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        title="Project Gallery"
        description="Explore our latest projects and designs."
      />

      <AboutModal 
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

