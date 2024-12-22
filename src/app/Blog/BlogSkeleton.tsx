import { motion } from 'framer-motion';

export const BlogCardSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
  >
    <div className="relative h-48">
      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
    </div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse" />
      </div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse" />
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse" />
      </div>
    </div>
  </motion.div>
);

