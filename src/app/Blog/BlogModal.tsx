"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Clock, Tag } from "lucide-react"
import Image from "next/image"
import { type BlogPost, TAG_COLORS } from "../../Types/blog"
import { cn } from "@/lib/utils"

interface BlogModalProps {
  post: BlogPost | null
  isOpen: boolean
  onClose: () => void
}

export function BlogModal({ post, isOpen, onClose }: BlogModalProps) {
  if (!post) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={cn(
              "fixed inset-4 lg:inset-8 z-50",
              "bg-background dark:bg-background-dark",
              "rounded-2xl shadow-2xl",
              "overflow-hidden",
              "border border-border-light dark:border-border-dark",
            )}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className={cn(
                "absolute top-6 right-6 z-10",
                "w-10 h-10 rounded-full",
                "bg-background-light/80 dark:bg-background-darker/80",
                "backdrop-blur-sm",
                "flex items-center justify-center",
                "text-foreground dark:text-foreground-dark",
                "hover:bg-primary-500 hover:text-white",
                "transition-all duration-300",
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Content */}
            <div className="h-full overflow-y-auto">
              {/* Header Image */}
              <div className="relative h-64 lg:h-80">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 space-y-6">
                {/* Meta Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-foreground-light dark:text-muted-dark">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h1 className={cn("text-2xl lg:text-3xl font-bold", "text-foreground dark:text-foreground-dark")}>
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className={cn("text-lg leading-relaxed", "text-foreground-light dark:text-muted-dark")}>
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "inline-flex items-center px-3 py-1 text-sm font-medium rounded-full",
                        TAG_COLORS[tag] ||
                          "bg-border-light text-foreground-light dark:bg-border-dark dark:text-muted-dark",
                      )}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Medium Link */}
                {post.mediumUrl && (
                  <motion.a
                    href={post.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2",
                      "px-6 py-3 rounded-full",
                      "bg-primary-500 text-white",
                      "hover:bg-primary-600",
                      "transition-colors duration-300",
                      "font-medium",
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read on Medium
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
