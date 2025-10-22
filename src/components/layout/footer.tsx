import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Mail, Phone, MapPin, MessageCircle, Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer 
      className="text-white relative overflow-hidden"
      style={{
        backgroundColor: '#a5292a'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} 
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top Section - Logo and Tagline */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <div 
                className="absolute inset-0 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(45deg, rgba(242, 234, 219, 0.4), rgba(255, 255, 255, 0.2))'
                }}
              />
              <div 
                className="relative rounded-3xl p-8 border border-white/20 backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(242, 234, 219, 0.05))',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Kasuwa Mall
                </h2>
              </div>
            </div>
            <div className="text-center space-y-3 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Your Premier Shopping Destination
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto rounded-full"></div>
              <p className="text-white/90 text-lg leading-relaxed">
                Discover quality products, fast delivery, and exceptional customer service across Nigeria
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Contact Us */}
          <div className="space-y-6">
            <div className="relative">
              <h4 className="text-white mb-6 text-xl font-bold flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-white/80 to-white/40 rounded-full mr-4"></div>
                Contact Us
              </h4>
            </div>
            <div className="space-y-5">
              <div className="group flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                  <MapPin className="h-5 w-5 text-white/90" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-1">Our Location</p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    No 33. H.M House behind Rahama, Unity road, Kantin Kwari. Kano State.
                  </p>
                </div>
              </div>
              
              <div className="group flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                  <Phone className="h-5 w-5 text-white/90" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-1">Call Us</p>
                  <p className="text-sm text-white/80">+234 701 722 2999</p>
                </div>
              </div>
              
              <div className="group flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                  <Mail className="h-5 w-5 text-white/90" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-1">Email Us</p>
                  <p className="text-sm text-white/80">help@kasuwamall.com</p>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-sm font-medium text-white mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110" 
                    asChild
                  >
                    <Link to="https://www.facebook.com/kasuwamall/" target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <div className="relative">
              <h4 className="text-white mb-6 text-xl font-bold flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-white/80 to-white/40 rounded-full mr-4"></div>
                Customer Service
              </h4>
            </div>
            <ul className="space-y-3">
              {[
                { href: '#', label: 'Help Center', icon: '🆘' },
                { href: '#', label: 'Returns', icon: '↩️' },
                { href: '#', label: 'Shipping Info', icon: '🚚' },
                { href: '#', label: 'Track Order', icon: '📦' },
                { href: '#', label: 'FAQs', icon: '❓' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="group flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-white/90 group-hover:text-white font-medium transition-colors duration-300">
                      {item.label}
                    </span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <div className="relative">
              <h4 className="text-white mb-6 text-xl font-bold flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-white/80 to-white/40 rounded-full mr-4"></div>
                Company
              </h4>
            </div>
            <ul className="space-y-3">
              {[
                { href: '#', label: 'About Us', icon: '🏢' },
                { href: '#', label: 'Careers', icon: '💼' },
                { href: '/privacy', label: 'Privacy Policy', icon: '🔒' },
                { href: '/terms', label: 'Terms & Conditions', icon: '📋' },
                { href: '#', label: 'Contact Us', icon: '📞' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="group flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-white/90 group-hover:text-white font-medium transition-colors duration-300">
                      {item.label}
                    </span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <div className="relative">
              <h4 className="text-white mb-6 text-xl font-bold flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-white/80 to-white/40 rounded-full mr-4"></div>
                Newsletter
              </h4>
            </div>
            
            <div className="p-6 rounded-2xl border border-white/20 backdrop-blur-xl" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(242, 234, 219, 0.05))',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Mail className="h-5 w-5 text-white/90" />
                  </div>
                  <div>
                    <h5 className="text-white font-semibold">Stay Updated</h5>
                    <p className="text-white/70 text-sm">Get exclusive offers</p>
                  </div>
                </div>
                
                <p className="text-white/80 text-sm leading-relaxed">
                  Sign up for exclusive offers and updates.
                </p>
                
                <div className="space-y-3">
                  <div className="relative">
                    <Input 
                      type="email"
                      placeholder="Enter your email address" 
                      className="w-full py-4 pl-4 pr-4 border border-white/30 text-white bg-white/10 placeholder:text-white/50 focus:bg-white/20 focus:border-white/50 rounded-xl backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  <Button 
                    className="w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(242, 234, 219, 0.9), rgba(242, 234, 219, 0.7))', 
                      color: '#a5292a',
                      border: '1px solid rgba(242, 234, 219, 0.3)'
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Subscribe Now
                  </Button>
                </div>
                
                <p className="text-white/60 text-xs text-center">
                  ✓ No spam • ✓ Unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-px"></div>
          <div className="pt-12 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-center md:text-left">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <p className="text-white/90 font-medium">
                    © 2024 <Link to="#" className="text-white hover:text-white/80 font-bold border-b border-white/30 hover:border-white/60 transition-all duration-300">KASUWAMALL Inc</Link>, All Rights Reserved.
                  </p>
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-sm font-medium">Made in Nigeria</span>
                    <span className="text-lg">🇳🇬</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="flex items-center space-x-6 text-sm">
                  <Link to="/privacy" className="text-white/70 hover:text-white transition-colors duration-300 hover:underline underline-offset-4">
                    Privacy
                  </Link>
                  <Link to="/terms" className="text-white/70 hover:text-white transition-colors duration-300 hover:underline underline-offset-4">
                    Terms
                  </Link>
                  <div className="flex items-center space-x-2 text-white/60">
                    <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                    <span className="text-xs">Secure Shopping</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <p className="text-white/60 text-sm">
                  Trusted by thousands of customers across Nigeria • Fast delivery • Quality products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
