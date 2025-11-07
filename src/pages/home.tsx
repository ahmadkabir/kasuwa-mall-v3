import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/cards/product-card'
import { CategoryCard } from '@/components/cards/category-card'
import { LoadingSkeleton } from '@/components/ui/loading-spinner'
import { ProductCarousel } from '@/components/ui/product-carousel'
import { productApi, categoryApi } from '@/lib/api/client'
import { HeroCarousel } from '@/components/ui/hero-carousel'

export default function HomePage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productApi.getAll,
  })

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  })

  const { data: randomProducts, isLoading: isLoadingRandom } = useQuery({
    queryKey: ['products', 'random'],
    queryFn: () => productApi.getRandom(8),
  })

  // Fetch latest products for known categories that have products (from database)
  const fabricProductsQuery = useQuery({
    queryKey: ['products', 'latest-by-category', 'FAB001'],
    queryFn: () => productApi.getLatestByCategory('FAB001', 8),
  });

  const fashionProductsQuery = useQuery({
    queryKey: ['products', 'latest-by-category', 'FAS001'],
    queryFn: () => productApi.getLatestByCategory('FAS001', 8),
  });

  const babyProductsQuery = useQuery({
    queryKey: ['products', 'latest-by-category', 'BAB001'],
    queryFn: () => productApi.getLatestByCategory('BAB001', 8),
  });

  const homeProductsQuery = useQuery({
    queryKey: ['products', 'latest-by-category', 'HOM001'],
    queryFn: () => productApi.getLatestByCategory('HOM001', 8),
  });

  const featuredProducts = products?.slice(0, 8) || []

  return (
    <div className="space-y-10">
      {/* Hero Carousel Section */}
      <section className="relative overflow-hidden">
        <HeroCarousel />
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <FeatureCard
          icon={<TrendingUp className="h-8 w-8" />}
          title="Best Prices"
          description="Competitive prices on all products with regular deals and discounts"
        />
        <FeatureCard
          icon={<Shield className="h-8 w-8" />}
          title="Secure Shopping"
          description="Your data is protected with industry-standard encryption"
        />
        <FeatureCard
          icon={<Sparkles className="h-8 w-8" />}
          title="Quality Products"
          description="Curated selection from verified vendors you can trust"
        />
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Shop by Category</h2>
            <p className="text-muted-foreground text-sm">Browse our popular categories</p>
          </div>
          <Link to="/categories">
            <Button variant="glass" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Horizontal Categories Scroll */}
        {isLoadingCategories ? (
          <div className="flex overflow-x-auto pb-4 -mx-2 px-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-36 mx-2">
                <LoadingSkeleton className="h-40 w-36 rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-4 -mx-2 px-2 hide-scrollbar">
            {categories?.map((category) => (
              <motion.div
                key={category.ctgry_id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Category-Based Product Carousels */}
      <ProductCarousel 
        products={fabricProductsQuery.data || []} 
        isLoading={fabricProductsQuery.isLoading}
        title="Fabric Products"
        subtitle="Discover amazing fabric products"
      />

      <ProductCarousel 
        products={fashionProductsQuery.data || []} 
        isLoading={fashionProductsQuery.isLoading}
        title="Fashion Products"
        subtitle="Discover amazing fashion products"
      />

      <ProductCarousel 
        products={babyProductsQuery.data || []} 
        isLoading={babyProductsQuery.isLoading}
        title="Baby Products"
        subtitle="Discover amazing baby products"
      />

      <ProductCarousel 
        products={homeProductsQuery.data || []} 
        isLoading={homeProductsQuery.isLoading}
        title="Home & Kitchen Products"
        subtitle="Discover amazing home and kitchen products"
      />

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked items just for you</p>
          </div>
          <Link to="/products">
            <Button variant="glass">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

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
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
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
      </section>

      {/* CTA Section */}
      <section className="relative py-10 overflow-hidden">
        <div className="glass-card p-12 text-center rounded-3xl">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers and discover amazing deals today
          </p>
          <Link to="/register">
            <Button size="xl" variant="gradient">
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-2xl text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-kasuwa-brown/20 mb-4">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  )
}
