import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from '@/components/ui/toaster'
import { MainLayout } from '@/components/layout/main-layout'
import ScrollToTop from '@/components/layout/scroll-to-top'

// Pages
import HomePage from '@/pages/home'
import ProductsPage from '@/pages/products'
import ProductDetailPage from '@/pages/product-detail'
import CategoriesPage from '@/pages/categories'
import CategoryPage from '@/pages/category'
import CartPage from '@/pages/cart'
import CheckoutPage from '@/pages/checkout'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import AccountPage from '@/pages/account'
import OrdersPage from '@/pages/orders'
import WishlistPage from '@/pages/wishlist'
import SearchPage from '@/pages/search'
import VendorDashboardPage from '@/pages/vendor-dashboard'
import NotFoundPage from '@/pages/not-found'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <MainLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:id" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            
            {/* Vendor Routes */}
            <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
        <Toaster />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
