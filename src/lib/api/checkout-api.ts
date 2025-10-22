import { apiCall, API_CONFIG } from './config';
import { Address } from './client';

// Address API functions using centralized configuration
export const addressApi = {
  // Get all addresses for a user
  getUserAddresses: async (userId: string) => {
    return apiCall<{ success: boolean; addresses: Address[] }>(
      `${API_CONFIG.ENDPOINTS.GET_ADDRESS}?user_id=${userId}`
    );
  },

  // Create a new address for a user
  createUserAddress: async (addressData: Omit<Address, 'id' | 'created_at' | 'updated_at'>) => {
    return apiCall<{ success: boolean; address_id: number; message?: string }>(
      API_CONFIG.ENDPOINTS.CREATE_ADDRESS,
      {
        method: 'POST',
        body: JSON.stringify(addressData),
      }
    );
  },

  // Get a specific address by ID
  getAddressById: async (addressId: number) => {
    return apiCall<{ success: boolean; address: Address }>(
      `api/user-address/${addressId}`
    );
  },

  // Update an existing address
  updateAddress: async (addressId: number, addressData: Partial<Address>) => {
    return apiCall<{ success: boolean; message?: string }>(
      `api/user-address/${addressId}`,
      {
        method: 'PUT',
        body: JSON.stringify(addressData),
      }
    );
  },

  // Delete an address
  deleteAddress: async (addressId: number) => {
    return apiCall<{ success: boolean; message?: string }>(
      `api/user-address/${addressId}`,
      {
        method: 'DELETE',
      }
    );
  },

  // Set an address as default
  setDefaultAddress: async (addressId: number) => {
    return apiCall<{ success: boolean; message?: string }>(
      `api/user-address/${addressId}/set-default`,
      {
        method: 'PATCH',
      }
    );
  },

  // Get all addresses for a user (using the existing endpoint)
  getUserAddressesByUserId: async (userId: string) => {
    const url = `${API_CONFIG.ENDPOINTS.GET_ADDRESS}?user_id=${userId}`;
    return apiCall<{ success: boolean; addresses: Address[] }>(url);
  },
};

// Payment API functions - Updated for secure payment flow
export const paymentApi = {
  // Initiate secure payment
  initiateSecurePayment: async (paymentData: { 
    amount: number; 
    userId: string; 
    cartId?: number; 
    orderId?: string; 
    customerEmail?: string; 
    customerName?: string 
  }) => {
    return apiCall<{ 
      success: boolean; 
      paymentReference: string; 
      secureToken: string; 
      message?: string 
    }>(
      API_CONFIG.ENDPOINTS.INITIATE_PAYMENT,
      {
        method: 'POST',
        body: JSON.stringify(paymentData),
      }
    );
  },

  // Handle payment callback (after return from payment gateway)
  handlePaymentCallback: async (callbackData: { paymentReference: string }) => {
    return apiCall<{ 
      success: boolean; 
      data: { reference: string; status: string; orderId?: string }; 
      message?: string 
    }>(
      API_CONFIG.ENDPOINTS.UPDATE_PAYMENT_STATUS,
      {
        method: 'POST',
        body: JSON.stringify(callbackData),
      }
    );
  },

  // Check payment status by reference
  checkPaymentStatus: async (reference: string) => {
    return apiCall<{ 
      success: boolean; 
      data: { reference: string; status: string; amount: number; userId: string; createdAt: string }; 
      message?: string 
    }>(
      `${API_CONFIG.ENDPOINTS.CHECK_PAYMENT_STATUS}?reference=${encodeURIComponent(reference)}`,
      {
        method: 'GET',
      }
    );
  },
};

// Order API functions
export const orderApi = {
  // Create order
  createOrder: async (orderData: any) => {
    return apiCall<{ success: boolean; orderId?: number; message?: string }>(
      API_CONFIG.ENDPOINTS.CREATE_ORDER,
      {
        method: 'POST',
        body: JSON.stringify(orderData),
      }
    );
  },

  // Get orders by customer
  getOrdersByCustomer: async (customerId: string) => {
    return apiCall<{ success: boolean; orders: any[]; message?: string }>(
      `${API_CONFIG.ENDPOINTS.GET_ORDERS_BY_CUSTOMER}?customer_id=${customerId}`,
      {
        method: 'GET', // Changed to GET with query parameter as per original client.ts
      }
    );
  },
};