import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store/user-store'
import { authApi } from '@/lib/api/client'
import { Mail, Lock, User } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const { login } = useUserStore()
  const [searchParams] = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') || '/'
  const registered = searchParams.get('registered')

  useEffect(() => {
    // If user is already authenticated, redirect to return URL
    if (useUserStore.getState().isAuthenticated) {
      navigate(returnUrl)
    }
  }, [navigate, returnUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await authApi.login({ email, password })
      
      if (response.success && response.token && response.result) {
        // Login successful - store user data
        login(response.result, response.token)
        setIsLoggedIn(true)
        // Show success message and redirect
        setTimeout(() => {
          navigate(returnUrl)
        }, 1500)
      } else {
        setError(response.message || 'Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-card p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-muted-foreground text-center mb-8">
          Login to your account
        </p>

        {registered && (
          <div className="mb-4 p-3 bg-success/10 text-success rounded-lg text-sm">
            Account created successfully! Please login with your credentials.
          </div>
        )}

        {isLoggedIn && (
          <div className="mb-4 p-3 bg-success/10 text-success rounded-lg text-sm">
            Login successful! Redirecting...
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input 
              type="email" 
              placeholder="you@example.com" 
              glass
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              glass
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            variant="gradient" 
            className="w-full" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
