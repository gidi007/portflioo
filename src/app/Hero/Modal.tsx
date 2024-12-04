'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ModalImage {
  src: string
  alt: string
  link?: string
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  title?: string
  description?: string
  images: ModalImage[]
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title = 'Image Gallery',
  description = 'Explore our collection of images.',
  images
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    setIsLoading(true)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setIsLoading(true)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      nextImage()
    }

    if (touchStart - touchEnd < -150) {
      prevImage()
    }
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = images[currentImageIndex].src
    link.download = `image-${currentImageIndex + 1}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className={cn(
              "relative bg-background rounded-lg shadow-xl w-full max-w-4xl",
              "max-h-[90vh] overflow-hidden",
              "flex flex-col"
            )}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Header */}
            <motion.div 
              className="p-4 sm:p-6 border-b border-border"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              <p className="mt-2 text-muted-foreground">{description}</p>
            </motion.div>

            {/* Image Container */}
            <div 
              className="relative flex-grow overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLoading && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}
                  <Image
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    className={cn(
                      "max-w-full max-h-full object-contain transition-transform duration-300",
                      isZoomed ? "scale-150" : "scale-100"
                    )}
                    width={1200}
                    height={800}
                    priority
                    onLoad={handleImageLoad}
                    onClick={toggleZoom}
                  />
                  {images[currentImageIndex].link && !isZoomed && (
                    <Link
                      href={images[currentImageIndex].link}
                      className={cn(
                        "absolute bottom-4 left-4 px-4 py-2 bg-primary text-primary-foreground",
                        "rounded-full flex items-center space-x-2 transition-transform hover:scale-105"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <motion.button
                    className={cn(
                      "absolute top-1/2 left-4 -translate-y-1/2",
                      "p-2 rounded-full bg-black/50 text-white",
                      "hover:bg-black/70 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-white"
                    )}
                    onClick={prevImage}
                    aria-label="Previous image"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    className={cn(
                      "absolute top-1/2 right-4 -translate-y-1/2",
                      "p-2 rounded-full bg-black/50 text-white",
                      "hover:bg-black/70 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-white"
                    )}
                    onClick={nextImage}
                    aria-label="Next image"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Image Controls */}
              <motion.div 
                className="absolute bottom-4 right-4 flex space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  className={cn(
                    "p-2 rounded-full bg-black/50 text-white",
                    "hover:bg-black/70 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-white"
                  )}
                  onClick={toggleZoom}
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </motion.button>
                <motion.button
                  className={cn(
                    "p-2 rounded-full bg-black/50 text-white",
                    "hover:bg-black/70 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-white"
                  )}
                  onClick={downloadImage}
                  aria-label="Download image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div 
              className="p-4 sm:p-6 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Image Indicators */}
              <div className="flex justify-center space-x-2">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index === currentImageIndex ? "bg-primary" : "bg-muted-foreground"
                    )}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <p className="text-center mt-2 text-sm text-muted-foreground">
                Image {currentImageIndex + 1} of {images.length}
              </p>
            </motion.div>

            {/* Close Button */}
            <motion.button
              className={cn(
                "absolute top-4 right-4 p-2 rounded-full",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-muted",
                "focus:outline-none focus:ring-2 focus:ring-primary",
                "transition-colors"
              )}
              onClick={onClose}
              aria-label="Close modal"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Additional Children Content */}
            {children && (
              <motion.div 
                className="p-4 sm:p-6 border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {children}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  ) 
}

export default Modal

