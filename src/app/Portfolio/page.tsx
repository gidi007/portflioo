'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink, Star } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { AnimatedBackground } from './AnimatedBackground';
import { ProjectModal } from './ProjectModal';
import { Project, projects, categories } from '../../Types/portfolio';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

export default function AdvancedPortfolioSection() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      <LayoutGroup>
        <motion.section 
          className="relative min-h-screen py-20 md:py-32 bg-gradient-to-b from-background to-background-light dark:from-background-dark dark:to-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedBackground />
          
          <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SectionHeader
              title="MY"
              highlight="PORTFOLIO"
              shadowText="WORK"
            />

            <div className="overflow-x-auto pb-6 mb-10">
              <motion.div 
                className="flex space-x-3 md:space-x-5 min-w-max"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={cn(
                      "px-5 py-2 text-lg font-bold transition-all duration-300 border-b-2",
                      filter === category 
                        ? "text-primary border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-64"
                >
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                </motion.div>
              ) : filteredProjects.length > 0 ? (
                <motion.div 
                  key="projects"
                  layout 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence>
                    {filteredProjects.map(project => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        setSelectedProject={setSelectedProject}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div 
                  key="no-projects"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 text-muted-foreground"
                >
                  No projects found in this category.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <ProjectModal 
            project={selectedProject} 
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </motion.section>
      </LayoutGroup>
    </TooltipProvider>
  );
}

function ProjectCard({ project, setSelectedProject }: { project: Project, setSelectedProject: (project: Project) => void }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card 
        className="overflow-hidden h-full flex flex-col cursor-pointer transition-shadow duration-300 hover:shadow-xl"
        onClick={() => setSelectedProject(project)}
      >
        <div className="relative aspect-video">
          <Image
            src={project.images[0].src}
            alt={`${project.title} - Screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span>{project.clientSatisfaction}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map(tech => (
              <Tooltip key={tech.name}>
                <TooltipTrigger asChild>
                  <Badge variant="secondary">{tech.name}</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {tech.description || 'No additional information'}
                </TooltipContent>
              </Tooltip>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline">+{project.technologies.length - 3}</Badge>
            )}
          </div>

          <div className="flex gap-3 mt-auto">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.upworkLink, '_blank');
              }}
              className="flex-1 text-xs"
              variant="default"
            >
              <ExternalLink size={14} className="mr-1" />
              Upwork
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 text-xs"
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

