"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Music, Calendar, Headphones } from "lucide-react"

const WidgetsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Blurred background effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
          filter: "blur(20px)",
        }}
      />

      <div className="container-fluid relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[var(--foreground)] text-3xl md:text-4xl font-bold mb-4">EXPLORE UNDERGROUND</h2>
          <p className="text-[var(--foreground)]/80 text-lg">Discover all aspects of our underground community</p>
        </motion.div>

        {/* New Widgets Layout */}
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {/* Top Long Black Widget - Underground Radar of the Week */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/radar" className="block">
              <div className="bg-black rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9TbVZloU6tD3X7u3Sh4knC2aOhA5RY.png" 
                      alt="Hometown Hero" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                  </div>
                  <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-3">
                        <span className="bg-[var(--primary)] text-black text-xs font-bold px-3 py-1 rounded-full mr-3">FEATURED</span>
                        <span className="text-[var(--primary)] text-sm font-medium">UNDERGROUND RADAR</span>
                      </div>
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">Hometown Hero</h3>
                      <p className="text-white/70 mb-4">Alternative Hip-Hop</p>
                      <p className="text-white/80 text-sm md:text-base">
                        Every week, we spotlight emerging artists who are pushing boundaries and creating the sounds of tomorrow.
                      </p>
                    </div>
                    <div className="mt-4 text-xs text-white/60">
                      <p>Don't Tell Me • High & Low • Party Don't Stop • Darlin'</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Two Wider Widgets Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Number One Song of the Week - Charts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Link to="/charts" className="block">
                <div className="bg-[var(--muted)] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Music className="text-[var(--primary)] mr-3" size={20} />
                      <span className="text-[var(--primary)] text-sm font-medium">CHARTS</span>
                    </div>
                    <h3 className="text-[var(--foreground)] text-xl font-bold mb-3">Number One Song of the Week</h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-black rounded-md overflow-hidden flex-shrink-0">
                        <img src="/placeholder.svg?height=100&width=100" alt="Album Cover" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-[var(--foreground)] font-bold">Underground Vibes</h4>
                        <p className="text-[var(--foreground)]/70 text-sm">DJ Shadow</p>
                        <div className="flex items-center mt-1">
                          <span className="text-green-500 text-xs font-bold flex items-center">↑ 1</span>
                          <span className="text-[var(--foreground)]/50 text-xs ml-3">8 weeks on chart</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Likes to Party 'coming soon' - Our Rave */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link to="/rave" className="block">
                <div className="bg-[var(--muted)] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Headphones className="text-[var(--primary)] mr-3" size={20} />
                      <span className="text-[var(--primary)] text-sm font-medium">OUR RAVE</span>
                    </div>
                    <h3 className="text-[var(--foreground)] text-xl font-bold mb-3">Likes to Party</h3>
                    <div className="mb-4">
                      <span className="bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold px-3 py-1 rounded-full">COMING SOON</span>
                    </div>
                    <p className="text-[var(--foreground)]/70 text-sm">
                      Experience our legendary underground parties with the best DJs and an unforgettable atmosphere. Join our community of music lovers and party-goers.                      
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Two Portrait Posters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basement Friday Poster */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link to="/events" className="block">
                <div className="bg-[var(--muted)] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[2/3] relative">
                    <img 
                      src="/placeholder.svg?height=400&width=600" 
                      alt="Basement Friday: Bass Nation" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                      <div className="mb-2">
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">UPCOMING</span>
                      </div>
                      <h3 className="text-white text-2xl font-bold mb-1">BASEMENT FRIDAY</h3>
                      <p className="text-white/80 text-sm">BASS NATION</p>
                      <div className="flex items-center mt-3 text-white/70 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Dec 6, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Latest Event Poster */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/events" className="block">
                <div className="bg-[var(--muted)] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[2/3] relative">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3CLesXP1ji9ExuU0vL7QiUP19EPiUo.png" 
                      alt="New Year Underground" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                      <div className="mb-2">
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">UPCOMING</span>
                      </div>
                      <h3 className="text-white text-2xl font-bold mb-1">NEW YEAR UNDERGROUND</h3>
                      <p className="text-white/80 text-sm">Ring in 2025 underground style</p>
                      <div className="flex items-center mt-3 text-white/70 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Dec 31, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WidgetsSection
