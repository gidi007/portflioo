"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { BlogCard } from "./BlogCard"
import { BlogModal } from "./BlogModal"
import type { BlogPost } from "../../Types/blog"
import { blogPosts } from "./BlogPosts"
import { cn } from "@/lib/utils"

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.section
      className={cn("min-h-screen", "bg-background dark:bg-background-dark", "py-20 lg:py-32")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <SectionHeader title="MY" highlight="BLOG" shadowText="INSIGHTS" />
        </motion.div>

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
            </motion.div>
          ) : (
            <motion.div
              key="posts"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} onPostClick={setSelectedPost} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Blog Modal */}
      <BlogModal post={selectedPost} isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} />
    </motion.section>
  )
}
