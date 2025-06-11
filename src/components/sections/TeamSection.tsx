"use client"

import type React from "react"
import { motion } from "framer-motion"

interface TeamMember {
  name: string
  role: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    name: "DJ SHADOW",
    role: "Founder",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "NIGHT CRAWLER",
    role: "Creative Director",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "BASS MASTER",
    role: "Event Manager",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "SOUND SYSTEM",
    role: "Music Curator",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const TeamSection: React.FC = () => {
  return (
    <section className="bg-[var(--background)] py-16 md:py-20">
      <div className="container-fluid">
        <motion.h2
          className="section-title text-[var(--foreground)] text-center mb-12 md:mb-16 text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          MEET THE TEAM:
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto rounded-full overflow-hidden mb-4">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[var(--foreground)] font-bold text-base md:text-lg lg:text-xl">{member.name}</h3>
              <p className="text-[var(--foreground)]/60 text-sm md:text-base">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Anniversary Image */}
        <motion.div
          className="mt-16 md:mt-24 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-4xl">
            <img
              src="https://theundergroundbasement.com/wordpress/wp-content/uploads/2025/04/IMG_0833-scaled.webp"
              alt="Underground Basement Team"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TeamSection
