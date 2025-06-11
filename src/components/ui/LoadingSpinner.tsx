"use client"

import type React from "react"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: string
  className?: string
}

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", color = "text-yellow-400", className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <motion.div
        className={`${sizeMap[size]} ${color}`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-current"
          />
        </svg>
      </motion.div>
    </div>
  )
}

export default LoadingSpinner

