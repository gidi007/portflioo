"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Instagram, Twitter, Youtube, Music } from "lucide-react"

interface SocialLink {
  type: "instagram" | "twitter" | "youtube" | "spotify"
  url: string
}

interface MinimalLinkTreeProps {
  links: SocialLink[]
  className?: string
}

const MinimalLinkTree: React.FC<MinimalLinkTreeProps> = ({ links, className = "" }) => {
  const getIcon = (type: SocialLink["type"]) => {
    switch (type) {
      case "instagram":
        return <Instagram size={24} />
      case "twitter":
        return <Twitter size={24} />
      case "youtube":
        return <Youtube size={24} />
      case "spotify":
        return <Music size={24} />
      default:
        return null
    }
  }

  return (
    <div className={`flex justify-center space-x-8 ${className}`}>
      {links.map((link, index) => (
        <motion.a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {getIcon(link.type)}
        </motion.a>
      ))}
    </div>
  )
}

export default MinimalLinkTree
