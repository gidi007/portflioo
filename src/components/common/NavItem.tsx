/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface NavItemProps {
  href: string
  icon: LucideIcon
  label: string
  'data-page': string
  isActive: boolean
  onClick?: () => void
  index?: number
}

export function NavItem({ 
  href, 
  'data-page': dataPage, 
  icon: Icon, 
  label, 
  isActive, 
  onClick,
  index = 0
}: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (isActive && !hasInteracted) {
      setHasInteracted(true)
    }
  }, [isActive, hasInteracted])

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 200)
    if (onClick) {
      onClick()
    }
  }

  const itemVariants: Variants = {
    initial: { 
      scale: 0.96, 
      opacity: 0,
      y: 20
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: index * 0.1
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
  }

  const glowVariants: Variants = {
    initial: { 
      opacity: 0, 
      scale: 0.5,
      filter: "blur(8px)"
    },
    animate: { 
      opacity: [0.5, 0.7, 0.5], 
      scale: [1, 1.2, 1],
      filter: "blur(4px)",
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }

  const labelVariants: Variants = {
    initial: { 
      opacity: 0, 
      y: 10,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  }

  const rippleVariants: Variants = {
    initial: {
      scale: 0,
      opacity: 0.75,
    },
    animate: {
      scale: 2,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      },
    },
  }

  const expandVariants: Variants = {
    collapsed: {
      width: "3rem",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    expanded: {
      width: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
      variants={itemVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
    >
      {/* Mobile Layout */}
      <div className="lg:hidden touch-manipulation">
        <motion.div 
          className={cn(
            "flex items-center justify-center w-14 h-14 rounded-full transition-colors duration-300",
            "active:scale-95 transform relative overflow-hidden",
            isActive ? "bg-primary text-primary-foreground" : 
                      "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
          whileTap={{ scale: 0.95 }}
          layout
        >
          <Icon className="w-5 h-5 relative z-10" />
          
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.span 
                layoutId="mobile-active-bg"
                className="absolute inset-0 bg-primary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isPressed && (
              <motion.span
                className="absolute inset-0 bg-primary/20"
                variants={rippleVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isActive && (
              <motion.span
                className="absolute inset-0 bg-primary/10 rounded-full"
                variants={glowVariants}
                initial="initial"
                animate="animate"
              />
            )}
          </AnimatePresence>
        </motion.div>
        
        <AnimatePresence>
          <motion.span
            variants={labelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "absolute left-1/2 -translate-x-1/2 text-xs font-medium mt-1",
              "transition-colors duration-200",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative">
        <motion.div
          className={cn(
            "relative flex items-center justify-center",
            "h-12 group cursor-pointer",
            "transition-all duration-300"
          )}
          animate={isHovered ? "expanded" : "collapsed"}
          variants={expandVariants}
        >
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                layoutId="desktop-active-bg"
                className="absolute inset-0 bg-primary rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </AnimatePresence>

          <motion.div 
            className="relative z-10 flex items-center px-3 overflow-hidden"
            layout
          >
            <motion.div
              className={cn(
                "flex items-center gap-3",
                isActive ? "text-primary-foreground" : "text-foreground"
              )}
              initial={false}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <motion.span 
                className="font-medium min-w-max"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  x: isHovered ? 0 : -20,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
              >
                {label}
              </motion.span>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {(isHovered || isActive) && (
              <motion.span
                className="absolute -right-2 w-2 h-2 rounded-full bg-primary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isActive && (
              <motion.span
                className="absolute inset-0 bg-primary/10 rounded-full"
                variants={glowVariants}
                initial="initial"
                animate="animate"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}