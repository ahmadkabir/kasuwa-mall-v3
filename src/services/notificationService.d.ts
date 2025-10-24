// services/notificationService.d.ts
// TypeScript declarations for notificationService.js

declare module '@/services/notificationService' {
  export interface NotificationItem {
    name: string;
    description: string;
    quantity: number;
    amount: number;
    image_url: string | null;
  }

  export interface NotificationData {
    items: NotificationItem[];
    totalSum: number;
    customer: {
      name: string;
      email?: string;
      phone?: string;
    };
    deliveryAddress: string;
    reference: string;
  }

  export interface User {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
  }

  export interface OrderProduct {
    product: string;
    product_id: string;
    quantity: number;
    total?: number;
    price?: number;
    order_image?: string;
    image_urls?: string;
  }

  export interface OrderData {
    products: OrderProduct[];
    total: number;
    payment_reference?: string;
  }

  /**
   * Sends order notification after successful payment
   * @param orderDetails - The order details
   * @param user - User information
   * @param deliveryAddress - Delivery address
   * @returns Promise with notification result
   */
  export const sendOrderNotification: (
    orderDetails: OrderData,
    user: User | null,
    deliveryAddress: string
  ) => Promise<{ success: boolean; message: string }>;

  /**
   * Formats order data for notifications
   * @param orderData - The order data from the API
   * @param user - User information
   * @param deliveryAddress - Delivery address
   * @returns Formatted notification data
   */
  export const formatOrderForNotification: (
    orderData: OrderData,
    user: User | null,
    deliveryAddress: string
  ) => NotificationData;

  /**
   * Generates HTML email template for order confirmation
   * @param notificationData - Formatted notification data
   * @returns HTML email template string
   */
  export const generateEmailTemplate: (notificationData: NotificationData) => string;

  /**
   * Generates WhatsApp message for order confirmation
   * @param notificationData - Formatted notification data
   * @returns WhatsApp message string
   */
  export const generateWhatsAppMessage: (notificationData: NotificationData) => string;
}
