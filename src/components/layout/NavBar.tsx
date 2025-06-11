"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"
import { motion, AnimatePresence } from "framer-motion"

const NavBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Check if we're on homepage
  const isHomepage = location.pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHomepage
            ? "bg-transparent" // Always transparent on homepage
            : scrolled
              ? "bg-[var(--background)]/95 backdrop-blur-sm"
              : "bg-transparent"
        }`}
      >
        <div className="container-fluid">
          {/* Desktop Layout */}
          <div className="hidden md:flex justify-between items-center py-6">
            {/* Left Side - Previous Events */}
            <div className="flex flex-col space-y-2">
              <div className={`uppercase font-bold text-sm ${isHomepage ? "text-white" : "text-primary"}`}>
                PREVIOUS EVENTS
              </div>
              <div className="flex flex-col space-y-1">
                <Link
                  to="/events"
                  className={`flex items-center text-sm ${isHomepage ? "text-white" : "text-secondary"}`}
                >
                  WET & WILD <span className="new-tag">NEW</span>
                </Link>
                <Link
                  to="/events"
                  className={`flex items-center text-sm ${isHomepage ? "text-white" : "text-secondary"}`}
                >
                  AFTER HOURS <span className="new-tag">NEW</span>
                </Link>
                <Link to="/events" className={`text-sm ${isHomepage ? "text-white" : "text-secondary"}`}>
                  VIEW ALL
                </Link>
              </div>
            </div>

            {/* Center - Main Navigation */}
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className={`uppercase font-bold text-sm hover:text-accent transition-colors ${isHomepage ? "text-white" : "text-primary"}`}
              >
                HOME
              </Link>
              <Link
                to="/tickets"
                className={`uppercase font-bold text-sm hover:text-accent transition-colors ${isHomepage ? "text-white" : "text-primary"}`}
              >
                GET TICKETS
              </Link>
              <button
                onClick={() => {
                  const footer = document.querySelector('footer')
                  if (footer) {
                    footer.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className={`uppercase font-bold text-sm hover:text-accent transition-colors ${isHomepage ? "text-white" : "text-primary"} cursor-pointer`}
              >
                CONTACT US
              </button>
            </div>

            {/* Right Side - Theme Toggle */}
            <div className="flex items-center space-x-4">
              <div className={`uppercase font-bold text-sm ${isHomepage ? "text-white" : "text-primary"}`}>
                {theme === "blackout" ? "BLACKOUT" : "SPOTLIGHT"}
              </div>
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                <span className={`theme-toggle-thumb ${theme === "spotlight" ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>

          {/* Mobile Layout - Only Menu Toggle */}
          <div className="md:hidden flex justify-end items-center py-4">
            <button
              className={`flex items-center space-x-2 uppercase font-bold text-sm ${isHomepage ? "text-white" : "text-primary"}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <div className="theme-toggle">
                <span className={`theme-toggle-thumb ${theme === "spotlight" ? "translate-x-6" : "translate-x-1"}`} />
              </div>
              <span>MENU</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black"
          >
            {/* Close Button */}
            <div className="container-fluid flex justify-end py-4">
              <button
                className="flex items-center space-x-2 text-accent uppercase font-bold text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="theme-toggle">
                  <span className="theme-toggle-thumb translate-x-6 bg-accent" />
                </div>
                <span>CLOSE</span>
              </button>
            </div>

            {/* Menu Content */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex-1 flex flex-col items-center justify-center space-y-8 text-center px-4"
            >
              <Link
                to="/"
                className="text-accent uppercase font-bold text-4xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                to="/events"
                className="text-accent uppercase font-bold text-4xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                EVENTS
              </Link>
              <Link
                to="/shop"
                className="text-accent uppercase font-bold text-4xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                MERCH
              </Link>
              <Link
                to="/tickets"
                className="text-accent uppercase font-bold text-4xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                GET TICKETS
              </Link>
              <button
                className="text-accent uppercase font-bold text-4xl"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setTimeout(() => {
                    const footer = document.querySelector('footer')
                    if (footer) {
                      footer.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }, 300)
                }}
              >
                CONTACT US
              </button>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:UNDERGROUNDBASEMENT@GMAIL.COM"
                  className="text-accent uppercase font-bold text-lg block border-b border-accent pb-1"
                >
                 UNDERGROUNDBASEMENT@GMAIL.COM
                </a>
                <div className="text-accent uppercase font-bold text-lg">
                  +234 (0) 802 565 9604, +234 (0) 704 191 1074
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="container-fluid flex justify-center space-x-6 py-8 text-xs uppercase"
            >
              <a href="https://instagram.com" className="text-secondary border-b border-secondary">
                INSTAGRAM
              </a>
              <a href="https://twitter.com" className="text-secondary border-b border-secondary">
                TWITTER
              </a>
              <a href="https://tiktok.com" className="text-secondary border-b border-secondary">
                TIKTOK
              </a>
              <a href="https://youtube.com" className="text-secondary border-b border-secondary">
                YOUTUBE
              </a>
              <a href="https://twitch.tv" className="text-secondary border-b border-secondary">
                TWITCH
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavBar
