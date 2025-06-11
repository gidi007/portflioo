"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import NavBar from "../components/layout/NavBar"
import HeroSection from "../components/sections/HeroSection"
import ExploreSection from "../components/sections/ExploreSection"
import StepIntoVibeSection from "../components/sections/StepIntoTheVibeSection"
import WidgetsSection from "../components/sections/WidgetSection"
import TeamSection from "../components/sections/TeamSection"
import LoadingSpinner from "../components/ui/LoadingSpinner"

const HomePage: React.FC = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Loading simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)

    const timer = setTimeout(() => {
      clearInterval(interval)
      setLoadingProgress(100)
      setIsPageLoaded(true)
    }, 1200)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  if (!isPageLoaded) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black">
        <LoadingSpinner size="lg" />
        <div className="mt-6 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-yellow-400"
            style={{ width: `${loadingProgress}%` }}
            initial={{ width: "0%" }}
          />
        </div>
        <div className="mt-2 text-yellow-400 text-sm">
          {loadingProgress < 100 ? "Loading Underground..." : "Ready!"}
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/placeholder.svg?height=1080&width=1920')`,
      }}
    >
      {/* Hero Section with integrated background */}
      <div className="relative">
        <NavBar />
        <HeroSection />
      </div>

      {/* Rest of the content with solid background */}
      <div className="bg-[var(--background)]">
        <ExploreSection />
        <StepIntoVibeSection />
        <WidgetsSection />
        <TeamSection />
      </div>
    </div>
  )
}

export default HomePage
