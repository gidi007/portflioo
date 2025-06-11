"use client"

import type React from "react"
import { motion } from "framer-motion"

const StepIntoVibeSection: React.FC = () => {
  const currentDate = new Date()
  const formattedDate = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".")

  return (
    <section className="bg-[var(--background)] py-16 md:py-20">
      <div className="container-fluid">
        {/* Header */}
        <motion.div
          className="flex justify-between items-start mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-[var(--foreground)] uppercase font-bold text-sm">ABOUT UNDERGROUND BASEMENT®</div>
          <div className="text-[var(--foreground)] uppercase font-bold text-sm">{formattedDate}</div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6 md:space-y-8 order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[var(--foreground)] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              STEP INTO THE VIBE
            </h2>

            <div className="space-y-4 md:space-y-6 text-[var(--foreground)] text-base md:text-lg leading-relaxed">
              <p>
                Underground Basement isn't just a party — it's a living, breathing celebration of connection, culture, and
                unforgettable nights.
              </p>

              <p>
                We started with a simple idea: bring good people together over great music, electric energy, and, of
                course, palm wine in hand. From our very first event, it was clear — this was more than just another
                night out. It's the feeling of walking into a space and instantly knowing you belong. It's the random
                dance-offs, the strangers who become family by the end of the night, and the kind of memories you'll be
                talking about long after the lights come up. Our parties are a melting pot of sounds and styles ranging
                from Afrobeats to Amapiano to Hip-Hop to Swedish House — we don't believe in limits, only in good vibes.
              </p>

              <p>
                Every detail is specially created to give you a fully immersive experience. Whether it's your first time
                or you're part of the  family already, you'll find yourself caught in the moment — losing track
                of time, making new connections, and living it up. Because here, we don't just throw parties. We create
                stories. We make memories. We turn nights into legends.
              </p>

              <p>
                Founded by <span className="text-[var(--primary)]">PEKS</span>,{" "}
                <span className="text-[var(--primary)]">TIMMY TVRNER</span> and our incredible team at,{" "}
                <span className="text-[var(--primary)]">UNDERGROUND BASEMENT</span>, every P&F event is backed by a team of stellar
                creatives and our evergrowing community.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative order-1 md:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
              <img
                src="/assets/images/logo.png"
                alt="Underground basement event logo"
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* Anniversary Image */}
        <motion.div
          className="mt-16 md:mt-24 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-2xl">
            <img
              src="https://sjc.microlink.io/hgAbE_RGfXfI8izHPX8qKVJYRSDuloNKI9NGejbgtnm63zxA06r9xR_z4qIOQxNAdBQVR-6MWaPGsaKz8SzMCA.jpeg"
              alt="1 Year Anniversary"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StepIntoVibeSection
