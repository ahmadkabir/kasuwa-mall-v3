/**
 * API Configuration for Kasuwa Mall V3
 * Matches the existing backend endpoints from kasuwa-backend
 */

export const API_CONFIG = {
  BASE_URL: (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim() !== '') 
    ? import.meta.env.VITE_API_URL 
    : 'http://localhost:3002',
  
  ENDPOINTS: {
    // Products
    GET_ALL_PRODUCTS: 'api/getallproducts',
    GET_PRODUCTS_BY_CATEGORY: 'api/get-product-by-ctgry_id',
    GET_PRODUCT_BY_ID: 'api/productsbyid',
    SEARCH_PRODUCTS: 'api/search',
    FILTER_BY_SEARCH: 'api/filter-by-search',
    CREATE_PRODUCT: 'api/products',
    EDIT_PRODUCT: 'api/editproducts',
    DELETE_PRODUCT: 'api/products',
    
    // Categories
    GET_CATEGORIES: 'api/categories',
    GET_ALL_CATEGORIES: 'api/get-all-category',
    GET_SUB_CATEGORIES: 'api/get-sub-category',
    GET_CATEGORY_BY_USER: 'api/getcategory/userId',
    CREATE_CATEGORY: 'api/products-category-new',
    
    // Authentication
    USER_CREATE: 'api/users/create',
    USER_LOGIN: 'api/users/login',
    VERIFY_TOKEN: 'api/verifyuusertoken',
    
    // Orders
    CREATE_ORDER: 'api/createorders',
    GET_ORDERS_BY_CUSTOMER: 'api/gerordersbycustomerid',
    
    // Cart
    GET_CART: 'api/carts',
    UPDATE_CART: 'api/carts',
    
    // Addresses
    GET_ADDRESS: 'api/user-address',
    CREATE_ADDRESS: 'api/user-address',
    
    // Payments
    INITIATE_PAYMENT: 'api/secure-payment/initiate',
    UPDATE_PAYMENT_STATUS: 'api/secure-payment/callback',
    INTERSWITCH_RESPONSE: 'api/secure-payment/webhook',
    CHECK_PAYMENT_STATUS: 'api/secure-payment/status',
  },
  
  // Token storage keys (matching backend)
  TOKEN_KEYS: {
    AUTH_TOKEN: '@@bits_lis',
    CUSTOMER_ID: '@@toke_$$_45598',
    ALTERNATIVE_TOKEN: '@@toke_$$',
    MAIN_TOKEN: '@@token',
  },
  
  // Payment configuration
  PAYMENT: {
    INTERSWITCH: {
      MERCHANT_CODE: 'MX162337',
      PAY_ITEM_ID: 'Default_Payable_MX162337',
      MODE: 'LIVE',
    },
    BANK_TRANSFER: {
      BANK_NAME: 'Keystone Bank',
      ACCOUNT_NUMBER: '1013842470',
      ACCOUNT_NAME: 'Prospora Tech Nigeria limited',
    },
  },
  
  // Request configuration
  REQUEST: {
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },
} as const

// Helper functions for token management
export const tokenManager = {
  getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    const token = localStorage.getItem(API_CONFIG.TOKEN_KEYS.AUTH_TOKEN)
    return token ? JSON.parse(token) : null
  },

  setAuthToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(API_CONFIG.TOKEN_KEYS.AUTH_TOKEN)
    localStorage.setItem(API_CONFIG.TOKEN_KEYS.AUTH_TOKEN, JSON.stringify(token))
  },

  getCustomerId(): string | null {
    if (typeof window === 'undefined') return null
    const customerId = localStorage.getItem(API_CONFIG.TOKEN_KEYS.CUSTOMER_ID)
    return customerId ? JSON.parse(customerId).replace(/"/g, '') : null
  },

  setCustomerId(customerId: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(API_CONFIG.TOKEN_KEYS.CUSTOMER_ID, JSON.stringify(customerId))
  },

  clearAllTokens(): void {
    if (typeof window === 'undefined') return
    Object.values(API_CONFIG.TOKEN_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
  },
}

// API call helper
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenManager.getAuthToken()
  const url = `${API_CONFIG.BASE_URL}/${endpoint}`

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error)
    throw error
  }
}
