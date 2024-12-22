'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/section-header'
import { ContactForm } from './ContactForm'
import { socialLinks, contactInfo } from '../Contact/contactData'

export default function Contact() {
  const contactRef = useRef<HTMLElement>(null)
  const isInView = useInView(contactRef, { once: false, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <motion.section 
      id="contact" 
      className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      ref={contactRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={itemVariants}
        >
          <SectionHeader
            title="GET IN"
            highlight="TOUCH"
            shadowText="CONTACT"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-10"
          >
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Don&apos;t Be Shy!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Feel free to get in touch. I am always open to discussing new projects, 
                creative ideas, or opportunities to be part of your visions.
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              {contactInfo.map((item) => (
                <motion.div
                  key={item.title}
                  className="flex items-center group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                  variants={itemVariants}
                >
                  <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 transition-all group-hover:bg-primary/20 ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
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
              className="flex justify-center space-x-4 pt-4"
              variants={itemVariants}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center ${social.color} hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 shadow-md hover:shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div variants={itemVariants}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

