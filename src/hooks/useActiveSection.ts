'use client'

import { useState, useEffect } from 'react'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'hero'
      setActiveSection(hash)
    }

    handleHashChange() // Set initial active section based on URL hash
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const changeSection = (sectionId: string) => {
    console.log('Changing section to:', sectionId)
    window.history.pushState(null, '', `#${sectionId}`)
    setActiveSection(sectionId)
  }
  return { activeSection, changeSection }
}