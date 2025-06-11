"use client"

import type React from "react"
import { useRef } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface Section {
  title: string
  description: string
  image: string
  link: string
}

const sections: Section[] = [
  {
    title: "ABOUT US",
    description: "Learn more about the Underground Basement movement",
    image: "https://theundergroundbasement.com/wordpress/wp-content/uploads/2025/04/IMG_9925.webp",
    link: "/about",
  },
  {
    title: "OUR RAVE",
    description: "Experience our signature underground events",
    image: "https://theundergroundbasement.com/wordpress/wp-content/uploads/2025/04/IMG_9990.webp",
    link: "/rave",
  },
  {
    title: "BASEMENT FRIDAY",
    description: "Weekly underground vibes every Friday",
    image: "https://theundergroundbasement.com/wordpress/wp-content/uploads/2025/04/IMG_0038.webp",
    link: "/friday",
  },
  {
    title: "UNDERGROUND RADAR",
    description: "Discover emerging underground talent",
    image: "https://theundergroundbasement.com/wordpress/wp-content/uploads/2025/04/IMG_0826.webp",
    link: "/radar",
  },
  {
    title: "UNDERGROUND CHARTS",
    description: "Top underground tracks and curated playlists",
    image: "https://theundergroundbasement.com/wordpress/wp-content/uploads/2025/04/IMG_0827-scaled.webp",
    link: "/charts",
  },
]

const ExploreSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = 320 // Fixed card width
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth

    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  return (
    <section className="bg-[var(--background)] py-16 md:py-20">
      <div className="container-fluid">
        <motion.h2
          className="section-title text-[var(--foreground)] mb-8 md:mb-12 text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Explore Underground Basement
        </motion.h2>

        <div className="relative">
          {/* Navigation Buttons - Hidden on mobile */}
          <button
            onClick={() => handleScroll("left")}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--background)]/80 p-3 rounded-full border border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/10 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-[var(--foreground)]" size={20} />
          </button>

          <button
            onClick={() => handleScroll("right")}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--background)]/80 p-3 rounded-full border border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/10 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="text-[var(--foreground)]" size={20} />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={section.link} className="block h-full group">
                  <div className="event-card h-[400px] md:h-[450px] bg-[var(--muted)] overflow-hidden">
                    <div className="relative w-full h-full">
                      <img
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{section.title}</h3>
                        <p className="text-white/80 text-sm md:text-base">{section.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreSection
