'use client'
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Download, Images } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AnimatedProfile } from '../Hero/AnimatedProfile';
import Modal from '../Hero/Modal';
import { Button } from '@/components/ui/button';
import { SocialLinks } from './social-links';
import { ScrollIndicator } from './scroll-indicator';
import { EnhancedAnimatedText } from './animated-text';

const images = [
  { src: '/images/hero-modal/pic1.jpg', alt: 'Website with stunning layout', link: '#' },
  { src: '/images/hero-modal/pic2.jpg', alt: 'Website with impressive styling', link: '#' },
];

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { scrollYProgress } = useScroll();

  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const backgroundY = useTransform(scaleProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scaleProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-background/90 dark:from-gray-900 dark:to-black">
      {isMounted && (
        <>
          {/* Parallax Background */}
          <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY, opacity }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 min-h-screen">
              {/* Left Section */}
              <motion.div
                className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <EnhancedAnimatedText />

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-200">
                  Frontend Developer
                </h2>

                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                  Crafting elegant, user-centric web experiences that blend creativity with cutting-edge technology.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 h-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <span>Gallery</span>
                    <Images className="w-4 h-4 ml-2" />
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300"
                    asChild
                  >
                    <a href="/FAVOUR_BAWA_RESUME.pdf" download>
                      <span>Download CV</span>
                      <Download className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>

                <SocialLinks />
              </motion.div>

              {/* Right Section */}
              <motion.div
                className="flex-1 relative max-w-xl hidden lg:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <AnimatedProfile
                  onClick={() => router.push('/About')}
                  className="w-full h-auto shadow-2xl rounded-3xl transition-transform duration-500 group-hover:scale-105"
                  imageSrc="/placeholder.png"
                  alt="Your Profile"
                />
              </motion.div>
            </div>

            <ScrollIndicator />
          </div>

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            images={images}
            title="Project Gallery"
            description="Explore our latest projects and designs."
          />
        </>
      )}
    </div>
  );
}
