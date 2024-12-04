// MainLayout.tsx
'use client'
import React from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { ActiveSectionProvider } from '@/context/ActiveSectionContext'
import CustomCursor from '@/components/common/CustomCursor'
import Navbar from '@/components/common/Navbar'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <ActiveSectionProvider>
        <div className={cn(
          "relative min-h-screen w-full overflow-x-hidden",
          "px-4 sm:px-6 md:px-8 lg:px-12", // Progressive padding
          "transition-all duration-300 ease-in-out", // Smooth transitions
          className
        )}>
          <CustomCursor />
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-4 sm:py-6 md:py-8 lg:py-12 overflow-y-auto"
            >
              {children}
            </motion.main>
          </AnimatePresence>
          <CustomCursor />
        </div>
      </ActiveSectionProvider>
    </ThemeProvider>
  )
}