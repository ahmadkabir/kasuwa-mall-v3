import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Trash2, ArrowRight, Package, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { getProductImageUrl } from '@/lib/utils/image'

export function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const { items, removeItem, getTotalItems, getTotalPrice } = useCartStore()

  const cartItemsCount = getTotalItems()
  const totalPrice = getTotalPrice()

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }))
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Cart Icon Button */}
      <Link to="/cart">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative"
          onClick={(e) => {
            // Allow navigation to cart page
            if (!isOpen) {
              e.preventDefault()
              setIsOpen(true)
            }
          }}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemsCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold"
            >
              {cartItemsCount}
            </motion.span>
          )}
        </Button>
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 glass-card rounded-2xl shadow-2xl overflow-hidden z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Shopping Cart
                </h3>
                <span className="text-sm text-muted-foreground">
                  {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            {/* Cart Items */}
            <div className="max-h-96 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty State */
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-kasuwa-brown/20 flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your cart is empty
                  </p>
                  <Link to="/products" onClick={() => setIsOpen(false)}>
                    <Button variant="gradient" size="sm">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                /* Cart Items List */
                <div className="divide-y divide-white/10">
                  {items.slice(0, 5).map((item) => {
                    const imageUrl = !imageErrors[item.product_id]
                      ? getProductImageUrl(item.image_urls)
                      : null

                    return (
                      <motion.div
                        key={item.product_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-3 hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex gap-3">
                          {/* Product Image */}
                          <Link
                            to={`/products/${item.product_id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex-shrink-0"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-kasuwa-brown/10">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={() => handleImageError(item.product_id)}
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-6 w-6 text-muted-foreground/50" />
                                </div>
                              )}
                            </div>
                          </Link>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/products/${item.product_id}`}
                              onClick={() => setIsOpen(false)}
                              className="font-medium text-sm line-clamp-1 hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>

                            {/* Variant Info */}
                            {item.variant && (
                              <div className="flex gap-1 mt-1">
                                {item.variant.size && (
                                  <span className="text-xs px-1.5 py-0.5 rounded bg-white/10">
                                    {item.variant.size}
                                  </span>
                                )}
                                {item.variant.color && (
                                  <span className="text-xs px-1.5 py-0.5 rounded bg-white/10">
                                    {item.variant.color}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Price & Quantity */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-primary">
                                  ₦{item.price.toLocaleString()}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  × {item.quantity}
                                </span>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeItem(item.product_id)
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded"
                                title="Remove item"
                              >
                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}

                  {/* Show more indicator */}
                  {items.length > 5 && (
                    <div className="p-3 text-center">
                      <Link
                        to="/cart"
                        onClick={() => setIsOpen(false)}
                        className="text-xs text-primary hover:underline"
                      >
                        +{items.length - 5} more {items.length - 5 === 1 ? 'item' : 'items'}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-white/10 space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-bold text-lg gradient-text">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link to="/cart" onClick={() => setIsOpen(false)} className="flex-1">
                    <Button variant="glass" className="w-full" size="sm">
                      View Cart
                    </Button>
                  </Link>
                  <Link to="/checkout" onClick={() => setIsOpen(false)} className="flex-1">
                    <Button variant="gradient" className="w-full group" size="sm">
                      Checkout
                      <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Free Shipping Info */}
                {totalPrice < 50000 && (
                  <p className="text-xs text-center text-muted-foreground">
                    Add ₦{(50000 - totalPrice).toLocaleString()} more for free shipping
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
