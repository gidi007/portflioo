/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, MapPin, Mail, Phone, Facebook, Twitter, Youtube, Dribbble, CheckCircle2, AlertTriangle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'

// Enhanced Type Definitions
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'text-blue-600' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'text-sky-400' },
  { icon: Youtube, href: '#', label: 'Youtube', color: 'text-red-600' },
  { icon: Dribbble, href: '#', label: 'Dribbble', color: 'text-pink-500' },
]

const contactInfo = [
  {
    icon: MapPin,
    title: 'ADDRESS POINT',
    content: '123 Street Ohio, OH 750065, United States Of America',
    color: 'text-green-500'
  },
  {
    icon: Mail,
    title: 'MAIL ME!',
    content: 'favourbawa04@gmail.com',
    color: 'text-blue-400'
  },
  {
    icon: Phone,
    title: 'CALL ME!',
    content: '+234 808 683 1929',
    color: 'text-purple-500'
  },
]

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle')
  const contactRef = useRef<HTMLElement>(null)
  const isInView = useInView(contactRef, { once: false, amount: 0.1 })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmissionStatus('submitting')
    
    try {
      // Simulate form submission with error handling
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // Randomly simulate success or failure for demonstration
          Math.random() > 0.5 ? resolve() : reject(new Error('Random submission error'))
        }, 1500)
      })
      
      setSubmissionStatus('success')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        setSubmissionStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Submission error:', error)
      setSubmissionStatus('error')
      
      // Reset status after error display
      setTimeout(() => setSubmissionStatus('idle'), 2000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

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
    hidden: { opacity: 0, y: 50 },
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
    <section 
      id="contact" 
      className="relative py-16 md:py-24 bg-white dark:bg-gray-900 overflow-hidden"
      ref={contactRef}
    >
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -z-10" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          title="GET IN"
          highlight="TOUCH"
          shadowText="CONTACT"
        />

        <motion.div 
          className="grid md:grid-cols-2 gap-10 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Column - Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Don&apos;t Be Shy !
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
                  className="flex items-center group"
                  variants={itemVariants}
                >
                  <div className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mr-4 transition-all group-hover:bg-primary/20 group-hover:scale-105 ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">
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
                  className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${social.color} hover:bg-primary/10 transition-all`}
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
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 relative"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              {submissionStatus === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 z-10"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                  <p className="text-xl font-semibold text-green-600">
                    Message Sent Successfully!
                  </p>
                </motion.div>
              )}
              
              {submissionStatus === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 z-10"
                >
                  <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
                  <p className="text-xl font-semibold text-red-600">
                    Submission Failed. Please Try Again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid md:grid-cols-2 gap-6">
              {(['name', 'email'] as const).map((field) => (
                <motion.div
                  key={field}
                  variants={itemVariants}
                >
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`YOUR ${field.toUpperCase()}`}
                    className="w-full px-6 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-primary/50 focus:ring-0 transition-all duration-300 placeholder-gray-500"
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
                placeholder="YOUR SUBJECT"
                className="w-full px-6 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-primary/50 focus:ring-0 transition-all duration-300 placeholder-gray-500"
                required
                disabled={submissionStatus === 'submitting'}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="YOUR MESSAGE"
                rows={5}
                className="w-full px-6 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-primary/50 focus:ring-0 resize-none transition-all duration-300 placeholder-gray-500"
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
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}