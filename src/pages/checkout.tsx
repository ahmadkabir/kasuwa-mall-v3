import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Lock,
  Package,
  Truck,
  Shield,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AddressSelector } from '@/components/ui/address-selector'
import { useUserStore } from '@/store/user-store'
import { useCartStore } from '@/store/cart-store'
import { orderApi, paymentApi, addressApi } from '@/lib/api/client'
import { getProductImageUrl } from '@/lib/utils/image'

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
  const { user, isAuthenticated, isLoading } = useUserStore()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const navigate = useNavigate()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
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
      type: 'whatsapp'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with Visa, Mastercard via Interswitch',
      icon: CreditCard,
      type: 'card'
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: Banknote,
      type: 'transfer'
    }
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
    postalCode: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login?returnUrl=/checkout')
    }
  }, [isLoading, isAuthenticated, navigate])

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstname || '',
        lastName: user.lastname || '',
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
  }, [user])

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    
    // Validate that an address is selected
    if (!selectedAddressId) newErrors.addressSelection = 'Please select a delivery address'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle address selection
  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address)
    setSelectedAddressId(address.id)
    setFormData({
      firstName: address.first_name,
      lastName: address.last_name,
      email: formData.email, // Keep email from user data
      phone: address.phone,
      address: address.address_line_1,
      city: address.city,
      state: address.state,
      postalCode: address.postal_code || ''
    })
    setShowNewAddressForm(false)
  }

  // Handle new address form submission
  const handleNewAddressSubmit = async () => {
    if (!user) return
    
    try {
      // Prepare address data matching v2 structure
      const addressData = {
        user_id: user.id,
        address_type: 'home' as const,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        address_line_1: formData.address,
        address_line_2: '', // Optional field
        city: formData.city,
        state: formData.state,
        postal_code: formData.postalCode,
        country: 'Nigeria',
        is_default: savedAddresses.length === 0 // First address becomes default
      }
      
      // Make API call to create address
      const response = await addressApi.createAddress(addressData)
      
      if (response.success && response.address) {
        // Refresh addresses from backend
        const updatedAddresses = await addressApi.getAddresses(user.id)
        setSavedAddresses(updatedAddresses)
        
        // Select the newly created address
        handleAddressSelect(response.address)
        
        // Hide the form
        setShowNewAddressForm(false)
      } else {
        // Handle error
        console.error('Failed to create address:', response.message)
        // In a real implementation, you might want to show an error toast here
      }
    } catch (error) {
      console.error('Error creating address:', error)
      // In a real implementation, you might want to show an error toast here
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Calculate order totals
  const subtotal = getTotalPrice()
  const shipping = subtotal > 50000 ? 0 : 2500 // Free shipping over ₦50,000
  const tax = Math.round(subtotal * 0.075) // 7.5% VAT
  const total = subtotal + shipping + tax

  // Handle checkout submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    if (items.length === 0) {
      return
    }
    
    // Show payment confirmation modal
    setShowPaymentModal(true)
  }

  // Handle WhatsApp order
  const handleWhatsAppOrder = async () => {
    setIsProcessing(true)
    
    try {
      // Create order in database
      const orderData = {
        customer_id: parseInt(user?.id || '0'),
        cart_id: 0, // In a real implementation, this would be the actual cart ID
        total: total,
        status: 'Pending',
        products: items.map(item => ({
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image_urls: item.image_urls
        }))
      }
      
      const response = await orderApi.create(orderData)
      
      if (response.success) {
        // Prepare WhatsApp message
        let message = `📦 *New Order from Kasuwa Mall*\n\n`
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
        message += `Subtotal: ₦${subtotal.toLocaleString()}\n`
        message += `Shipping: ₦${shipping.toLocaleString()}\n`
        message += `Tax: ₦${tax.toLocaleString()}\n`
        message += `*Total: ₦${total.toLocaleString()}*\n\n`
        
        message += `⚠️ *Important:* Do not make payment until you receive your order.\n`
        message += `📞 *Support:* +2349067393633`
        
        // Admin WhatsApp Number (matching v2)
        const adminWhatsAppNumber = '+2347030975118'
        const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(message)}`
        
        // Clear cart
        clearCart()
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank')
        
        // Show success
        setOrderSuccess(true)
        setShowPaymentModal(false)
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error) {
      console.error('WhatsApp order error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle card payment
  const handleCardPayment = async () => {
    setIsProcessing(true)
    
    try {
      // 1. Initiate payment in backend
      const paymentData = {
        amount: total * 100, // Amount in kobo
        customer_email: formData.email,
        customer_id: user?.id || ''
      }
      
      const response = await paymentApi.initiatePayment(paymentData)
      
      if (response.success) {
        // In a real implementation, this would integrate with Interswitch
        // For now, we'll simulate a successful payment
        
        // Update payment status
        await paymentApi.updatePaymentStatus({
          transaction_reference: response.result?.reference || ''
        })
        
        // Clear cart
        clearCart()
        
        // Show success
        setOrderSuccess(true)
        setShowPaymentModal(false)
      } else {
        throw new Error('Failed to initiate payment')
      }
    } catch (error) {
      console.error('Payment initiation error:', error)
      setIsProcessing(false)
    }
  }

  // Handle payment method selection
  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId)
  }

  // Handle payment confirmation
  const handlePaymentConfirm = async () => {
    switch (selectedPaymentMethod) {
      case 'whatsapp':
        await handleWhatsAppOrder()
        break
      case 'card':
        await handleCardPayment()
        break
      case 'transfer':
        // For bank transfer, we would show bank details
        // For now, treat similar to WhatsApp (contact via WhatsApp)
        await handleWhatsAppOrder()
        break
      default:
        break
    }
  }

  // Reset checkout for new order
  const handleNewOrder = () => {
    setOrderSuccess(false)
    navigate('/products')
  }

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-2xl text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Your order has been placed successfully. Our team will contact you shortly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleNewOrder} variant="gradient" size="lg">
              Continue Shopping
            </Button>
            <Link to="/orders">
              <Button variant="glass" size="lg">
                View Orders
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">
              Complete your purchase securely
            </p>
          </div>
          <ShoppingCart className="h-12 w-12 text-primary/50" />
        </div>
      </motion.div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-2xl text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-kasuwa-brown/20 flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Add some products to your cart to checkout
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="gradient" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="glass" size="lg">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="space-y-4">
                {errors.addressSelection && (
                  <Alert className="bg-destructive/20 border-destructive">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-destructive">
                      {errors.addressSelection}
                    </AlertDescription>
                  </Alert>
                )}
                <AddressSelector 
                  selectedAddressId={selectedAddressId}
                  onAddressSelect={(address) => {
                    if (address) {
                      setSelectedAddress(address)
                      setSelectedAddressId(address.id)
                      setFormData({
                        firstName: address.first_name,
                        lastName: address.last_name,
                        email: formData.email, // Keep email from user data
                        phone: address.phone,
                        address: address.address_line_1,
                        city: address.city,
                        state: address.state,
                        postalCode: address.postal_code || ''
                      })
                      // Clear address selection error when address is selected
                      if (errors.addressSelection) {
                        setErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors.addressSelection
                          return newErrors
                        })
                      }
                    } else {
                      setSelectedAddress(null)
                      setSelectedAddressId(null)
                    }
                  }}
                  onAddressesUpdate={setSavedAddresses}
                />
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>

              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={handlePaymentMethodSelect}
                className="space-y-4"
              >
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon
                  return (
                    <div
                      key={method.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-primary bg-primary/10'
                          : 'border-white/20 hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="sr-only"
                      />
                      <label
                        htmlFor={method.id}
                        className="flex items-start space-x-4 cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-white/10">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{method.name}</h3>
                            {selectedPaymentMethod === method.id && (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {method.description}
                          </p>
                        </div>
                      </label>
                    </div>
                  )
                })}
              </RadioGroup>

              {selectedPaymentMethod === 'transfer' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20"
                >
                  <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Bank:</span> Keystone Bank
                    </p>
                    <p>
                      <span className="font-medium">Account Number:</span> 1013842470
                    </p>
                    <p>
                      <span className="font-medium">Account Name:</span> Prospora Tech Nigeria limited
                    </p>
                    <Alert className="mt-3">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        After payment, send proof of payment to our WhatsApp number: +2347030975118
                      </AlertDescription>
                    </Alert>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 rounded-2xl sticky top-24"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product_id} className="flex items-center space-x-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                      {item.image_urls ? (
                        <img
                          src={getProductImageUrl(item.image_urls)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="mt-6 space-y-3 pt-4 border-t border-white/20">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (7.5%)</span>
                  <span>₦{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-lg">₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full mt-6 group"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Clock className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <span>Fast delivery</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Package className="h-4 w-4 text-kasuwa-secondary" />
                  <span>Quality guaranteed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      )}

      {/* Payment Confirmation Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Please confirm your order details before proceeding with payment.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Payment Method</span>
                <span>
                  {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Amount</span>
                <span className="font-bold text-lg">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {selectedPaymentMethod === 'whatsapp' 
                  ? 'You will be redirected to WhatsApp to complete your order.'
                  : 'You will be redirected to a secure payment gateway.'}
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="flex-col space-y-2 sm:space-y-0">
            <Button
              onClick={handlePaymentConfirm}
              disabled={isProcessing}
              variant="gradient"
            >
              {isProcessing ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm and Pay'
              )}
            </Button>
            <Button
              onClick={() => setShowPaymentModal(false)}
              variant="outline"
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}