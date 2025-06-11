"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft, ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from "lucide-react"
import NavBar from "../components/layout/NavBar"

interface Track {
  rank: number
  title: string
  artist: string
  album: string
  albumCover: string
  lastWeek: number
  peakPosition: number
  weeksOnChart: number
  trend: "up" | "down" | "new" | "same"
}

const Charts: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Sample tracks data
  const tracks: Track[] = [
    {
      rank: 1,
      title: "Underground Vibes",
      artist: "DJ Shadow",
      album: "Deep Cuts",
      albumCover: "/placeholder.svg?height=100&width=100",
      lastWeek: 2,
      peakPosition: 1,
      weeksOnChart: 8,
      trend: "up",
    },
    {
      rank: 2,
      title: "Basement Beats",
      artist: "Night Crawler",
      album: "After Hours",
      albumCover: "/placeholder.svg?height=100&width=100",
      lastWeek: 1,
      peakPosition: 1,
      weeksOnChart: 12,
      trend: "down",
    },
    {
      rank: 3,
      title: "Dark Matter",
      artist: "Bass Master",
      album: "Frequency",
      albumCover: "/placeholder.svg?height=100&width=100",
      lastWeek: 5,
      peakPosition: 2,
      weeksOnChart: 6,
      trend: "up",
    },
    {
      rank: 4,
      title: "Electric Dreams",
      artist: "Sound System",
      album: "Voltage",
      albumCover: "/placeholder.svg?height=100&width=100",
      lastWeek: 0,
      peakPosition: 4,
      weeksOnChart: 1,
      trend: "new",
    },
    {
      rank: 5,
      title: "Neon Nights",
      artist: "Pulse",
      album: "City Lights",
      albumCover: "/placeholder.svg?height=100&width=100",
      lastWeek: 3,
      peakPosition: 2,
      weeksOnChart: 15,
      trend: "down",
    },
    {
      rank: 6,
      title: "Rhythm Revolution",
      artist: "Beat Maker",
      album: "Evolution",
      albumCover: "/placeholder.svg?height=100&width=100",
      lastWeek: 8,
      peakPosition: 4,
      weeksOnChart: 4,
      trend: "up",
    },
    {
      rank: 7,
      title: "Sonic Boom",
      artist: "Wave Rider",
      album: "Amplitude",
      albumCover: "/placeholder.svg?height=100&width=100",
      lastWeek: 6,
      peakPosition: 5,
      weeksOnChart: 9,
      trend: "down",
    },
    {
      rank: 8,
      title: "Digital Pulse",
      artist: "Cyber DJ",
      album: "Matrix",
      albumCover: "/placeholder.svg?height=100&width=100",
      lastWeek: 10,
      peakPosition: 7,
      weeksOnChart: 3,
      trend: "up",
    },
    {
      rank: 9,
      title: "Midnight Hour",
      artist: "Shadow Walker",
      album: "Nocturne",
      albumCover: "/placeholder.svg?height=100&width=100",
      lastWeek: 7,
      peakPosition: 6,
      weeksOnChart: 11,
      trend: "down",
    },
    {
      rank: 10,
      title: "Future Sound",
      artist: "Tech Master",
      album: "Tomorrow",
      albumCover: "/placeholder.svg?height=100&width=100",
      lastWeek: 0,
      peakPosition: 10,
      weeksOnChart: 1,
      trend: "new",
    },
  ]

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

  const getTrendIcon = (trend: Track["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="text-green-500" size={16} />
      case "down":
        return <TrendingDown className="text-red-500" size={16} />
      case "new":
        return <span className="text-[var(--primary)] text-xs font-bold">NEW</span>
      default:
        return <span className="text-[var(--foreground)]/40">—</span>
    }
  }

  return (
    <>
      <NavBar />
      <main className="bg-[var(--background)] pt-24">
        {/* Back to Home */}
        <div className="container-fluid mt-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span className="text-sm uppercase font-bold">Back to Home</span>
          </Link>
        </div>

        {/* Charts Section */}
        <section className="container-fluid py-16">
          {/* Background Image */}
          <div
            className="relative min-h-screen bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/images/logo.png')`,
            }}
          >
            <div className="relative z-10 flex items-center justify-center min-h-screen">
              <div className="w-full max-w-6xl mx-auto p-8">
                {/* Header */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="inline-block bg-[var(--primary)] text-[var(--background)] px-8 py-2 mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold">Underground Basement Hot 100™</h1>
                  </div>
                </motion.div>

                {/* Main Chart Card */}
                <motion.div
                  className="bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Featured Section */}
                  <div className="p-8 border-b border-[var(--foreground)]/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="aspect-square bg-[var(--muted)] rounded-lg overflow-hidden">
                        <img
                          src="/assets/images/logo.png"
                          alt="Featured Artists"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="bg-[var(--primary)] text-[var(--background)] inline-block px-4 py-2 rounded">
                          <span className="text-2xl font-bold">HOT 100</span>
                        </div>
                        <div className="bg-[var(--primary)] text-[var(--background)] inline-block px-4 py-2 rounded ml-4">
                          <span className="text-lg font-bold">TOP 10</span>
                        </div>
                        <p className="text-white/80 text-sm">WEEK OF {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Charts List */}
                  <div className="p-8">
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

                      {/* Tracks Container */}
                      <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        onScroll={(e) => {
                          const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
                          setCanScrollLeft(scrollLeft > 0)
                          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
                        }}
                      >
                        {tracks.map((track, index) => (
                          <motion.div
                            key={track.rank}
                            className="flex-shrink-0 w-[320px] snap-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                          >
                            <div className="bg-[var(--muted)]/50 backdrop-blur-sm p-4 rounded-lg border border-[var(--foreground)]/10">
                              <div className="flex items-center space-x-4">
                                {/* Rank */}
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{track.rank}</div>
                                  <div className="flex items-center justify-center">{getTrendIcon(track.trend)}</div>
                                </div>

                                {/* Album Cover */}
                                <div className="w-16 h-16 bg-[var(--muted)] rounded overflow-hidden">
                                  <img
                                    src={track.albumCover || "/placeholder.svg"}
                                    alt={track.album}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Track Info */}
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-white font-bold text-sm truncate">{track.title}</h3>
                                  <p className="text-white/60 text-xs truncate">{track.artist}</p>
                                  <p className="text-white/40 text-xs truncate">{track.album}</p>
                                </div>
                              </div>

                              {/* Chart Stats */}
                              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                <div>
                                  <div className="text-xs text-white/40 uppercase">Last Week</div>
                                  <div className="text-sm font-bold text-white">
                                    {track.lastWeek === 0 ? "—" : track.lastWeek}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-white/40 uppercase">Peak</div>
                                  <div className="text-sm font-bold text-white">{track.peakPosition}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-white/40 uppercase">Weeks</div>
                                  <div className="text-sm font-bold text-white">{track.weeksOnChart}</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* View Full Chart Button */}
                    <motion.div
                      className="text-center mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <button className="bg-[var(--primary)] text-[var(--background)] px-8 py-3 rounded font-bold hover:bg-[var(--primary)]/90 transition-colors">
                        VIEW FULL CHART →
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Charts
