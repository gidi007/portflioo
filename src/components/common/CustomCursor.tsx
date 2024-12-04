'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface CursorProps {
  zIndex?: number
}

export const CustomCursor: React.FC<CursorProps> = ({ zIndex = 9999 }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = useMemo(() => ({ 
    damping: 15, 
    stiffness: 300, 
    mass: 0.1 
  }), [])

  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Detect mobile devices more robustly
  const checkMobile = useCallback(() => {
    const mobileCheck = 
      typeof window !== 'undefined' && (
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      )
    
    return mobileCheck
  }, [])

  // Optimized mouse move handler
  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }, [cursorX, cursorY])

  // Hover detection with more comprehensive selector
  const handleHoverStart = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const isInteractive = 
      target.tagName === 'BUTTON' || 
      target.tagName === 'A' || 
      target.getAttribute('role') === 'button' ||
      target.closest('button, a, [role="button"], .interactive')
    
    setIsHovering(!!isInteractive)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setIsHovering(false)
  }, [])

  useEffect(() => {
    // Ensure this only runs on client
    setIsClient(true)
    
    // Mobile detection
    setIsMobile(checkMobile())
  }, [checkMobile])

  useEffect(() => {
    // Only attach listeners if not mobile and on client
    if (!isMobile && isClient) {
      window.addEventListener('mousemove', moveCursor)
      document.addEventListener('mouseover', handleHoverStart, true)
      document.addEventListener('mouseout', handleHoverEnd, true)

      // Disable default cursor
      document.body.style.cursor = 'none'

      return () => {
        window.removeEventListener('mousemove', moveCursor)
        document.removeEventListener('mouseover', handleHoverStart)
        document.removeEventListener('mouseout', handleHoverEnd)
        
        // Restore default cursor
        document.body.style.cursor = 'auto'
      }
    }
  }, [isMobile, isClient, moveCursor, handleHoverStart, handleHoverEnd])

  // No render if mobile or not client-side
  if (isMobile || !isClient) return null

  return (
    <>
      {/* Main large cursor circle */}
      <motion.div
        className="fixed pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          zIndex,
          top: 0,
          left: 0,
          transform: `translateX(${cursorXSpring.get()}px) translateY(${cursorYSpring.get()}px)`
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <motion.div 
            className="absolute w-8 h-8 bg-primary rounded-full opacity-20"
            animate={{ scale: isHovering ? 1.2 : 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-4 h-4 bg-primary rounded-full"
            animate={{ scale: isHovering ? 0.8 : 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Small cursor dot */}
      <motion.div
        className="fixed pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          zIndex: zIndex - 1,
          top: 0,
          left: 0,
          transform: `translateX(${cursorX.get()}px) translateY(${cursorY.get()}px)`
        }}
      >
        <div className="w-2 h-2 bg-primary rounded-full opacity-50" />
      </motion.div>
    </>
  )
}

export default CustomCursor