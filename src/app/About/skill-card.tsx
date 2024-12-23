import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CircularProgress } from '@/components/ui/circular-progress';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  skill: {
    label: string;
    value: number;
  };
  index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: index * 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
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
      className="group"
    >
      <Card className={cn(
        "p-6 transition-all duration-300",
        "shadow-md hover:shadow-xl",
        "bg-card dark:bg-card",
        "backdrop-blur-sm"
      )}>
        <div className="relative">
          <CircularProgress value={skill.value} label={skill.label} />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
          >
            <div className={cn(
              "text-center",
              "p-2 rounded-lg"
            )}>
              <motion.p 
                className="text-2xl font-bold text-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {skill.value}%
              </motion.p>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

