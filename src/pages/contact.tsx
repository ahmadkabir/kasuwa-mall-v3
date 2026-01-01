// pages/contact.tsx
// Contact page with all contact information and support options

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Clock, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null, message: string}>({type: null, message: ''});

  const contactNumbers = [
    {
      id: 1,
      number: '07040531004',
      label: 'Customer Support Line 1',
      type: 'phone'
    },
    {
      id: 2,
      number: '07017222999',
      label: 'Customer Support Line 2',
      type: 'whatsapp'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({type: null, message: ''});
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you within 24 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error submitting your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneCall = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = cleanNumber.length === 10 && cleanNumber.startsWith('0') 
      ? `+234${cleanNumber.substring(1)}` 
      : cleanNumber.startsWith('+') ? cleanNumber : `+234${cleanNumber}`;
    
    window.open(`tel:${formattedNumber}`, '_blank');
  };

  const handleWhatsAppMessage = (phoneNumber: string, message = '') => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = cleanNumber.length === 10 && cleanNumber.startsWith('0') 
      ? `+234${cleanNumber.substring(1)}` 
      : cleanNumber.startsWith('+') ? cleanNumber : `+234${cleanNumber}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kasuwa-secondary via-kasuwa-primary/10 to-kasuwa-brown/10 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're here to help! Reach out to us through any of the channels below or send us a message.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Phone className="h-6 w-6 mr-3 text-kasuwa-primary" />
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Phone Numbers */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Customer Support</h3>
                    {contactNumbers.map((contact) => (
                      <div 
                        key={contact.id} 
                        className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{contact.label}</p>
                          <p className="text-lg font-semibold text-kasuwa-primary">{contact.number}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handlePhoneCall(contact.number)}
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-green-500 hover:bg-green-600 text-white border-green-500"
                            onClick={() => handleWhatsAppMessage(contact.number, 'Hello, I need help with my order on Kasuwa Mall')}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-kasuwa-primary">help@kasuwamall.com</p>
                        <p className="text-sm text-gray-500">General inquiries</p>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() => window.open('mailto:help@kasuwamall.com', '_blank')}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Office Address</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-kasuwa-primary mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-600 dark:text-gray-300">
                        No 33. H.M House behind Rahama, Unity road, Kantin Kwari. Kano State.
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Business Hours</h3>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-kasuwa-primary mr-2" />
                      <p className="text-gray-600 dark:text-gray-300">
                        Monday - Saturday: 8:00 AM - 8:00 PM
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <Clock className="h-5 w-5 text-kasuwa-primary mr-2" />
                      <p className="text-gray-600 dark:text-gray-300">
                        Sunday: 10:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <User className="h-6 w-6 mr-3 text-kasuwa-primary" />
                    Quick Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => handleWhatsAppMessage('07017222999', 'I need help with my order')}
                  >
                    <MessageCircle className="h-5 w-5 mr-3 text-green-500" />
                    Chat on WhatsApp
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => handlePhoneCall('07040531004')}
                  >
                    <Phone className="h-5 w-5 mr-3 text-blue-500" />
                    Call Customer Support
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => window.open('mailto:help@kasuwamall.com', '_blank')}
                  >
                    <Mail className="h-5 w-5 mr-3 text-red-500" />
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Mail className="h-6 w-6 mr-3 text-kasuwa-primary" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  {submitStatus.type && (
                    <div className={`mb-6 p-4 rounded-lg ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-kasuwa-primary hover:bg-kasuwa-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Building className="h-6 w-6 text-kasuwa-primary mt-1 mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Business Inquiries</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          For partnership and vendor opportunities, contact our business development team.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-kasuwa-primary mt-1 mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Response Time</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          We typically respond to all inquiries within 24 hours during business days.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}