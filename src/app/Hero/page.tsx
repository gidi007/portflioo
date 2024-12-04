'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Download, Send, Linkedin, Github, Twitter, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AnimatedProfile from '../Hero/AnimatedProfile';
import Modal from '../Hero/Modal';
import { useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';

const images = [
  { src: '/path-to-image-1.jpg', alt: 'Image 1 description', link: 'https://example.com/1' },
  { src: '/path-to-image-2.jpg', alt: 'Image 2 description', link: 'https://example.com/2' },
  { src: '/path-to-image-3.jpg', alt: 'Image 3 description', link: 'https://example.com/3' },
];

const SocialLinks = () => {
  const socialLinks = [
    { 
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/favourbawa",
      color: "bg-blue-100/80 dark:bg-blue-900/30",
      hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-900/50",
      iconColor: "text-blue-600 dark:text-blue-300",
      name: "LinkedIn"
    },
    { 
      Icon: Github,
      href: "https://github.com/FavourB",
      color: "bg-gray-100/80 dark:bg-gray-900/30",
      hoverColor: "hover:bg-gray-200 dark:hover:bg-gray-900/50",
      iconColor: "text-gray-800 dark:text-gray-300",
      name: "GitHub"
    },
    { 
      Icon: Twitter,
      href: "https://www.upwork.com/freelancers/~01a6f25e401b07c37c",
      color: "bg-sky-100/80 dark:bg-sky-900/30",
      hoverColor: "hover:bg-sky-200 dark:hover:bg-sky-900/50",
      iconColor: "text-sky-600 dark:text-sky-300",
      name: "Twitter"
    }
  ];

  return (
    <motion.div 
      className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      {socialLinks.map(({ Icon, href, color, hoverColor, iconColor, name }) => (
        <motion.a 
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${color} ${hoverColor}
            rounded-2xl p-3 sm:p-4 flex items-center justify-center
            transition-all duration-300
            hover:scale-110 hover:shadow-lg group
            relative overflow-hidden backdrop-blur-sm
          `}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={name}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor} relative z-10`} />
          <span className="sr-only">{name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

const ScrollIndicator = () => (
  <motion.div 
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2 }}
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <ChevronDown className="w-6 h-6 text-primary" />
    </motion.div>
    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">see more about me!    </span>
  </motion.div>
);

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const { isOpen, openModal, closeModal } = useModal();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(scaleProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scaleProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Enhanced Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Text Content */}
          <motion.div 
            className="flex-1 flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left mt-16 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
              Favour <span className="text-primary relative inline-block">
                Bawa
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Frontend Developer
            </h2>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              Crafting elegant, user-centric web experiences that blend creativity with cutting-edge technology.
            </p>
             

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button
               
               onClick={() => openModal()}
                className="flex-1 h-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Get In Touch</span>
                <Send className="w-4 h-4 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300"
                asChild
              >
                <a href="/FAVOUR BAWA - RESUME.pdf" download>
                  <span>Download CV</span>
                  <Download className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <SocialLinks />
          </motion.div>
          
          {/* Profile Image */}
          {!isSmallScreen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 relative max-w-xl"
            >
              <div className="relative group cursor-pointer">
                <AnimatedProfile 
                  onClick={() => router.push('/About')}
                  className="w-full h-auto shadow-2xl rounded-3xl transition-transform duration-500 group-hover:scale-105"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
            </motion.div>
          )}
        </div>

        <ScrollIndicator />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <Modal 
            isOpen={isOpen} 
            onClose={closeModal}
            title="Project Gallery"
            description="Explore our latest projects and designs."
            images={images}
          />
        )}
      </AnimatePresence>
    </div>
  );
}