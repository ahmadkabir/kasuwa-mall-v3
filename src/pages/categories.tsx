import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shirt,
  Smartphone,
  Home,
  Dumbbell,
  Sparkles,
  Book,
  Baby,
  Car,
  Package,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LoadingSkeleton } from '@/components/ui/loading-spinner'
import { categoryApi } from '@/lib/api/client'

// Icon mapping for categories
const categoryIcons: { [key: string]: any } = {
  FAS001: Shirt,
  ELE001: Smartphone,
  HOM001: Home,
  SPO001: Dumbbell,
  FAB001: Sparkles,
  BOO001: Book,
  BAB001: Baby,
  AUT001: Car,
  default: Package,
}

// Color mapping for categories (NACCIMA color theme)
const categoryColors: { [key: string]: string } = {
  FAS001: 'from-primary to-accent',
  ELE001: 'from-accent to-secondary',
  HOM001: 'from-secondary to-primary',
  SPO001: 'from-primary to-secondary',
  FAB001: 'from-primary to-secondary',
  BOO001: 'from-secondary to-accent',
  BAB001: 'from-secondary to-primary',
  AUT001: 'from-accent to-primary',
  default: 'from-primary to-secondary',
}

export default function CategoriesPage() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Shop by Category</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our carefully curated collection of product categories, each designed to bring you the finest selection and unmatched quality
        </p>
      </motion.div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <LoadingSkeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categories?.map((category: any) => {
            const Icon = categoryIcons[category.ctgry_id] || categoryIcons.default
            const gradientColor = categoryColors[category.ctgry_id] || categoryColors.default

            return (
              <motion.div
                key={category.ctgry_id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link to={`/categories/${category.ctgry_id}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card rounded-2xl overflow-hidden h-full group cursor-pointer"
                  >
                    {/* Category Image/Icon Section */}
                    <div className="relative h-48 overflow-hidden">
                      {category.ctgry_image_urls ? (
                        <img
                          src={category.ctgry_image_urls}
                          alt={category.ctgry_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
                          <Icon className="h-20 w-20 text-white/90" />
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="glass-button px-3 py-1 rounded-full">
                          <span className="text-xs font-semibold text-white">Category</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {category.ctgry_name}
                        </h3>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {category.description || (category as any).ctgry_description || `Explore our wide selection of ${category.ctgry_name.toLowerCase()} products`}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          <span>{category.product_count || 0} products</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`} />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && (!categories || categories.length === 0) && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No Categories Found</h3>
          <p className="text-muted-foreground">
            Categories will appear here once they are available
          </p>
        </div>
      )}

      {/* CTA Section */}
      {!isLoading && categories && categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 rounded-2xl text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6">
            Browse all products or use our search to find exactly what you need
          </p>
          <Link to="/products">
            <Button variant="gradient" size="lg">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
