'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';

interface PopupProps {
  onVisibilityChange?: (visible: boolean) => void;
  delay?: number;
}

const Popup = ({ onVisibilityChange, delay = 5000 }: PopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Check if popup has been dismissed in this session
  useEffect(() => {
    const popupDismissed = sessionStorage.getItem('popupDismissed');
    if (popupDismissed !== 'true' && !hasBeenShown) {
      timerRef.current = window.setTimeout(() => {
        setIsVisible(true);
        setHasBeenShown(true);
        if (onVisibilityChange) onVisibilityChange(true);
      }, delay);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [delay, onVisibilityChange, hasBeenShown]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('popupDismissed', 'true');
    if (onVisibilityChange) onVisibilityChange(false);
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const popupVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            ref={popupRef}
            className="bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden w-full max-w-lg"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 z-10 
                  bg-yellow-300/90 rounded-full p-1 
                  hover:bg-yellow-300 
                  transition-all duration-300 
                  scale-90 hover:scale-100
                  focus:outline-none focus:ring-2 focus:ring-yellow-300"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-black" strokeWidth={3} />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                  <OptimizedImage
                    src="https://theundergroundbasement.com/wordpress/wp-content/uploads/2025/04/IMG_9946.webp"
                    alt="Underground Basement"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-3 text-yellow-300">Join the Underground</h2>
                  <p className="mb-5 text-gray-300">
                    Sign up for our newsletter and get a chance to win a free ticket to the next
                    Underground event!
                  </p>
                  <motion.button
                    className="
                      bg-yellow-300 text-black 
                      px-6 py-3 rounded-lg 
                      hover:bg-yellow-400 
                      transition-all duration-300 
                      text-lg font-semibold
                      focus:outline-none focus:ring-2 focus:ring-yellow-300
                    "
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe Now
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Popup);
