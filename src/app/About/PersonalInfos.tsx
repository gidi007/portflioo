"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { personalInfo } from "./data"
import { cn } from "@/lib/utils"

export function PersonalInfos() {
  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/FAVOUR BAWA - RESUME.pdf"
    link.download = "FAVOUR BAWA - RESUME.pdf"
    link.click()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const personalInfoItems = [
    { label: "First Name", value: personalInfo.firstName },
    { label: "Last Name", value: personalInfo.lastName },
    { label: "Age", value: personalInfo.age },
    { label: "Nationality", value: personalInfo.nationality },
    { label: "Freelance", value: personalInfo.freelance },
    { label: "Address", value: personalInfo.address },
    { label: "Phone", value: personalInfo.phone },
    { label: "Email", value: personalInfo.email },
    { label: "Skype", value: "favour.bawa" },
    { label: "Languages", value: personalInfo.languages },
  ]

  return (
    <div className="space-y-12">
      {/* Section Title */}
      <motion.h2
        className={cn("text-2xl lg:text-3xl font-bold", "text-foreground dark:text-foreground-dark", "mb-8")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        PERSONAL INFOS
      </motion.h2>

      {/* Personal Info Grid */}
      <motion.div
        className={cn(
          "grid grid-cols-2 gap-4",
          "sm:grid-cols-2 sm:gap-6",
          "lg:grid-cols-2 lg:gap-8"
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {personalInfoItems.map((item, index) => (
          <motion.div key={item.label} className="space-y-1" variants={itemVariants}>
            <span className={cn("text-sm font-medium", "text-foreground-light dark:text-muted-dark")}>
              {item.label}:
            </span>
            <div
              className={cn(
                "text-base lg:text-lg font-medium",
                "text-foreground dark:text-foreground-dark",
                item.label === "Freelance" && item.value === "AVAILABLE" && "text-green-500 dark:text-green-400"
              )}
            >
              {item.value}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Download CV Button */}
      <motion.div
        className="pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <button
          onClick={handleDownloadCV}
          className={cn(
            "relative overflow-hidden rounded-full",
            "flex items-center",
            "h-14 lg:h-16",
            "transition-all duration-300",
            "group",
          )}
        >
          {/* Background with animated fill */}
          <div className="relative flex items-center h-full">
            {/* Text section */}
            <div
              className={cn(
                "px-8 lg:px-10 h-full flex items-center",
                "border-2 rounded-l-full",
                "border-foreground-light dark:border-primary-600",
                "bg-transparent",
                "transition-all duration-300",
              )}
            >
              <span
                className={cn(
                  "text-sm lg:text-base font-medium tracking-wide",
                  "text-foreground dark:text-foreground-dark",
                  "transition-colors duration-300",
                )}
              >
                DOWNLOAD CV
              </span>
            </div>

            {/* Arrow section */}
            <div
              className={cn(
                "h-full w-14 lg:w-16 flex items-center justify-center",
                "rounded-r-full",
                "bg-primary-500 dark:bg-primary-600",
                "border-2 border-primary-500 dark:border-primary-600",
                "transition-all duration-300",
              )}
            >
              <Download className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
          </div>
        </button>
      </motion.div>
    </div>
  )
}