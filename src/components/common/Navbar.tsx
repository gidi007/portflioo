'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Home, User, Briefcase, Edit, Send, ChevronUp } from 'lucide-react';
import { useActiveSection } from '@/context/ActiveSectionContext';
import { NavItem } from './NavItem';
import { MobileNavToggle } from './MobileNavToggle';
import { MobileNavMenu } from './MobileNavMenu';
import { DesktopThemeToggle } from './DesktopThemeToggle';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#hero', 'data-page': 'hero', icon: Home, label: 'HOME' },
  { href: '#about', 'data-page': 'about', icon: User, label: 'ABOUT' },
  { href: '#portfolio', 'data-page': 'portfolio', icon: Briefcase, label: 'WORK' },
  { href: '#blog', 'data-page': 'blog', icon: Edit, label: 'BLOG' },
  { href: '#contact', 'data-page': 'contact', icon: Send, label: 'CONTACT' },
];

export default function Navbar() {
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

  const handleMobileMenuOpen = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
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

  return (
    <>
      {/* Desktop Theme Toggle */}
      <DesktopThemeToggle />

      {/* Mobile Navigation Toggle */}
      <MobileNavToggle 
        onMenuClick={handleMobileMenuOpen} 
        isMenuOpen={isMobileMenuOpen}
      />

      {/* Mobile Navigation Menu */}
      <MobileNavMenu 
        isOpen={isMobileMenuOpen} 
        onClose={handleMobileMenuClose} 
      />

      {/* Desktop Navigation */}
      <AnimatePresence>
        {isNavVisible && !isMobileMenuOpen && (
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
        {!isNavVisible && !isMobileMenuOpen && scrollY.get() > window.innerHeight && (
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