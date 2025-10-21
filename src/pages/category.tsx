import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeft, Filter, Grid, List, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/cards/product-card'
import { LoadingSkeleton } from '@/components/ui/loading-spinner'
import { productApi, categoryApi } from '@/lib/api/client'

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Fetch category details
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  })

  // Fetch products by category
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'category', id],
    queryFn: () => productApi.getByCategory(id!),
    enabled: !!id,
  })

  // Find current category
  const category = categories?.find((cat: any) => cat.ctgry_id === id)

  // Filter products by search
  const filteredProducts = products?.filter((product: any) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/categories" className="hover:text-primary transition-colors">
          Categories
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">
          {category?.ctgry_name || id}
        </span>
      </div>

      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl"
      >
        <Link to="/categories">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Category Image */}
          {category?.ctgry_image_urls && (
            <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={category.ctgry_image_urls}
                alt={category.ctgry_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Category Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">
                {category?.ctgry_name || 'Category Products'}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {category?.description || (category as any)?.ctgry_description ||
                `Discover our collection of ${products?.length || 0} products in this category`}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>{products?.length || 0} products available</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full md:max-w-md">
          <Input
            type="search"
            placeholder="Search products in this category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            glass
          />
        </div>

        <div className="flex gap-2">
          <Button variant="glass" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'glass'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'glass'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <LoadingSkeleton key={i} className="h-80" />
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
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProducts.map((product: any) => (
            <motion.div
              key={product.product_id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">
            {searchQuery ? 'No products found' : 'No products available'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? 'Try adjusting your search criteria'
              : 'No products available in this category'}
          </p>
          {searchQuery && (
            <Button variant="glass" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          )}
        </div>
      )}

      {/* Browse More Categories */}
      {!isLoading && filteredProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 rounded-2xl text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Explore More Categories</h2>
          <p className="text-muted-foreground mb-6">
            Discover other amazing product categories
          </p>
          <Link to="/categories">
            <Button variant="gradient" size="lg">
              Browse All Categories
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
