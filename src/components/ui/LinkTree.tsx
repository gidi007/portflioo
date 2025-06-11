"use client"

import { motion } from "framer-motion"
import { Instagram, Twitter, Youtube, Facebook, Music, Globe, ExternalLink } from 'lucide-react'
import type { ReactNode } from "react"

interface SocialLink {
  type: "instagram" | "twitter" | "youtube" | "facebook" | "spotify" | "website" | "custom"
  url: string
  label: string
  icon?: ReactNode
  color?: string
}

interface LinkTreeProps {
  title?: string
  links: SocialLink[]
  className?: string
  variant?: "default" | "compact" | "minimal"
}

const LinkTree = ({ title, links, className = "", variant = "default" }: LinkTreeProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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
        stiffness: 300,
        damping: 24,
      },
    },
  }

  // Icon mapping
  const getIcon = (type: SocialLink["type"], customIcon?: ReactNode) => {
    if (customIcon) return customIcon

    switch (type) {
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "youtube":
        return <Youtube className="h-5 w-5" />
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "spotify":
        return <Music className="h-5 w-5" />
      case "website":
        return <Globe className="h-5 w-5" />
      case "custom":
        return <ExternalLink className="h-5 w-5" />
      default:
        return <ExternalLink className="h-5 w-5" />
    }
  }

  // Get styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          container: "grid grid-cols-2 gap-3 sm:grid-cols-3",
          item: "flex flex-col items-center justify-center p-3 rounded-lg text-center h-full",
          label: "mt-2 text-sm font-medium",
          icon: "h-6 w-6 mb-1",
        }
      case "minimal":
        return {
          container: "flex flex-wrap justify-center gap-4",
          item: "p-3 rounded-full",
          label: "sr-only",
          icon: "h-6 w-6",
        }
      default:
        return {
          container: "space-y-3",
          item: "flex items-center justify-between p-3 rounded-lg",
          label: "font-medium",
          icon: "h-5 w-5 mr-3",
        }
    }
  }

  const styles = getVariantStyles()

  // Background color mapping with app-consistent styling
  const getBackgroundColor = (type: SocialLink["type"], customColor?: string) => {
    if (customColor) return customColor

    // Using more consistent colors with the app's yellow-black theme
    switch (type) {
      case "instagram":
        return variant === "minimal" 
          ? "bg-black hover:bg-gray-900 text-pink-500 border border-pink-500/30" 
          : "from-black to-gray-900 hover:to-gray-800 text-pink-500 border-l-4 border-pink-500"
      case "twitter":
        return variant === "minimal" 
          ? "bg-black hover:bg-gray-900 text-blue-400 border border-blue-400/30" 
          : "from-black to-gray-900 hover:to-gray-800 text-blue-400 border-l-4 border-blue-400"
      case "youtube":
        return variant === "minimal" 
          ? "bg-black hover:bg-gray-900 text-red-500 border border-red-500/30" 
          : "from-black to-gray-900 hover:to-gray-800 text-red-500 border-l-4 border-red-500"
      case "facebook":
        return variant === "minimal" 
          ? "bg-black hover:bg-gray-900 text-blue-600 border border-blue-600/30" 
          : "from-black to-gray-900 hover:to-gray-800 text-blue-600 border-l-4 border-blue-600"
      case "spotify":
        return variant === "minimal" 
          ? "bg-black hover:bg-gray-900 text-green-500 border border-green-500/30" 
          : "from-black to-gray-900 hover:to-gray-800 text-green-500 border-l-4 border-green-500"
      case "website":
        return variant === "minimal" 
          ? "bg-black hover:bg-gray-900 text-yellow-400 border border-yellow-400/30" 
          : "from-black to-gray-900 hover:to-gray-800 text-yellow-400 border-l-4 border-yellow-400"
      case "custom":
        return variant === "minimal" 
          ? "bg-black hover:bg-gray-900 text-yellow-400 border border-yellow-400/30" 
          : "from-black to-gray-900 hover:to-gray-800 text-yellow-400 border-l-4 border-yellow-400"
      default:
        return variant === "minimal" 
          ? "bg-black hover:bg-gray-900 text-yellow-400 border border-yellow-400/30" 
          : "from-black to-gray-900 hover:to-gray-800 text-yellow-400 border-l-4 border-yellow-400"
    }
  }

  return (
    <motion.div
      className={`w-full max-w-md mx-auto ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {title && (
        <motion.h3 
          className="text-xl font-bold text-yellow-400 mb-6 text-center"
          variants={itemVariants}
        >
          {title}
        </motion.h3>
      )}
      
      {/* Decorative element */}
      <motion.div 
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mb-6"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />
      
      <motion.div className={styles.container} variants={containerVariants}>
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.item} bg-gradient-to-r ${getBackgroundColor(
              link.type,
              link.color
            )} shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0`}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.97 }}
          >
            {variant === "default" ? (
              <>
                <span className="flex items-center">
                  <span className={styles.icon}>{getIcon(link.type, link.icon)}</span>
                  <span className={styles.label}>{link.label}</span>
                </span>
                <ExternalLink className="h-4 w-4 opacity-70" />
              </>
            ) : (
              <>
                <span className={styles.icon}>{getIcon(link.type, link.icon)}</span>
                <span className={styles.label}>{link.label}</span>
              </>
            )}
          </motion.a>
        ))}
      </motion.div>
      
      {/* Decorative element */}
      <motion.div 
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mt-6"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      />
    </motion.div>
  )
}

export default LinkTree
