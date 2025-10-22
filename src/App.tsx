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
import PrivacyPage from '@/pages/privacy'
import TermsPage from '@/pages/terms'

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
        <Routes>
          {/* Routes with MainLayout */}
          <Route path="/" element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } />
          <Route path="/products" element={
            <MainLayout>
              <ProductsPage />
            </MainLayout>
          } />
          <Route path="/products/:id" element={
            <MainLayout>
              <ProductDetailPage />
            </MainLayout>
          } />
          <Route path="/categories" element={
            <MainLayout>
              <CategoriesPage />
            </MainLayout>
          } />
          <Route path="/categories/:id" element={
            <MainLayout>
              <CategoryPage />
            </MainLayout>
          } />
          
          {/* Search page without MainLayout */}
          <Route path="/search" element={<SearchPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={
            <MainLayout>
              <LoginPage />
            </MainLayout>
          } />
          <Route path="/register" element={
            <MainLayout>
              <RegisterPage />
            </MainLayout>
          } />
          
          {/* Protected Routes */}
          <Route path="/cart" element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          } />
          <Route path="/checkout" element={
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          } />
          <Route path="/account" element={
            <MainLayout>
              <AccountPage />
            </MainLayout>
          } />
          <Route path="/orders" element={
            <MainLayout>
              <OrdersPage />
            </MainLayout>
          } />
          <Route path="/wishlist" element={
            <MainLayout>
              <WishlistPage />
            </MainLayout>
          } />
          
          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={
            <MainLayout>
              <VendorDashboardPage />
            </MainLayout>
          } />
          
          {/* Privacy Route */}
          <Route path="/privacy" element={
            <MainLayout>
              <PrivacyPage />
            </MainLayout>
          } />
          
          {/* Terms Route */}
          <Route path="/terms" element={
            <MainLayout>
              <TermsPage />
            </MainLayout>
          } />
          
          {/* 404 */}
          <Route path="*" element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          } />
        </Routes>
        <Toaster />
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App
