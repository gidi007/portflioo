"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { BlogPost } from "../../Types/blog"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  post: BlogPost
  onPostClick: (post: BlogPost) => void
  index: number
}

export function BlogCard({ post, onPostClick, index }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      onClick={() => onPostClick(post)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "bg-background-light dark:bg-background-darker",
          "rounded-2xl overflow-hidden",
          "shadow-lg hover:shadow-2xl",
          "transition-all duration-500",
          "border border-border-light dark:border-border-dark",
        )}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn("object-cover transition-transform duration-500", "group-hover:scale-110")}
            priority={index < 3}
          />
        </div>

        {/* Content */}
        <div
          className={cn(
            "p-6 lg:p-8",
            "bg-background-light dark:bg-background-darker",
            "transition-colors duration-300",
          )}
        >
          {/* Date and Read Time */}
          <div className="flex items-center justify-between mb-4">
            <span className={cn("text-sm font-medium", "text-foreground-light dark:text-muted-dark")}>{post.date}</span>
            <span className={cn("text-sm", "text-foreground-light dark:text-muted-dark")}>{post.readTime}</span>
          </div>

          {/* Title */}
          <motion.h3
            className={cn(
              "text-xl lg:text-2xl font-bold mb-4",
              "text-foreground dark:text-foreground-dark",
              "line-clamp-2",
              "transition-colors duration-300",
            )}
            animate={{
              color: isHovered ? "var(--primary-500)" : undefined,
            }}
          >
            {post.title}
          </motion.h3>

          {/* Excerpt */}
          <p
            className={cn(
              "text-sm lg:text-base leading-relaxed",
              "text-foreground-light dark:text-muted-dark",
              "line-clamp-3",
            )}
          >
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full",
                  "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400",
                )}
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full",
                  "bg-border-light text-foreground-light dark:bg-border-dark dark:text-muted-dark",
                )}
              >
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
