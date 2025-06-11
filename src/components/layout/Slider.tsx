"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"

const Slider = ({ slides, activeSlide }: { slides: { component: React.ReactNode }[]; activeSlide: number }) => {
  return (
    <div className="relative overflow-hidden h-96">
      <AnimatePresence>
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {slides[activeSlide].component}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Slider

