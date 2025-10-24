// components/layout/floating-contact.tsx
// Floating contact buttons for WhatsApp and phone calls

import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingContactProps {
  phoneNumber1?: string;
  phoneNumber2?: string;
  whatsappNumber?: string;
}

export function FloatingContact({ 
  phoneNumber1 = '07030975118', 
  phoneNumber2 = '07017222999',
  whatsappNumber = '07030975118'
}: FloatingContactProps) {
  // Clean phone numbers (remove any non-digit characters)
  const cleanPhoneNumber1 = phoneNumber1.replace(/\D/g, '');
  const cleanPhoneNumber2 = phoneNumber2.replace(/\D/g, '');
  const cleanWhatsappNumber = whatsappNumber.replace(/\D/g, '');
  
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

  return (
    <>
      {/* Floating Contact Buttons - Right Side */}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end space-y-3">
        {/* WhatsApp Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="default"
            size="lg"
            className="rounded-full bg-whatsapp hover:bg-whatsapp/90 shadow-lg h-14 w-14 p-0 group"
            onClick={() => handleWhatsAppMessage(cleanWhatsappNumber, 'Hello, I need help with my order on Kasuwa Mall')}
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="sr-only">Chat on WhatsApp</span>
          </Button>
        </motion.div>
        
        {/* Phone Call Button 2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="default"
            size="lg"
            className="rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg h-14 w-14 p-0 group"
            onClick={() => handlePhoneCall(cleanPhoneNumber2)}
            aria-label={`Call ${phoneNumber2}`}
          >
            <Phone className="h-6 w-6 text-white" />
            <span className="sr-only">Call {phoneNumber2}</span>
          </Button>
        </motion.div>
        
        {/* Phone Call Button 1 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="default"
            size="lg"
            className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg h-14 w-14 p-0 group"
            onClick={() => handlePhoneCall(cleanPhoneNumber1)}
            aria-label={`Call ${phoneNumber1}`}
          >
            <Phone className="h-6 w-6 text-white" />
            <span className="sr-only">Call {phoneNumber1}</span>
          </Button>
        </motion.div>
      </div>

      {/* Floating Contact Labels - Hidden on mobile, visible on tablet+ */}
      <div className="fixed right-20 bottom-4 z-40 hidden md:flex flex-col items-start space-y-3">
        {/* WhatsApp Label */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 whitespace-nowrap"
        >
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Chat on WhatsApp
          </p>
        </motion.div>
        
        {/* Phone 2 Label */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 whitespace-nowrap"
        >
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Call {phoneNumber2}
          </p>
        </motion.div>
        
        {/* Phone 1 Label */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 whitespace-nowrap"
        >
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Call {phoneNumber1}
          </p>
        </motion.div>
      </div>

      {/* Mobile Floating Contact Button - Simplified for small screens */}
      <div className="fixed bottom-4 left-4 z-50 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="default"
            size="lg"
            className="rounded-full bg-kasuwa-primary hover:bg-kasuwa-primary/90 shadow-lg h-12 w-12 p-0 group"
            onClick={() => {
              // On mobile, default to WhatsApp
              handleWhatsAppMessage(cleanWhatsappNumber, 'Hello, I need help with my order on Kasuwa Mall');
            }}
            aria-label="Get help"
          >
            <MessageCircle className="h-5 w-5 text-white" />
            <span className="sr-only">Get help</span>
          </Button>
        </motion.div>
      </div>
    </>
  );
}