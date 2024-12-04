/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Clock, Tag, Heart, Share2, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import Head from 'next/head'

// Types
interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  readTime: string
  date: string
  tags: string[]
  mediumUrl?: string
}

// Tag color mapping
const TAG_COLORS: Record<string, string> = {
  'Productivity': 'bg-blue-100 text-blue-800',
  'Hacks': 'bg-purple-100 text-purple-800',
  'AI': 'bg-green-100 text-green-800',
  'Technology': 'bg-red-100 text-cyan-800',
  'Web Development': 'bg-indigo-100 text-indigo-800',
  'UI/UX': 'bg-pink-100 text-pink-800'
}

// Enhanced Skeleton Loader Component
const BlogCardSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden"
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
)

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Frontend Trends You Absolutely Need to Know About for 2025!',
    excerpt: 'The web dev world is like your favorite sitcom — there’s always a plot twist, a character you didn’t see coming, and that cliffhanger that keeps you hooked. If you want to stay in the game (and let’s be real, you do), you need... ',
    image: '/images/Blog/blog1.png',
    readTime: '2 min read',
    date: 'Oct 15, 2024',
    tags: ['Technology', 'AI','Web Development', 'Hacks', ],
    mediumUrl: 'https://medium.com/@bawgideo/10-frontend-trends-you-absolutely-need-to-know-about-for-2025-30ddc0750bb0'
  },
  {
    id: 2,
    title: 'From Average to Awesome: The Top 10 Power Moves Every Web Developer Needs In Their Arsenal to Level Up',
    excerpt: ' If you’re itching to go from a decent developer to an absolute web wizard, buckle up. Here are the ten most crucial things you need to level up — right now!',
    image: '/images/Blog/blog2.png',
    readTime: '2 min read',
    date: 'Dec 29, 2023',
    tags: ['Technology', 'Productivity','Web Development', 'Hacks', 'UI/UX',],
    mediumUrl: 'https://medium.com/@bawgideo/from-average-to-awesome-the-top-10-power-moves-every-web-developer-needs-in-their-arsenal-to-level-f87381545f4b'
  },
  {
    id: 3,
    title: 'MUST READ: 10 AI Productivity Hacks to Skyrocket Your Efficiency in The New Year!',
    excerpt: 'Productivity isn’t just a buzzword; it’s the secret sauce that separates the champions from the rest. And in 2024, if you’re not harnessing AI, you’re basically trying to win a Formula 1 race on a tricycle. These 10 AI productivity hacks will take you from mere mortal to productivity superhero!',
    image: '/images/Blog/blog3.png',
    readTime: '3 min read',
    date: 'Nov 8, 2024',
    tags: ['AI','Productivity','Hacks', ],
    mediumUrl: 'https://medium.com/@bawgideo/10-ai-productivity-hacks-to-skyrocket-your-efficiency-in-the-new-year-29900fbe024d'
  },
  {
    id: 4,
    title: '10 Mindset Shifts You Didn’t Know You Needed to Thrive in 2025!',
    excerpt: 'We hear a lot about tools and hacks, but let’s be real — none of that stuff matters if your mindset isn’t right. Thriving in 2025 isn’t about having the fanciest gadgets or trending widgets; it’s about shifting how you think...',
    image: '/images/Blog/blog4.png',
    readTime: '2 min read',  
    date: 'Dec 15, 2024',
    tags: ['Technology', 'Productivity', 'Hacks',],
    mediumUrl: 'https://medium.com/@bawgideo/10-mindset-shifts-you-didnt-know-you-needed-to-thrive-in-2025-a84f1b7ff492'
  },{
    id: 5,
    title: '10 Mindset Shifts You Didn’t Know You Needed to Thrive in 2025!',
    excerpt: 'We hear a lot about tools and hacks, but let’s be real — none of that stuff matters if your mindset isn’t right. Thriving in 2025 isn’t about having the fanciest gadgets or trending widgets; it’s about shifting how you think...',
    image: '/images/Blog/blog4.png',
    readTime: '2 min read',  
    date: 'Dec 15, 2024',
    tags: ['Technology', 'Productivity', 'Hacks',],
    mediumUrl: 'https://medium.com/@bawgideo/10-mindset-shifts-you-didnt-know-you-needed-to-thrive-in-2025-a84f1b7ff492'
  },{
    id: 6,
    title: '10 Mindset Shifts You Didn’t Know You Needed to Thrive in 2025!',
    excerpt: 'We hear a lot about tools and hacks, but let’s be real — none of that stuff matters if your mindset isn’t right. Thriving in 2025 isn’t about having the fanciest gadgets or trending widgets; it’s about shifting how you think...',
    image: '/images/Blog/blog4.png',
    readTime: '2 min read',  
    date: 'Dec 15, 2024',
    tags: ['Technology', 'Productivity', 'Hacks',],
    mediumUrl: 'https://medium.com/@bawgideo/10-mindset-shifts-you-didnt-know-you-needed-to-thrive-in-2025-a84f1b7ff492'
  },
  // Add more blog posts here
]

export default function Blog() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [expandedExcerpts, setExpandedExcerpts] = useState<number[]>([])
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const toggleExcerpt = (postId: number) => {
    setExpandedExcerpts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    )
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
    <section 
      id="blog" 
      className="py-20 overflow-hidden bg-gray-50 dark:bg-gray-900" 
      ref={sectionRef}
      aria-labelledby="blog-section-title"
    >
      <Head>
        <title>Blog - Insights and Articles</title>
        <meta 
          name="description" 
          content="Explore our collection of insightful articles on marketing, technology, and web development." 
        />
      </Head>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
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
                <motion.article
                  key={post.id}
                  variants={cardVariants}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  onHoverStart={() => setHoveredId(post.id)}
                  onHoverEnd={() => setHoveredId(null)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <motion.div
                      animate={hoveredId === post.id ? {
                        scale: 1.05,
                        transition: { duration: 0.4 }
                      } : { scale: 1 }}
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
                          onClick={() => toggleLike(post.id)}
                          className={`transition-colors duration-300 ${
                            likedPosts.includes(post.id) 
                              ? 'text-red-500' 
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <Heart 
                            size={20} 
                            fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'} 
                          />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => sharePost(post)}
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
                      animate={{ height: expandedExcerpts.includes(post.id) ? 'auto' : '4.5rem' }}
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
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-1" />
                        {post.readTime}
                      </div>
                      
                      {post.mediumUrl && (
                        <motion.a
                          href={post.mediumUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="mr-2">Read on Medium</span>
                          <ExternalLink size={16} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}