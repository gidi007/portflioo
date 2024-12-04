'use client'
import { useActiveSection } from '@/context/ActiveSectionContext'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from '@/app/Hero/page'
import About from '@/app/About/page'
import Portfolio from '@/app/Portfolio/page'
import Blog from '@/app/Blog/page'
import Contact from '@/app/Contact/page'

export default function Home() {
  const { activeSection, setActiveSection } = useActiveSection()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (!activeSection) {
        setActiveSection('hero')
      }
      console.log('Active Section:', activeSection)
    } catch (err) {
      console.error('Error in section initialization:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [activeSection, setActiveSection])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!activeSection) {
    return <div>Loading...</div>
  }

  const sectionVariants = {
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 }
  }

  const sections = {
    'hero': Hero,
    'about': About,
    'portfolio': Portfolio,
    'blog': Blog,
    'contact': Contact
  }

  const ActiveSection = sections[activeSection as keyof typeof sections]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSection}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={sectionVariants}
        className="min-h-screen overflow-y-auto"
      >
        {ActiveSection ? <ActiveSection /> : <div>Section not found</div>}
      </motion.div>
    </AnimatePresence>
  )
}