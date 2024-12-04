'use client'

import { motion } from 'framer-motion'

interface StatBoxProps {
  value: string
  label: string
}

export function StatBox({ value, label }: StatBoxProps) {
  return (
    <motion.div 
      className="p-6 bg-background rounded-lg border shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-center">
        <span className="text-4xl font-bold text-primary mb-2">{value}</span>
        <span className="text-sm text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
    </motion.div>
  )
}

