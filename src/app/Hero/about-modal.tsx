"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* Remove asChild here to test */}
      <DialogContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-lg w-full mx-4 md:mx-auto max-h-[85vh] overflow-y-auto",
            "border border-gray-200 dark:border-gray-700",
            "focus:outline-none"
          )}
        >
          {/* Remove asChild here to test */}
          <DialogClose>
            <button
              aria-label="Close"
              className="absolute -top-5 -right-5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="button"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-yellow-400" />
            </button>
          </DialogClose>

          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-yellow-400">
              About Me
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Learn more about my background, skills, and experience.
            </DialogDescription>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 pb-6 space-y-6 text-gray-800 dark:text-gray-300">
            {/* Biography */}
            <section>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-yellow-400">Biography</h3>
              <p className="leading-relaxed">
                I'm a passionate frontend developer with expertise in creating responsive, accessible, and performant web applications.
                With a strong foundation in modern JavaScript frameworks and a keen eye for design, I bridge the gap between
                functionality and aesthetics to deliver exceptional user experiences.
              </p>
              <p className="leading-relaxed mt-2">
                My journey in web development began over 5 years ago, and I've since worked with various technologies and teams
                to build solutions that solve real-world problems. I'm constantly learning and adapting to the ever-evolving
                landscape of web development.
              </p>
            </section>

            {/* Core Skills */}
            <section>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-yellow-400">Core Skills</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "React", "Next.js", "TypeScript",
                  "Tailwind CSS", "Framer Motion", "Responsive Design",
                  "Accessibility", "Performance Optimization", "UI/UX Design"
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-yellow-400 text-center"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Highlights */}
            <section>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-yellow-400">Experience Highlights</h3>
              <div className="space-y-4">
                {[
                  {
                    role: "Senior Frontend Developer",
                    company: "Tech Innovations Inc.",
                    period: "2021 - Present",
                    description: "Leading frontend development for enterprise applications, mentoring junior developers, and implementing best practices."
                  },
                  {
                    role: "Frontend Developer",
                    company: "Digital Solutions Ltd.",
                    period: "2019 - 2021",
                    description: "Developed responsive web applications using React and collaborated with UX designers to implement pixel-perfect interfaces."
                  },
                  {
                    role: "Web Developer Intern",
                    company: "StartUp Ventures",
                    period: "2018 - 2019",
                    description: "Assisted in building and maintaining company websites and gained hands-on experience with modern web technologies."
                  }
                ].map((exp, idx) => (
                  <div key={idx} className="border-l-2 border-yellow-400 dark:border-yellow-600 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-yellow-400">{exp.role}</h4>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>{exp.company}</span>
                      <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5 text-xs">{exp.period}</span>
                    </div>
                    <p className="mt-1 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-yellow-400">Education</h3>
              <div className="border-l-2 border-yellow-400 dark:border-yellow-600 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-yellow-400">BSc in Computer Science</h4>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>University of Technology</span>
                  <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5 text-xs">2015 - 2019</span>
                </div>
                <p className="mt-1 text-sm">
                  Specialized in web technologies and software engineering. Graduated with honors.
                </p>
              </div>
            </section>

            {/* Resume Button */}
            <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  asChild
                  className="group"
                >
                  <a
                    href="/FAVOUR BAWA - RESUME.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400"
                  >
                    View Full Resume
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </section>
          </div>
          </motion.div>
      </DialogContent>
    </Dialog>
  )
}
