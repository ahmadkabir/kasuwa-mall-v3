import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X,
  Package,
  Heart,
  Bell,
  Settings,
  Shield,
  Gift,
  Star,
  LogOut,
  Clock,
  CheckCircle,
  AlertCircle,
  Store,
  Building,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/store/user-store'
import { useToast } from '@/components/ui/use-toast'

interface UserStats {
  totalOrders: number
  wishlistItems: number
  totalSpent: number
  memberSince: string
}

interface User {
  id: string
  firstname?: string
  lastname?: string
  username?: string
  email?: string
  phone?: string
  address?: string
  status?: string
  role?: string
  createdAt?: string
  shopname?: string
  shopaddress?: string
  shopcontact?: string // ✅ This fixes the error
  type_of_bussiness?: string
}

export default function AccountPage() {
  const { isAuthenticated, logout } = useUserStore()
  const { user } = useUserStore() as { user: User | null }
  const { toast } = useToast()
  const navigate = useNavigate()
  
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [userStats, setUserStats] = useState<UserStats>({
    totalOrders: 0,
    wishlistItems: 0,
    totalSpent: 0,
    memberSince: ''
  })
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  })
  const [showEmail, setShowEmail] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  // Initialize form data with user data
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: 'Welcome to my Kasuwa Mall profile!'
      })
      
      // Set user stats with safe date formatting
      const memberSince = user?.createdAt ? 
        new Date(user.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long'
        }) : 'Unknown'
        
      setUserStats({
        totalOrders: 12, // This would come from API
        wishlistItems: 5, // This would come from API
        totalSpent: 125000, // This would come from API
        memberSince
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Here you would typically save to backend
      // For now, we'll just show a success message
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
      toast({
        title: 'Update Failed',
        description: 'There was an error updating your profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset form data to original values
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: 'Welcome to my Kasuwa Mall profile!'
      })
    }
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    })
    navigate('/login')
  }

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <Badge variant="default" className="bg-green-500/20 text-green-500 hover:bg-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>
      case 'pending':
        return <Badge variant="default" className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case 'suspended':
        return <Badge variant="default" className="bg-red-500/20 text-red-500 hover:bg-red-500/20"><AlertCircle className="h-3 w-3 mr-1" />Suspended</Badge>
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <Badge variant="default" className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/20">Admin</Badge>
      case 'vendor':
        return <Badge variant="default" className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/20"><Store className="h-3 w-3 mr-1" />Vendor</Badge>
      case 'customer':
        return <Badge variant="outline" className="text-gray-500">Customer</Badge>
      default:
        return <Badge variant="outline" className="text-gray-500">{role || 'User'}</Badge>
    }
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="glass-card p-8 rounded-2xl text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Not Signed In</h2>
          <p className="text-muted-foreground mb-6">Please sign in to access your account</p>
          <Button onClick={() => navigate('/login')}>Sign In</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-kasuwa-secondary bg-clip-text text-transparent">My Account</h1>
        <p className="text-muted-foreground">Manage your profile and account settings</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            {/* Profile Avatar */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-kasuwa-secondary flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {user?.firstname} {user?.lastname}
              </h3>
              <p className="text-sm text-muted-foreground">@{user?.username}</p>
              <div className="flex items-center justify-center mt-2 space-x-2">
                {getRoleBadge(user?.role || '')}
                {getStatusBadge(user?.status || '')}
              </div>
              <div className="flex items-center justify-center mt-2">
                <Calendar className="h-4 w-4 text-muted-foreground/60 mr-1" />
                <span className="text-xs text-muted-foreground">Member since {userStats.memberSince}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="glass-card p-3 rounded-lg text-center">
                <Package className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-semibold text-foreground">{userStats.totalOrders}</p>
                <p className="text-xs text-muted-foreground">Orders</p>
              </div>
              <div className="glass-card p-3 rounded-lg text-center">
                <Heart className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-semibold text-foreground">{userStats.wishlistItems}</p>
                <p className="text-xs text-muted-foreground">Wishlist</p>
              </div>
            </div>

            {/* Total Spent */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/20 to-kasuwa-secondary/20 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-xl font-bold text-foreground">₦{userStats.totalSpent.toLocaleString()}</p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button variant="glass" className="w-full justify-start" onClick={() => navigate('/orders')}>
                <Package className="h-4 w-4 mr-3" />
                Order History
              </Button>
              <Button variant="glass" className="w-full justify-start" onClick={() => navigate('/wishlist')}>
                <Heart className="h-4 w-4 mr-3" />
                Wishlist
              </Button>
              <Button variant="glass" className="w-full justify-start" onClick={() => navigate('/account')}>
                <MapPin className="h-4 w-4 mr-3" />
                Addresses
              </Button>
              <Separator className="my-4" />
              <Button 
                variant="glass" 
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex flex-row items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Profile Information
              </h2>
              {!isEditing ? (
                <Button 
                  variant="gradient" 
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    variant="gradient"
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstname">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">{formData.firstname || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastname">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">{formData.lastname || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  {isEditing ? (
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">@{formData.username || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">
                        {!showEmail ? `${formData.email?.substring(0, 2)}***${formData.email?.substring(formData.email?.indexOf('@') - 2)}` : formData.email || 'Not provided'}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto text-muted-foreground hover:text-foreground"
                        onClick={() => setShowEmail(!showEmail)}
                      >
                        {showEmail ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">
                        {!showPhone ? `${formData.phone?.substring(0, 4)}***${formData.phone?.substring(formData.phone?.length - 2)}` : formData.phone || 'Not provided'}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPhone(!showPhone)}
                      >
                        {showPhone ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <Separator />
              <div className="space-y-4">
                <h3 className="font-bold text-foreground flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Account Status</Label>
                    <div className="flex items-center mt-1 p-3 bg-white/10 rounded-lg">
                      {getStatusBadge(user?.status || '')}
                    </div>
                  </div>
                  <div>
                    <Label>Account Role</Label>
                    <div className="flex items-center mt-1 p-3 bg-white/10 rounded-lg">
                      {getRoleBadge(user?.role || '')}
                    </div>
                  </div>
                  <div>
                    <Label>Member Since</Label>
                    <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">{userStats.memberSince}</span>
                    </div>
                  </div>
                  <div>
                    <Label>User ID</Label>
                    <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm font-mono text-foreground/80">{user?.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendor Information - Show only if user is a vendor */}
              {user?.role?.toLowerCase() === 'vendor' && user?.shopname && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-bold text-foreground flex items-center">
                      <Store className="h-4 w-4 mr-2 text-primary" />
                      Vendor Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Shop Name</Label>
                        <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                          <Store className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-foreground">{user.shopname}</span>
                        </div>
                      </div>
                      <div>
                        <Label>Business Type</Label>
                        <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-foreground">{user.type_of_bussiness || 'Not specified'}</span>
                        </div>
                      </div>
                      <div>
                        <Label>Shop Address</Label>
                        <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-foreground">{user.shopaddress || 'Not provided'}</span>
                        </div>
                      </div>
                      <div>
                        <Label>Shop Contact</Label>
                        <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-foreground">{user.shopcontact || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <div className="flex items-center mt-1 p-3 bg-muted/30 rounded-lg">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-foreground">{formData.address || 'Not provided'}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-3 bg-muted border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    rows={3}
                  />
                ) : (
                  <div className="mt-1 p-3 bg-muted/30 rounded-lg">
                    <span className="text-foreground">{formData.bio || 'No bio provided'}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Account Settings Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold flex items-center mb-6">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              Account Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="glass" className="justify-start h-auto p-4 text-left" onClick={() => navigate('/account')}>
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                  </div>
                </div>
              </Button>

              <Button variant="glass" className="justify-start h-auto p-4 text-left" onClick={() => navigate('/account')}>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Security</p>
                    <p className="text-sm text-muted-foreground">Password and security settings</p>
                  </div>
                </div>
              </Button>

              <Button variant="glass" className="justify-start h-auto p-4 text-left" onClick={() => navigate('/account')}>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Addresses</p>
                    <p className="text-sm text-muted-foreground">Manage shipping addresses</p>
                  </div>
                </div>
              </Button>

              <Button variant="glass" className="justify-start h-auto p-4 text-left" onClick={() => navigate('/account')}>
                <div className="flex items-center">
                  <Gift className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Rewards</p>
                    <p className="text-sm text-muted-foreground">View your rewards and points</p>
                  </div>
                </div>
              </Button>

              <Button variant="glass" className="justify-start h-auto p-4 text-left" onClick={() => navigate('/account')}>
                <div className="flex items-center">
                  <Lock className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Privacy</p>
                    <p className="text-sm text-muted-foreground">Privacy settings</p>
                  </div>
                </div>
              </Button>

              <Button variant="glass" className="justify-start h-auto p-4 text-left" onClick={() => navigate('/account')}>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Reviews</p>
                    <p className="text-sm text-muted-foreground">Manage your product reviews</p>
                  </div>
                </div>
              </Button>
            </div>
          </motion.div>

          {/* Recent Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Order #KM-2024-001 shipped</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <Heart className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Added 3 items to wishlist</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <User className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Profile updated</p>
                  <p className="text-sm text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <Gift className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">New reward earned</p>
                  <p className="text-sm text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
