"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import NavBar from "../components/layout/NavBar"
import ArtistSpotlight from "../components/ui/ArtistSpotlight"

const UndergroundRadar: React.FC = () => {
  // Sample artist data
  const featuredArtist = {
    id: 1,
    name: "Hometown Hero",
    genre: "Alternative Hip-Hop",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9TbVZloU6tD3X7u3Sh4knC2aOhA5RY.png",
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480",
    ],
    spotifyUrl: "https://open.spotify.com/artist/example",
    tracks: [
      "Don't Tell Me • High & Low • Party Don't Stop • Darlin'",
      "Sweet Confession • With My Hommies • Odo • Imagine • Fa...",
    ],
  }

  return (
    <>
      <NavBar />
      <main className="bg-[var(--background)] pt-24">
        {/* Back to Home */}
        <div className="container-fluid py-4">
          <Link
            to="/"
            className="inline-flex items-center text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span className="text-sm uppercase font-bold">Back to Home</span>
          </Link>
        </div>

        {/* Page Title */}
        <section className="container-fluid py-16">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[var(--foreground)] text-4xl md:text-6xl font-bold">UNDERGROUND RADAR</h1>
            <motion.p
              className="text-[var(--foreground)]/80 text-lg md:text-xl uppercase tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              UNDERGROUND EMERGING TALENTS
            </motion.p>
          </motion.div>
        </section>

        {/* Artist Spotlight */}
        <section className="container-fluid py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ArtistSpotlight artist={featuredArtist} />
          </motion.div>
        </section>

        {/* Additional Info */}
        <section className="container-fluid py-16">
          <motion.div
            className="max-w-2xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[var(--foreground)] text-2xl md:text-3xl font-bold">DISCOVER THE UNDERGROUND</h3>
            <p className="text-[var(--foreground)] text-lg leading-relaxed">
              Every week, we spotlight emerging artists who are pushing boundaries and creating the sounds of tomorrow.
              From bedroom producers to underground collectives, these are the talents shaping the future of music.
            </p>
          </motion.div>
        </section>
      </main>
    </>
  )
}

export default UndergroundRadar
