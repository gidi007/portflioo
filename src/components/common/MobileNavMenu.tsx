"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useActiveSection } from "@/context/ActiveSectionContext"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface MobileNavMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "portfolio", label: "WORK" },
  { id: "blog", label: "BLOG" },
  { id: "contact", label: "CONTACT" },
]

export function MobileNavMenu({ isOpen, onClose }: MobileNavMenuProps) {
  const { activeSection, setActiveSection } = useActiveSection()
  const { theme } = useTheme()

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    onClose()
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Animation variants for the backdrop
  const backdropVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    visible: {
      opacity: 1,
      backdropFilter: "blur(20px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  // Animation variants for the menu container
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.03,
        staggerDirection: -1,
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.08,
        delayChildren: 0.15,
      }
    }
  }

  // Animation variants for navigation items
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      x: -20,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  // Animation variants for the bottom blend area
  const blendVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.4
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Main menu container */}
          <motion.div
            className={cn(
              "fixed top-0 left-0 right-0 z-50",
              "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl",
              "shadow-2xl shadow-black/10 dark:shadow-black/30",
              "border-b border-white/10 dark:border-white/5",
              "min-h-screen"
            )}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Content container */}
            <div className="relative h-full flex flex-col">
              
              {/* Header section with close button */}
              <div className="pt-6 px-6 flex justify-between items-center">
                <motion.div
                  className="text-center"
                  variants={itemVariants}
                >
                  <motion.div
                    className={cn(
                      "text-xs uppercase tracking-[0.3em] font-bold",
                      "text-foreground/50 dark:text-white/40",
                      "mb-2"
                    )}
                    animate={{
                      color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)"
                    }}
                  >
                    MENU
                  </motion.div>
                </motion.div>
                <motion.button
                  onClick={onClose}
                  className={cn(
                    "text-3xl sm:text-4xl font-bold",
                    "text-foreground/90 dark:text-white/90",
                    "tracking-wide transition-all duration-300",
                    "hover:text-primary-600 dark:hover:text-primary-400",
                    "focus:outline-none focus:text-primary-600 dark:focus:text-primary-400"
                  )}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  CLOSE
                </motion.button>
              </div>

              {/* Navigation items */}
              <div className="flex-1 flex flex-col justify-center px-8 space-y-6 py-10">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "group relative text-left py-4 px-6 rounded-lg",
                      "text-3xl sm:text-4xl font-bold",
                      "text-foreground/90 dark:text-white/90",
                      "tracking-wide transition-all duration-300",
                      "hover:text-primary-600 dark:hover:text-primary-400",
                      "focus:outline-none focus:text-primary-600 dark:focus:text-primary-400",
                      "hover:bg-primary-500/5 dark:hover:bg-primary-400/5",
                      activeSection === item.id && [
                        "text-primary-600 dark:text-primary-400",
                        "bg-primary-500/10 dark:bg-primary-400/10"
                      ]
                    )}
                    variants={itemVariants}
                    whileHover={{ 
                      x: 12,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Active indicator */}
                    <motion.div
                      className={cn(
                        "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full",
                        "bg-gradient-to-b from-primary-400 to-primary-600"
                      )}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: activeSection === item.id ? 1 : 0,
                        x: activeSection === item.id ? 0 : -10,
                        scale: activeSection === item.id ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Item text */}
                    <span className="relative z-10 block">
                      {item.label}
                    </span>

                    {/* Hover underline */}
                    <motion.div
                      className="absolute bottom-2 left-6 h-0.5 bg-primary-500/50 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "40%" }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Background glow for active item */}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Footer info */}
              <motion.div
                className="px-8 pb-12"
                variants={itemVariants}
              >
                <div className="flex justify-center items-center gap-4">
                  <motion.div
                    className="w-8 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: 32 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  />
                  <motion.div
                    className={cn(
                      "text-xs uppercase tracking-[0.2em] font-semibold",
                      "text-foreground/40 dark:text-white/30"
                    )}
                    animate={{
                      color: theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)"
                    }}
                  >
                    &copy; {new Date().getFullYear()} Favour Bawa
                  </motion.div>
                  <motion.div
                    className="w-8 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: 32 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Seamless bottom blend area */}
          <motion.div
            className={cn(
              "fixed left-0 right-0 z-40",
              "h-32 pointer-events-none",
              "bg-gradient-to-b from-white/95 via-white/60 to-white/20",
              "dark:from-gray-900/95 dark:via-gray-900/60 dark:to-gray-900/20",
              "backdrop-blur-xl"
            )}
            style={{
              bottom: 0,
            }}
            variants={blendVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        </>
      )}
    </AnimatePresence>
  )
}