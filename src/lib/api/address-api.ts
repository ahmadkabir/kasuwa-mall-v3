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