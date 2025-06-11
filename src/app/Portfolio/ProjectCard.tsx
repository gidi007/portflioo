"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { Project } from "../../Types/portfolio"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  onProjectClick: (project: Project) => void
  index: number
}

export function ProjectCard({ project, onProjectClick, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      onClick={() => onProjectClick(project)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative aspect-[4/3] rounded-2xl overflow-hidden",
          "bg-background-light dark:bg-background-darker",
          "shadow-lg hover:shadow-2xl",
          "transition-all duration-500",
          "border border-border-light dark:border-border-dark",
        )}
      >
        {/* Project Image */}
        <Image
          src={project.images[0].src || "/placeholder.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn("object-cover transition-transform duration-500", "group-hover:scale-110")}
        />

        {/* Hover Overlay */}
        <motion.div
          className={cn(
            "absolute inset-0",
            "bg-primary-500/90 dark:bg-primary-600/90",
            "flex items-center justify-center",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3
            className={cn("text-2xl lg:text-3xl font-bold text-white", "text-center px-6", "tracking-wide")}
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.title}
          </motion.h3>
        </motion.div>

        {/* Subtle border animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary-500/0"
          animate={{
            borderColor: isHovered ? "rgba(255, 165, 0, 0.5)" : "rgba(255, 165, 0, 0)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}
