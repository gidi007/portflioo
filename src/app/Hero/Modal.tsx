// Modal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const toggleZoom = () => setIsZoomed(!isZoomed);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-3xl p-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative">
          <motion.div
            key={currentImageIndex}
            className="flex items-center justify-center h-64 md:h-80"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {isLoading && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}
            <Image
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              width={800}
              height={600}
              className={cn(
                'max-w-full max-h-full object-contain transition-transform duration-300',
                isZoomed ? 'scale-150' : 'scale-100',
              )}
              onLoad={() => setIsLoading(false)}
              onClick={toggleZoom}
            />
          </motion.div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full focus:outline-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full focus:outline-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {images[currentImageIndex].link && (
          <div className="flex justify-center mt-4">
            <Link
              href={images[currentImageIndex].link!}
              target="_blank"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Details <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Modal;