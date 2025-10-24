// components/layout/marquee-banner.tsx
// Marquee banner for displaying rotating contact and promotional information

import { motion } from 'framer-motion';
import { Phone, MessageCircle, Truck, Shield, Star, Headphones, Clock, MapPin } from 'lucide-react';

export function MarqueeBanner() {
  // Handle phone call
  const handlePhoneCall = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = cleanNumber.length === 10 && cleanNumber.startsWith('0') 
      ? `+234${cleanNumber.substring(1)}` 
      : cleanNumber.startsWith('+') ? cleanNumber : `+234${cleanNumber}`;
    
    window.open(`tel:${formattedNumber}`, '_blank');
  };
  
  // Handle WhatsApp message
  const handleWhatsAppMessage = (phoneNumber: string, message = '') => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = cleanNumber.length === 10 && cleanNumber.startsWith('0') 
      ? `+234${cleanNumber.substring(1)}` 
      : cleanNumber.startsWith('+') ? cleanNumber : `+234${cleanNumber}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
  };

  // Marquee items
  const items = [
    {icon: Phone, text: 'Call us: 07030975118', action: () => handlePhoneCall('07030975118')},
    {icon: MessageCircle, text: 'WhatsApp: 07017222999', action: () => handleWhatsAppMessage('07017222999')},
    {icon: Truck, text: 'Free delivery on orders above ₦10,000'},
    {icon: Shield, text: '100% Secure Shopping'},
    {icon: Star, text: 'High Quality Products'},
    {icon: Headphones, text: '24/7 Customer Support'},
    {icon: Clock, text: 'Mon-Sat: 8AM-8PM, Sun: 10AM-6PM'},
    {icon: MapPin, text: 'No 33. H.M House, Kano State'},
    {icon: Phone, text: 'Call us: 07030975118', action: () => handlePhoneCall('07030975118')},
    {icon: MessageCircle, text: 'WhatsApp: 07017222999', action: () => handleWhatsAppMessage('07017222999')},
    {icon: Truck, text: 'Fast & Reliable Delivery'},
    {icon: Shield, text: 'Secure Payment Options'},
    {icon: Star, text: 'Customer Satisfaction Guaranteed'},
    {icon: Headphones, text: 'Need help? Call us now!'},
  ];

  return (
    <div className="w-full bg-gradient-to-r from-kasuwa-primary to-kasuwa-secondary py-1.5 overflow-hidden border-b border-white/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Repeat items twice to ensure smooth looping */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="mx-6 flex items-center text-white text-sm font-medium">
            <item.icon className="h-4 w-4 mr-2 text-white/90 flex-shrink-0" />
            <span 
              className={`cursor-pointer hover:underline hover:text-white transition-colors ${item.action ? 'hover:decoration-white' : ''}`}
              onClick={item.action || undefined}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
      
      {/* Add animation styles */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
}