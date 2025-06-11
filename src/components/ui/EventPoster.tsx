"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react'
import { Link } from "react-router-dom"


interface EventPosterProps {
  title: string
  date: string
  time: string
  location: string
  imageUrl: string
  ticketUrl?: string
  className?: string
  subtitle?: string
  artists?: string[]
}

const EventPoster = ({
  title,
  date,
  time,
  location,
  imageUrl,
  ticketUrl,
  className = "",
  subtitle,
  artists = [],
}: EventPosterProps) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl shadow-2xl ${className} max-w-full mx-auto`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)" }}
    >
      {/* Vintage texture overlay */}
      <div 
        className="absolute inset-0 z-10 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      
      {/* Decorative border */}
      <div className="absolute inset-0 z-10 border-[3px] border-yellow-400/30 rounded-xl pointer-events-none m-1"></div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-yellow-400/60 rounded-tl-lg z-10 m-1"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-yellow-400/60 rounded-tr-lg z-10 m-1"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-yellow-400/60 rounded-bl-lg z-10 m-1"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-yellow-400/60 rounded-br-lg z-10 m-1"></div>

      {/* Poster Image */}
      <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
        <motion.img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2 }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        
        {/* Vintage color overlay */}
        <div className="absolute inset-0 bg-yellow-900/10 mix-blend-color"></div>
        
        {/* Event title with vintage styling */}
        <motion.div 
          className="absolute top-6 left-0 right-0 text-center px-4 z-20"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wider uppercase">
            {title}
          </h3>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 mt-2 font-medium italic">
              {subtitle}
            </p>
          )}
        </motion.div>
        
        {/* Artists list */}
        {artists.length > 0 && (
          <motion.div 
            className="absolute top-1/3 left-0 right-0 text-center px-4 z-20"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="space-y-1">
              {artists.map((artist, index) => (
                <div 
                  key={index} 
                  className={`text-xl md:text-2xl font-bold ${
                    index === 0 ? 'text-yellow-300' : 'text-white'
                  }`}
                >
                  {artist}
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* "LIVE" badge */}
        <motion.div 
          className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-12 z-20"
          initial={{ scale: 0, rotate: 45 }}
          whileInView={{ scale: 1, rotate: 12 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 0,
            transition: { duration: 0.3 } 
          }}
        >
          LIVE
        </motion.div>
      </div>
      
      {/* Event details with vintage styling */}
      <div className="bg-gradient-to-b from-gray-900 to-black p-6 md:p-8 relative">
        {/* Vintage line separator */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mb-6"></div>
        
        <div className="space-y-4">
          <motion.div 
            className="flex items-center text-yellow-400"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Calendar className="h-6 w-6 mr-4 flex-shrink-0" />
            <span className="text-base md:text-lg font-medium">{formatDate(date)}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center text-yellow-400"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Clock className="h-6 w-6 mr-4 flex-shrink-0" />
            <span className="text-base md:text-lg font-medium">{time}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center text-yellow-400"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <MapPin className="h-6 w-6 mr-4 flex-shrink-0" />
            <span className="text-base md:text-lg font-medium">{location}</span>
          </motion.div>
        </div>
        
        {/* Vintage line separator */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent my-6"></div>
        
        {ticketUrl && (
          <motion.div 
            className="mt-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to={ticketUrl}
              className="relative overflow-hidden flex items-center justify-center w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black py-4 rounded-lg font-bold text-lg shadow-[0_4px_0_rgb(202,138,4)] hover:shadow-[0_2px_0_rgb(202,138,4)] hover:translate-y-[2px] transition-all duration-200"
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-white/20"
                initial={{ x: "-100%", opacity: 0.5 }}
                animate={{ x: "100%", opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              />
              <Ticket className="h-6 w-6 mr-2" />
              GET TICKETS NOW
            </Link>
          </motion.div>
        )}
        
        {/* Vintage footer text */}
        <motion.div 
          className="text-center mt-6 text-yellow-400/60 text-sm italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Limited tickets available • First come, first served
        </motion.div>
      </div>
    </motion.div>
  )
}

export default EventPoster
