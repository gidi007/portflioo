"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiX } from "react-icons/fi"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import SwiperCore from "swiper"
import { useFetchGalleryQuery } from "./usecase.ts"

SwiperCore.use([Navigation, Pagination])

const Gallery = () => {
  const { data } = useFetchGalleryQuery()

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<GalleryImage>()

  const openLightbox = (image: GalleryImage) => {
    setLightboxImage(image)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage(undefined)
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20 relative overflow-hidden">
      {/* Floating gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-transparent opacity-20 z-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <h2 className="text-4xl font-bold text-yellow-400 text-center mb-16">Moments from The Underground</h2>

        {/* Desktop Gallery */}
        <motion.div
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {data?.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative h-80 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl cursor-pointer"
              onClick={() => openLightbox(image)}
              whileHover={{ scale: 1.05, rotate: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: index * 0.2,
                duration: 0.6,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              {/* Animated Label */}
              <motion.div
                className="absolute bottom-4 left-4 bg-black/70 text-yellow-300 px-3 py-1 rounded-lg text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {image.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Image Carousel */}
        <div className="md:hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            loop
            className="w-full"
          >
            {data?.map((image) => (
              <SwiperSlide key={image.id}>
                <motion.div
                  className="relative h-80 overflow-hidden rounded-xl shadow-lg cursor-pointer"
                  onClick={() => openLightbox(image)}
                >
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 bg-black/70 text-yellow-300 px-3 py-1 rounded-lg text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    {image.label}
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Lightbox for Enlarged View */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            className="relative max-w-4xl w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 transition-colors text-2xl"
            >
              <FiX />
            </button>
            <motion.img
              src={lightboxImage?.src}
              alt={lightboxImage?.alt}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="mt-4 text-center text-yellow-300 font-bold text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {lightboxImage?.label}
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Subtle floating animation */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        onMouseMove={(e) => {
          e.currentTarget.style.transform = `translate(${e.clientX * 0.05}px, ${e.clientY * 0.05}px)`
        }}
      >
        <div className="w-96 h-96 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full blur-3xl opacity-20" />
      </motion.div>
    </div>
  )
}

export default Gallery

