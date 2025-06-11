"use client"

import type { Variants } from "framer-motion"

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Ease-in-out cubic bezier for a smooth feel
    },
  },
  exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.4 } },
  transition: {},
}

export const staggerChildren = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94], // Ease for staggered children animations
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2, // Adding delay to provide a bit more fluidity
    },
  },
}

