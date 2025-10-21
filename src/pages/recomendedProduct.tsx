import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { productApi } from '@/lib/api/client'
import { getProductImageUrl } from '@/lib/utils/image'
import { useNavigate } from 'react-router-dom'

interface RecommendedProductsProps {
  cartItems: any[]
}
const RecommendedProducts = ({ cartItems }: RecommendedProductsProps) => {
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  // Function to get recommended products based on categories in cart
  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true)
        
        // Get all products 
        const allProducts = await productApi.getAll()
        
        // Extract unique product IDs from cart items
        const productIdsInCart = cartItems.map(item => item.product_id)
        
        // Filter out products already in cart and take a few random ones as recommendations
        let filteredProducts = allProducts
          .filter((product: any) => !productIdsInCart.includes(product.product_id))
          .slice(0, 4)
        
        // If there aren't enough products after filtering, just get the first few
        if (filteredProducts.length < 4) {
          filteredProducts = allProducts
            .filter((product: any) => !productIdsInCart.includes(product.product_id))
            .slice(0, 8) // get more options if available
        }
        
        // Select up to 4 random products from filtered list
        const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random())
        const selected = shuffled.slice(0, 4)
        
        setRecommendedProducts(selected)
      } catch (error) {
        console.error("Error fetching recommended products:", error)
        // Fallback to empty array or sample products
        setRecommendedProducts([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchRecommendedProducts()
  }, [cartItems])

  if (loading || recommendedProducts.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6 rounded-2xl"
    >
      <h2 className="text-xl font-bold mb-4">You might also like</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {recommendedProducts.map((product, index) => (
            <motion.div
              key={product.product_id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group rounded-xl overflow-hidden cursor-pointer"
              onClick={() => navigate(`/products/${product.product_id}`)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={getProductImageUrl(product.image_urls) || "/images/no-image-placeholder-optimized.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-primary font-bold mt-1">
                  ₦{product.price?.toLocaleString() || "0"}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default RecommendedProducts
