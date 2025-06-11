"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProfileImage } from "./ProfileImage"
import { MoreAboutMeButton } from "./MoreAboutMeButton"
import EnhancedAnimatedText from "./animated-text"
import { AboutModal } from "./about-modal"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false) // <-- Declare state here

  return (
    <div className={cn("relative min-h-screen", "bg-background dark:bg-background-dark", "overflow-hidden")}>
      {/* Diagonal Background */}
      <div className="absolute inset-0">
        {/* Desktop: Diagonal split */}
        <div className="hidden lg:block relative w-full h-full">
          {/* Yellow section (left) */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "var(--primary-500)",
              clipPath: "polygon(0 0, 45% 0, 35% 100%, 0 100%)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {/* White/Dark section (right) */}
          <div
            className={cn("absolute inset-0", "bg-background dark:bg-background-dark")}
            style={{
              clipPath: "polygon(35% 0, 100% 0, 100% 100%, 25% 100%)",
            }}
          />
        </div>

        {/* Mobile: Simple background */}
        <div className="lg:hidden absolute inset-0 bg-background dark:bg-background-dark" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className={cn("grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", "min-h-screen py-20 lg:py-0")}>
            {/* Profile Image */}
            <div className={cn("order-1 lg:order-1", "flex justify-center lg:justify-start")}>
              <ProfileImage imageSrc="/placeholder.png" alt="Favour Bawa" />
            </div>

            {/* Content */}
            <motion.div
              className={cn("order-2 lg:order-2", "text-center lg:text-left", "space-y-8 lg:space-y-10")}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Animated Title */}
              <div className="space-y-4">
                <motion.div
                  className="flex items-center justify-center lg:justify-start mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="w-12 h-0.5 bg-primary-500 dark:bg-primary-400 mr-4" />
                  <span
                    className={cn(
                      "text-sm lg:text-base font-medium tracking-wider uppercase",
                      "text-foreground-light dark:text-primary-400",
                    )}
                  >
                    I'M FAVOUR BAWA.
                  </span>
                </motion.div>

                <motion.h1
                  className={cn(
                    "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl",
                    "font-bold tracking-tight leading-tight",
                    "text-foreground dark:text-foreground-dark",
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  WEB DESIGNER
                </motion.h1>

                <EnhancedAnimatedText />
              </div>

              {/* Description */}
              <motion.p
                className={cn(
                  "text-lg lg:text-xl leading-relaxed",
                  "text-foreground-light dark:text-muted-dark",
                  "max-w-2xl mx-auto lg:mx-0",
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                I'm a Nigerian based web designer & front-end developer focused on crafting clean & user-friendly
                experiences, I am passionate about building excellent software that improves the lives of those around
                me.
              </motion.p>

              {/* More About Me Button */}
              <motion.div
                className="flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <MoreAboutMeButton onClick={() => setIsAboutModalOpen(true)} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* About Modal */}
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </div>
  )
}
