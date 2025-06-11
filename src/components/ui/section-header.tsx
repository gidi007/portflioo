"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  shadowText: string
  highlight?: string
  interval?: number
  className?: string
}

export const SectionHeader = ({
  title,
  shadowText,
  highlight,
  interval = 3000,
  className = "",
}: SectionHeaderProps) => {
  const [isActive, setIsActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      const timer = setInterval(() => {
        setIsActive((prev) => !prev)
      }, interval)
      return () => clearInterval(timer)
    }
  }, [interval, isMobile])

  const handleInteraction = useCallback(() => {
    if (isMobile) {
      setIsActive((prev) => !prev)
    }
  }, [isMobile])

  const variants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      y: -30,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  }

  return (
    <div
      className={cn("relative select-none text-center", className)}
      onClick={handleInteraction}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleInteraction()}
    >
      <div className="relative h-32 lg:h-40 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={isActive ? "title" : "shadow"}
            className="absolute inset-0 flex items-center justify-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2
              className={cn(
                "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight",
                isActive
                  ? "text-foreground dark:text-foreground-dark"
                  : "text-muted-light dark:text-muted-dark",
              )}
            >
              {(isActive ? title : shadowText).split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              {isActive && highlight && (
                <motion.span
                  className="text-primary-500 dark:text-primary-400 ml-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {highlight}
                </motion.span>
              )}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SectionHeader