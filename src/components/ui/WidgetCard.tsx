"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface WidgetCardProps {
  title: string
  subtitle: string
  description: string
  link: string
  variant: "primary" | "secondary" | "accent" | "dark"
  size: "small" | "medium" | "large"
  className?: string
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  subtitle,
  description,
  link,
  variant,
  size,
  className = "",
}) => {
  const sizeClasses = {
    small: "col-span-1 row-span-1 h-32",
    medium: "col-span-1 row-span-2 h-64",
    large: "col-span-2 row-span-1 h-32",
  }

  const variantClasses = {
    primary: "widget bg-gradient-to-br from-blue-500/20 to-purple-600/20",
    secondary: "widget bg-gradient-to-br from-green-500/20 to-teal-600/20",
    accent: "widget bg-gradient-to-br from-red-500/20 to-pink-600/20",
    dark: "widget bg-gradient-to-br from-gray-800/40 to-gray-900/40",
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className} rounded-2xl p-4 cursor-pointer group`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link to={link} className="block h-full">
        <div className="h-full flex flex-col justify-between">
          <div>
            <h3 className="text-primary font-bold text-lg mb-1 group-hover:text-accent transition-colors">{title}</h3>
            <p className="text-secondary text-sm mb-2">{subtitle}</p>
          </div>
          <p className="text-muted text-xs leading-relaxed">{description}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default WidgetCard
