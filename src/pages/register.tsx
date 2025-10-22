import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { authApi } from '@/lib/api/client'
import { useToast } from '@/components/ui/use-toast'
import { User, Mail, Lock, Phone, User2, Store, MapPin } from 'lucide-react'

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [role, setRole] = useState<'user' | 'vendor'>('user')
  const [shopName, setShopName] = useState('')
  const [shopAddress, setShopAddress] = useState('')
  const [shopContact, setShopContact] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Prepare registration data based on user type
      const registrationData = {
        firstname: firstName,
        lastname: lastName,
        username,
        email,
        password,
        phone,
        role,
        ...(role === 'vendor' && {
          shopname: shopName,
          shopaddress: shopAddress,
          shopcontact: shopContact,
        }),
        ...(role === 'user' && address && {
          address: address,
        }),
      }

      const response = await authApi.register(registrationData)

      if (response.success) {
        // Show success message
        toast({
          title: 'Registration Successful!',
          description: 'Your account has been created successfully. You can now log in.',
        });
        // Registration successful - redirect to login page
        navigate('/login?registered=true')
      } else {
        setError(response.message || 'Registration failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.')
      console.error('Registration error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-card p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-muted-foreground text-center mb-6">Join Kasuwa Mall today</p>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">First Name</label>
              <div className="relative">
                <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="John" 
                  glass
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Doe" 
                  glass
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="johndoe" 
                glass
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="email" 
                placeholder="you@example.com" 
                glass
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="password" 
                placeholder="••••••••" 
                glass
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="tel" 
                placeholder="+234 801 234 5678" 
                glass
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {role === 'user' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Enter your address" 
                  glass
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">Account Type</label>
            <RadioGroup value={role} onValueChange={(value: 'user' | 'vendor') => setRole(value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">Customer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vendor" id="vendor" />
                <Label htmlFor="vendor">Vendor</Label>
              </div>
            </RadioGroup>
          </div>

          {role === 'vendor' && (
            <div className="space-y-4 pt-4 border-t border-white/20">
              <h3 className="font-semibold">Vendor Information</h3>
              <div>
                <label className="text-sm font-medium mb-2 block">Shop Name</label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="Your shop name" 
                    glass
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required={role === 'vendor'}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Shop Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="Shop address" 
                    glass
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                    required={role === 'vendor'}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Shop Contact</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="Shop contact number" 
                    glass
                    value={shopContact}
                    onChange={(e) => setShopContact(e.target.value)}
                    required={role === 'vendor'}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          )}

          <Button 
            variant="gradient" 
            className="w-full" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
