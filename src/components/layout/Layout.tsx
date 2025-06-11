"use client"

import { motion } from "framer-motion"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { pageTransition } from "../../utils/animations"
import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <NavBar />
      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        transition={pageTransition.transition}
        className="flex-grow"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}

export default Layout

