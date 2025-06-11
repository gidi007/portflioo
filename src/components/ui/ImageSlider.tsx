"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver"

interface ImageSliderProps {
  images: {
    src: string
    alt: string
    caption?: string
  }[]
  autoPlay?: boolean
  interval?: number
  className?: string
  aspectRatio?: "square" | "video" | "wide" | "custom"
  height?: string
}

const ImageSlider = ({
  images,
  autoPlay = true,
  interval = 5000,
  className = "",
  aspectRatio = "video",
  height,
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const timerRef = useRef<number | null>(null)
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: false,
  })

  // Determine aspect ratio class
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    custom: "",
  }[aspectRatio]

  // Handle auto-play
  useEffect(() => {
    if (!isPlaying || !isInView) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPlaying, interval, images.length, isInView])

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false)
  const handleMouseLeave = () => setIsPlaying(autoPlay)

  // Navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  // Track slide direction for animations
  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + images.length) % images.length
    setPage([newIndex, newDirection])
    setCurrentIndex(newIndex)
  }

  if (images.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl shadow-lg ${className} ${
        aspectRatio !== "custom" ? aspectRatioClass : ""
      }`}
      style={height && aspectRatio === "custom" ? { height } : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main slider */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
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
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <img
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Caption */}
            {images[currentIndex].caption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 p-4 text-white"
              >
                <p className="text-sm md:text-base font-medium">{images[currentIndex].caption}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-yellow-400 w-4" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider

