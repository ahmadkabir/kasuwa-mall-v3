import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Package,
  Tag,
  Truck,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { useUserStore } from '@/store/user-store'
import { getProductImageUrl } from '@/lib/utils/image'
import RecommendedProducts from './recomendedProduct'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } =
    useCartStore()
  const { isAuthenticated } = useUserStore()
  const navigate = useNavigate()

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.075 // 7.5% VAT
  const total = subtotal + tax

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL to checkout
      navigate('/login?returnUrl=/checkout')
    } else {
      navigate('/checkout')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">Shopping Cart</span>
            </h1>
            <p className="text-muted-foreground">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <ShoppingBag className="h-12 w-12 text-primary/50" />
        </div>
      </motion.div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-2xl text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-kasuwa-brown/20 flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="glass" size="lg" className="w-full sm:w-auto">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Cart with Items */
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Clear Cart Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Cart Items</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.product_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl overflow-hidden group"
                >
                  <div className="flex gap-4 p-4">
                    {/* Product Image */}
                    <CartItemImage item={item} />

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.product_id}`}
                        className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>

                      {/* Variant Info */}
                      {item.variant && (
                        <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                          {item.variant.size && (
                            <span className="px-2 py-0.5 rounded-full bg-white/10">
                              Size: {item.variant.size}
                            </span>
                          )}
                          {item.variant.color && (
                            <span className="px-2 py-0.5 rounded-full bg-white/10">
                              Color: {item.variant.color}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Price */}
                      <div className="mt-2">
                        <span className="text-xl font-bold text-primary">
                          ₦{item.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          each
                        </span>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center gap-4 mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="glass"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.product_id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="glass"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.product_id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.maxQuantity}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Subtotal */}
                        <div className="flex-1 text-right">
                          <span className="text-sm text-muted-foreground">Subtotal: </span>
                          <span className="font-bold">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.product_id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Stock Warning */}
                      {item.quantity >= item.maxQuantity && (
                        <p className="text-xs text-primary mt-2">
                          Maximum quantity reached
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <Link to="/products">
              <Button variant="glass" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-2xl sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({getTotalItems()} items)
                  </span>
                  <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                </div>



                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (7.5% VAT)</span>
                  <span className="font-semibold">₦{tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold gradient-text">
                      ₦{total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                variant="gradient" 
                size="lg" 
                className="w-full group"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-kasuwa-brown" />
                  <span>Fast delivery</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Tag className="h-4 w-4 text-kasuwa-secondary" />
                  <span>Best prices guaranteed</span>
                </div>
              </div>
            </motion.div>

            {/* Promo Code (Optional) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-4 rounded-xl"
            >
              <h3 className="font-semibold mb-2 text-sm">Have a promo code?</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-sm"
                />
                <Button variant="glass" size="sm">
                  Apply
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Recommended Products Section */}
      {items.length > 0 && (
        <RecommendedProducts cartItems={items} />
      )}
    </div>
  )
}

// Helper component for cart item images with error handling
function CartItemImage({ item }: { item: any }) {
  const [imageError, setImageError] = useState(false)
  const imageUrl = !imageError ? getProductImageUrl(item.image_urls) : null

  return (
    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-kasuwa-brown/10">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}

// Recommended Products Component