"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--background)] pt-20 md:pt-0">
      <div className="container-fluid">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-8">
            <img
              src="/placeholder.svg?height=300&width=300"
              alt="Underground Basement Logo"
              className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96"
            />
          </div>

          <h1 className="text-[var(--foreground)] text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            UNDERGROUND BASEMENT
          </h1>

          <p className="text-[var(--foreground)] text-lg md:text-xl lg:text-2xl mb-12">if you bad, pull up!</p>

          <div className="flex flex-col md:flex-row gap-4">
            <Link to="/events" className="btn btn-primary px-8 py-3">
              UPCOMING EVENTS
            </Link>
            <Link to="/tickets" className="btn btn-outline px-8 py-3">
              GET TICKETS
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
