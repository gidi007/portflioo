"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"

interface MobileNavToggleProps {
  onMenuClick: () => void
  isMenuOpen?: boolean
  className?: string
}

export function MobileNavToggle({ onMenuClick, isMenuOpen = false, className }: MobileNavToggleProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div 
      className={cn(
        "lg:hidden fixed top-6 right-6 z-50",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Menu Toggle with integrated theme display */}
      <motion.div
        className={cn(
          "flex items-center gap-4 px-5 py-3 rounded-full",
          "bg-white/5 dark:bg-black/10 backdrop-blur-xl",
          "border border-white/10 dark:border-white/5",
          "shadow-2xl shadow-black/10 dark:shadow-black/30",
          isMenuOpen && "bg-primary-500/5 border-primary-400/20"
        )}
        variants={itemVariants}
        whileHover={{ 
          scale: 1.02,
          backgroundColor: "rgba(255,255,255,0.08)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Theme indicator and toggle */}
        <motion.div className="flex items-center gap-3">
          <motion.div
            className={cn(
              "uppercase font-bold text-xs tracking-widest",
              "text-foreground/80 dark:text-white/80",
              "select-none transition-colors duration-300"
            )}
            animate={{
              color: theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"
            }}
          >
            {theme === "dark" ? "DARK" : "LIGHT"}
          </motion.div>
          
          <motion.button
            onClick={toggleTheme}
            className={cn(
              "relative w-10 h-6 rounded-full p-1",
              "bg-white/10 dark:bg-white/5",
              "border border-white/20 dark:border-white/10",
              "transition-all duration-300"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={cn(
                "w-4 h-4 rounded-full",
                "bg-gradient-to-r from-primary-400 to-primary-600",
                "shadow-lg"
              )}
              animate={{
                x: theme === "dark" ? 16 : 0,
                rotate: theme === "dark" ? 180 : 0
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.button>
        </motion.div>

        {/* Separator */}
        <motion.div
          className="w-px h-4 bg-white/20 dark:bg-white/10"
          animate={{
            opacity: isMenuOpen ? 0.3 : 0.2,
            scaleY: isMenuOpen ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Menu button */}
        <motion.button
          onClick={onMenuClick}
          className="flex items-center gap-3 focus:outline-none"
          whileHover={{ x: 2 }}
          whileTap={{ x: -1 }}
        >
          <motion.span
            className={cn(
              "uppercase font-bold text-xs tracking-widest select-none",
              "text-foreground/80 dark:text-white/80",
              "transition-colors duration-300",
              isMenuOpen && "text-primary-600 dark:text-primary-400"
            )}
            animate={{
              color: isMenuOpen 
                ? theme === "dark" ? "rgb(147, 197, 253)" : "rgb(37, 99, 235)"
                : theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"
            }}
          >
            {isMenuOpen ? "CLOSE" : "MENU"}
          </motion.span>

          {/* Animated menu icon */}
          <motion.div
            className="relative w-5 h-5 flex flex-col justify-center items-end gap-1"
            animate={{
              rotate: isMenuOpen ? 180 : 0
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className={cn(
                "h-0.5 rounded-full origin-right",
                "bg-foreground/70 dark:bg-white/70",
                isMenuOpen && "bg-primary-600 dark:bg-primary-400"
              )}
              animate={{
                width: isMenuOpen ? 20 : 16,
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 2 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={cn(
                "h-0.5 w-3 rounded-full origin-right",
                "bg-foreground/70 dark:bg-white/70",
                isMenuOpen && "bg-primary-600 dark:bg-primary-400"
              )}
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                width: isMenuOpen ? 0 : 12,
                x: isMenuOpen ? 8 : 0,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={cn(
                "h-0.5 rounded-full origin-right",
                "bg-foreground/70 dark:bg-white/70",
                isMenuOpen && "bg-primary-600 dark:bg-primary-400"
              )}
              animate={{
                width: isMenuOpen ? 20 : 14,
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -2 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}