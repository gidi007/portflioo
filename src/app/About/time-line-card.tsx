import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    },
    exit: {
      opacity: 0,
      x: direction === 'left' ? -50 : 50,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <Card className={cn(
        "p-6 transition-all duration-300",
        "shadow-md hover:shadow-xl",
        "bg-card dark:bg-card",
        "backdrop-blur-sm",
        "relative overflow-hidden"
      )}>
        <div className="relative z-10">
          <motion.span 
            className="text-sm text-primary font-medium block mb-2"
            layout
          >
            {item.date}
          </motion.span>
          <motion.h3 
            className="text-lg font-semibold mb-1 text-foreground"
            layout
          >
            {item.title}
          </motion.h3>
          <motion.p 
            className="text-muted-foreground mb-2"
            layout
          >
            {item.organization}
          </motion.p>
          <motion.p 
            className="text-sm leading-relaxed text-foreground"
            layout
          >
            {item.description}
          </motion.p>
        </div>
      </Card>
    </motion.div>
  );
};

