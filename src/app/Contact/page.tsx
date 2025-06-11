"use client"

import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Send } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    icon: MapPin,
    title: "ADDRESS POINT",
    content: "123 Street Ohio, OH, United States Of America 750065",
  },
  {
    icon: Mail,
    title: "MAIL ME!",
    content: "favourbawa04@gmail.com",
  },
  {
    icon: Phone,
    title: "CALL ME!",
    content: "+234 808 683 1929",
  },
]

export default function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <motion.section
      className={cn("min-h-screen", "bg-background dark:bg-background-dark", "py-20 lg:py-32")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <SectionHeader title="DON'T BE" highlight="SHY !" shadowText="CONTACT" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="grid lg:grid-cols-2 gap-16 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Contact Info */}
          <motion.div className="space-y-12" variants={itemVariants}>
            <motion.p
              className={cn("text-lg lg:text-xl leading-relaxed", "text-foreground-light dark:text-muted-dark")}
              variants={itemVariants}
            >
              Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </motion.p>

            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <motion.div key={item.title} className="flex items-start gap-6" variants={itemVariants} custom={index}>
                  <div
                    className={cn(
                      "w-12 h-12 lg:w-14 lg:h-14",
                      "rounded-full",
                      "bg-primary-500 dark:bg-primary-600",
                      "flex items-center justify-center",
                      "shadow-lg",
                    )}
                  >
                    <item.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3
                      className={cn(
                        "text-sm lg:text-base font-bold tracking-wider",
                        "text-foreground-light dark:text-muted-dark",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className={cn("text-base lg:text-lg", "text-foreground dark:text-foreground-dark")}>
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={itemVariants}>
            <form className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.input
                  type="text"
                  placeholder="YOUR NAME"
                  className={cn(
                    "w-full px-6 py-4 rounded-full",
                    "bg-background-light dark:bg-background-darker",
                    "border-2 border-border-light dark:border-border-dark",
                    "focus:border-primary-500 dark:focus:border-primary-400",
                    "text-foreground dark:text-foreground-dark",
                    "placeholder-foreground-light dark:placeholder-muted-dark",
                    "transition-all duration-300",
                    "focus:outline-none focus:ring-0",
                  )}
                  variants={itemVariants}
                />
                <motion.input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className={cn(
                    "w-full px-6 py-4 rounded-full",
                    "bg-background-light dark:bg-background-darker",
                    "border-2 border-border-light dark:border-border-dark",
                    "focus:border-primary-500 dark:focus:border-primary-400",
                    "text-foreground dark:text-foreground-dark",
                    "placeholder-foreground-light dark:placeholder-muted-dark",
                    "transition-all duration-300",
                    "focus:outline-none focus:ring-0",
                  )}
                  variants={itemVariants}
                />
              </div>

              {/* Subject */}
              <motion.input
                type="text"
                placeholder="YOUR SUBJECT"
                className={cn(
                  "w-full px-6 py-4 rounded-full",
                  "bg-background-light dark:bg-background-darker",
                  "border-2 border-border-light dark:border-border-dark",
                  "focus:border-primary-500 dark:focus:border-primary-400",
                  "text-foreground dark:text-foreground-dark",
                  "placeholder-foreground-light dark:placeholder-muted-dark",
                  "transition-all duration-300",
                  "focus:outline-none focus:ring-0",
                )}
                variants={itemVariants}
              />

              {/* Message */}
              <motion.textarea
                placeholder="YOUR MESSAGE"
                rows={6}
                className={cn(
                  "w-full px-6 py-4 rounded-2xl",
                  "bg-background-light dark:bg-background-darker",
                  "border-2 border-border-light dark:border-border-dark",
                  "focus:border-primary-500 dark:focus:border-primary-400",
                  "text-foreground dark:text-foreground-dark",
                  "placeholder-foreground-light dark:placeholder-muted-dark",
                  "transition-all duration-300",
                  "focus:outline-none focus:ring-0",
                  "resize-none",
                )}
                variants={itemVariants}
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={cn(
                  "relative overflow-hidden rounded-full",
                  "flex items-center",
                  "h-14 lg:h-16",
                  "transition-all duration-300",
                  "group",
                )}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center h-full">
                  <div
                    className={cn(
                      "px-8 lg:px-10 h-full flex items-center",
                      "border-2 rounded-l-full",
                      "border-foreground-light dark:border-primary-600",
                      "bg-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm lg:text-base font-medium tracking-wide",
                        "text-foreground dark:text-foreground-dark",
                      )}
                    >
                      SEND MESSAGE
                    </span>
                  </div>
                  <div
                    className={cn(
                      "h-full w-14 lg:w-16 flex items-center justify-center",
                      "rounded-r-full",
                      "bg-primary-500 dark:bg-primary-600",
                      "border-2 border-primary-500 dark:border-primary-600",
                    )}
                  >
                    <Send className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
