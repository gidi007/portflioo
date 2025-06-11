"use client"

import React from "react"
import { useState, memo } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  priority?: boolean
  onClick?: () => void
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  objectFit = "contain",
  priority = false,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setIsError(true)
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
      }}
    >
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-yellow-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}

      <img
        src={isError ? "/error-image.svg" : src}
        alt={alt}
        className={`w-full h-full object-${objectFit} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        style={{ objectFit }}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
      />

      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 text-yellow-400">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  )
}

export default memo(OptimizedImage)

