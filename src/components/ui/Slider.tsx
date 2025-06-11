"use client"

import { type ReactNode, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const Slider = ({
  slides,
  interval = 5000,
  autoPlay = true,
}: {
  slides: ReactNode[]
  interval: number
  autoPlay: boolean
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, interval)

    return () => clearInterval(timer)
  }, [slides.length, interval, autoPlay])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {slides[currentIndex]}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-yellow-400" : "bg-yellow-400/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider

