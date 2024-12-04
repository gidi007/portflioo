/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Download, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { AnimatedBackground } from './animated-background';
import { SkillCard } from './skill-card';
import { TimelineCard } from './time-line-card';
import { ContactModal } from './contact-modal';
import { skills, personalInfo, stats, experience, education } from './data';

export default function About() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/FAVOUR BAWA - RESUME.pdf';
    link.download = 'FAVOUR BAWA - RESUME.pdf';
    link.click();
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <AnimatedBackground />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <section className="py-8 md:py-20 min-h-screen">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-16"
          >
            <SectionHeader title="ABOUT" highlight="ME" shadowText="RESUME" />
            <motion.div
              className="absolute -top-4 -right-4 text-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <Card className="p-6 space-y-6 bg-opacity-80 backdrop-blur-sm">
                <h3 className="text-xl md:text-2xl font-semibold flex items-center">
                  PERSONAL INFOS
                  <motion.span
                    className="ml-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    👋
                  </motion.span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(personalInfo).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      variants={fadeInUpVariants}
                      custom={index + 1}
                      className="group p-3 rounded-lg hover:bg-primary/5 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-sm text-muted-foreground capitalize">{key}:</span>
                      <span className="font-medium block">
                        {key === 'freelance' ? (
                          <span className="text-green-500">{value}</span>
                        ) : key === 'LinkedIn' ? (
                          <motion.span 
                            className="text-primary flex items-center cursor-pointer hover:underline"
                            whileHover={{ scale: 1.05 }}
                          >
                            View LinkedIn <ExternalLink className="ml-1 h-4 w-4" />
                          </motion.span>
                        ) : value}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => setIsContactOpen(true)}
                    className="flex-1"
                    size="lg"
                  >
                    Get in Touch
                  </Button>
                  <Button
                    onClick={handleDownloadCV}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                </div>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index + Object.keys(personalInfo).length + 1}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow bg-opacity-80 backdrop-blur-sm">
                    <motion.div
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.span 
                        className="block text-3xl font-bold text-primary mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                      >
                        {stat.value}
                      </motion.span>
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              MY SKILLS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {skills.map((skill, index) => (
                <SkillCard key={skill.label} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-6">EXPERIENCE</h2>
              <div className="space-y-6">
                {experience.map((item, index) => (
                  <TimelineCard key={item.title} item={item} direction="left" index={index} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-6">EDUCATION</h2>
              <div className="space-y-6">
                {education.map((item, index) => (
                  <TimelineCard key={item.title} item={item} direction="right" index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        personalInfo={personalInfo}
      />
    </>
  );
}

