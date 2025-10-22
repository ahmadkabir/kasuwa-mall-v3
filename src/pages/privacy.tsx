import { Mail, Globe, Shield, Lock, Clock, Cookie } from 'lucide-react';

const PrivacyPage = () => {
  const informationWeCollect = [
    "Register an account",
    "Place an order", 
    "Subscribe to newsletters",
    "Participate in promotions",
    "Contact our customer service",
  ];

  const typesOfDataCollected = [
    "Personal Identification Information: Name, email address, phone number, delivery address, billing information.",
    "Account Credentials: Username, password (stored securely using encryption).",
    "Payment Details: Processed via secure third-party gateways (e.g., Interswitch, Paystack); we do not store your card details.",
    "Device & Browsing Information: IP address, browser type, location data, pages visited, and referral sources.",
    "Order & Transaction History",
  ];

  const howWeUseInfo = [
    "Process and deliver your orders",
    "Communicate order updates, delivery status, or changes to our terms",
    "Offer customer support and resolve complaints",
    "Personalize your shopping experience and suggest relevant products",
    "Send marketing communications (optional)",
    "Prevent fraud and maintain security",
  ];

  const dataProtection = [
    "All personal data is stored securely using encrypted databases.",
    "We use SSL (Secure Socket Layer) technology to encrypt data during transmission.",
    "Access to user data is limited to authorized personnel only.",
    "Regular security audits are conducted to identify and address vulnerabilities.",
  ];

  const sharingInfo = [
    "Logistics Partners: For delivery and shipping services",
    "Payment Processors: To handle payment transactions securely",
    "Service Providers: For IT support, marketing, or analytics",
    "Legal Requirements: If required by law or to protect Kasuwa Mall's legal rights",
  ];

  const yourRights = [
    "Access or request a copy of your personal data",
    "Update or correct your data",
    "Delete your account or request data deletion (subject to applicable law)",
    "Opt-out of marketing emails at any time",
  ];

  const cookiesUsage = [
    "Remember your preferences and cart items",
    "Track website traffic and usage patterns",
    "Improve user experience",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-50 py-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-kasuwa-primary to-kasuwa-secondary mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Kasuwa Mall, your privacy is our top priority. We are committed to protecting the personal information you share with us and ensuring transparency in how we collect, store, use, and share your data.
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 rounded-full bg-blue-50">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Commitment to Your Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We are dedicated to protecting your personal information and ensuring transparency in how we collect, store, use, and share your data. This Privacy Policy outlines how your information is handled when you visit or make a purchase from www.kasuwamall.com.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {/* Information We Collect */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                  <Globe className="h-6 w-6 text-kasuwa-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  We collect information from you when you:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-0">
                  {informationWeCollect.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-kasuwa-primary">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="text-gray-700 font-semibold mt-4">
                  Types of Data Collected:
                </p>
                <ul className="space-y-3">
                  {typesOfDataCollected.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-1 text-kasuwa-primary font-semibold">{index + 1}.</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                  <Lock className="h-6 w-6 text-kasuwa-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
              </div>
              
              <div>
                <p className="text-gray-700 mb-6">
                  Your data helps us provide and improve our services. We use your information to:
                </p>
                <ul className="space-y-3">
                  {howWeUseInfo.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-1 text-kasuwa-primary font-semibold">{index + 1}.</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                  <Shield className="h-6 w-6 text-kasuwa-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. How We Store and Protect Your Data</h2>
              </div>
              
              <div>
                <ul className="space-y-3">
                  {dataProtection.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-1 text-kasuwa-primary font-semibold">{index + 1}.</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sharing of Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                  <Globe className="h-6 w-6 text-kasuwa-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Sharing of Information</h2>
              </div>
              
              <div>
                <p className="text-gray-700 mb-6">
                  We do not sell your personal data. However, we may share your information with:
                </p>
                <ul className="space-y-3">
                  {sharingInfo.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-1 text-kasuwa-primary font-semibold">{index + 1}.</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 mt-4 font-medium">
                  All third-party partners are bound by strict data protection obligations.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                  <Shield className="h-6 w-6 text-kasuwa-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">5. Your Rights</h2>
              </div>
              
              <div>
                <p className="text-gray-700 mb-6">
                  You have the right to:
                </p>
                <ul className="space-y-3">
                  {yourRights.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-1 text-kasuwa-primary font-semibold">{index + 1}.</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                  <Cookie className="h-6 w-6 text-kasuwa-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">6. Cookies and Tracking Technologies</h2>
              </div>
              
              <div>
                <p className="text-gray-700 mb-6">
                  Kasuwa Mall uses cookies to:
                </p>
                <ul className="space-y-3">
                  {cookiesUsage.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-1 text-kasuwa-primary font-semibold">{index + 1}.</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 mt-4 font-medium">
                  You can manage your cookie preferences through your browser settings.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                  <Shield className="h-6 w-6 text-kasuwa-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">7. Children's Privacy</h2>
              </div>
              
              <div>
                <p className="text-gray-700">
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal information from minors.
                </p>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                  <Clock className="h-6 w-6 text-kasuwa-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">8. Changes to This Policy</h2>
              </div>
              
              <div>
                <p className="text-gray-700">
                  We may update this policy occasionally. All changes will be posted on this page with a revised effective date. Continued use of our services implies your acceptance of the updated policy.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-kasuwa-primary to-kasuwa-secondary rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-white bg-opacity-20">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">9. Contact Us</h2>
              </div>
              
              <div>
                <p className="text-white mb-6">
                  If you have any questions or concerns about this policy or how your data is handled, please contact:
                </p>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                  <div className="font-semibold text-white text-lg mb-4">
                    Kasuwa Mall Support Team
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-white">
                      <Mail className="h-5 w-5" />
                      <span>Email: help@kasuwamall.com</span>
                    </div>
                    <div className="flex items-center space-x-3 text-white">
                      <Globe className="h-5 w-5" />
                      <span>Website: www.kasuwamall.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;