"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Artist {
  id: number
  name: string
  genre: string
  images: string[]
  spotifyUrl: string
  tracks: string[]
}

interface ArtistSpotlightProps {
  artist: Artist
  className?: string
}

const ArtistSpotlight: React.FC<ArtistSpotlightProps> = ({ artist, className = "" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
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

  const overlayVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentImageIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === artist.images.length - 1 ? 0 : prevIndex + 1
      } else {
        return prevIndex === 0 ? artist.images.length - 1 : prevIndex - 1
      }
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const isFirstImage = currentImageIndex === 0

  return (
    <div className={`relative ${className}`}>
      <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden bg-[var(--muted)] rounded-lg">
        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 backdrop-blur-sm p-2 rounded-full hover:bg-black/50 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="text-white" size={20} />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 backdrop-blur-sm p-2 rounded-full hover:bg-black/50 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="text-white" size={20} />
        </button>

        {/* Image Slider */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImageIndex}
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
            className="absolute inset-0"
          >
            <img
              src={artist.images[currentImageIndex] || "/placeholder.svg?height=600&width=480"}
              alt={`${artist.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

            {/* Artist Info Overlay - Only on first image */}
            <AnimatePresence>
              {isFirstImage && (
                <motion.div
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute inset-0 flex flex-col justify-between p-6 text-white"
                >
                  {/* Top Section - Artist Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Artist Avatar"
                        className="w-8 h-8 rounded object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{artist.name}</h3>
                      <p className="text-white/80 text-sm">{artist.genre}</p>
                    </div>
                  </div>

                  {/* Bottom Section - Tracks and Play Button */}
                  <div className="space-y-4">
                    {/* Track List */}
                    <div className="space-y-1">
                      {artist.tracks.slice(0, 4).map((track, index) => (
                        <p key={index} className="text-white/70 text-sm">
                          {track}
                        </p>
                      ))}
                      {artist.tracks.length > 4 && (
                        <p className="text-white/50 text-sm">+{artist.tracks.length - 4} more...</p>
                      )}
                    </div>

                    {/* Play Button */}
                    <div className="flex justify-end">
                      <motion.a
                        href={artist.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="text-white fill-white" size={24} />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {artist.images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentImageIndex ? 1 : -1)
                setCurrentImageIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white w-6" : "bg-white/40"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArtistSpotlight
