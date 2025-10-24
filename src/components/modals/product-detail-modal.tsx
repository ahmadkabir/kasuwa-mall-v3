import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Package, Star, Truck, Shield, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { getProductImageUrl } from '@/lib/utils/image'
import { formatCurrency } from '@/lib/utils/currency'
import type { Product } from '@/lib/api/client'
import { cn } from '@/lib/utils/cn'

interface ProductDetailModalProps {
  product: Product
}

export function ProductDetailModal({ product }: ProductDetailModalProps) {
  const { addItem } = useCartStore()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [quantity, setQuantity] = useState(1)

  // Parse image URLs
  const imageUrls = product.image_urls
    ? product.image_urls.split(',').map((url) => url.trim())
    : []
  
  const currentImageUrl = !imageError && imageUrls.length > 0
    ? getProductImageUrl(imageUrls[selectedImageIndex])
    : null

  const isOutOfStock = product.qty <= 0

  const handleAddToCart = () => {
    // First add the item with quantity 1, then update the quantity
    addItem({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      image_urls: product.image_urls,
      maxQuantity: product.qty,
    });
    
    // Now update the quantity to the desired amount
    const { updateQuantity } = useCartStore.getState();
    // const existingItem = items.find(item => item.product_id === product.product_id);
    // If the item was already in the cart, we still want to update to the selected quantity
    updateQuantity(product.product_id, quantity);
  }

  const incrementQuantity = () => {
    if (quantity < product.qty) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 p-3">
      {/* Left Side - Images */}
      <div className="space-y-2">
        {/* Main Image */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {currentImageUrl ? (
            <motion.img
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={currentImageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}

          {/* Badges */}
          {isOutOfStock && (
            <div className="absolute top-1.5 right-1.5 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </div>
          )}
          
          {product.prod_status === 'featured' && (
            <div className="absolute top-1.5 left-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-0.5">
              <Star className="h-2.5 w-2.5 fill-current" />
              Featured
            </div>
          )}
        </div>

        {/* Thumbnail Images */}
        {imageUrls.length > 1 && (
          <div className="grid grid-cols-4 gap-1">
            {imageUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={cn(
                  'relative aspect-[4/3] rounded-md overflow-hidden border-2 transition-all',
                  selectedImageIndex === index
                    ? 'border-primary ring-1 ring-primary/20'
                    : 'border-transparent hover:border-primary/50'
                )}
              >
                <img
                  src={getProductImageUrl(imageUrls[index]) || ''}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = ''
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Side - Details */}
      <div className="flex flex-col">
        {/* Product Info */}
        <div className="flex-1 space-y-2">
          <div>
            <h1 className="text-lg font-bold mb-1">{product.name}</h1>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-2.5 w-2.5',
                      i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
              <span>(4.0 Rating)</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-0.5">
            <div className="text-xl font-bold text-primary">
              {formatCurrency(product.price)}
            </div>
            {product.qty > 0 && product.qty < 10 && (
              <p className="text-xs text-orange-500 font-medium">
                Only {product.qty} left!
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-xs mb-1">Description</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {product.description || 'No description available.'}
            </p>
          </div>

          {/* Product Details */}
          <div className="space-y-1">
            <h3 className="font-semibold text-xs">Product Details</h3>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <div className="flex items-center gap-1 p-1.5 rounded-lg bg-white/5 dark:bg-black/5">
                <Package className="h-2.5 w-2.5 text-primary" />
                <div>
                  <p className="text-muted-foreground text-xs">Stock</p>
                  <p className="font-medium">{product.qty} available</p>
                </div>
              </div>
              {product.prod_size && (
                <div className="flex items-center gap-1 p-1.5 rounded-lg bg-white/5 dark:bg-black/5">
                  <Package className="h-2.5 w-2.5 text-primary" />
                  <div>
                    <p className="text-muted-foreground text-xs">Size</p>
                    <p className="font-medium">{product.prod_size}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-1 py-1.5 border-y border-white/10 dark:border-black/10">
            <div className="flex flex-col items-center text-center gap-0.5">
              <div className="p-1 rounded-full bg-primary/10">
                <Truck className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium">Free Delivery</p>
                <p className="text-xs text-muted-foreground">On orders over ₦5000</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-0.5">
              <div className="p-1 rounded-full bg-primary/10">
                <Shield className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% protected</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-0.5">
              <div className="p-1 rounded-full bg-primary/10">
                <RefreshCw className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">7 days return</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2 border-t border-white/10 dark:border-black/10">
          {/* Quantity Selector */}
          {!isOutOfStock && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Qty:</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-7 w-7 p-0 text-xs"
                >
                  -
                </Button>
                <span className="w-6 text-center font-semibold text-xs">{quantity}</span>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.qty}
                  className="h-7 w-7 p-0 text-xs"
                >
                  +
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-1.5">
            {!isOutOfStock && (
              <Button
                variant="gradient"
                size="sm"
                className="flex-1 text-xs py-1.5"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                Add to Cart
              </Button>
            )}
            <Button
              variant="glass"
              size="sm"
              className={cn(!isOutOfStock && 'w-9', 'text-xs py-1.5')}
            >
              <Heart className="h-3.5 w-3.5" />
            </Button>
          </div>

          {isOutOfStock && (
            <div className="text-center p-2 rounded-lg bg-destructive/10 text-destructive">
              <p className="font-semibold text-xs">Out of stock</p>
              <p className="text-xs mt-0.5">Check back later</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
