'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Home, User, Briefcase, Edit, Send, Moon, Sun, Menu, X, ChevronUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useActiveSection } from '@/context/ActiveSectionContext';
import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#hero', 'data-page': 'hero', icon: Home, label: 'HOME' },
  { href: '#about', 'data-page': 'about', icon: User, label: 'ABOUT' },
  { href: '#portfolio', 'data-page': 'portfolio', icon: Briefcase, label: 'WORK' },
  { href: '#blog', 'data-page': 'blog', icon: Edit, label: 'BLOG' },
  { href: '#contact', 'data-page': 'contact', icon: Send, label: 'CONTACT' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { activeSection, setActiveSection } = useActiveSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollDelta = latest - lastScrollY.current;
    const threshold = 5;

    if (Math.abs(scrollDelta) > threshold) {
      setIsNavVisible(
        scrollDelta < 0 || 
        latest < threshold || 
        isMobileMenuOpen
      );
      lastScrollY.current = latest;
    }
  });

  useEffect(() => {
    const handleResize = () => setIsMobileMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = useCallback((dataPage: string) => {
    setActiveSection(dataPage);
    setIsMobileMenuOpen(false);
  }, [setActiveSection]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    visible: { 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Theme Toggle & Mobile Menu Button */}
      <motion.div
        className="fixed top-6 right-6 z-50 flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <motion.button
          className={cn(
            "w-14 h-14 rounded-full",
            "bg-background/80 dark:bg-background/20",
            "backdrop-blur-sm border border-border",
            "flex items-center justify-center",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {theme === 'dark' ? (
                <Sun className="w-7 h-7 text-primary" />
              ) : (
                <Moon className="w-7 h-7 text-primary" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        <motion.button
          className={cn(
            "lg:hidden w-14 h-14 rounded-full",
            "bg-background/80 dark:bg-background/20",
            "backdrop-blur-sm border border-border",
            "flex items-center justify-center",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMobileMenuOpen ? 'close' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7 text-primary" />
              ) : (
                <Menu className="w-7 h-7 text-primary" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={cn(
              "lg:hidden fixed inset-y-0 right-0 z-40 w-64",
              "bg-background/95 dark:bg-background/95",
              "backdrop-blur-md border-l border-border"
            )}
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <motion.div 
              className="flex flex-col items-start justify-center h-full gap-8 px-8"
              variants={containerVariants}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  className="w-full"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className={cn(
                      "w-full text-left py-4 px-6 rounded-lg",
                      "transition-colors duration-200",
                      activeSection === item['data-page']
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent"
                    )}
                    onClick={() => handleNavClick(item['data-page'])}
                  >
                    <span className="flex items-center">
                      <item.icon className="w-6 h-6 mr-4" />
                      {item.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.div
            className="hidden lg:block fixed top-1/2 right-10 z-40 -translate-y-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <nav className="flex flex-col items-end space-y-6">
              {navItems.map((item, index) => (
                <NavItem
                  key={item.href}
                  {...item}
                  index={index}
                  isActive={activeSection === item['data-page']}
                  onClick={() => handleNavClick(item['data-page'])}
                />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {!isNavVisible && scrollY.get() > window.innerHeight && (
          <motion.button
            className={cn(
              "fixed bottom-24 right-6 z-50",
              "w-14 h-14 rounded-full",
              "bg-primary text-primary-foreground",
              "shadow-lg hover:shadow-xl",
              "flex items-center justify-center",
              "transition-all duration-300",
              "lg:bottom-10"
            )}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

