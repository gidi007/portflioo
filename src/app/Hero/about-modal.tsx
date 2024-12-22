'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { SkillCard } from '../About/skill-card';
import { TimelineCard } from '../About/time-line-card';
import { skills, personalInfo, stats, experience, education } from '../About/data';
import { AnimatedProfile } from '../About/AnimatedProfile';


const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/FAVOUR_BAWA_RESUME.pdf';
    link.download = 'FAVOUR_BAWA_RESUME.pdf';
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-2 md:inset-4 lg:inset-10 z-50 bg-background rounded-2xl shadow-xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Scrollable content */}
            <div className="h-full overflow-y-auto overflow-x-hidden px-4 md:px-6 py-6 md:py-8">
              <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <SectionHeader title="ABOUT" highlight="ME" shadowText="RESUME" />
                  <motion.div
                    className="absolute -top-4 -right-4 text-primary"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="h-8 w-8" />
                  </motion.div>
                </motion.div>

                {/* Personal Info and Stats */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" custom={0}>
                    <Card className="p-6 space-y-4 bg-opacity-80 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold flex items-center">
                        PERSONAL INFOS
                        <motion.span
                          className="ml-2"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          👋
                        </motion.span>
                      </h3>
                        <div className="flex justify-center mb-6">
                          <AnimatedProfile
                            imageSrc="/placeholder.png"
                            alt="Favour Bawa"
                            className="w-32 h-32 rounded-full"
                          />
                        </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(personalInfo).map(([key, value], index) => (
                          <motion.div
                            key={key}
                            variants={fadeInUpVariants}
                            custom={index + 1}
                            className="group p-3 rounded-lg hover:bg-primary/5 transition-colors"
                          >
                            <span className="text-sm text-muted-foreground capitalize">{key}:</span>
                            <span className="font-medium block">
                              {key === 'freelance' ? (
                                <span className="text-green-500">{value}</span>
                              ) : key === 'LinkedIn' ? (
                                <a
                                  href={value}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary flex items-center hover:underline"
                                >
                                  View LinkedIn <ExternalLink className="ml-1 h-4 w-4" />
                                </a>
                              ) : (
                                value
                              )}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      <Button
                        onClick={handleDownloadCV}
                        variant="outline"
                        className="w-full mt-4"
                        size="lg"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                      </Button>
                    </Card>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        variants={fadeInUpVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index + 1}
                      >
                        <Card className="p-4 hover:shadow-lg transition-shadow bg-opacity-80 backdrop-blur-sm">
                          <div className="text-center">
                            <span className="block text-2xl font-bold text-primary mb-1">
                              {stat.value}
                            </span>
                            <span className="text-sm text-muted-foreground">{stat.label}</span>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-center mb-6">MY SKILLS</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills.map((skill, index) => (
                      <SkillCard key={skill.label} skill={skill} index={index} />
                    ))}
                  </div>
                </motion.div>

                {/* Experience & Education */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">EXPERIENCE</h2>
                    <div className="space-y-4">
                      {experience.map((item, index) => (
                        <TimelineCard key={item.title} item={item} direction="left" index={index} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-4">EDUCATION</h2>
                    <div className="space-y-4">
                      {education.map((item, index) => (
                        <TimelineCard key={item.title} item={item} direction="right" index={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};