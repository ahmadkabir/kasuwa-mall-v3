import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ProductDetailModal } from '@/components/modals/product-detail-modal'
import { useCartStore } from '@/store/cart-store'
import { cn } from '@/lib/utils/cn'
import { getProductImageUrl } from '@/lib/utils/image'
import type { Product } from '@/lib/api/client'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore()
  const [imageError, setImageError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      image_urls: product.image_urls,
      maxQuantity: product.qty,
    })
  }

  // Get the first image URL using utility function
  const imageUrl = !imageError ? getProductImageUrl(product.image_urls) : null
  const isOutOfStock = product.qty <= 0

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className={cn('group cursor-pointer', className)}
        >
          <Card glass className="overflow-hidden h-full">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Package className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}
              
              {/* Overlay Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Button
                  size="icon"
                  variant="glass"
                  className="rounded-full"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                
                <Button
                  size="icon"
                  variant="glass"
                  className="rounded-full"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsModalOpen(true)
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                {!isOutOfStock && (
                  <Button
                    size="icon"
                    variant="gradient"
                    className="rounded-full"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>

              {/* Badges */}
              {isOutOfStock && (
                <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Out of Stock
                </div>
              )}
              
              {product.prod_status === 'featured' && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-kasuwa-primary to-kasuwa-brown text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              
              <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-primary">
                    ₦{product.price.toLocaleString()}
                  </p>
                  {product.qty > 0 && product.qty < 10 && (
                    <p className="text-xs text-orange-500">
                      Only {product.qty} left
                    </p>
                  )}
                </div>

                {!isOutOfStock && (
                  <Button
                    size="sm"
                    variant="glass"
                    className="rounded-full"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </DialogTrigger>

      <DialogContent>
        <ProductDetailModal product={product} />
      </DialogContent>
    </Dialog>
  )
}
