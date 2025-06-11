"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectCard } from "./ProjectCard"
import { ProjectModal } from "./ProjectModal"
import { type Project, projects, categories } from "../../Types/portfolio"
import { cn } from "@/lib/utils"

export default function PortfolioSection() {
  const [filter, setFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category.includes(filter))

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.section
      className={cn("min-h-screen", "bg-background dark:bg-background-dark", "py-20 lg:py-32")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <SectionHeader title="MY" highlight="PORTFOLIO" shadowText="WORK" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={cn(
                "px-6 py-3 text-sm lg:text-base font-medium",
                "rounded-full transition-all duration-300",
                "border-2",
                filter === category
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-transparent text-foreground dark:text-foreground-dark border-border-light dark:border-border-dark hover:border-primary-500 dark:hover:border-primary-400",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
            </motion.div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              key="projects"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} onProjectClick={setSelectedProject} index={index} />
              ))}
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
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </motion.section>
  )
}
