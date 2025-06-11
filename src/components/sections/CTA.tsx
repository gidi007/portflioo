"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren } from "../../utils/animations"

const CTA = () => {
  return (
    <motion.section
      className="py-16 bg-black text-center"
      variants={staggerChildren.container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={staggerChildren.item} className="container mx-auto px-4">
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
          Don’t Miss Out!
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-lg max-w-2xl mx-auto mb-10">
          Ready to experience the music and culture? Join us for exclusive events and more.
        </motion.p>
        <Link
          to="/events"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
        >
          Explore Events
        </Link>
      </motion.div>
    </motion.section>
  )
}

export default CTA

