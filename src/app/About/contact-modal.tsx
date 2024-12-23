"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react'

interface SocialLink {
  title: string
  icon: React.ReactNode
  href: string
  description: string
  color: string
}

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  personalInfo: {
    email: string
    linkedIn: string
    github: string
    twitter: string
  }
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  personalInfo,
}) => {
  const socialLinks: SocialLink[] = [
    {
      title: "Email",
      icon: <Mail className="h-5 w-5" />,
      href: `mailto:${personalInfo.email}`,
      description: "Send me an email directly",
      color: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    },
    {
      title: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: personalInfo.linkedIn,
      description: "Connect with me professionally",
      color: "bg-sky-100 text-sky-600 hover:bg-sky-200",
    },
    {
      title: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: personalInfo.github,
      description: "Check out my projects",
      color: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    },
    {
      title: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      href: personalInfo.twitter,
      description: "Follow me for updates",
      color: "bg-blue-100 text-blue-400 hover:bg-blue-200",
    },
  ]

  const handleSocialClick = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">
                  Let&apos;s Connect!
                </DialogTitle>
                <DialogDescription className="text-center px-4 sm:px-6">
                  Feel free to reach out through any platform below.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 p-4 sm:p-6">
                {socialLinks.map((link) => (
                  <motion.div
                    key={link.title}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => handleSocialClick(link.href)}
                      className={`w-full group relative flex items-center justify-between px-4 py-6 ${link.color} transition-all duration-300`}
                    >
                      <div className="flex items-center space-x-3">
                        {link.icon}
                        <div className="text-left">
                          <p className="text-sm font-medium">{link.title}</p>
                          <p className="text-xs opacity-70">{link.description}</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="px-4 sm:px-6 py-4 bg-gray-50 flex justify-end rounded-b-lg">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-300"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default ContactModal;