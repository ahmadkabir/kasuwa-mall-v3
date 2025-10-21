import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Package, Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/cards/product-card'
import { productApi } from '@/lib/api/client'

interface Product {
  product_id: string
  name: string
  description: string
  price: number
  qty: number
  ctgry_id: string
  sub_ctgry_id: string
  prod_status: string
  shop_id: number
  image_urls: string
  rating?: number
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    } else {
      setProducts([])
    }
  }, [searchQuery])

  const performSearch = async (searchTerm: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // First try the main search endpoint
      const results = await productApi.search(searchTerm)
      setProducts(results as Product[])
    } catch (err) {
      console.error('Main search error:', err)
      try {
        // Fallback to filter-by-search endpoint
        const results = await productApi.filterBySearch(searchTerm)
        setProducts(results as Product[])
      } catch (fallbackErr) {
        console.error('Fallback search error:', fallbackErr)
        setError('Failed to search products. Please try again.')
        setProducts([])
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchParams({ q: query.trim() })
    }
  }

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl"
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Search Products</h1>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button type="submit" size="lg" className="px-6">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </form>
          
          {searchQuery && (
            <p className="text-center mt-4 text-muted-foreground">
              {loading 
                ? 'Searching...' 
                : `Found ${products.length} products for "${searchQuery}"`}
            </p>
          )}
        </div>
      </motion.div>

      {/* Search Results */}
      {error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-destructive mb-4">
            <Package className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search Error</h3>
            <p>{error}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => searchQuery && performSearch(searchQuery)}
          >
            Try Again
          </Button>
        </motion.div>
      ) : loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card p-4 rounded-xl animate-pulse">
              <div className="bg-white/10 h-48 rounded-lg mb-4" />
              <div className="h-4 bg-white/10 rounded mb-2" />
              <div className="h-4 bg-white/10 rounded w-3/4 mb-4" />
              <div className="h-8 bg-white/10 rounded" />
            </div>
          ))}
        </motion.div>
      ) : products.length === 0 && searchQuery ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't find any products matching "{searchQuery}"
          </p>
          <Button onClick={() => setQuery('')}>Clear Search</Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}