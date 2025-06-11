"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Review {
  id: number
  name: string
  review: string
  eventImage: string
  eventName: string
}

interface ReviewsCarouselProps {
  reviews: Review[]
  className?: string
}

const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ reviews, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      } else {
        return prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      }
    })
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--background)]/80 p-3 rounded-full border border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/10 transition-colors"
        aria-label="Previous review"
      >
        <ChevronLeft className="text-[var(--foreground)]" size={20} />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--background)]/80 p-3 rounded-full border border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/10 transition-colors"
        aria-label="Next review"
      >
        <ChevronRight className="text-[var(--foreground)]" size={20} />
      </button>

      {/* Reviews Container */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="max-w-4xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Event Image */}
                <div className="aspect-square overflow-hidden bg-[var(--muted)]">
                  <img
                    src={reviews[currentIndex].eventImage || "/placeholder.svg?height=400&width=400"}
                    alt={reviews[currentIndex].eventName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Review Content */}
                <div className="space-y-6">
                  <h3 className="text-[var(--foreground)] text-xl md:text-2xl font-bold">
                    {reviews[currentIndex].eventName}
                  </h3>
                  <blockquote className="text-[var(--foreground)] text-lg md:text-xl leading-relaxed">
                    "{reviews[currentIndex].review}"
                  </blockquote>
                  <cite className="text-[var(--foreground)]/60 text-base font-bold not-italic">
                    — {reviews[currentIndex].name}
                  </cite>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center space-x-2 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-[var(--primary)] w-8" : "bg-[var(--foreground)]/30"
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ReviewsCarousel
