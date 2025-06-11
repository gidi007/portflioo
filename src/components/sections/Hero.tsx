'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { motion, useAnimation, useTransform, useViewportScroll } from 'framer-motion';
import { getImageUrl } from '../../utils/image.ts';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const controls = useAnimation();
  const { scrollYProgress } = useViewportScroll();
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const slides = [
    {
      title: 'THE UNDERGROUND BASEMENT',
      subtitle: 'If you bad, pull up!',
      image: getImageUrl('assets/images/under')
    },
    {
      title: 'BASEMENT FRIDAY',
      subtitle: 'Experience the underground vibes',
      image: getImageUrl('images/hero-2.jpg')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMovement = (e: React.MouseEvent<HTMLDivElement>) => {
    const xOffset = (window.innerWidth / 2 - e.clientX) / 100;
    const yOffset = (window.innerHeight / 2 - e.clientY) / 100;
    void controls.start({
      x: xOffset,
      y: yOffset,
      transition: { type: 'spring', stiffness: 30 }
    });
  };

  return (
    <div
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={(e) => handleMouseMovement(e)}
    >
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ scale: 1.1 }}
          animate={{ scale: currentSlide === index ? 1 : 1.1 }}
          transition={{ duration: 1.5 }}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-6 bg-gradient-to-t from-black/80 to-transparent"
            style={{ y: parallax }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-yellow-400 text-5xl md:text-7xl font-bold tracking-wide drop-shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
              // style={{ x: controls.x, y: controls.y }}
            >
              {slide.title}
            </motion.h1>
            <motion.p
              className="text-yellow-300 text-xl md:text-3xl drop-shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1.2, ease: 'easeOut' }}
              // style={{ x: controls.x, y: controls.y }}
            >
              {slide.subtitle}
            </motion.p>
            <motion.button
              className="mt-8 px-8 py-4 rounded-full bg-yellow-400 text-black font-bold text-lg shadow-lg transition-transform duration-300 hover:scale-110"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      ))}

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-colors ${
              currentSlide === index
                ? 'bg-yellow-400 border-2 border-yellow-400 scale-110'
                : 'bg-transparent border-2 border-yellow-400'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.0 }}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Animated Overlay for Visual Impact */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
};

export default Hero;
