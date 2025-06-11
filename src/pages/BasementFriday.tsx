"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import NavBar from "../components/layout/NavBar"
import VideoSection from "../components/ui/VideoSection"
import PastPresentSection from "../components/ui/PastPresentSection"
import MinimalLinkTree from "../components/ui/MinimalLinkTree"

const BasementFriday: React.FC = () => {
  // Sample events data
  const events = [
    {
      id: 1,
      title: "BASEMENT FRIDAY: BASS NATION",
      date: "NOV 08",
      venue: "The Underground",
      image: "/placeholder.svg?height=350&width=350",
      category: "present" as const,
    },
    {
      id: 2,
      title: "BASEMENT FRIDAY: DEEP VIBES",
      date: "NOV 01",
      venue: "The Underground",
      image: "/placeholder.svg?height=350&width=350",
      category: "past" as const,
    },
    {
      id: 3,
      title: "BASEMENT FRIDAY: UNDERGROUND SESSIONS",
      date: "OCT 25",
      venue: "The Underground",
      image: "/placeholder.svg?height=350&width=350",
      category: "past" as const,
    },
  ]

  // Social links
  const socialLinks = [
    { type: "instagram" as const, url: "https://instagram.com/basementfriday" },
    { type: "twitter" as const, url: "https://twitter.com/basementfriday" },
    { type: "youtube" as const, url: "https://youtube.com/basementfriday" },
    { type: "spotify" as const, url: "https://open.spotify.com/playlist/basementfriday" },
  ]

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

        {/* Page Title */}
        <section className="container-fluid py-16">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[var(--foreground)] text-4xl md:text-6xl font-bold">BASEMENT FRIDAY</h1>
            <p className="text-[var(--foreground)] text-lg md:text-xl uppercase">WEEKLY UNDERGROUND EXPERIENCE</p>
          </motion.div>
        </section>

        {/* Video Section */}
        <VideoSection
          title="EVERY FRIDAY NIGHT"
          subtitle="Join us for the ultimate weekly underground experience"
          className="mb-16"
        />

        {/* Description */}
        <section className="container-fluid py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="space-y-8 text-[var(--foreground)] text-lg leading-relaxed text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p>
                Join us every Friday for an immersive underground music experience. Our carefully curated lineup of DJs
                brings you the best in underground electronic music, creating an atmosphere that's both intimate and
                energetic.
              </p>

              <p>
                Basement Friday is more than just an event - it's a community of music lovers who appreciate authentic
                sounds and genuine connections. Every week, we transform our space into a sanctuary for underground
                culture.
              </p>

              <p>
                From deep house to experimental beats, our resident DJs and special guests deliver sets that push
                boundaries and keep the dance floor moving until the early hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Events Link Section */}
        <section className="container-fluid py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              to="/events"
              className="inline-block bg-[var(--primary)] text-[var(--background)] px-8 py-4 font-bold uppercase hover:bg-[var(--primary)]/90 transition-colors"
            >
              VIEW ALL BASEMENT FRIDAY EVENTS
            </Link>
          </motion.div>
        </section>

        {/* Past & Present Events */}
        <PastPresentSection events={events} className="py-16" />

        {/* LinkTree Section */}
        <section className="container-fluid py-16">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[var(--foreground)] text-2xl md:text-3xl font-bold">FOLLOW BASEMENT FRIDAY</h3>
            <MinimalLinkTree links={socialLinks} />
          </motion.div>
        </section>
      </main>
    </>
  )
}

export default BasementFriday
