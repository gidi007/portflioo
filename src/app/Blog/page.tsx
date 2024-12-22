'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/ui/section-header'
import { BlogCardSkeleton } from './BlogSkeleton'
import { BlogCard } from './BlogCard'
import { BlogPost } from '../../Types/blog'
import { blogPosts } from '../Blog/BlogPosts'

export default function Blog() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    )
  }

  const sharePost = async (post: BlogPost) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `/blog/${post.id}`
        })
      } else {
        await navigator.clipboard.writeText(`${post.title} - ${window.location.origin}/blog/${post.id}`)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <motion.section 
      id="blog" 
      className="py-20 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      aria-labelledby="blog-section-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={itemVariants}
          className="mb-12 md:mb-20"
        >
          <SectionHeader
            title="MY"
            highlight="BLOG"
            shadowText="INSIGHTS"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3].map(key => (
                <BlogCardSkeleton key={key} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <BlogCard
                    post={post}
                    isLiked={likedPosts.includes(post.id)}
                    onLike={toggleLike}
                    onShare={sharePost}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

