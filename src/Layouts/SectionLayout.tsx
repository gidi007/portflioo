// SectionLayout.tsx
'use client'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface SectionLayoutProps {
  children: React.ReactNode
  id: string
  currentActiveSection: string
}

export default function SectionLayout({
  children,
  id,
  currentActiveSection,
}: SectionLayoutProps) {
  const isVisible = currentActiveSection === id

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 w-full h-full overflow-auto 
                 px-4 sm:px-6 md:px-8 lg:px-12 
                 py-4 sm:py-6 md:py-8 lg:py-12
                 bg-background/80 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </motion.div>
  )
}