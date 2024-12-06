'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
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
    damping: 20, 
    stiffness: 300, 
    mass: 0.2 
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

  // Store the mouse position in a ref to prevent excess re-renders
  const mousePos = useRef({ x: -100, y: -100 })

  // Optimized mouse move handler using requestAnimationFrame
  const moveCursor = useCallback((e: MouseEvent) => {
    mousePos.current.x = e.clientX
    mousePos.current.y = e.clientY
  }, [])

  const updateCursorPosition = useCallback(() => {
    cursorX.set(mousePos.current.x)
    cursorY.set(mousePos.current.y)
    requestAnimationFrame(updateCursorPosition)
  }, [cursorX, cursorY])

  // Hover detection with a more comprehensive selector
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

      requestAnimationFrame(updateCursorPosition) // Start the animation frame loop

      return () => {
        window.removeEventListener('mousemove', moveCursor)
        document.removeEventListener('mouseover', handleHoverStart)
        document.removeEventListener('mouseout', handleHoverEnd)
        
        // Restore default cursor
        document.body.style.cursor = 'auto'
      }
    }
  }, [isMobile, isClient, moveCursor, handleHoverStart, handleHoverEnd, updateCursorPosition])

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
            scale: isHovering ? 1.7 : 1,
            opacity: isHovering ? 0.75 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <motion.div 
            className="absolute w-10 h-10 bg-primary rounded-full opacity-20"
            animate={{ scale: isHovering ? 1.3 : 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-5 h-5 bg-primary rounded-full"
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
        <div className="w-3 h-3 bg-primary rounded-full opacity-60" />
      </motion.div>
    </>
  )
}

export default CustomCursor
