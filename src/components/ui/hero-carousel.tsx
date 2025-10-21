import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  backgroundColor: string
}

// Kasuwa Mall promotional banner slides - using v2 images with v3 styling
const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Kasuwa Mall',
    subtitle: 'Your Premier Shopping Destination',
    description: 'Discover amazing deals and quality products at unbeatable prices',
    image: '/images/1-kasuwa-mall-ads-optimized.jpg',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    backgroundColor: 'from-kasuwa-primary to-kasuwa-brown'
  },
  {
    id: '2',
    title: 'Kasuwa Mall',
    subtitle: 'Quality Products, Great Prices',
    description: 'Experience the best shopping with fast delivery across Nigeria',
    image: '/images/2-kasuwa-mall-ads-optimized.jpg',
    ctaText: 'Explore Deals',
    ctaLink: '/products',
    backgroundColor: 'from-kasuwa-brown to-kasuwa-secondary'
  },
  {
    id: '3',
    title: 'Kasuwa Mall',
    subtitle: 'Shop with Confidence',
    description: 'Trusted by thousands of customers for quality and reliability',
    image: '/images/3-kasuwa-mall-ads-optimized.jpg',
    ctaText: 'Browse Categories',
    ctaLink: '/products',
    backgroundColor: 'from-kasuwa-secondary to-kasuwa-primary'
  },
  {
    id: '4',
    title: 'Kasuwa Mall',
    subtitle: 'Everything You Need',
    description: 'From fashion to electronics, find everything you need in one place',
    image: '/images/4-kasuwa-mall-ads-optimized.jpg',
    ctaText: 'Shop All',
    ctaLink: '/products',
    backgroundColor: 'from-kasuwa-primary to-secondary'
  },
  {
    id: '5',
    title: 'Kasuwa Mall',
    subtitle: 'Special Offers',
    description: 'Don\'t miss out on our exclusive deals and seasonal promotions',
    image: '/images/5-kasuwa-mall-ads-optimized.jpg',
    ctaText: 'View Offers',
    ctaLink: '/products',
    backgroundColor: 'from-kasuwa-secondary to-kasuwa-brown'
  },
  {
    id: '6',
    title: 'Kasuwa Mall',
    subtitle: 'Premium Shopping Experience',
    description: 'Join thousands of satisfied customers shopping at Kasuwa Mall',
    image: '/images/6-kasuwa-mall-ads-optimized.jpg',
    ctaText: 'Start Shopping',
    ctaLink: '/products',
    backgroundColor: 'from-kasuwa-brown to-primary'
  }
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
    )
  }, [])

  // Auto-play functionality (paused when user hovers over carousel)
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      goToNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered, goToNext])

  // Preload images to make them available
  useEffect(() => {
    const preloadImages = () => {
      heroSlides.forEach(slide => {
        const img = new Image()
        img.src = slide.image
      })
    }
    preloadImages()
  }, [])

  return (
    <div 
      className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_70%)]" />

      {/* Slides container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, index) => (
            index === currentIndex && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Image with overlay */}
                <div className="relative w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

                  {/* Glassmorphism content area */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="max-w-4xl mx-auto text-center px-6 py-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                      >
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                          <span className="gradient-text">{slide.title}</span>
                        </h2>
                        <p className="text-2xl md:text-3xl font-semibold text-white mb-6">
                          {slide.subtitle}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-2xl mx-auto"
                      >
                        <p className="text-lg md:text-xl text-white/90 mb-8">
                          {slide.description}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                      >
                        <Link to={slide.ctaLink}>
                          <Button 
                            size="xl" 
                            variant="gradient" 
                            className="group text-lg px-8 py-6"
                          >
                            {slide.ctaText}
                            <ShoppingBag className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                        
                        <Link to="/products">
                          <Button 
                            size="xl" 
                            variant="glass" 
                            className="text-lg px-8 py-6 bg-white/20 backdrop-blur-sm"
                          >
                            Browse Products
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>


      
      {/* Floating elements for modern effect */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-kasuwa-secondary to-kasuwa-primary rounded-full opacity-20 blur-lg"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-primary to-kasuwa-brown rounded-full opacity-20 blur-lg"
      />
    </div>
  )
}