/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Briefcase, Edit, Send, Moon, Sun, Menu, X, ChevronUp } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useActiveSection } from '@/context/ActiveSectionContext'
import { NavItem } from './NavItem'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#hero', 'data-page': 'hero', icon: Home, label: 'HOME' },
  { href: '#about', 'data-page': 'about', icon: User, label: 'ABOUT' },
  { href: '#portfolio', 'data-page': 'portfolio', icon: Briefcase, label: 'WORK' },
  { href: '#blog', 'data-page': 'blog', icon: Edit, label: 'BLOG' },
  { href: '#contact', 'data-page': 'contact', icon: Send, label: 'CONTACT' },
]

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { activeSection, setActiveSection } = useActiveSection()
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(true)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const scrollDelta = currentScrollY - lastScrollY
    
    setIsScrollingDown(scrollDelta > 0)
    setLastScrollY(currentScrollY)
    setShowScrollToTop(currentScrollY > window.innerHeight)

    // Hide nav when scrolling down, show when scrolling up or at top
    if (scrollDelta > 10) {
      setIsNavVisible(false)
    } else if (scrollDelta < -10 || currentScrollY === 0) {
      setIsNavVisible(true)
    }
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleNavClick = (dataPage: string) => {
    setActiveSection(dataPage)
    setIsMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navContainerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: {
        duration: 0.3
      }
    }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <>
      {/* Theme Toggle and Mobile Menu Toggle */}
      <motion.div
        className="fixed top-4 right-4 z-50 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          className={cn(
            "w-12 h-12 rounded-full",
            "bg-background/80 backdrop-blur-sm",
            "border border-border",
            "flex items-center justify-center",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300"
          )}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        <motion.button
          className={cn(
            "lg:hidden w-12 h-12 rounded-full",
            "bg-background/80 backdrop-blur-sm",
            "border border-border",
            "flex items-center justify-center",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMobileMenuOpen ? 'close' : 'open'}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, index) => (
                <NavItem 
                  key={item.href}
                  {...item}
                  index={index}
                  isActive={activeSection === item['data-page']}
                  onClick={() => handleNavClick(item['data-page'])}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <motion.div 
        className="lg:hidden"
        variants={navContainerVariants}
        initial="hidden"
        animate={isNavVisible ? "visible" : "hidden"}
      >
        <motion.nav
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50",
            "bg-background/80 backdrop-blur-lg",
            "border-t border-border",
            "transition-transform duration-300"
          )}
          style={{
            willChange: 'transform',
            paddingBottom: 'env(safe-area-inset-bottom)'
          }}
        >
          <div className="flex justify-around items-center h-16 px-4">
            {navItems.map((item, index) => (
              <NavItem 
                key={item.href}
                {...item}
                index={index}
                isActive={activeSection === item['data-page']}
                onClick={() => handleNavClick(item['data-page'])}
              />
            ))}
          </div>
        </motion.nav>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.div 
        className="hidden lg:block"
        variants={navContainerVariants}
        initial="hidden"
        animate={isNavVisible ? "visible" : "hidden"}
      >
        <motion.nav
          className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end space-y-4"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {navItems.map((item, index) => (
            <NavItem 
              key={item.href}
              {...item}
              index={index}
              isActive={activeSection === item['data-page']}
              onClick={() => handleNavClick(item['data-page'])}
            />
          ))}
        </motion.nav>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className={cn(
              "fixed bottom-20 right-4 z-50",
              "w-12 h-12 rounded-full",
              "bg-primary text-primary-foreground",
              "flex items-center justify-center",
              "shadow-lg hover:shadow-xl",
              "transition-all duration-300",
              "lg:bottom-8"
            )}
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

