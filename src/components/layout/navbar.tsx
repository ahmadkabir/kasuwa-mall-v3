import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Search,
  Menu,
  X,
  Heart,
  Sun,
  Moon,
  LogOut,
  Package,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CartDropdown } from '@/components/layout/cart-dropdown'
import { useCartStore } from '@/store/cart-store'
import { useUserStore } from '@/store/user-store'
import { useThemeStore } from '@/store/theme-store'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const { getTotalItems } = useCartStore()
  const { user, isAuthenticated, logout } = useUserStore()
  const { theme, toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  const cartItemsCount = getTotalItems()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false) // Close mobile search after submission
      setSearchQuery('') // Clear search query after submission
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-kasuwa-primary text-white shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/products" variant="white">Products</NavLink>
            <NavLink to="/categories" variant="white">Categories</NavLink>
            <NavLink to="/deals" variant="white">Deals</NavLink>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={() => navigate('/search')}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-1 focus:ring-white/50 focus:border-white/50"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search (Mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full text-white hover:bg-white/20"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="rounded-full relative text-white hover:bg-white/20">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Cart */}
            <CartDropdown />

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  className="rounded-full text-white hover:bg-white/20 flex items-center space-x-2 px-3 py-2 h-auto"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline text-sm font-medium">
                    {user?.firstname || user?.username || 'User'}
                  </span>
                </Button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-200 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user?.firstname || user?.username || 'User'}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/account"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-2 text-gray-500" />
                        Account
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Package className="h-4 w-4 mr-2 text-gray-500" />
                        Orders
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-destructive"
                      >
                        <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-kasuwa-primary">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden pb-4"
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={() => navigate('/search')}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-1 focus:ring-white/50 focus:border-white/50"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pb-4 space-y-2"
            >
              <MobileNavLink to="/products">Products</MobileNavLink>
              <MobileNavLink to="/categories">Categories</MobileNavLink>
              <MobileNavLink to="/deals">Deals</MobileNavLink>
              <MobileNavLink to="/cart">
                <div className="flex items-center justify-between">
                  <span>Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </MobileNavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

function NavLink({ to, children, variant }: { to: string; children: React.ReactNode; variant?: string }) {
  const textColor = variant === 'white' ? 'text-white' : 'text-foreground';
  const hoverColor = variant === 'white' ? 'hover:text-kasuwa-secondary' : 'hover:text-primary';
  
  return (
    <Link to={to}>
      <motion.span
        whileHover={{ scale: 1.05 }}
        className={`text-sm font-medium ${textColor} ${hoverColor} transition-colors`}
      >
        {children}
      </motion.span>
    </Link>
  )
}

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to}>
      <div className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
        {children}
      </div>
    </Link>
  )
}
