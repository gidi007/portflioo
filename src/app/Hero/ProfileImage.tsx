"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProfileImageProps {
  className?: string
  imageSrc: string
  alt?: string
}

export function ProfileImage({ className, imageSrc, alt = "Profile" }: ProfileImageProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Mobile: Circular Image */}
      <motion.div
        className={cn(
          "lg:hidden relative",
          "w-64 h-64 sm:w-80 sm:h-80",
          "rounded-full overflow-hidden",
          "bg-background-light dark:bg-background-darker",
          "ring-4 ring-primary-200/30 dark:ring-primary-700/30",
          "shadow-2xl",
          className,
        )}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="320px"
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Desktop: Rectangular Image */}
      <motion.div
        className={cn(
          "hidden lg:block relative",
          "w-full max-w-md xl:max-w-lg h-[500px] xl:h-[600px]",
          "rounded-3xl overflow-hidden",
          "bg-background-light dark:bg-background-darker",
          "shadow-2xl",
          className,
        )}
        initial={{ opacity: 0, scale: 0.9, x: -30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{
          duration: 1,
          delay: 0.2,
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 50vw, 40vw"
          className="object-cover object-center"
          priority
        />
      </motion.div>
    </div>
  )
}
