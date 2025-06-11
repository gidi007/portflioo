"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import NavBar from "../components/layout/NavBar"
import VideoSection from "../components/ui/VideoSection"
import PastPresentSection from "../components/ui/PastPresentSection"
import MinimalLinkTree from "../components/ui/MinimalLinkTree"
import ReviewsCarousel from "../components/ui/ReviewCarousel"

const UndergroundRave: React.FC = () => {
  // Sample events data
  const events = [
    {
      id: 1,
      title: "STREETWEAR EDITION RE2URN",
      date: "MAY 24",
      venue: "The Clubhouse",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-v5CJaUx7UNYenXCK1SyyS2fAAZ38ah.png",
      category: "past" as const,
    },
    {
      id: 2,
      title: "WET & WILD",
      date: "MAR 28",
      venue: "The Clubhouse",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-v5CJaUx7UNYenXCK1SyyS2fAAZ38ah.png",
      category: "present" as const,
    },
    {
      id: 3,
      title: "AFTER HOURS",
      date: "JAN 31",
      venue: "Hard Rock Cafe",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-v5CJaUx7UNYenXCK1SyyS2fAAZ38ah.png",
      category: "past" as const,
    },
  ]

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      review:
        "The energy was absolutely incredible! Best underground event I've ever been to. The music, the crowd, everything was perfect.",
      eventImage: "/placeholder.svg?height=400&width=400",
      eventName: "Underground Rave Vol. 12",
    },
    {
      id: 2,
      name: "Marcus T.",
      review:
        "Mind-blowing experience! The DJs were on another level and the atmosphere was electric. Can't wait for the next one!",
      eventImage: "/placeholder.svg?height=400&width=400",
      eventName: "Basement Friday Special",
    },
    {
      id: 3,
      name: "Luna K.",
      review:
        "This is what real underground culture feels like. Raw, authentic, and absolutely unforgettable. Thank you for keeping it real!",
      eventImage: "/placeholder.svg?height=400&width=400",
      eventName: "After Hours Session",
    },
    {
      id: 4,
      name: "David R.",
      review: "The sound system was incredible and the venue had such a unique vibe. Definitely coming back for more!",
      eventImage: "/placeholder.svg?height=400&width=400",
      eventName: "Wet & Wild Edition",
    },
    {
      id: 5,
      name: "Zara P.",
      review:
        "Found my new favorite event series! The community here is amazing and the music selection is always on point.",
      eventImage: "/placeholder.svg?height=400&width=400",
      eventName: "Streetwear Edition",
    },
    {
      id: 6,
      name: "Alex J.",
      review: "Pure underground vibes! This is exactly what the scene needed. Keep pushing boundaries!",
      eventImage: "/placeholder.svg?height=400&width=400",
      eventName: "Underground Radar Live",
    },
  ]

  // Social links
  const socialLinks = [
    { type: "instagram" as const, url: "https://instagram.com/undergroundrave" },
    { type: "twitter" as const, url: "https://twitter.com/undergroundrave" },
    { type: "youtube" as const, url: "https://youtube.com/undergroundrave" },
    { type: "spotify" as const, url: "https://open.spotify.com/user/undergroundrave" },
  ]

  return (
    <>
      <NavBar />
      <main className="bg-[var(--background)] pt-24">
        {/* Back to Home */}
        <div className="container-fluid py-4 mt-8">
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
            <h1 className="text-[var(--foreground)] text-4xl md:text-6xl font-bold">UNDERGROUND RAVE</h1>
            <p className="text-[var(--foreground)] text-lg md:text-xl uppercase">
              EXPERIENCE THE ULTIMATE UNDERGROUND PARTY
            </p>
          </motion.div>
        </section>

        {/* Video Section */}
        <VideoSection
          title="THE ULTIMATE PARTY EXPERIENCE"
          posterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m7uuxJbPAWV7OGj0o6y6wzl3iWrYmY.png"
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
                Underground Rave is our signature event series that brings together the most innovative sounds and
                immersive experiences. Unlike traditional club nights, our raves create a unique atmosphere where music,
                art, and community converge.
              </p>

              <p>
                Each event features carefully selected artists who push boundaries and redefine what electronic music
                can be. From intimate warehouse settings to unexpected locations, Underground Rave creates memories that
                last a lifetime.
              </p>

              <p>
                Our events are known for their inclusive atmosphere, cutting-edge sound systems, and attention to detail
                that transforms spaces into otherworldly experiences. Join us and step into the underground.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Past & Present Events */}
        <PastPresentSection events={events} className="py-16" />
 
      {/* Reviews Section */}
        <section className="container-fluid py-16">
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[var(--foreground)] text-3xl md:text-4xl font-bold text-center">
              WHAT PEOPLE ARE SAYING
            </h3>
            <ReviewsCarousel reviews={reviews} />
          </motion.div>
        </section>


        {/* LinkTree Section */}
        <section className="container-fluid py-16">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[var(--foreground)] text-2xl md:text-3xl font-bold">FOLLOW UNDERGROUND RAVE</h3>
            <MinimalLinkTree links={socialLinks} />
          </motion.div>
        </section>

      </main>
    </>
  )
}

export default UndergroundRave
