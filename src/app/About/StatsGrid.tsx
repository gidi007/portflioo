"use client"

import { motion } from "framer-motion"
import { stats } from "./data"
import { cn } from "@/lib/utils"

export function StatsGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className={cn(
            "relative p-6 lg:p-8",
            "bg-background-light dark:bg-background-darker",
            "border border-border-light dark:border-border-dark",
            "rounded-2xl",
            "text-center",
            "group hover:scale-105 transition-transform duration-300",
            "flex flex-col justify-center items-center",
          )}
          variants={itemVariants}
        >
          {/* Decorative dot */}
          <motion.div
            className={cn("absolute top-4 left-4 w-3 h-3 rounded-full", "bg-primary-500 dark:bg-primary-600")}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
          />

          {/* Stat Value */}
          <motion.div
            className={cn(
              "text-4xl lg:text-5xl xl:text-6xl font-bold",
              "text-primary-500 dark:text-primary-400",
              "mb-3",
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            {stat.value}
          </motion.div>

          {/* Stat Label */}
          <motion.div
            className={cn(
              "text-sm lg:text-base font-medium",
              "text-foreground-light dark:text-muted-dark",
              "leading-relaxed max-w-[10rem]",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          >
            {stat.label}
          </motion.div>

          {/* Hover effect */}
          <motion.div
            className={cn(
              "absolute inset-0 rounded-2xl",
              "bg-primary-500/5 dark:bg-primary-400/10",
              "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300",
            )}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}