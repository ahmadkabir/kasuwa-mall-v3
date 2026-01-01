import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/cards/product-card';
import { LoadingSkeleton } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';

interface ProductCarouselProps {
  products: any[];
  isLoading: boolean;
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
}

export function ProductCarousel({ 
  products = [], 
  isLoading = false, 
  title = "You May Also Like", 
  subtitle = "Discover amazing products handpicked just for you",
  viewAllLink
}: ProductCarouselProps) {
  return (
    <section className="py-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
        {viewAllLink && (
          <Link to={viewAllLink}>
            <Button variant="glass" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex overflow-x-auto pb-4 -mx-2 px-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[200px] mx-2">
              <LoadingSkeleton className="h-52 w-[200px] rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex overflow-x-auto pb-4 -mx-2 px-2 hide-scrollbar">
          {products?.length > 0 ? (
            products.map((product) => (
              <motion.div
                key={product.product_id || product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-[200px] mx-2"
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-muted-foreground w-full py-8">No products available in this category</p>
          )}
        </div>
      )}
    </section>
  );
}