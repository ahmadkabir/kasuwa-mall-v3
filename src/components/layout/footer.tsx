import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Mail, Phone, MapPin, MessageCircle, Instagram, Linkedin } from 'lucide-react'
import pospora from './prosporatech2.png'

export function Footer() {
  return (
    <footer 
      className="text-white relative overflow-hidden"
      style={{
        backgroundColor: '#a5292a'
      }}
    >


      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {/* Contact Us */}
          <div className="space-y-4">
            <h4 className="text-white mb-4 text-lg font-bold flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-white/80 to-white/40 rounded-full mr-3"></div>
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <MapPin className="h-5 w-5 text-white/90 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-white mb-1">Location/ Pickup Point</p>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Office No. 4, HM House Unity Road, Kantin Kwari, Kano.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <Phone className="h-5 w-5 text-white/90 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-white mb-1">Call Us</p>
                  <p className="text-xs text-white/80">+234 703 097 5118</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <MessageCircle className="h-5 w-5 text-white/90 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-white mb-1">WhatsApp</p>
                  <p className="text-xs text-white/80">+234 701 722 2999</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <Mail className="h-5 w-5 text-white/90 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-white mb-1">Email Us</p>
                  <p className="text-xs text-white/80">help@naccima.com</p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-xs font-medium text-white mb-2">Follow Us</p>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 text-xs"
                  asChild
                >
                  <Link to="https://www.facebook.com/kasuwamall/" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 text-xs"
                  asChild
                >
                  <Link to="https://vm.tiktok.com/ZSHcELFuUg6Fb-xoONS/" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 text-xs"
                  asChild
                >
                  <Link to="https://www.instagram.com/kasuwamallonlinestore?igsh=OWpsOG0wNHF6Mm8=" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost"
                  size="icon" 
                  className="text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 text-xs"
                  asChild
                >
                  <Link to="https://www.linkedin.com/company/kasuwamall/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-white mb-4 text-lg font-bold flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-white/80 to-white/40 rounded-full mr-3"></div>
              Customer Service
            </h4>
            <ul className="space-y-2">
              {[
                { href: '#', label: 'Help Center' },
                { href: '#', label: 'Returns' },
                { href: '#', label: 'Shipping Info' },
                { href: '#', label: 'Track Order' },
                { href: '#', label: 'FAQs' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="block p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-white mb-4 text-lg font-bold flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-white/80 to-white/40 rounded-full mr-3"></div>
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Us' },
                { href: '#', label: 'Careers' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms & Conditions' },
                { href: '/contact', label: 'Contact Us' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="block p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white mb-4 text-lg font-bold flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-white/80 to-white/40 rounded-full mr-3"></div>
              Newsletter
            </h4>
            
            <div className="p-4 rounded-xl border border-white/20" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(242, 234, 219, 0.05))',
            }}>
              <div className="space-y-3">
                <p className="text-sm text-white/80 leading-relaxed">
                  Subscribe for exclusive offers and updates.
                </p>
                
                <div className="space-y-2">
                  <Input 
                    type="email"
                    placeholder="Email address" 
                    className="w-full py-2 pl-3 pr-3 border border-white/30 text-white bg-white/10 placeholder:text-white/50 text-sm rounded-lg"
                  />
                  <Button 
                    className="w-full py-2 text-white font-semibold rounded-lg text-sm"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(242, 234, 219, 0.9), rgba(242, 234, 219, 0.7))', 
                      color: '#a5292a',
                      border: '1px solid rgba(242, 234, 219, 0.3)'
                    }}
                  >
                    Subscribe
                  </Button>
                </div>
                
                <p className="text-white/50 text-xs text-center">
                  ✓ No spam
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-px"></div>
          <div className="pt-6 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-white/90 text-sm">
                  © 2024 <Link to="#" className="text-white hover:text-white/80 font-medium border-b border-white/30 hover:border-white/60 transition-all duration-300">NACCIMA E-commerce</Link>, All Rights Reserved.
                </p>
              </div>
              
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
            
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="text-white/50 text-xs">
                Trusted by customers across Nigeria • Fast delivery • Quality products
              </p>
              <div className="mt-4 flex justify-center items-center">
                <span className="text-white/70 text-sm mr-2">Powered By NACCIMA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
