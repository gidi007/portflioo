"use client"

import { useState, useEffect } from "react"

interface ImageLoaderOptions {
  placeholder?: string
  errorFallback?: string
  timeout?: number
}

export function useImageLoader(src: string, options: ImageLoaderOptions = {}) {
  const { placeholder = "/placeholder.svg", errorFallback = "/error-image.svg", timeout = 10000 } = options

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [imageSrc, setImageSrc] = useState(placeholder)

  useEffect(() => {
    if (!src) {
      setIsLoading(false)
      setImageSrc(placeholder)
      return
    }

    setIsLoading(true)
    setIsError(false)
    setImageSrc(placeholder)

    // Create new image to preload
    const image = new Image()
    image.src = src

    // Set up timeout to handle very slow loads
    const timeoutId = setTimeout(() => {
      setIsError(true)
      setIsLoading(false)
      setImageSrc(errorFallback)
    }, timeout)

    // Image successfully loaded
    image.onload = () => {
      clearTimeout(timeoutId)
      setIsLoading(false)
      setImageSrc(src)
    }

    // Image failed to load
    image.onerror = () => {
      clearTimeout(timeoutId)
      setIsError(true)
      setIsLoading(false)
      setImageSrc(errorFallback)
    }

    return () => {
      // Clean up
      image.onload = null
      image.onerror = null
      clearTimeout(timeoutId)
    }
  }, [src, placeholder, errorFallback, timeout])

  return { isLoading, isError, imageSrc }
}

