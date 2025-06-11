"use client"

import { useState } from "react"
import { Heart, ShoppingBag, X, Eye, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import NavBar from "../components/layout/NavBar"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  sizes?: string[]
  colors?: string[]
  description: string
  featured?: boolean
  isNew?: boolean
}

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState<string>()
  const [selectedColor, setSelectedColor] = useState<string>()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [cart, setCart] = useState<{product: Product, size?: string, color?: string, quantity: number}[]>([])

  const categories = ["all", "apparel", "accessories", "vinyl", "digital"]

  const products: Product[] = [
    {
      id: 1,
      name: "UNDERGROUND LOGO TEE",
      price: 35,
      image: "/placeholder.svg?height=400&width=400",
      category: "apparel",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White"],
      description: "Classic underground vibes with our signature logo. Premium quality cotton for maximum comfort.",
      featured: true,
      isNew: true
    },
    {
      id: 2,
      name: "BASEMENT SNAPBACK",
      price: 25,
      image: "/placeholder.svg?height=400&width=400",
      category: "accessories",
      colors: ["Black", "Grey"],
      description: "Adjustable snapback with embroidered logo. One size fits all.",
      isNew: true
    },
    {
      id: 3,
      name: "UNDERGROUND VINYL COLLECTION",
      price: 45,
      image: "/placeholder.svg?height=400&width=400",
      category: "vinyl",
      description: "Limited edition vinyl featuring underground artists. Collector's item.",
      featured: true
    },
    {
      id: 4,
      name: "DIGITAL MIXTAPE VOL.1",
      price: 15,
      image: "/placeholder.svg?height=400&width=400",
      category: "digital",
      description: "Exclusive digital download of our latest underground mixtape."
    },
    {
      id: 5,
      name: "UNDERGROUND HOODIE",
      price: 55,
      image: "/placeholder.svg?height=400&width=400",
      category: "apparel",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Grey"],
      description: "Premium heavyweight hoodie with embroidered logo."
    },
    {
      id: 6,
      name: "BASEMENT BEANIE",
      price: 20,
      image: "/placeholder.svg?height=400&width=400",
      category: "accessories",
      colors: ["Black", "Red"],
      description: "Keep it underground even in the cold with our signature beanie."
    }
  ]

  const filteredProducts = products.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory,
  )

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
    }
  }

  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    if (product.sizes && !size) {
      alert("Please select a size")
      return
    }
    if (product.colors && !color) {
      alert("Please select a color")
      return
    }
    
    // Add to cart logic
    const newItem = {
      product,
      size,
      color,
      quantity: 1
    }
    
    setCart([...cart, newItem])
    // Close quick view if open
    if (quickViewProduct) {
      setQuickViewProduct(null)
    }
  }

  return (
    <>
      <NavBar />
      <main className="bg-[var(--background)] min-h-screen pt-24 pb-16">
        <div className="container-fluid">
          {/* Back to Home */}
          <div className="py-4">
            <Link to="/" className="inline-flex items-center text-subtle hover:text-accent transition-colors">
              <span className="text-sm uppercase font-bold">Back to Home</span>
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[var(--text-primary)] text-4xl md:text-6xl font-bold">MERCH</h1>
              <div className="relative">
                <ShoppingBag className="h-8 w-8 text-[var(--text-accent)]" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-[var(--background)] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
            <p className="text-[var(--text-secondary)] text-lg mb-8">Rep the underground with our exclusive merchandise</p>
          </motion.div>

          {/* Featured Products */}
          {selectedCategory === "all" && (
            <div className="mb-16">
              <h2 className="text-[var(--text-primary)] text-2xl font-bold mb-6">FEATURED ITEMS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.filter(p => p.featured).map((product) => (
                  <motion.div 
                    key={`featured-${product.id}`}
                    whileHover={{ y: -5 }}
                    className="bg-[var(--muted)] rounded-lg overflow-hidden group cursor-pointer"
                    onClick={() => setQuickViewProduct(product)}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {product.isNew && (
                        <div className="absolute top-4 left-4">
                          <span className="new-tag">NEW</span>
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-2xl font-bold group-hover:text-[var(--text-accent)] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-white/80 text-lg mt-2">${product.price}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category 
                    ? "bg-[var(--primary)] text-[var(--background)]" 
                    : "border border-[var(--foreground)]/20 text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text-accent)]"
                } transition-colors uppercase font-bold text-sm`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[var(--muted)] rounded-lg overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {product.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="new-tag">NEW</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      className="p-2 rounded-full bg-[var(--background)]/80 hover:bg-[var(--background)] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      aria-label="Add to wishlist"
                    >
                      <Heart 
                        className={`h-5 w-5 ${wishlist.includes(product.id) ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-[var(--text-primary)]'}`} 
                      />
                    </button>
                    <button
                      className="p-2 rounded-full bg-[var(--background)]/80 hover:bg-[var(--background)] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        setQuickViewProduct(product)
                      }}
                      aria-label="Quick view"
                    >
                      <Eye className="h-5 w-5 text-[var(--text-primary)]" />
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-[var(--text-primary)] text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">{product.description}</p>
                  <p className="text-[var(--text-accent)] text-lg font-bold mb-4">${product.price}</p>

                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="w-full py-3 bg-[var(--primary)] text-[var(--background)] font-bold rounded-md hover:bg-opacity-90 hover:bg-[var(--primary)] transition-colors uppercase text-sm tracking-wider"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-[var(--text-secondary)] text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
          
          {/* Quick View Modal */}
          <AnimatePresence>
            {quickViewProduct && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={() => setQuickViewProduct(null)}
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="bg-[var(--background)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative p-6">
                    <button 
                      className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--muted)] transition-colors"
                      onClick={() => setQuickViewProduct(null)}
                    >
                      <X className="h-6 w-6 text-[var(--text-primary)]" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <img 
                          src={quickViewProduct.image} 
                          alt={quickViewProduct.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div>
                        {quickViewProduct.isNew && (
                          <span className="new-tag mb-4 inline-block">NEW</span>
                        )}
                        
                        <h2 className="text-[var(--text-primary)] text-2xl font-bold mb-4">
                          {quickViewProduct.name}
                        </h2>
                        
                        <p className="text-[var(--text-accent)] text-2xl font-bold mb-6">
                          ${quickViewProduct.price}
                        </p>
                        
                        <p className="text-[var(--text-secondary)] mb-6">
                          {quickViewProduct.description}
                        </p>
                        
                        {/* Size Selection */}
                        {quickViewProduct.sizes && (
                          <div className="mb-6">
                            <p className="text-[var(--text-primary)] font-medium mb-2">SIZE:</p>
                            <div className="flex flex-wrap gap-2">
                              {quickViewProduct.sizes.map((size) => (
                                <button
                                  key={size}
                                  onClick={() => setSelectedSize(size)}
                                  className={`min-w-[3rem] h-10 flex items-center justify-center rounded-md border ${selectedSize === size
                                    ? "bg-[var(--primary)] text-[var(--background)] border-[var(--primary)]"
                                    : "border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)]"
                                  } transition-colors`}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Color Selection */}
                        {quickViewProduct.colors && (
                          <div className="mb-6">
                            <p className="text-[var(--text-primary)] font-medium mb-2">COLOR:</p>
                            <div className="flex flex-wrap gap-2">
                              {quickViewProduct.colors.map((color) => (
                                <button
                                  key={color}
                                  onClick={() => setSelectedColor(color)}
                                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${selectedColor === color
                                    ? "ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--background)]"
                                    : ""
                                  } transition-all`}
                                  style={{ backgroundColor: color.toLowerCase() }}
                                  aria-label={color}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                          <button
                            onClick={() => handleAddToCart(quickViewProduct, selectedSize, selectedColor)}
                            className="flex-1 py-3 px-6 bg-[var(--primary)] text-[var(--background)] font-bold rounded-md hover:bg-opacity-90 hover:bg-[var(--primary)] transition-colors uppercase text-sm tracking-wider flex items-center justify-center gap-2"
                          >
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart
                          </button>
                          
                          <button
                            onClick={() => toggleWishlist(quickViewProduct.id)}
                            className={`flex-1 py-3 px-6 font-bold rounded-md transition-colors uppercase text-sm tracking-wider flex items-center justify-center gap-2 ${wishlist.includes(quickViewProduct.id) 
                              ? "bg-[var(--accent)] text-[var(--background)]" 
                              : "border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)]"
                            }`}
                          >
                            <Heart className={wishlist.includes(quickViewProduct.id) ? "h-5 w-5 fill-current" : "h-5 w-5"} />
                            {wishlist.includes(quickViewProduct.id) ? "Wishlisted" : "Add to Wishlist"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}

export default Shop

