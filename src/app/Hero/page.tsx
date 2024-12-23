/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Images } from 'lucide-react';
import { AnimatedProfile } from './AnimatedProfile';
import { Button } from '@/components/ui/button';
import EnhancedAnimatedText from './animated-text';
import { EnhancedContactModal } from './ContactModal';
import { AboutModal } from '../Hero/about-modal';
import { cn } from '@/lib/utils';
import { ContactModal } from '../About/contact-modal';

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
    <div className="relative min-h-screen bg-white dark:bg-neutral-900">
      <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 max-w-[1400px]">
        <div className="min-h-screen py-16 sm:py-20 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-20">
          {/* Profile container - Appears first on mobile */}
          <motion.div
              className="w-[min(100%,230px)] sm:w-[320px] lg:w-[45%] aspect-square lg:aspect-auto lg:h-[calc(100vh-12rem)] max-h-[800px] flex-shrink-0 order-1 lg:order-1"
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
              className="w-full h-full"
              imageSrc="/placeholder.png"
              alt="Your Profile"
            />
          </motion.div>

          {/* Content container */}
          <motion.div
            className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-2 lg:order-2"
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
              className="w-full space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                FAVOUR BAWA
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-500 dark:text-amber-400">
                Web Designer
              </h2>

              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                I&apos;m a Nigerian based web designer & front-end developer focused on crafting clean & user-friendly experiences, I&apos;m passionate about building excellent software that improves the lives of those around me.
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
                  "h-12 sm:h-14 px-6 sm:px-8",
                  "rounded-full sm:rounded-lg",
                  "bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600",
                  "text-white",
                  "shadow-lg hover:shadow-xl",
                  "ring-2 ring-amber-500/20 hover:ring-amber-600/20",
                  "transition-all duration-300 hover:scale-105 active:scale-98",
                  "font-medium text-base"
                )}
              >
                <span className="mr-3">View Projects</span>
                <Images className="w-5 h-5" />
              </Button>

              <EnhancedContactModal 
                className={cn(
                  "h-12 sm:h-14 px-6 sm:px-8",
                  "rounded-full sm:rounded-lg",
                  "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700",
                  "text-neutral-900 dark:text-amber-400",
                  "shadow-lg hover:shadow-xl",
                  "ring-2 ring-neutral-200/50 dark:ring-neutral-700/50",
                  "transition-all duration-300 hover:scale-105 active:scale-98",
                  "font-medium text-base"
                )}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
           

      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-primary text-white rounded-xl"
      >
        Contact Me
      </motion.button>

      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} personalInfo={{
          email: '',
          linkedIn: '',
          github: '',
          twitter: ''
        }}      />

      <AboutModal 
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

