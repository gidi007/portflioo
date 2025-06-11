"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "blackout" | "spotlight"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("blackout")

  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme && (savedTheme === "blackout" || savedTheme === "spotlight")) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("spotlight", savedTheme === "spotlight")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "blackout" ? "spotlight" : "blackout"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("spotlight", newTheme === "spotlight")
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
