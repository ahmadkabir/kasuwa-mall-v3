import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User, 
  ArrowLeft, 
  Sun, 
  Moon, 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartDropdown } from '@/components/layout/cart-dropdown'
import { useCartStore } from '@/store/cart-store'
import { useUserStore } from '@/store/user-store'
import { useThemeStore } from '@/store/theme-store'

export function SearchNavbar() {
  const { getTotalItems } = useCartStore()
  const { isAuthenticated } = useUserStore()
  const { theme, toggleTheme } = useThemeStore()
  const navigate = useNavigate()
  
  const cartItemsCount = getTotalItems()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-kasuwa-primary text-white shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/20"
            onClick={() => navigate(-1)} // Go back to previous page
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Logo - centered */}
          <Link to="/" className="flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-12 w-auto"
            >
              <img
                src="/images/kasuwamall-cut.png"
                alt="Kasuwa Mall Logo"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement?.parentElement;
                  if (parent) {
                    const textElement = document.createElement('div');
                    textElement.className = 'text-2xl font-bold text-white';
                    textElement.textContent = 'Kasuwa Mall';
                    parent.appendChild(textElement);
                  }
                }}
              />
            </motion.div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button> */}

            {/* Wishlist */}
            {/* {isAuthenticated && (
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="rounded-full relative text-white hover:bg-white/20">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
            )} */}

            {/* Cart */}
            <CartDropdown />

            {/* User Menu */}
            {isAuthenticated ? (
              <Link to="/account">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <User className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-white text-xs flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-kasuwa-primary">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}