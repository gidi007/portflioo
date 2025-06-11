"use client"

import type React from "react"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface PortraitSlideshowProps {
  images: string[]
  className?: string
}

const PortraitSlideshow: React.FC<PortraitSlideshowProps> = ({ images, className = "" }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = 280 // Fixed card width
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth

    container.scrollBy({ left: scrollAmount, behavior: "smooth" })

    // Update scroll state
    setTimeout(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }, 300)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Navigation Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--background)]/80 p-3 rounded-full border border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/10 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="text-[var(--foreground)]" size={20} />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--background)]/80 p-3 rounded-full border border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/10 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="text-[var(--foreground)]" size={20} />
        </button>
      )}

      {/* Images Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={(e) => {
          const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
          setCanScrollLeft(scrollLeft > 0)
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[280px] snap-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-[var(--muted)]">
              <img
                src={image || "/placeholder.svg?height=400&width=300"}
                alt={`Event moment ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PortraitSlideshow
