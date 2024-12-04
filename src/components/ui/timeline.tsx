'use client'

import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

interface TimelineItemProps {
  date: string
  title: string
  organization: string
  description: string
}

export function TimelineItem({ date, title, organization, description }: TimelineItemProps) {
  return (
    <motion.div 
      className="flex gap-4 mb-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <Briefcase className="w-5 h-5" />
        </div>
      </div>
      <div>
        <span className="text-sm text-muted-foreground">{date}</span>
        <h3 className="text-lg font-semibold mt-1">
          {title} <span className="text-primary">— {organization}</span>
        </h3>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
    </motion.div>
  )
}

