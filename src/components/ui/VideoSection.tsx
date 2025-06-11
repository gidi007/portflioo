"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"

interface VideoSectionProps {
  videoUrl?: string
  posterImage?: string
  title: string
  subtitle?: string
  className?: string
}

const VideoSection: React.FC<VideoSectionProps> = ({
  posterImage = "/assets/images/logo.png",
  title,
  subtitle,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // Video play/pause logic would go here
  }

  return (
    <section className={`relative ${className}`}>
      <div className="relative aspect-video overflow-hidden bg-[var(--muted)]">
        {/* Background Image/Video */}
        <img src={posterImage || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h2
            className="text-white text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              className="text-white/80 text-lg md:text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Play Button */}
          <motion.button
            onClick={handlePlayPause}
            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-6 hover:bg-white/30 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause className="text-white" size={32} /> : <Play className="text-white ml-1" size={32} />}
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
