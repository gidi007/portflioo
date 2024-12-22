'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const EnhancedBackground: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      mouseX.set(clientX / width - 0.5);
      mouseY.set(clientY / height - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      style={{ y, opacity }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], ['-5%', '5%']),
          y: useTransform(mouseY, [-0.5, 0.5], ['-5%', '5%']),
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 50%)`,
          x: useTransform(mouseX, [-0.5, 0.5], ['10%', '-10%']),
          y: useTransform(mouseY, [-0.5, 0.5], ['10%', '-10%']),
        }}
      />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.05), transparent)',
          x: useTransform(mouseX, [-0.5, 0.5], ['-20%', '20%']),
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(var(--secondary-rgb), 0.05), transparent)',
          y: useTransform(mouseY, [-0.5, 0.5], ['-20%', '20%']),
        }}
      />
    </motion.div>
  );
};

export default EnhancedBackground;
