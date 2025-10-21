import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Home, 
  Building, 
  Plus, 
  CheckCircle, 
  User, 
  Phone, 
  Mail,
  Edit,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useUserStore } from '@/store/user-store'
import { addressApi } from '@/lib/api/client'
import { cn } from '@/lib/utils/cn'

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

interface AddressFormData {
  first_name: string
  last_name: string
  phone: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code?: string
  country: string
  address_type: 'home' | 'work' | 'other'
  is_default: boolean
}

interface AddressSelectorProps {
  selectedAddressId: number | null
  onAddressSelect: (address: Address | null) => void
  onAddressesUpdate?: (addresses: Address[]) => void
}

export function AddressSelector({ 
  selectedAddressId, 
  onAddressSelect,
  onAddressesUpdate
}: AddressSelectorProps) {
  const { user } = useUserStore()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState<AddressFormData>({
    first_name: '',
    last_name: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Nigeria',
    address_type: 'home',
    is_default: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Fetch user addresses
  const fetchAddresses = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const userAddresses = await addressApi.getAddresses(user.id)
      setAddresses(userAddresses)
      
      // Notify parent of address updates
      if (onAddressesUpdate) {
        onAddressesUpdate(userAddresses)
      }
      
      // If no address is selected and there are addresses, select the default or first one
      if (!selectedAddressId && userAddresses.length > 0) {
        const defaultAddress = userAddresses.find(addr => addr.is_default) || userAddresses[0]
        onAddressSelect(defaultAddress)
      }
    } catch (error) {
      console.error('Error fetching addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load addresses on mount
  useEffect(() => {
    if (user) {
      fetchAddresses()
    }
  }, [user])

  // Prefill form when editing an address
  useEffect(() => {
    if (editingAddress) {
      setFormData({
        first_name: editingAddress.first_name,
        last_name: editingAddress.last_name,
        phone: editingAddress.phone,
        address_line_1: editingAddress.address_line_1,
        address_line_2: editingAddress.address_line_2 || '',
        city: editingAddress.city,
        state: editingAddress.state,
        postal_code: editingAddress.postal_code || '',
        country: editingAddress.country,
        address_type: editingAddress.address_type,
        is_default: editingAddress.is_default
      })
      setShowNewAddressForm(true)
    } else if (!showNewAddressForm) {
      // Reset form when closing
      setFormData({
        first_name: '',
        last_name: '',
        phone: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'Nigeria',
        address_type: 'home',
        is_default: false
      })
      setErrors({})
    }
  }, [editingAddress, showNewAddressForm])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required'
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.address_line_1.trim()) newErrors.address_line_1 = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submission triggered')
    
    if (!validateForm() || !user) {
      console.log('Validation failed or user not authenticated')
      return
    }
    
    console.log('Form validated, proceeding with submission')
    
    try {
      const addressData = {
        ...formData,
        user_id: user.id
      }
      
      console.log('Sending address data:', addressData)
      
      // Make sure this API call is being executed
      const response = await addressApi.createAddress(addressData)
      
      console.log('API response received:', response)
      
      if (response.success && response.address) {
        console.log('Address created successfully:', response.address)
        // Refresh addresses
        await fetchAddresses()
        
        // Close form and reset
        setShowNewAddressForm(false)
        setEditingAddress(null)
        
        // Select the newly created address
        onAddressSelect(response.address)
      } else {
        console.log('API call failed:', response)
        setErrors({ submit: response.message || 'Failed to save address. Please try again.' })
      }
    } catch (error) {
      console.error('Error saving address:', error)
      setErrors({ submit: 'Failed to save address. Please try again.' })
    }
  }

  // Handle address selection
  const handleAddressSelect = (address: Address) => {
    onAddressSelect(address)
  }

  // Handle edit address
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
  }

  // Handle delete address
  const handleDeleteAddress = async (addressId: number) => {
    // In a real implementation, this would be an API call
    // For now, we'll just filter it out locally
    setAddresses(prev => prev.filter(addr => addr.id !== addressId))
    
    // If the deleted address was selected, clear selection
    if (selectedAddressId === addressId) {
      onAddressSelect(null)
    }
  }

  // Get address icon based on type
  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home': return Home
      case 'work': return Building
      default: return MapPin
    }
  }

  // Get address type label
  const getAddressTypeLabel = (type: string) => {
    switch (type) {
      case 'home': return 'Home'
      case 'work': return 'Work'
      default: return 'Other'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Delivery Address</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            setEditingAddress(null)
            setShowNewAddressForm(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-24 bg-white/10 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-white/20 rounded-lg">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="font-medium mb-1">No addresses saved</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Add your first delivery address to get started
          </p>
          <Button 
            variant="gradient" 
            onClick={() => setShowNewAddressForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {addresses.map((address) => {
            const IconComponent = getAddressIcon(address.address_type)
            const isSelected = selectedAddressId === address.id
            
            return (
              <motion.div
                key={address.id}
                whileHover={{ y: -2 }}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-all',
                  isSelected 
                    ? 'border-primary bg-primary/10' 
                    : 'border-white/20 hover:border-primary/50'
                )}
                onClick={() => handleAddressSelect(address)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-md bg-primary/10">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">
                          {address.first_name} {address.last_name}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {getAddressTypeLabel(address.address_type)}
                          {address.is_default && (
                            <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-green-500/20 text-green-500">
                              Default
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-sm space-y-1">
                      <p className="truncate">{address.address_line_1}</p>
                      {address.address_line_2 && (
                        <p className="truncate">{address.address_line_2}</p>
                      )}
                      <p className="truncate">
                        {address.city}, {address.state} {address.postal_code}
                      </p>
                      <p className="truncate">{address.phone}</p>
                    </div>
                  </div>
                  
                  {isSelected ? (
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  ) : (
                    <div className="flex flex-col gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditAddress(address)
                        }}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteAddress(address.id)
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Address Form - Inline in Card */}
      <AnimatePresence>
        {showNewAddressForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-6 rounded-lg border border-white/20 bg-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowNewAddressForm(false)
                  setEditingAddress(null)
                }}
              >
                Cancel
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="pl-10"
                      glass
                    />
                  </div>
                  {errors.first_name && (
                    <p className="text-sm text-destructive">{errors.first_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="pl-10"
                      glass
                    />
                  </div>
                  {errors.last_name && (
                    <p className="text-sm text-destructive">{errors.last_name}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                    glass
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address_line_1">Address Line 1 *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address_line_1"
                    name="address_line_1"
                    value={formData.address_line_1}
                    onChange={handleInputChange}
                    className="pl-10"
                    glass
                  />
                </div>
                {errors.address_line_1 && (
                  <p className="text-sm text-destructive">{errors.address_line_1}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address_line_2">Address Line 2 (Optional)</Label>
                <Input
                  id="address_line_2"
                  name="address_line_2"
                  value={formData.address_line_2}
                  onChange={handleInputChange}
                  glass
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    glass
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    glass
                  />
                  {errors.state && (
                    <p className="text-sm text-destructive">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code (Optional)</Label>
                  <Input
                    id="postal_code"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    glass
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled
                    glass
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="is_default"
                  name="is_default"
                  type="checkbox"
                  checked={formData.is_default}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
                />
                <Label htmlFor="is_default" className="text-sm">
                  Set as default address
                </Label>
              </div>

              {errors.submit && (
                <p className="text-sm text-destructive">{errors.submit}</p>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" variant="gradient" className="w-full">
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setShowNewAddressForm(false)
                    setEditingAddress(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}