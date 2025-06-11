"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"
import { motion } from "framer-motion"

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const currentDate = new Date()
  const formattedDate = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".")

  return (
    <footer id="contact" className="relative min-h-screen flex flex-col justify-center py-16 md:py-24 overflow-hidden">
      {/* Paper texture background */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmaWx0ZXIgaWQ9Im4iPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjA1IiBudW1PY3RhdmVzPSI1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')`,
          backgroundColor: theme === "spotlight" ? "var(--background)" : "transparent"
        }}
      />
      
      <div className="container-fluid max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <motion.div 
          className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 md:mb-24 space-y-6 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="uppercase font-bold">
            <div 
              className={`text-xl md:text-2xl mb-2 tracking-tight ${theme === "spotlight" ? "text-[var(--primary)]" : "text-[var(--foreground)]"}`} 
              style={{ 
                letterSpacing: "-0.02em"
              }}>
              GET IN TOUCH
            </div>
            <div className={`text-sm md:text-base ${theme === "spotlight" ? "text-[var(--primary)]" : "text-[var(--foreground)]/80"}`}>{formattedDate}</div>
          </div>

          <div className="flex items-center space-x-4">
            <div 
              className={`uppercase font-bold ${theme === "spotlight" ? "text-[var(--primary)]" : "text-[var(--foreground)]"}`} 
              style={{ 
                letterSpacing: "-0.02em"
              }}>
              {theme === "blackout" ? "BLACKOUT" : "SPOTLIGHT"}
            </div>
            <button 
              onClick={toggleTheme} 
              className={`theme-toggle ${theme === "spotlight" ? "border border-black" : "border border-white/30"}`} 
              aria-label="Toggle theme"
            >
              <span className={`theme-toggle-thumb ${theme === "spotlight" ? "translate-x-6 bg-black" : "translate-x-1 bg-white"}`} />
            </button>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="text-center mb-16 md:mb-24 px-4"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 90 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 
            className={`text-2xl md:text-4xl font-bold mb-8 uppercase tracking-tight ${theme === "spotlight" ? "text-[var(--primary)]" : "text-[var(--foreground)]"}`}
            style={{ 
              letterSpacing: "-0.03em"
            }}
          >
            UNDERGROUND
          </h2>
          <a
            href="mailto:UNDERGROUNDBASEMENT@GMAIL.COM"
            className={`uppercase font-bold text-xl md:text-5xl inline-block transition-colors duration-300 break-all md:break-normal tracking-tight ${theme === "spotlight" ? "text-[var(--primary)] hover:text-black" : "text-white hover:text-[var(--primary)]"}`}
            style={{ 
              letterSpacing: "-0.03em"
            }}
          >
            UNDERGROUNDBASEMENT@GMAIL.COM
            <span className={`hidden md:inline-block ml-4 text-sm uppercase normal-case ${theme === "spotlight" ? "text-[var(--primary)]" : "text-white"}`}>COPY EMAIL</span>
          </a>

          <div 
            className={`uppercase font-bold text-lg md:text-3xl mt-8 break-words tracking-tight ${theme === "spotlight" ? "text-[var(--primary)]" : "text-white"}`}
            style={{ 
              letterSpacing: "-0.02em"
            }}
          >
            +234 (0) 802 565 9604,
            <br className="md:hidden" /> 
            +234 (0) 704 191 1074
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16 md:mb-24 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            staggerChildren: 0.1,
            type: "spring",
            stiffness: 80
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Link to="/newsletter" className={`uppercase font-medium tracking-wide ${theme === "spotlight" ? "text-[var(--primary)] hover:text-black" : "text-white hover:text-[var(--primary)]"}`}>
            JOIN THE NEWSLETTER
          </Link>
          <Link to="/instagram" className={`uppercase font-medium tracking-wide ${theme === "spotlight" ? "text-[var(--primary)] hover:text-black" : "text-white hover:text-[var(--primary)]"}`}>
            INSTAGRAM
          </Link>
          <Link to="/twitter" className={`uppercase font-medium tracking-wide ${theme === "spotlight" ? "text-[var(--primary)] hover:text-black" : "text-white hover:text-[var(--primary)]"}`}>
            TWITTER
          </Link>
          <Link to="/tiktok" className={`uppercase font-medium tracking-wide ${theme === "spotlight" ? "text-[var(--primary)] hover:text-black" : "text-white hover:text-[var(--primary)]"}`}>
            TIKTOK
          </Link>
          <Link to="/youtube" className={`uppercase font-medium tracking-wide ${theme === "spotlight" ? "text-[var(--primary)] hover:text-black" : "text-white hover:text-[var(--primary)]"}`}>
            YOUTUBE
          </Link>
          <Link to="/twitch" className={`uppercase font-medium tracking-wide ${theme === "spotlight" ? "text-[var(--primary)] hover:text-black" : "text-white hover:text-[var(--primary)]"}`}>
            TWITCH
          </Link>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs space-y-2 md:space-y-0 mt-auto pt-8 border-t border-[var(--foreground)]/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 70 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`${theme === "spotlight" ? "text-[var(--primary)]" : "text-white/80"}`}>©2025 UNDERGROUND BASEMENT® ALL RIGHTS RESERVED</div>
          <div className={`${theme === "spotlight" ? "text-[var(--primary)]" : "text-white/80"}`}>MADE BY: <span className="font-medium">GIDDY</span></div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
