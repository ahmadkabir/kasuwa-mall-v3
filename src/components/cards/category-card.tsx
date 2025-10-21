import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Category } from '@/lib/api/client'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  // Default image if category image is not provided
  const categoryImage = category.ctgry_image_urls || '/images/no-image-placeholder-optimized.jpg'

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card rounded-xl overflow-hidden flex-shrink-0 w-36 group cursor-pointer mx-2"
    >
      <Link to={`/categories/${category.ctgry_id}`}>
        <div className="relative h-32 w-32 mx-auto">
          {categoryImage ? (
            <img
              src={categoryImage}
              alt={category.ctgry_name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/images/no-image-placeholder-optimized.jpg'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-kasuwa-brown/20 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="text-primary text-xl mb-1">
                  {category.ctgry_name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Info */}
        <div className="p-2 text-center">
          <h3 className="text-sm font-bold group-hover:text-primary transition-colors truncate">
            {category.ctgry_name}
          </h3>
        </div>
      </Link>
    </motion.div>
  )
}