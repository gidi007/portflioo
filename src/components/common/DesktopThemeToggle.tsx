"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"

interface DesktopThemeToggleProps {
  className?: string
}

export function DesktopThemeToggle({ className }: DesktopThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.div
      className={cn(
        "hidden lg:flex items-center gap-3 fixed top-6 right-6 z-40",
        "px-4 py-2.5 rounded-full",
        "bg-white/5 dark:bg-black/10 backdrop-blur-xl",
        "border border-white/10 dark:border-white/5",
        "shadow-xl shadow-black/5 dark:shadow-black/20",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ 
        scale: 1.02,
        backgroundColor: "rgba(255,255,255,0.08)"
      }}
    >
      {/* Theme label */}
      <motion.div
        className={cn(
          "text-xs uppercase font-bold tracking-widest",
          "text-foreground/70 dark:text-white/70",
          "select-none transition-colors duration-300"
        )}
        animate={{
          color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"
        }}
      >
        {theme === "dark" ? "DARK" : "LIGHT"}
      </motion.div>

      {/* Toggle switch */}
      <motion.button
        onClick={toggleTheme}
        className={cn(
          "relative w-12 h-6 rounded-full p-0.5",
          "bg-white/10 dark:bg-white/5",
          "border border-white/20 dark:border-white/10",
          "transition-all duration-300 focus:outline-none",
          "hover:border-primary-400/50 dark:hover:border-primary-400/30"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Switch track */}
        <motion.div
          className="absolute inset-0.5 rounded-full bg-gradient-to-r from-primary-500/20 to-primary-600/20"
          animate={{
            opacity: theme === "dark" ? 0.8 : 0.4
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Switch thumb */}
        <motion.div
          className={cn(
            "relative w-5 h-5 rounded-full z-10",
            "bg-gradient-to-br from-primary-400 to-primary-600",
            "shadow-lg shadow-primary-500/30",
            "flex items-center justify-center"
          )}
          animate={{
            x: theme === "dark" ? 24 : 0,
            rotate: theme === "dark" ? 180 : 0,
            boxShadow: theme === "dark" 
              ? "0 4px 12px rgba(147, 197, 253, 0.4)" 
              : "0 4px 12px rgba(59, 130, 246, 0.3)"
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
        >
          {/* Theme icon indicator */}
          <motion.div
            className="w-2 h-2 rounded-full bg-white/80"
            animate={{
              scale: theme === "dark" ? 0.8 : 1,
              opacity: theme === "dark" ? 0.6 : 0.9
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}