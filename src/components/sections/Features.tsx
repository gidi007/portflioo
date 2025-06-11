"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useTransform, useViewportScroll } from "framer-motion"
import { Calendar, Music, Radio, ShoppingBag, Ticket } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Features = () => {
  const navigate = useNavigate()
  const { scrollYProgress } = useViewportScroll()
  const [activeIndex, setActiveIndex] = useState(0)
  const [_, setHoveredIndex] = useState(-1)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<number>()

  const features = [
    {
      icon: Calendar,
      title: "BASEMENT FRIDAY",
      description: "Exclusive weekly underground events",
      image: "/images/basement-friday.jpg",
      link: "/friday",
    },
    {
      icon: Music,
      title: "TOP CHARTS",
      description: "Hottest underground tracks",
      image: "/images/music-charts.jpg",
      link: "/charts",
    },
    {
      icon: Radio,
      title: "UNDERGROUND RADAR",
      description: "Discover emerging talents",
      image: "/images/underground-radar.jpg",
      link: "/radar",
    },
    {
      icon: Ticket,
      title: "LIVE EVENTS",
      description: "Upcoming shows & gatherings",
      image: "/images/events.jpg",
      link: "/events",
    },
    {
      icon: ShoppingBag,
      title: "MERCH SHOP",
      description: "Official merchandise & exclusive gear",
      image: "/images/shop.jpg",
      link: "/shop",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2, ease: "easeInOut" },
    },
  }

  const cardVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.1, transition: { duration: 0.4, ease: "easeInOut" } },
  }

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate(${e.clientX * 0.03}px, ${e.clientY * 0.03}px)`
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % features.length)
    }, 5000)

    return () => clearInterval(intervalRef.current)
  }, [features.length])

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index)
    navigate(features[index].link)
  }

  const handleCardHover = (index: number) => {
    setHoveredIndex(index)
  }

  const handleCardLeave = () => {
    setHoveredIndex(-1)
  }

  return (
    <motion.section
      className="bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white py-32 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-16 text-center text-yellow-400">Discover Our Features</h2>
        <motion.div className="flex flex-wrap justify-center mb-16 gap-8 relative z-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-6 cursor-pointer transition-all duration-300 mx-2 rounded-lg shadow-lg relative z-20 ${
                index === activeIndex
                  ? "bg-gradient-to-r from-red-600 to-red-900 text-white scale-110"
                  : "bg-gray-800 text-gray-400 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-900 hover:text-white hover:scale-105"
              }`}
              onClick={() => handleFeatureClick(index)}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={cardVariants}
            >
              <feature.icon className="w-10 h-10 mb-4 text-yellow-400" />
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-md mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="bg-gradient-to-r from-red-800 to-gray-900 p-8 rounded-lg shadow-xl relative overflow-hidden"
          variants={containerVariants}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full z-0"
            style={{ y: backgroundY }}
            ref={backgroundRef}
          >
            <img
              src={features[activeIndex].image}
              alt={features[activeIndex].title}
              className="w-full h-full object-cover opacity-20"
            />
          </motion.div>
          <motion.h3 className="text-3xl font-bold mb-4 text-yellow-400 relative z-10">
            {features[activeIndex].title}
          </motion.h3>
          <motion.p className="text-lg text-gray-300 relative z-10">{features[activeIndex].description}</motion.p>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Features

