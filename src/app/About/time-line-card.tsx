import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface TimelineCardProps {
  item: {
    date: string;
    title: string;
    organization: string;
    description: string;
  };
  direction?: 'left' | 'right';
  index: number;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ item, direction = 'left', index }) => {
  const variants = {
    hidden: { opacity: 0, x: direction === 'left' ? -50 : 50, y: 20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-opacity-80 backdrop-blur-sm relative overflow-hidden group">
        <motion.div 
          className="absolute inset-0 bg-primary/10"
          initial={{ scaleY: 0 }}
          whileHover={{ scaleY: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="relative z-10">
          <motion.span 
            className="text-sm text-primary font-medium block mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {item.date}
          </motion.span>
          <motion.h3 
            className="text-lg font-semibold mb-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {item.title}
          </motion.h3>
          <motion.p 
            className="text-muted-foreground mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {item.organization}
          </motion.p>
          <motion.p 
            className="text-sm leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {item.description}
          </motion.p>
        </div>
      </Card>
    </motion.div>
  );
};

