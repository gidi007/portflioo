/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, MapPin, Mail, Phone, Facebook, Twitter, Youtube, Dribbble, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error"

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook", color: "text-blue-600 dark:text-blue-400" },
  { icon: Twitter, href: "#", label: "Twitter", color: "text-sky-500 dark:text-sky-400" },
  { icon: Youtube, href: "#", label: "Youtube", color: "text-red-600 dark:text-red-400" },
  { icon: Dribbble, href: "#", label: "Dribbble", color: "text-pink-500 dark:text-pink-400" },
]

interface EnhancedContactModalProps {
  className?: string
}

const contactInfo = [
  {
    icon: MapPin,
    title: "ADDRESS",
    content: "123 Street Ohio, OH 750065, United States",
    color: "text-green-600 dark:text-green-400"
  },
  {
    icon: Mail,
    title: "EMAIL",
    content: "contact@example.com",
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: Phone,
    title: "PHONE",
    content: "+1 (555) 123-4567",
    color: "text-purple-600 dark:text-purple-400"
  },
]

export function EnhancedContactModal({ className }: EnhancedContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmissionStatus("submitting")
    
    try {
      // Simulate form submission
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve() : reject(new Error("Random submission error"))
        }, 1500)
      })
      
      setSubmissionStatus("success")
      
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setSubmissionStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("Submission error:", error)
      setSubmissionStatus("error")
      setTimeout(() => setSubmissionStatus("idle"), 2000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-12 sm:h-14 px-6 sm:px-8",
                  "rounded-full sm:rounded-lg",
                  "bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600",
                  "text-white",
                  "shadow-lg hover:shadow-xl",
                  "ring-2 ring-amber-500/20 hover:ring-amber-600/20",
                  "transition-all duration-300 hover:scale-105 active:scale-98",
                  "font-medium text-base",
                  className)}
        >
          Contact Me
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[95vw] md:max-w-[80vw] lg:max-w-[1000px] p-0 overflow-hidden rounded-2xl border-2 border-primary/20 dark:border-primary/10 shadow-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Contact Form</DialogTitle>
        </DialogHeader>
        <motion.div 
          className="flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] overflow-y-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Contact Info */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 p-8 space-y-8 md:w-2/5"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Get in Touch
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Feel free to reach out. I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </motion.p>

            <motion.div className="space-y-6" variants={itemVariants}>
              {contactInfo.map((item) => (
                <motion.div
                  key={item.title}
                  className="flex items-center group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center mr-4 transition-all group-hover:shadow-lg ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex space-x-4 pt-4"
              variants={itemVariants}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center ${social.color} hover:shadow-lg transition-all`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            variants={itemVariants}
            className="p-8 bg-white dark:bg-gray-900 md:w-3/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <AnimatePresence mode="wait">
                {submissionStatus === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 z-10 rounded-lg"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                    <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                      Message Sent Successfully!
                    </p>
                  </motion.div>
                )}
                
                {submissionStatus === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 z-10 rounded-lg"
                  >
                    <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
                    <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                      Submission Failed. Please Try Again.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid md:grid-cols-2 gap-6">
                {(['name', 'email'] as const).map((field) => (
                  <motion.div key={field} variants={itemVariants}>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/25 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                      required
                      disabled={submissionStatus === 'submitting'}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/25 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                  required
                  disabled={submissionStatus === 'submitting'}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/25 resize-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                  required
                  disabled={submissionStatus === 'submitting'}
                />
              </motion.div>

              <motion.button
                type="submit"
                className="group flex items-center justify-center w-full space-x-3 bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
                disabled={submissionStatus === 'submitting'}
              >
                <span className="font-semibold tracking-wider">
                  {submissionStatus === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                </span>
                <Send className={`w-5 h-5 transition-transform ${submissionStatus === 'submitting' ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

