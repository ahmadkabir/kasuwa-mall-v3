import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  CreditCard,
  User,
  Mail,
  MapPin,
  Phone,
  Plus,
  Home,
  Building,
  Banknote,
  Smartphone,
  CheckCircle,
  Lock,
  Package,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AddressModal } from '@/components/modals/address-modal'
import { useUserStore } from '@/store/user-store'
import { useCartStore } from '@/store/cart-store'
import { useToast } from '@/components/ui/use-toast'
import { getProductImageUrl } from '@/lib/utils/image'
import { addressApi, paymentApi } from '@/lib/api/checkout-api'
import { orderApi as mainOrderApi } from '@/lib/api/client'
import { formatOrderForNotification } from '@/services/notificationService'
import { InterswitchPay } from 'react-interswitch'

interface Address {
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

interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
}

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: any
  type: 'card' | 'transfer' | 'whatsapp'
}

export default function CheckoutPage() {
  const { user, isAuthenticated } = useUserStore()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('whatsapp')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [transactionRef, setTransactionRef] = useState('')

  // Payment methods available
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Order',
      description: 'Contact seller via WhatsApp (Recommended)',
      icon: Smartphone,
      type: 'whatsapp',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with Visa, Mastercard via Interswitch',
      icon: CreditCard,
      type: 'card',
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: Banknote,
      type: 'transfer',
    },
  ]

  // User addresses state
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([])
  const [loadingAddresses, setLoadingAddresses] = useState(true)

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to proceed with checkout.',
        variant: 'destructive',
      })
      navigate('/login?returnUrl=/checkout')
    }
  }, [isAuthenticated, navigate, toast])

  // Fetch user addresses from backend
  const fetchUserAddresses = async () => {
    if (!user) return

    setLoadingAddresses(true)
    try {
      const result = await addressApi.getUserAddresses(user.id)

      if (result.success) {
        setSavedAddresses(result.addresses)

        // Set default address as selected
        const defaultAddress = result.addresses.find((addr: Address) => addr.is_default)
        if (defaultAddress) {
          setSelectedAddress(defaultAddress)
          setSelectedAddressId(defaultAddress.id)
          // Auto-fill form with default address
          setFormData((prev) => ({
            ...prev,
            firstName: defaultAddress.first_name,
            lastName: defaultAddress.last_name,
            phone: defaultAddress.phone,
            address: defaultAddress.address_line_1,
            city: defaultAddress.city,
            state: defaultAddress.state,
            postalCode: defaultAddress.postal_code || '',
          }))
        } else if (result.addresses.length > 0) {
          // If no default, select first address
          const firstAddress = result.addresses[0]
          setSelectedAddress(firstAddress)
          setSelectedAddressId(firstAddress.id)
          // Auto-fill form with first address
          setFormData((prev) => ({
            ...prev,
            firstName: firstAddress.first_name,
            lastName: firstAddress.last_name,
            phone: firstAddress.phone,
            address: firstAddress.address_line_1,
            city: firstAddress.city,
            state: firstAddress.state,
            postalCode: firstAddress.postal_code || '',
          }))
        }
      } else {
        setSavedAddresses([])
      }
    } catch (error) {
      console.error('Error fetching user addresses:', error)
      setSavedAddresses([])
    } finally {
      setLoadingAddresses(false)
    }
  }

  // Fetch addresses when user is available
  useEffect(() => {
    console.log('User availability changed:', user)
    if (user?.id) {
      fetchUserAddresses()
    }
  }, [user?.id])

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstname || '',
        lastName: user.lastname || '',
        email: user.email || '',
        phone: user.phone || '',
      }))
    }
  }, [user])

  // Handle address selection from modal
  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address)
    setSelectedAddressId(address.id)
    setFormData((prev) => ({
      ...prev,
      firstName: address.first_name,
      lastName: address.last_name,
      phone: address.phone,
      address: address.address_line_1,
      city: address.city,
      state: address.state,
      postalCode: address.postal_code || '',
    }))
    setShowNewAddressForm(false)
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return Home
      case 'work':
        return Building
      default:
        return MapPin
    }
  }

  // Handle opening address modal
  const handleChangeAddress = () => {
    setShowAddressModal(true)
  }

  // Redirect if cart is empty
  useEffect(() => {
    if (isAuthenticated && getTotalItems() === 0) {
      toast({
        title: 'Empty Cart',
        description: 'Your cart is empty. Add some items before checkout.',
        variant: 'destructive',
      })
      navigate('/cart')
    }
  }, [isAuthenticated, getTotalItems, navigate, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Save new address to backend
  const saveNewAddress = async (addressData: Partial<Address>) => {
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to save an address.',
        variant: 'destructive',
      })
      return false
    }

    try {
      const token = localStorage.getItem('@@token')
      if (!token) {
        toast({
          title: 'Authentication Error',
          description: 'No authentication token found. Please log in again.',
          variant: 'destructive',
        })
        return false
      }

      // Prepare the request body
      const requestBody = {
        user_id: user.id,
        address_type: 'home',
        first_name: addressData.first_name || user.firstname || '',
        last_name: addressData.last_name || user.lastname || '',
        phone: addressData.phone || user.phone || '',
        address_line_1: addressData.address_line_1 || '',
        city: addressData.city || '',
        state: addressData.state || '',
        postal_code: addressData.postal_code || '',
        country: 'Nigeria',
        is_default: savedAddresses.length === 0, // First address becomes default
      }

      console.log('Saving address with data:', requestBody) // Debug log

      const response = await fetch('/api/user-address', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const result = await response.json()
      console.log('Address save response:', result) // Debug log

      if (response.ok && result.success) {
        toast({
          title: 'Address Saved',
          description: 'Your address has been saved for future orders.',
        })
        // Refresh addresses
        fetchUserAddresses()
        return true
      } else {
        toast({
          title: 'Failed to Save Address',
          description: result.message || 'Please check your information and try again.',
          variant: 'destructive',
        })
        return false
      }
    } catch (error) {
      console.error('Error saving address:', error)
      toast({
        title: 'Network Error',
        description: 'Could not connect to the server. Please try again later.',
        variant: 'destructive',
      })
      return false
    }
  }

  // Generate transaction reference
  useEffect(() => {
    const txnRef = `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    setTransactionRef(txnRef)
  }, [])

  // Interswitch payment callback
  const paymentCallback = async (response: any) => {
    const txnRef = response.txnref || response.txn_ref || response.reference || ''

    if (response.resp === '00' || response.desc === 'Approved by Financial Institution') {
      setIsProcessing(true)
      toast({
        title: 'Payment Successful!',
        description: 'Processing your order...',
      });

      // Since Interswitch confirmed payment success, create order immediately
      // Verification will happen in background but won't block order creation
      try {
        // Create order immediately since payment is confirmed by Interswitch
        const orderCreated = await createOrder();
        
        if (orderCreated) {
          clearCart();
          setOrderSuccess(true);
          setShowPaymentModal(false);
          
          toast({
            title: 'Order Placed Successfully!',
            description: 'Your order has been placed. Payment confirmed by Interswitch.',
          });
          setIsProcessing(false);
          
          // Try to verify payment in background (non-blocking)
          // This is for record-keeping but won't affect order creation
          verifyPaymentInBackground(txnRef);
          return;
        } else {
          // Order creation failed (shouldn't happen with new error handling, but keep as fallback)
          setIsProcessing(false);
          toast({
            title: 'Order Creation Failed',
            description: 'Payment was successful but order could not be created. Please contact support with transaction reference: ' + txnRef,
            variant: 'destructive',
          })
        }
      } catch (orderError: any) {
        console.error('Order creation error:', orderError);
        setIsProcessing(false);
        
        // Extract error message
        const errorMessage = orderError?.message || orderError?.toString() || 'Unknown error occurred';
        
        // Show detailed error to user
        toast({
          title: 'Order Creation Error',
          description: `Payment was successful but order creation failed: ${errorMessage}. Please contact support with transaction reference: ${txnRef}`,
          variant: 'destructive',
        });
        
        // Also log to console for debugging
        console.error('Full error details:', {
          error: orderError,
          transactionRef: txnRef,
          orderData: {
            customer_id: user?.id,
            total: getTotalPrice() + Math.round(getTotalPrice() * 0.075),
            itemsCount: items.length,
            address: formData.address
          }
        });
      }
    } else {
      setIsProcessing(false)
      toast({
        title: 'Payment Failed',
        description: 'Payment was not successful. Please try again.',
        variant: 'destructive',
      })
    }
  }

  // Background payment verification (non-blocking)
  const verifyPaymentInBackground = async (txnRef: string) => {
    try {
      // Try to verify via callback endpoint first
      try {
        const callbackData = await paymentApi.handlePaymentCallback({
          paymentReference: txnRef
        });
        
        if (callbackData.success) {
          console.log('Payment verified successfully via callback:', callbackData);
          return;
        }
      } catch (callbackError: any) {
        console.warn('Payment callback verification failed (non-critical):', callbackError);
        
        // If callback fails (e.g., 404), try status check as fallback
        try {
          const statusData = await paymentApi.checkPaymentStatus(txnRef);
          if (statusData.success && statusData.data?.status === 'completed') {
            console.log('Payment verified successfully via status check:', statusData);
            return;
          }
        } catch (statusError: any) {
          console.warn('Payment status check also failed (non-critical):', statusError);
          // Both verification methods failed, but this is okay since payment was confirmed by Interswitch
          // Log for admin review but don't block user experience
          console.warn(`Payment verification endpoints unavailable for transaction: ${txnRef}. Payment was confirmed by Interswitch.`);
        }
      }
    } catch (error) {
      // Verification failed but this is non-critical since payment was already confirmed
      console.warn('Background payment verification failed (non-critical):', error);
    }
  };

  // Check for payment response in URL after returning from Interswitch
  // This should run once when the component mounts to handle redirects
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const response = urlParams.get('resp') || urlParams.get('response')
    const txnRef = urlParams.get('transactionreference')

    if (response || txnRef) {
      // Process the payment response
      paymentCallback({
        resp: response,
        txn_ref: txnRef,
      })
    }
  }, []) // Run only on mount

  // Handle card payment with Interswitch
  const handleCardPayment = async () => {
    setIsProcessing(true)

    try {
      // 1. Initiate secure payment session in backend with cart/order details
      const paymentInitiationData = await paymentApi.initiateSecurePayment({
        amount: getTotalPrice() + Math.round(getTotalPrice() * 0.075), // Amount in naira
        userId: user?.id || '',
        // Note: We might not have a specific cart_id in the current implementation,
        // but we could generate and store cart details server-side if needed
        customerEmail: user?.email || '',
        customerName: `${user?.firstname || ''} ${user?.lastname || ''}`.trim(),
      })

      if (!paymentInitiationData.success) {
        throw new Error(
          paymentInitiationData.message || 'Failed to initiate secure payment'
        )
      }

      const { paymentReference } = paymentInitiationData

      toast({
        title: 'Initiating Payment',
        description: 'Redirecting to secure payment gateway...',
      })

      // 2. Close the payment modal and redirect to Interswitch
      setShowPaymentModal(false)

      // Create and submit the form to Interswitch with secure reference
      // Instead of opening in a new tab, we'll redirect the current window to maintain proper flow
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = 'https://webpay.interswitchng.com/collections/w/pay'
      form.target = '_self' // Redirect current window
      form.style.display = 'none'

      const fields = {
        merchant_code: 'MX162337',
        pay_item_id: 'Default_Payable_MX162337',
        txn_ref: paymentReference, // Use secure payment reference from backend
        amount: Math.round(
          (getTotalPrice() + Math.round(getTotalPrice() * 0.075)) * 100
        ).toString(), // Amount in kobo
        currency: 'NGN',
        site_redirect_url: `${window.location.origin}/checkout`,
        cust_email: user?.email || '',
        cust_name: `${user?.firstname || ''} ${user?.lastname || ''}`.trim(),
        pay_method: 'both',
        mode: 'LIVE',
      }

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = String(value)
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
      // Note: The page will redirect, so no code after this will execute
    } catch (error) {
      console.error('Secure payment initiation error:', error)
      toast({
        title: 'Payment Failed',
        description: 'Unable to start secure payment. Please try again.',
        variant: 'destructive',
      })
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Validate required fields
      const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'address',
        'city',
        'state',
      ]

      const missingFields = requiredFields.filter(
        (field) => !formData[field as keyof CheckoutFormData]
      )

      if (missingFields.length > 0) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        })
        setIsProcessing(false)
        return
      }

      // Save new address if user entered one
      if (showNewAddressForm && formData.address) {
        const addressSaved = await saveNewAddress({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          address_line_1: formData.address,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postalCode,
        })

        // Only continue if address was saved successfully
        if (!addressSaved) {
          setIsProcessing(false)
          return // Stop the submission process
        }
      }

      // Create order directly without payment
      const orderCreated = await createOrder()

      if (orderCreated) {
        // Clear cart
        clearCart()
        
        // Show success message
        toast({
          title: 'Order Placed Successfully!',
          description: 'Your order has been placed and saved to your orders.',
        })
        
        // Redirect to orders page
        navigate('/orders')
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: 'Checkout Error',
        description: 'There was an error processing your checkout. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle order creation
  const createOrder = async () => {
    try {
      // Validate required data before creating order
      if (!user?.id) {
        throw new Error('User ID is required to create an order');
      }
      
      if (!items || items.length === 0) {
        throw new Error('Cart is empty. Cannot create order without items.');
      }

      // Validate form data
      if (!formData.address || !formData.city || !formData.state) {
        throw new Error('Delivery address information is incomplete');
      }

      // Prepare order data - using the structure that matches the backend API
      // Backend controller expects: { id: number (for p_id INT), products: array, total, taxAmount, paymentReference }
      // Each product should have customer_id as a string (VARCHAR in database)
      // The stored procedure: p_id is INT (unused for create, defaults to 0), p_customer_id is VARCHAR(255)
      const customerId = user.id || '';
      if (!customerId || customerId.trim() === '') {
        throw new Error(`Invalid user ID: ${user.id}. Cannot create order.`);
      }
      
      // Calculate tax (7.5% of subtotal)
      const subtotal = getTotalPrice();
      const taxAmount = Math.round(subtotal * 0.075);
      const total = subtotal + taxAmount;
      
      // Get payment reference if available (from payment transaction)
      const paymentReference = transactionRef || null;
      
      // Map payment method to modeOfPayment value
      const getPaymentMethod = () => {
        switch (selectedPaymentMethod) {
          case 'card':
            return 'Card Payment';
          case 'whatsapp':
            return 'WhatsApp Order';
          case 'transfer':
            return 'Bank Transfer';
          default:
            return 'Other';
        }
      };
      
      const orderData = {
        id: 0, // Backend expects 'id' as integer for p_id parameter (INT in stored procedure, unused for create)
        total: total, // Total order amount including tax
        taxAmount: taxAmount, // Tax amount for tax_transactions table
        paymentReference: paymentReference, // Payment reference for linking tax transaction
        paymentMethod: getPaymentMethod(), // Payment method for modeOfPayment column
        products: items.map((item) => ({
          customer_id: customerId, // This is p_customer_id (VARCHAR) - the actual customer ID string (e.g., "CTM00001")
          product: item.name, // Backend expects 'product', not 'product_name'
          quantity: item.quantity,
          product_id: item.product_id, // Keep as string to match original format
          status: 'Pending',
          shop_id: 'default', // Keep as string based on original usage
          order_image: getProductImageUrl(item.image_urls) || '',
          // Include delivery info that might be needed by backend procedure
          delivery_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
        })),
      }

      console.log('Creating order with data:', orderData);

      // Type assertion needed because backend expects { id, products } but TypeScript interface may differ
      const result = await mainOrderApi.create(orderData as any);
      
      console.log('Order API response:', result);
      
      // Handle different response structures
      // New backend returns: { success: true, result: { orders: [...], taxTransactions: [...], primaryOrderId: ... } }
      if (result.success) {
        // Check if result has result property or orderId or just success
        const hasResult = result.result !== undefined;
        const responseAny = result as any;
        const hasOrderId = responseAny.orderId !== undefined;
        const hasPrimaryOrderId = result.result?.primaryOrderId !== undefined;
        
        if (hasResult || hasOrderId || hasPrimaryOrderId || result.success) {
          // Extract order information
          const primaryOrderId = result.result?.primaryOrderId || responseAny.orderId || result.result?.orders?.[0]?.orderId;
          const orderIds = result.result?.orders?.map((o: any) => o.orderId) || [];
          const taxTransactions = result.result?.taxTransactions || [];
          
          console.log('Order created successfully:', {
            primaryOrderId,
            orderIds,
            taxTransactions,
            totalOrders: result.result?.totalOrders,
            totalTaxTransactions: result.result?.totalTaxTransactions,
          });
          
          // Store order ID for potential future use (e.g., order tracking)
          if (primaryOrderId) {
            console.log(`Primary order ID: ${primaryOrderId}`);
            // You can store this in state or localStorage if needed
            // setOrderId(primaryOrderId);
          }
          
          // Send notification after successful order creation
          try {
            // Format order data for notification
            // Convert to format expected by notification service (add total for compatibility)
            const notificationOrderData = {
              ...orderData,
              customer_id: user.id, // Use customer ID from user
              total: total,
              orderId: primaryOrderId, // Include order ID in notification
            };
            const formattedOrder = formatOrderForNotification(notificationOrderData, user, `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`);
            
            // Send notification (this is for demonstration - in real implementation notifications are handled server-side)
            console.log('Order notification formatted:', formattedOrder);
            
            // In a real implementation, you might want to send this to your backend
            // await sendOrderNotification(formattedOrder, user, `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`);
          } catch (notificationError) {
            console.error('Error with post-order notification:', notificationError);
            // Don't fail the order creation if notification fails
          }
          
          return true;
        }
      }
      
      // If we get here, order creation didn't succeed
      console.error('Order creation failed - unexpected response structure:', result);
      
      // Try to extract error message from various possible locations
      let errorMessage = 'Failed to create order';
      const resultAny = result as any;
      
      if (result.result && typeof result.result === 'object') {
        const resultObj = result.result as any;
        errorMessage = resultObj.message || resultObj.error || errorMessage;
      } else if (resultAny.message) {
        errorMessage = resultAny.message;
      } else if (typeof result === 'string') {
        errorMessage = result;
      }
      
      throw new Error(errorMessage);
    } catch (error: any) {
      console.error('Order creation error:', error);
      
      // Log detailed error information for debugging
      if (error.response) {
        console.error('Error response:', error.response);
      }
      if (error.status) {
        console.error('Error status:', error.status);
      }
      if (error.message) {
        console.error('Error message:', error.message);
      }
      
      // Re-throw with more context for the calling function
      const errorMessage = error.message || error.toString() || 'Unknown error occurred while creating order';
      throw new Error(errorMessage);
    }
  }

  // Handle WhatsApp order
  const handleWhatsAppOrder = async () => {
    setIsProcessing(true)

    try {
      // Create order in database
      const orderCreated = await createOrder()

      if (orderCreated) {
        // Prepare WhatsApp message
        let message = `📦 *New Order from NACCIMA E-commerce*\n\n`
        message += `👤 *Customer Details:*\n`
        message += `Name: ${formData.firstName} ${formData.lastName}\n`
        message += `Email: ${formData.email}\n`
        message += `Phone: ${formData.phone}\n\n`

        message += `📍 *Delivery Address:*\n`
        message += `${formData.address}\n`
        message += `${formData.city}, ${formData.state} ${formData.postalCode}\n\n`

        message += `🛒 *Order Items:*\n`
        items.forEach((item, index) => {
          message += `${index + 1}. ${item.name}\n`
          message += `   Quantity: ${item.quantity}\n`
          message += `   Price: ₦${item.price.toLocaleString()}\n`
          message += `   Subtotal: ₦${(item.price * item.quantity).toLocaleString()}\n\n`
        })

        message += `💰 *Order Summary:*\n`
        message += `Shipping: ₦2,500\n`
        message += `Tax: ₦${Math.round(getTotalPrice() * 0.075).toLocaleString()}\n`
        message += `*Total: ₦${(getTotalPrice() + Math.round(getTotalPrice() * 0.075)).toLocaleString()}*\n\n`

        message += `⚠️ *Important:* Do not make payment until you receive your order.\n`
        message += `📞 *Support:* +2349067393633`

        // Admin WhatsApp Number
        const adminWhatsAppNumber = '+2347017222999';
        const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(message)}`;

        // Clear cart
        clearCart()

        // Open WhatsApp
        window.open(whatsappUrl, '_blank')

        // Show success
        setOrderSuccess(true)
        setShowPaymentModal(false)

        toast({
          title: 'Order Sent Successfully!',
          description:
            'Your order has been sent via WhatsApp. Our team will respond within 24 hours.',
        })
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error) {
      console.error('WhatsApp order error:', error)
      toast({
        title: 'Order Failed',
        description: 'There was an error processing your order. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle bank transfer
  const handleBankTransfer = async () => {
    setIsProcessing(true)

    try {
      // Create order
      const orderCreated = await createOrder()

      if (orderCreated) {
        clearCart()
        setOrderSuccess(true)
        setShowPaymentModal(false)

        toast({
          title: 'Order Placed!',
          description:
            'Please make payment to the provided bank details. Your order will be processed after payment confirmation.',
        })
      }
    } catch (error) {
      console.error('Bank transfer error:', error)
      toast({
        title: 'Order Failed',
        description: 'There was an error processing your order. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Interswitch payment parameters - This is used by the InterswitchPay component if still being used
  const paymentParameters = {
    merchantCode: 'MX162337',
    payItemID: 'Default_Payable_MX162337',
    customerEmail: user?.email || '',
    redirectURL: `${window.location.origin}/checkout`, // Redirect back to checkout page to handle response
    text: 'Pay with Interswitch',
    mode: 'LIVE', // Use TEST for development, LIVE for production
    transactionReference: transactionRef, // This will be replaced by the secure reference in handleCardPayment
    amount: Math.round(
      (getTotalPrice() + Math.round(getTotalPrice() * 0.075)) * 100
    ).toString(), // Amount in kobo
    style: {
      width: '200px',
      height: '40px',
      border: 'none',
      color: '#fff',
      backgroundColor: '#552b2b',
      borderRadius: '5px',
    },
    callback: (response: any) => {
      console.log(response)
      paymentCallback(response)
    },
  }

  // Handle payment confirmation
  const handlePaymentConfirmation = async () => {
    const selectedMethod = paymentMethods.find(
      (method) => method.id === selectedPaymentMethod
    )

    switch (selectedMethod?.type) {
      case 'whatsapp':
        await handleWhatsAppOrder()
        break
      case 'card':
        setShowPaymentModal(false)
        await handleCardPayment()
        break
      case 'transfer':
        await handleBankTransfer()
        break
      default:
        toast({
          title: 'Invalid Payment Method',
          description: 'Please select a valid payment method.',
          variant: 'destructive',
        })
    }
  }

  // Show success page if order completed
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Order Confirmed!</h1>
            <p className="mb-6 text-gray-600">
              {selectedPaymentMethod === 'whatsapp'
                ? 'Your order has been sent via WhatsApp. Our team will contact you within 24 hours.'
                : selectedPaymentMethod === 'card'
                  ? 'Your payment has been processed and order confirmed.'
                  : 'Your order has been placed. Please make payment to the provided bank details.'}
            </p>
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-6xl"
        >
          {/* Header with user info */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent">
                Checkout
              </h1>
              <Badge
                variant="outline"
                className="border-primary text-primary"
              >
                {getTotalItems()} items
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="h-4 w-4" />
              <span>
                Welcome back, {user?.firstname} {user?.lastname}
              </span>
              <span className="text-gray-400">•</span>
              <Mail className="h-4 w-4" />
              <span>{user?.email}</span>
              {user?.phone && (
                <>
                  <span className="text-gray-400">•</span>
                  <Phone className="h-4 w-4" />
                  <span>{user?.phone}</span>
                </>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Checkout Form */}
              <div className="space-y-6 lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <MapPin className="mr-3 h-6 w-6 text-primary" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Address Selection */}
                    <div>
                      <Label className="mb-4 block text-base font-medium">
                        Choose Delivery Address
                      </Label>

                      {loadingAddresses ? (
                        <div className="space-y-3">
                          {[1, 2].map((i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-3 rounded-lg border p-4"
                            >
                              <div className="mt-1 h-4 w-4 animate-pulse rounded-full bg-gray-200" />
                              <div className="flex-1 space-y-2">
                                <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                                <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                                <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Selected Address Display */}
                          {selectedAddress ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="rounded-lg border border-primary bg-primary/5 p-4"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="mb-2 flex items-center space-x-2">
                                    {(() => {
                                      const IconComponent = getAddressIcon(
                                        selectedAddress.address_type
                                      )
                                      return (
                                        <IconComponent className="h-5 w-5 text-primary" />
                                      )
                                    })()}
                                    <span className="font-medium">
                                      {selectedAddress.first_name}{' '}
                                      {selectedAddress.last_name}
                                    </span>
                                    {selectedAddress.is_default && (
                                      <Badge variant="outline" className="text-xs">
                                        Default
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    <p>{selectedAddress.address_line_1}</p>
                                    {selectedAddress.address_line_2 && (
                                      <p>{selectedAddress.address_line_2}</p>
                                    )}
                                    <p>
                                      {selectedAddress.city}, {selectedAddress.state}{' '}
                                      {selectedAddress.postal_code}
                                    </p>
                                    <p>{selectedAddress.phone}</p>
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={handleChangeAddress}
                                  className="border-primary text-primary hover:bg-primary hover:text-white"
                                >
                                  Change
                                </Button>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center"
                            >
                              <MapPin className="mx-auto mb-3 h-10 w-10 text-gray-400" />
                              <p className="mb-3 text-gray-600">
                                {savedAddresses.length === 0
                                  ? 'No saved addresses found. Add your delivery address to continue.'
                                  : 'Select a delivery address'}
                              </p>
                              <Button
                                type="button"
                                onClick={handleChangeAddress}
                                className="bg-primary hover:bg-primary/90"
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                {savedAddresses.length === 0
                                  ? 'Add Address'
                                  : 'Select Address'}
                              </Button>
                            </motion.div>
                          )}

                          {/* Option to add new address */}
                          {savedAddresses.length > 0 && !showNewAddressForm && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setShowNewAddressForm(true)}
                              className="w-full border-2 border-dashed hover:border-primary hover:text-primary"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add New Address for This Order
                            </Button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* New Address Form */}
                    {showNewAddressForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4 rounded-lg bg-gray-50 p-4"
                      >
                        <h4 className="font-medium text-gray-900">New Address Details</h4>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="First name"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Last name"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone number"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="address">Address *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Street address"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="City"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State *</Label>
                            <Input
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              placeholder="State"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="Postal code"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Email (always visible) */}
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method Section - Disabled */}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="glass-card sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-2xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {getTotalItems() > 0 ? (
                      <>
                        {/* Cart Items */}
                        <div className="max-h-96 space-y-3 overflow-y-auto pr-2">
                          {items.map((item) => (
                            <div
                              key={item.product_id}
                              className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3"
                            >
                              <img
                                src={
                                  getProductImageUrl(item.image_urls) ||
                                  '/images/no-image-placeholder-optimized.jpg'
                                }
                                alt={item.name}
                                className="h-16 w-16 rounded object-cover"
                                loading="lazy"
                              />
                              <div className="min-w-0 flex-1">
                                <h4 className="truncate text-sm font-medium">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  ₦{(item.price * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Totals */}
                        <div className="space-y-2 border-t border-gray-200 pt-4">
                          <div className="flex justify-between">
                            <span>Subtotal ({getTotalItems()} items)</span>
                            <span>₦{getTotalPrice().toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>
                              ₦{Math.round(getTotalPrice() * 0.075).toLocaleString()}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>
                              ₦
                              {(
                                getTotalPrice() + Math.round(getTotalPrice() * 0.075)
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="py-8 text-center">
                        <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                        <p className="text-muted-foreground">No items in cart</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
                      size="lg"
                      disabled={getTotalItems() === 0 || isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Package className="mr-2 h-5 w-5" />
                          Place Order (₦
                          {getTotalItems() > 0
                            ? (
                                getTotalPrice() + Math.round(getTotalPrice() * 0.075)
                              ).toLocaleString()
                            : '0'}
                          )
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>

          {/* Payment Confirmation Modal - Disabled */}

          {/* Address Modal */}
          <AddressModal
            isOpen={showAddressModal}
            onClose={() => setShowAddressModal(false)}
            userId={user?.id || ''}
            onAddressSelect={handleAddressSelect}
            selectedAddressId={selectedAddressId || undefined}
          />
        </motion.div>
      </div>
    </div>
  )
}
