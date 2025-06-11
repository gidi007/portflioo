"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { preloadImages } from "../utils/performance"

interface AppContextType {
  isLoading: boolean
  isDarkMode: boolean
  toggleDarkMode: () => void
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (isOpen: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
  preloadAssets?: string[]
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, preloadAssets = [] }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode for this site
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Preload critical assets
  useEffect(() => {
    const loadAssets = async () => {
      try {
        if (preloadAssets.length > 0) {
          await preloadImages(preloadAssets)
        }
      } catch (error) {
        console.error("Failed to preload assets:", error)
      } finally {
        // Set loading to false after a minimum time to avoid flashes
        setTimeout(() => setIsLoading(false), 300)
      }
    }

    loadAssets()
  }, [preloadAssets])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isDarkMode,
        toggleDarkMode,
        isMobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

