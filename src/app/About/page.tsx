"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { PersonalInfos } from "./PersonalInfos"
import { StatsGrid } from "./StatsGrid"
import { SkillsSection } from "./SkillsSection"
import { TimelineSection } from "./TimelineSection"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
}

const About: React.FC = () => {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isClient) return null

  return (
    <AnimatePresence mode="wait">
      <motion.section
        className={cn("min-h-screen", "bg-background dark:bg-background-dark", "py-12 lg:py-32")}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="container mx-auto px-4 lg:px-12 max-w-7xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-12 lg:mb-20"
          >
            <SectionHeader title="ABOUT" highlight="ME" shadowText="RESUME" />
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-16 lg:space-y-32">
            {/* Personal Info and Stats */}
            <div className={cn("grid gap-8 lg:gap-20", isMobile ? "grid-cols-1" : "lg:grid-cols-3")}>
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center mb-6"
                >
                  <div
                    className={cn(
                      "w-32 h-32 overflow-hidden rounded-full border-4",
                      theme === "dark" ? "border-primary-400" : "border-primary-500"
                    )}
                  >
                    <img
                      src="/placeholder.png" // Replace with actual image path
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}
              <div className={cn("lg:col-span-2", isMobile && "order-1")}>
                <PersonalInfos />
              </div>
              <div className={cn("lg:col-span-1", isMobile && "order-2")}>
                <StatsGrid />
              </div>
            </div>

            {/* Skills Section */}
            <SkillsSection />

            {/* Timeline Section */}
            <TimelineSection />
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

export default About