/**
 * API Client for Kasuwa Mall V3
 * Uses React Query for data fetching and caching
 */

import { API_CONFIG, apiCall } from './config'

// Types
export interface Product {
  product_id: string
  name: string
  description: string
  price: number
  qty: number
  ctgry_id: string
  sub_ctgry_id: string
  prod_status: string
  shop_id: number
  image_urls: string
  prod_size?: string
}

export interface Category {
  ctgry_id: string
  ctgry_name: string
  ctgry_image_urls?: string
  description?: string
}

export interface User {
  id: string
  email: string
  firstname: string
  lastname: string
  username: string
  role: 'admin' | 'vendor' | 'user'
  phone?: string
  address?: string
}

export interface Order {
  id: string
  cart_id: number
  customer_id: number
  total: number
  status: string
  createdAt?: string
}

export interface Address {
  id: number
  user_id: string
  address_type: 'home' | 'work' | 'other'
  first_name: string
  last_name: string
  phone: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code?: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

// Product API
export const productApi = {
  async getAll() {
    const response = await apiCall<{ success: boolean; result: Product[] }>(
      API_CONFIG.ENDPOINTS.GET_ALL_PRODUCTS
    )
    return response.result || []
  },

  async getById(productId: string) {
    const response = await apiCall<{ success: boolean; result: Product[] }>(
      `${API_CONFIG.ENDPOINTS.GET_PRODUCT_BY_ID}/${productId}`
    )
    return response.result?.[0] || null
  },

  async getByCategory(categoryId: string) {
    const response = await apiCall<any>(
      `${API_CONFIG.ENDPOINTS.GET_PRODUCTS_BY_CATEGORY}?ctgry_id=${categoryId}`
    )
    // Backend might return in different structures, trying common patterns
    if (response.result && Array.isArray(response.result)) {
      return response.result
    } else if (response.response && Array.isArray(response.response[0])) {
      return response.response[0]
    } else if (Array.isArray(response)) {
      return response
    }
    return []
  },

  async search(query: string) {
    const response = await apiCall<{ success: boolean; results: any[] }>(
      `${API_CONFIG.ENDPOINTS.SEARCH_PRODUCTS}?product_name=${query}`
    )
    return response.results || []
  },

  async filterBySearch(searchInput: string) {
    const response = await apiCall<{ success: boolean; results: any[] }>(
      `${API_CONFIG.ENDPOINTS.FILTER_BY_SEARCH}?searchInput=${searchInput}`
    )
    return response.results || []
  },
}

// Category API
export const categoryApi = {
  async getAll() {
    const response = await apiCall<{ success: boolean; results: Category[][] }>(
      API_CONFIG.ENDPOINTS.GET_CATEGORIES
    )
    return response.results?.[0] || []
  },

  async getAllCategories() {
    const response = await apiCall<{ success: boolean; result: Category[][] }>(
      API_CONFIG.ENDPOINTS.GET_ALL_CATEGORIES
    )
    return response.result?.[0] || []
  },

  async getSubCategories(shopId: number, categoryId: string) {
    const response = await apiCall<{ success: boolean; result: any[][] }>(
      `${API_CONFIG.ENDPOINTS.GET_SUB_CATEGORIES}?shop_id=${shopId}&ctgry_id=${categoryId}`
    )
    return response.result?.[0] || []
  },
}

// Auth API
export const authApi = {
  async register(userData: {
    firstname: string
    lastname: string
    username: string
    email: string
    password: string
    phone?: string
    role: 'user' | 'vendor'
  }) {
    const response = await apiCall<{ success: boolean; message?: string }>(
      API_CONFIG.ENDPOINTS.USER_CREATE,
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    )
    
    // Transform response to match v3 expectations
    return {
      success: response.success,
      message: response.message,
      result: response.success ? userData : null
    }
  },

  async login(credentials: { email: string; password: string }) {
    const response = await apiCall<{ success: boolean; token?: string; userDetails?: any; message?: string }>(
      API_CONFIG.ENDPOINTS.USER_LOGIN,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    )

    // Transform response to match v3 expectations
    return {
      success: response.success,
      token: response.token,
      result: response.userDetails,
      message: response.message
    }
  },

  async verifyToken(token: string) {
    return apiCall<{ success: boolean; user: User }>(
      API_CONFIG.ENDPOINTS.VERIFY_TOKEN,
      {
        headers: {
          authorization: token,
        },
      }
    )
  },
}

// Order API
export const orderApi = {
  async create(orderData: {
    customer_id: number
    cart_id: number
    total: number
    status: string
    products: any[]
  }) {
    return apiCall<{ success: boolean; result: any }>(
      API_CONFIG.ENDPOINTS.CREATE_ORDER,
      {
        method: 'POST',
        body: JSON.stringify(orderData),
      }
    )
  },

  async getByCustomer(customerId: string) {
    const response = await apiCall<{ success: boolean; result: Order[] }>(
      `${API_CONFIG.ENDPOINTS.GET_ORDERS_BY_CUSTOMER}?customer_id=${customerId}`
    )
    return response.result || []
  },
}

// Address API
export const addressApi = {
  async getAddresses(userId: string) {
    const response = await apiCall<{ success: boolean; addresses: Address[] }>(
      `${API_CONFIG.ENDPOINTS.GET_ADDRESS}?user_id=${userId}`
    )
    return response.addresses || []
  },

  async createAddress(addressData: {
    user_id: string
    address_type: 'home' | 'work' | 'other'
    first_name: string
    last_name: string
    phone: string
    address_line_1: string
    address_line_2?: string
    city: string
    state: string
    postal_code?: string
    country: string
    is_default?: boolean
  }) {
    return apiCall<{ success: boolean; address: Address }>(
      API_CONFIG.ENDPOINTS.CREATE_ADDRESS,
      {
        method: 'POST',
        body: JSON.stringify(addressData),
      }
    )
  },
}

// Payment API
export const paymentApi = {
  async initiatePayment(paymentData: {
    amount: number
    customer_email: string
    customer_id: string
  }) {
    return apiCall<{ success: boolean; result: any }>(
      API_CONFIG.ENDPOINTS.INITIATE_PAYMENT,
      {
        method: 'POST',
        body: JSON.stringify(paymentData),
      }
    )
  },

  async updatePaymentStatus(statusData: {
    transaction_reference: string
    status: string
  }) {
    return apiCall<{ success: boolean; result: any }>(
      API_CONFIG.ENDPOINTS.UPDATE_PAYMENT_STATUS,
      {
        method: 'POST',
        body: JSON.stringify(statusData),
      }
    )
  },
}
