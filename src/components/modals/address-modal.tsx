import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Home, Building, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/store/user-store';
import { addressApi } from '@/lib/api/checkout-api';

interface Address {
  id: number;
  user_id: string;
  address_type: 'home' | 'work' | 'other';
  first_name: string;
  last_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onAddressSelect: (address: Address) => void;
  selectedAddressId?: number;
}

export function AddressModal({ 
  isOpen, 
  onClose, 
  userId, 
  onAddressSelect,
  selectedAddressId
}: AddressModalProps) {
  const { user } = useUserStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddressIdState, setSelectedAddressIdState] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState({
    address_type: 'home' as 'home' | 'work' | 'other',
    first_name: '',
    last_name: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Nigeria',
    is_default: false
  });

  // Fetch addresses
  useEffect(() => {
    if (isOpen && userId) {
      fetchAddresses();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (selectedAddressId !== undefined) {
      setSelectedAddressIdState(selectedAddressId);
    }
  }, [selectedAddressId]);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const result = await addressApi.getUserAddressesByUserId(userId);
      
      if (result.success) {
        setAddresses(result.addresses);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    try {
      const result = await addressApi.createUserAddress({
        user_id: userId,
        ...newAddress
      });

      if (result.success) {
        // Refresh addresses
        fetchAddresses();
        setShowNewAddressForm(false);
        resetNewAddressForm();
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const resetNewAddressForm = () => {
    setNewAddress({
      address_type: 'home',
      first_name: '',
      last_name: '',
      phone: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'Nigeria',
      is_default: false
    });
  };

  const handleAddressSelect = (address: Address) => {
    onAddressSelect(address);
    onClose();
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home': return Home;
      case 'work': return Building;
      default: return MapPin;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Select Address</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kasuwa-primary"></div>
              </div>
            ) : (
              <>
                {/* Saved Addresses */}
                <RadioGroup 
                  value={selectedAddressIdState?.toString()} 
                  onValueChange={(value) => setSelectedAddressIdState(Number(value))}
                >
                  <div className="space-y-4">
                    {addresses.map((address) => {
                      const IconComponent = getAddressIcon(address.address_type);
                      return (
                        <Card 
                          key={address.id} 
                          className={`cursor-pointer hover:shadow-md transition-all ${
                            selectedAddressIdState === address.id ? 'ring-2 ring-kasuwa-primary' : ''
                          }`}
                          onClick={() => handleAddressSelect(address)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <IconComponent className="h-5 w-5 text-kasuwa-primary mt-0.5" />
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">
                                      {address.first_name} {address.last_name}
                                    </span>
                                    {address.is_default && (
                                      <span className="text-xs bg-kasuwa-primary text-white px-2 py-0.5 rounded">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {address.address_line_1} {address.address_line_2 && address.address_line_2}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {address.city}, {address.state} {address.postal_code}
                                  </p>
                                  <p className="text-sm text-gray-600">{address.phone}</p>
                                </div>
                              </div>
                              <RadioGroupItem
                                value={address.id.toString()}
                                id={`address-${address.id}`}
                                className="mt-0.5"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </RadioGroup>

                {/* Add New Address Button */}
                <div className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed border-2 hover:border-kasuwa-primary hover:text-kasuwa-primary"
                    onClick={() => {
                      setShowNewAddressForm(true);
                      setSelectedAddressIdState(null);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Address
                  </Button>
                </div>

                {/* New Address Form */}
                {showNewAddressForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-4 border rounded-lg bg-gray-50"
                  >
                    <h3 className="font-medium mb-4">Add New Address</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first_name">First Name</Label>
                          <Input
                            id="first_name"
                            value={newAddress.first_name}
                            onChange={(e) => setNewAddress({...newAddress, first_name: e.target.value})}
                            placeholder="First name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input
                            id="last_name"
                            value={newAddress.last_name}
                            onChange={(e) => setNewAddress({...newAddress, last_name: e.target.value})}
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                          placeholder="Phone number"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="address_line_1">Address Line 1</Label>
                        <Input
                          id="address_line_1"
                          value={newAddress.address_line_1}
                          onChange={(e) => setNewAddress({...newAddress, address_line_1: e.target.value})}
                          placeholder="Street address"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="address_line_2">Address Line 2 (Optional)</Label>
                        <Input
                          id="address_line_2"
                          value={newAddress.address_line_2}
                          onChange={(e) => setNewAddress({...newAddress, address_line_2: e.target.value})}
                          placeholder="Apartment, suite, etc."
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                            placeholder="State"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="postal_code">Postal Code</Label>
                          <Input
                            id="postal_code"
                            value={newAddress.postal_code}
                            onChange={(e) => setNewAddress({...newAddress, postal_code: e.target.value})}
                            placeholder="Postal code"
                          />
                        </div>
                        <div>
                          <Label>Address Type</Label>
                          <RadioGroup
                            value={newAddress.address_type}
                            onValueChange={(value: 'home' | 'work' | 'other') => setNewAddress({...newAddress, address_type: value})}
                            className="flex space-x-4 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="home" id="home" />
                              <Label htmlFor="home">Home</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="work" id="work" />
                              <Label htmlFor="work">Work</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other">Other</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="is_default"
                          checked={newAddress.is_default}
                          onChange={(e) => setNewAddress({...newAddress, is_default: e.target.checked})}
                          className="h-4 w-4 text-kasuwa-primary rounded focus:ring-kasuwa-primary"
                        />
                        <Label htmlFor="is_default">Set as default address</Label>
                      </div>
                      
                      <div className="flex space-x-3 pt-4">
                        <Button
                          type="button"
                          onClick={() => {
                            setShowNewAddressForm(false);
                            resetNewAddressForm();
                          }}
                          variant="outline"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleSaveAddress}
                          className="flex-1 bg-kasuwa-primary hover:bg-kasuwa-primary/90"
                        >
                          Save Address
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}