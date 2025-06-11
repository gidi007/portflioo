"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20 md:min-h-screen">
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

          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            UNDERGROUND BASEMENT
          </h1>

          <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-12">if you bad, pull up!</p>

          <div className="flex flex-col md:flex-row gap-4">
            <Link to="/events" className="btn btn-primary px-8 py-3">
              UPCOMING EVENTS
            </Link>
            <Link
              to="/tickets"
              className="btn btn-outline px-8 py-3 border-white text-white hover:bg-white hover:text-black"
            >
              GET TICKETS
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
