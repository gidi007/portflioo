"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"
import { experience, education } from "./data"
import { cn } from "@/lib/utils"

interface TimelineItemProps {
  item: {
    date: string
    title: string
    organization: string
    description: string
  }
  icon: React.ElementType
  index: number
}

function TimelineItem({ item, icon: Icon, index }: TimelineItemProps) {
  return (
    <motion.div
      className="flex gap-6 mb-12 last:mb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.2 + index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
    >
      {/* Icon */}
      <motion.div
        className={cn(
          "flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14",
          "rounded-full",
          "bg-primary-500 dark:bg-primary-600",
          "flex items-center justify-center",
          "shadow-lg",
        )}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.4 + index * 0.1,
          duration: 0.5,
          type: "spring",
          stiffness: 200,
        }}
      >
        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="flex-1 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
      >
        {/* Date */}
        <span className={cn("text-sm font-medium", "text-primary-500 dark:text-primary-400")}>{item.date}</span>

        {/* Title and Organization */}
        <div>
          <h3 className={cn("text-lg lg:text-xl font-bold", "text-foreground dark:text-foreground-dark", "mb-1")}>
            {item.title}
          </h3>
          <p className={cn("text-base font-medium", "text-foreground-light dark:text-muted-dark")}>
            {item.organization}
          </p>
        </div>

        {/* Description */}
        <p className={cn("text-sm lg:text-base leading-relaxed", "text-foreground-light dark:text-muted-dark")}>
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function TimelineSection() {
  return (
    <div className="space-y-16">
      {/* Section Title */}
      <motion.h2
        className={cn("text-2xl lg:text-3xl font-bold text-center", "text-foreground dark:text-foreground-dark")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        EXPERIENCE & EDUCATION
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
        {/* Experience */}
        <div>
          <motion.h3
            className={cn("text-xl lg:text-2xl font-bold mb-8", "text-foreground dark:text-foreground-dark")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Experience
          </motion.h3>

          <div className="space-y-0">
            {experience.map((item, index) => (
              <TimelineItem key={item.title} item={item} icon={Briefcase} index={index} />
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <motion.h3
            className={cn("text-xl lg:text-2xl font-bold mb-8", "text-foreground dark:text-foreground-dark")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Education
          </motion.h3>

          <div className="space-y-0">
            {education.map((item, index) => (
              <TimelineItem key={item.title} item={item} icon={GraduationCap} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
