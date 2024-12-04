'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  highlight?: string
  shadowText: string
  className?: string
}

export function SectionHeader({
  title,
  highlight,
  shadowText,
  className
}: SectionHeaderProps) {
  const [isHovered, setIsHovered] = useState(false)

  const letterVariants = {
    initial: { y: 0, opacity: 1 },
    hover: { 
      y: -30, 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: {
      y: 30,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }

  const titleVariants = {
    initial: { y: 30, opacity: 0 },
    hover: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut", delay: 0.1 }
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }

  return (
    <div 
      className={cn("relative text-center mb-12 overflow-hidden cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={isHovered ? "title" : "shadow"}
            className="relative h-[1.2em]"
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            exit="exit"
          >
            <motion.div
              className="absolute inset-0 flex justify-center items-center"
              variants={letterVariants}
            >
              {shadowText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-muted-foreground/20"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              className="absolute inset-0 flex justify-center items-center"
              variants={titleVariants}
            >
              <span className="text-foreground">{title}</span>
              {highlight && (
                <span className="text-primary ml-2">{highlight}</span>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        className="mt-2 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

