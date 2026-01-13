import { Mail, Scale, Shield, FileText, Calendar, User, Package, Truck, CreditCard, Building } from 'lucide-react';

const TermsPage = () => {
  const termsData = [
    {
      title: "1. Introduction",
      content: "Welcome to NACCIMA E-commerce. By accessing or using our platform, you agree to comply with the following terms and conditions. Please read them carefully before making any purchases or listing any products.\n\nThese Terms and Conditions govern your use of our e-commerce platform, including the display and sale of products by vendors and the logistics services we offer."
    },
    {
      title: "2. Eligibility",
      content: "By using this website, you confirm that you are at least 18 years of age or have received permission from a parent or legal guardian to enter into transactions on the site."
    },
    {
      title: "3. Vendor Responsibilities",
      content: "Vendors are responsible for ensuring the accuracy, legality, and quality of the products they list on the platform.\n\nVendors must provide complete and truthful information about their products, including but not limited to price, description, and stock availability.\n\nVendors are solely responsible for complying with all applicable laws and regulations regarding the sale of their products."
    },
    {
      title: "4. Customer Responsibilities",
      content: "Customers are responsible for ensuring the accuracy of their delivery details when placing an order.\n\nCustomers must review all product details carefully before making a purchase, including prices, descriptions, and delivery options.\n\nAll purchases are final once confirmed, unless otherwise stated in our Returns and Refunds Policy."
    },
    {
      title: "5. Purchases and Payment",
      content: "We offer various payment methods, including online payment options. All prices are listed in Naira and include applicable taxes unless stated otherwise.\n\nPayment must be made in full at the time of purchase. We reserve the right to cancel or refuse any order for any reason."
    },
    {
      title: "6. Logistics and Delivery",
      content: "Upon a customer's request, we offer logistics services to deliver purchased items. Delivery timelines may vary depending on location and availability.\n\nWe strive to ensure timely deliveries, but delays may occur due to factors beyond our control. In such cases, we will notify you promptly.\n\nShipping fees, if applicable, will be clearly outlined during the checkout process."
    },
    {
      title: "7. Returns and Refunds",
      content: "Our platform adheres to a returns and refund policy that applies to all purchases. Customers may be eligible for returns or refunds under certain conditions, such as defective products or incorrect items.\n\nVendors are expected to comply with our returns policy and facilitate the refund process if necessary."
    },
    {
      title: "8. Intellectual Property",
      content: "All content, logos, and materials on this website are the intellectual property of NACCIMA E-commerce or its vendors. Any unauthorized use of such content is prohibited."
    },
    {
      title: "9. Liability",
      content: "NACCIMA E-commerce is not responsible for any direct or indirect damages arising from the use of this platform, including but not limited to issues with product quality, delayed deliveries, or incorrect orders.\n\nVendors are fully responsible for the products they sell, and any disputes arising from product issues must be resolved between the vendor and the customer."
    },
    {
      title: "10. Modification of Terms",
      content: "We reserve the right to modify these terms and conditions at any time. All changes will be posted on the website, and continued use of the platform implies acceptance of these updated terms."
    },
    {
      title: "11. Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with the laws of Nigeria/Africa. Any disputes arising from this agreement shall be subject to the exclusive jurisdiction of the courts of Nigeria/Africa."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-50 py-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-primary to-secondary mb-6">
              <Scale className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using our platform. By accessing or using NACCIMA E-commerce, you agree to be bound by these terms.
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
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Terms of Service</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing or using our platform, you agree to comply with the following terms and conditions. Please read them carefully before making any purchases or listing any products.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {termsData.map((section, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl ${
                  index % 2 === 0 ? 'border-l-4 border-l-primary' : 'border-r-4 border-r-secondary'
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                    {index === 0 && <FileText className="h-6 w-6 text-primary" />}
                    {index === 1 && <User className="h-6 w-6 text-primary" />}
                    {index === 2 && <Building className="h-6 w-6 text-primary" />}
                    {index === 3 && <User className="h-6 w-6 text-primary" />}
                    {index === 4 && <CreditCard className="h-6 w-6 text-primary" />}
                    {index === 5 && <Truck className="h-6 w-6 text-primary" />}
                    {index === 6 && <Package className="h-6 w-6 text-primary" />}
                    {index === 7 && <Shield className="h-6 w-6 text-primary" />}
                    {index === 8 && <Scale className="h-6 w-6 text-primary" />}
                    {index === 9 && <Calendar className="h-6 w-6 text-primary" />}
                    {index === 10 && <Building className="h-6 w-6 text-primary" />}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="prose prose-gray max-w-none whitespace-pre-line">
                  <p className="text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-white bg-opacity-20">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">12. Contact Information</h2>
              </div>
              
              <div>
                <p className="text-white mb-6">
                  For questions or concerns regarding these terms, please contact us:
                </p>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                  <div className="font-semibold text-white text-lg mb-4">
                    NACCIMA E-commerce Support Team
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-white">
                      <Mail className="h-5 w-5" />
                      <span>Email: <a href="mailto:help@kasuwamall.com" className="hover:underline">help@kasuwamall.com</a></span>
                    </div>
                    <div className="flex items-center space-x-3 text-white">
                      <Building className="h-5 w-5" />
                      <span>Website: <a href="https://www.kasuwamall.com" className="hover:underline">www.kasuwamall.com</a></span>
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

export default TermsPage;