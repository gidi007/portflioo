    "use client"
import { motion } from "framer-motion"
import { skills } from "./data"
import { cn } from "@/lib/utils"

export function SkillsSection() {
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

  return (
    <div className="space-y-12">
      {/* Section Title */}
      <motion.h2
        className={cn("text-2xl lg:text-3xl font-bold text-center", "text-foreground dark:text-foreground-dark")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        MY SKILLS
      </motion.h2>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill, index) => (
          <motion.div key={skill.label} className="flex flex-col items-center space-y-4" variants={itemVariants}>
            {/* Circular Progress */}
            <div className="relative w-24 h-24 lg:w-28 lg:h-28">
              {/* Background Circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className={cn("text-border-light dark:text-border-dark", "opacity-20")}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className={cn("text-primary-500 dark:text-primary-400")}
                  initial={{ strokeDasharray: "0 283" }}
                  animate={{
                    strokeDasharray: `${(skill.value / 100) * 283} 283`,
                  }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 1.5,
                    ease: "easeOut",
                  }}
                />
              </svg>

              {/* Percentage Text */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <span className={cn("text-lg lg:text-xl font-bold", "text-foreground dark:text-foreground-dark")}>
                  {skill.value}%
                </span>
              </motion.div>
            </div>

            {/* Skill Label */}
            <motion.span
              className={cn(
                "text-sm lg:text-base font-medium text-center",
                "text-foreground-light dark:text-muted-dark",
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
            >
              {skill.label}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
