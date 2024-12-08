/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface EnhancedSectionHeaderProps {
  titles: string[]
  highlight?: string
  shadowText: string
  className?: string
  autoAnimate?: boolean
  animationInterval?: number
}

export function EnhancedSectionHeader({
  titles,
  highlight,
  shadowText,
  className,
  autoAnimate = true,
  animationInterval = 5000,
}: EnhancedSectionHeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (autoAnimate) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length)
      }, animationInterval)

      return () => clearInterval(intervalId)
    }
  }, [autoAnimate, animationInterval, titles.length])

  const letterVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { y: -50, opacity: 0, transition: { duration: 0.8, ease: 'easeIn' } },
  }

  const shadowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 0.2, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 1, ease: 'easeIn' } },
  }

  const gradientVariants = {
    initial: { scaleX: 0 },
    animate: { scaleX: 1, transition: { duration: 1, ease: 'easeInOut' } },
  }

  return (
    <div
      className={cn(
        'relative text-center mb-12 overflow-hidden',
        autoAnimate ? '' : 'cursor-pointer',
        className
      )}
      onMouseEnter={() => !autoAnimate && setIsHovered(true)}
      onMouseLeave={() => !autoAnimate && setIsHovered(false)}
    >
      <div className="flex justify-center items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative h-[1.2em] flex"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Shadow Text */}
            <motion.div className="absolute inset-0 flex justify-center items-center">
              {shadowText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-muted-foreground/20"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
                  variants={shadowVariants}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Title Text */}
            <motion.div
              className="absolute inset-0 flex justify-center items-center"
              variants={letterVariants}
            >
              {titles[currentIndex].split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.7,
                    ease: 'easeInOut',
                    delay: index * 0.05,
                  }}
                >
                  {char}
                </motion.span>
              ))}
              {highlight && (
                <motion.span
                  className="text-primary ml-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: titles[currentIndex].length * 0.05 }}
                >
                  {highlight}
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        className="mt-2 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0"
        variants={gradientVariants}
        initial="initial"
        animate="animate"
      />
    </div>
  )
}
