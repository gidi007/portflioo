import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CircularProgress } from '@/components/ui/circular-progress';

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
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="p-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/5 bg-opacity-80 backdrop-blur-sm">
        <div className="relative">
          <CircularProgress value={skill.value} label={skill.label} />
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-center bg-background/80 backdrop-blur-sm p-2 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                Proficiency Level
              </p>
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

