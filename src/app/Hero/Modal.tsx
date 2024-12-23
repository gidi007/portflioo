/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, ZoomIn, ZoomOut, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Button } from '@/components/ui/button';

interface ModalImage {
  src: string;
  alt: string;
  link?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ModalImage[];
  title?: string;
  description?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  images,
  title = 'Image Gallery',
  description = 'Explore our collection of images.',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  }, [onClose]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown, handleClickOutside]);

  const nextImage = useCallback(() => {
    setIsZoomed(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setIsZoomed(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const toggleZoom = useCallback(() => setIsZoomed((prev) => !prev), []);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      nextImage();
    }
    if (touchStart - touchEnd < -150) {
      prevImage();
    }
  };

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = images[currentImageIndex].src;
    link.download = `image-${currentImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentImageIndex, images]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div 
              className="relative h-[60vh]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {isLoading && (
                    <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
                  )}
                  <Image
                    ref={imageRef}
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    fill
                    className={cn(
                      'object-contain transition-transform duration-300',
                      isZoomed ? 'scale-150' : 'scale-100',
                    )}
                    onLoad={() => setIsLoading(false)}
                    onClick={toggleZoom}
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && !isMobile && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex justify-between items-center p-4 border-t">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleZoom}
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4 mr-2" /> : <ZoomIn className="w-4 h-4 mr-2" />}
                  {isZoomed ? 'Zoom Out' : 'Zoom In'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              {images[currentImageIndex].link && (
                <Button
                  variant="default"
                  size="sm"
                  asChild
                >
                  <Link href={images[currentImageIndex].link!} target="_blank">
                    View Details <ExternalLink className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>

            {isMobile && (
              <div className="flex justify-center p-4 space-x-4 border-t">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

