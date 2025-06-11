"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"

interface MoreAboutMeButtonProps {
  onClick?: () => void
  className?: string
}

export function MoreAboutMeButton({ onClick, className }: MoreAboutMeButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()

  // Theme-based colors
  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-white"
  const borderColor = theme === "dark" ? "border-yellow-400" : "border-yellow-600"
  const textColor = theme === "dark" ? "text-yellow-400" : "text-yellow-700"
  const arrowBgColor = theme === "dark" ? "#FFD600" : "#FFC107"
  const arrowBgHoverColor = theme === "dark" ? "#FFEA00" : "#FFB300"

  return (
    <motion.button
      className={cn(
        "relative flex items-center rounded-full border px-0 h-14 overflow-hidden",
        backgroundColor,
        borderColor,
        "transition-colors duration-300",
        className
      )}
      onClick={() => onClick?.()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{ minWidth: 220 }}
      type="button"
    >
      {/* Text section */}
      <span
        className={cn(
          "flex-1 flex items-center justify-center h-full px-8 font-bold text-base tracking-wide transition-colors duration-300",
          textColor
        )}
        style={{ letterSpacing: "0.04em" }}
      >
        MORE ABOUT ME
      </span>

      {/* Arrow section */}
      <motion.div
        className="flex items-center justify-center h-14 w-14 rounded-full transition-colors duration-300"
        animate={{
          backgroundColor: isHovered ? arrowBgHoverColor : arrowBgColor,
        }}
      >
        <ArrowRight className="w-6 h-6 text-white" />
      </motion.div>
    </motion.button>
  )
}
