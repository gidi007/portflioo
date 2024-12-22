import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Tag, Heart, Share2, ExternalLink } from 'lucide-react';
import { BlogPost, TAG_COLORS } from '../../Types/blog';

interface BlogCardProps {
  post: BlogPost;
  isLiked: boolean;
  onLike: (id: number) => void;
  onShare: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, isLiked, onLike, onShare }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.div
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <motion.span 
            className="text-sm text-gray-600 dark:text-gray-300"
            whileHover={{ scale: 1.05 }}
          >
            {post.date}
          </motion.span>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLike(post.id)}
              className={`transition-colors duration-300 ${
                isLiked 
                  ? 'text-red-500' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart 
                size={20} 
                fill={isLiked ? 'currentColor' : 'none'} 
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onShare(post)}
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </div>

        <motion.h3 
          className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300"
          layout
        >
          {post.title}
        </motion.h3>

        <motion.div
          className="mb-4"
          animate={{ height: isExpanded ? 'auto' : '4.5rem' }}
        >
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
            {post.excerpt}
          </p>
        </motion.div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${TAG_COLORS[tag]}`}
              >
                <Tag size={12} className="mr-1" />
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock size={16} className="mr-1" />
            {post.readTime}
          </div>
          
          {post.mediumUrl && (
            <motion.a
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2 text-xl  ">Medium</span>
              <ExternalLink size={16} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

