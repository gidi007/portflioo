"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import NavBar from "../components/layout/NavBar"
import PortraitSlideshow from "../components/ui/PortraitSlideshow"
import LandscapeSlideshow from "../components/ui/LandscapeSlideshow"
import MinimalLinkTree from "../components/ui/MinimalLinkTree"

const About: React.FC = () => {
  // Sample portrait images for the first slideshow
  const portraitImages = [
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
  ]

  // Sample landscape images for the second slideshow
  const landscapeImages = [
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
  ]

  // Social links for LinkTree
  const socialLinks = [
    { type: "instagram" as const, url: "https://instagram.com/undergroundbasement" },
    { type: "twitter" as const, url: "https://twitter.com/undergroundbsmt" },
    { type: "youtube" as const, url: "https://youtube.com/undergroundbasement" },
    { type: "spotify" as const, url: "https://open.spotify.com/user/undergroundbasement" },
  ]

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
          <motion.h1
            className="text-[var(--foreground)] text-4xl md:text-6xl font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ABOUT US
          </motion.h1>
        </section>

        {/* Event Slideshow - Portrait */}
        <section className="container-fluid py-16">
          <PortraitSlideshow images={portraitImages} />
        </section>

        {/* Our Story */}
        <section className="container-fluid py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[var(--foreground)] text-3xl md:text-4xl font-bold text-center">OUR STORY</h2>

              <div className="space-y-8 text-[var(--foreground)] text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Underground Basement was born in 2018 from a collective passion for authentic music experiences. What
                  started as intimate gatherings in actual basements has evolved into a cultural movement that
                  celebrates underground music, art, and community.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Our founders, united by their love for sounds that challenge the mainstream, created a space where
                  artists could experiment and audiences could discover. Over the years, we've grown from word-of-mouth
                  events to becoming a recognized platform for emerging talents.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  We've hosted hundreds of events, launched careers, and built a community that spans across cities.
                  Despite our growth, we remain committed to our roots: creating authentic experiences that connect
                  people through the power of underground music and culture.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Event Slideshow - Landscape */}
        <section className="container-fluid py-16">
          <LandscapeSlideshow images={landscapeImages} />
        </section>

        {/* Mission & Vision */}
        <section className="container-fluid py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Mission */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-[var(--foreground)] text-2xl md:text-3xl font-bold">OUR MISSION</h3>
                <p className="text-[var(--foreground)] text-lg leading-relaxed">
                  To create authentic spaces where underground music and culture can thrive, connecting artists with
                  audiences who appreciate innovation and originality. We aim to amplify voices that might otherwise go
                  unheard and build a community that celebrates diversity in sound and expression.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-[var(--foreground)] text-2xl md:text-3xl font-bold">OUR VISION</h3>
                <p className="text-[var(--foreground)] text-lg leading-relaxed">
                  We envision a world where underground music is recognized for its cultural significance and innovative
                  spirit. We strive to be the bridge between underground artists and wider audiences, while maintaining
                  the authenticity and integrity that defines the underground scene.
                </p>
              </motion.div>
            </div>
          </div>
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
            <h3 className="text-[var(--foreground)] text-2xl md:text-3xl font-bold">CONNECT WITH US</h3>
            <MinimalLinkTree links={socialLinks} />
          </motion.div>
        </section>
      </main>

    </>
  )
}

export default About
