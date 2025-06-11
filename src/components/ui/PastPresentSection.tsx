"use client"

import type React from "react"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface Event {
  id: number
  title: string
  date: string
  venue: string
  image: string
  category: "past" | "present"
}

interface PastPresentSectionProps {
  events: Event[]
  className?: string
}

const PastPresentSection: React.FC<PastPresentSectionProps> = ({ events, className = "" }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = 350
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth

    container.scrollBy({ left: scrollAmount, behavior: "smooth" })

    setTimeout(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }, 300)
  }

  return (
    <section className={`${className}`}>
      <div className="container-fluid">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[var(--foreground)] text-4xl md:text-6xl font-bold">
            PAST <span className="text-[var(--primary)]">&</span> PRESENT
          </h2>
        </motion.div>

        {/* Events Carousel */}
        <div className="relative">
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

          {/* Events Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={(e) => {
              const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
              setCanScrollLeft(scrollLeft > 0)
              setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
            }}
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="flex-shrink-0 w-[350px] snap-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-[var(--muted)] overflow-hidden group cursor-pointer">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={event.image || "/placeholder.svg?height=350&width=350"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded ${
                              event.category === "past"
                                ? "bg-[var(--foreground)]/20 text-[var(--foreground)]"
                                : "bg-[var(--primary)] text-[var(--background)]"
                            }`}
                          >
                            {event.category.toUpperCase()}
                          </span>
                          <span className="text-white/60 text-sm">{event.date}</span>
                        </div>
                        <h3 className="text-white text-xl font-bold">{event.title}</h3>
                        <p className="text-white/80 text-sm">{event.venue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PastPresentSection
