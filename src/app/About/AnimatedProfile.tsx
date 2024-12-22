import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AnimatedProfileProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

export const AnimatedProfile: React.FC<AnimatedProfileProps> = ({ imageSrc, alt, className }) => {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
      <motion.div
        className="absolute inset-0 bg-primary/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

