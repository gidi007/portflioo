import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Download, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { SkillCard } from './skill-card';
import { TimelineCard } from './time-line-card';
import { ContactModal } from './contact-modal';
import { AnimatedProfile } from './AnimatedProfile';
import { skills, personalInfo, stats, experience, education } from './data';
import { cn } from '@/lib/utils';

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

const About: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('info');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownloadCV = () => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = '/FAVOUR BAWA - RESUME.pdf';
      link.download = 'FAVOUR BAWA - RESUME.pdf';
      link.click();
    }
  };

  if (!isClient) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <motion.section 
        className="min-h-screen bg-gradient-to-b from-background to-background-light dark:from-background-dark dark:to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Header Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="relative mb-12 md:mb-20"
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

          {/* Mobile Tab Navigation */}
          <div className="md:hidden mb-8 grid grid-cols-3 gap-2">
            {['info', 'skills', 'timeline'].map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? 'default' : 'outline'}
                onClick={() => setActiveSection(section)}
                className="w-full capitalize text-sm py-2 px-3"
              >
                {section}
              </Button>
            ))}
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Info Section */}
            <motion.div 
              className={cn(activeSection !== 'info' && 'hidden md:block')}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
            >
              <div className="grid md:grid-cols-12 gap-8">
                {/* Personal Info Card */}
                <Card className="md:col-span-7 p-8 space-y-6 bg-card">
                  <h3 className="text-2xl font-semibold flex items-center text-card-foreground">
                    PERSONAL INFOS
                    <motion.span
                      className="ml-2"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👋
                    </motion.span>
                  </h3>
                  
                  {/* AnimatedProfile component */}
                  <div className="flex justify-center mb-8">
                    <AnimatedProfile
                      imageSrc="/placeholder.png"
                      alt="Favour Bawa"
                      className="w-40 h-40 rounded-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.entries(personalInfo).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        variants={fadeInUpVariants}
                        custom={index}
                        className="group p-4 rounded-lg hover:bg-accent transition-colors duration-300"
                      >
                        <span className="text-sm text-muted-foreground capitalize">{key}:</span>
                        <span className="font-medium block text-card-foreground mt-1">
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

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      onClick={() => setIsContactOpen(true)}
                      className="flex-1 text-base font-semibold"
                      size="lg"
                    >
                      Get in Touch
                    </Button>
                    <Button
                      onClick={handleDownloadCV}
                      variant="outline"
                      className="flex-1 text-base font-semibold"
                      size="lg"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download CV
                    </Button>
                  </div>
                </Card>

                {/* Stats Grid */}
                <div className="md:col-span-5 grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={fadeInUpVariants}
                      custom={index}
                    >
                      <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-card">
                        <div className="text-center">
                          <motion.span
                            className="block text-3xl md:text-4xl font-bold text-primary mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * (index + 1) }}
                          >
                            {stat.value}
                          </motion.span>
                          <span className="text-sm text-muted-foreground">{stat.label}</span>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div 
              className={cn(activeSection !== 'skills' && 'hidden md:block')}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
            >
              <Card className="p-8 bg-card">
                <h2 className="text-2xl font-bold mb-8 text-card-foreground">MY SKILLS</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {skills.map((skill, index) => (
                    <SkillCard key={skill.label} skill={skill} index={index} />
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Timeline Section */}
            <motion.div 
              className={cn(activeSection !== 'timeline' && 'hidden md:block')}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8 bg-card">
                  <h2 className="text-2xl font-semibold mb-8 text-card-foreground">EXPERIENCE</h2>
                  <div className="space-y-6">
                    {experience.map((item, index) => (
                      <TimelineCard key={item.title} item={item} direction="left" index={index} />
                    ))}
                  </div>
                </Card>

                <Card className="p-8 bg-card">
                  <h2 className="text-2xl font-semibold mb-8 text-card-foreground">EDUCATION</h2>
                  <div className="space-y-6">
                    {education.map((item, index) => (
                      <TimelineCard key={item.title} item={item} direction="right" index={index} />
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        personalInfo={personalInfo}
      />
    </>
  );
};

export default About;

