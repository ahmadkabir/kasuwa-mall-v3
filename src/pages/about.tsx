import { Users, Award, Globe, Shield, Heart, Building2, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const ourValues = [
    {
      title: "Customer-Centricity",
      description: "We put our customers at the heart of everything we do, ensuring a seamless and satisfying shopping experience.",
      icon: Heart
    },
    {
      title: "Quality Assurance",
      description: "We carefully vet our vendors and products to ensure only high-quality items reach our customers.",
      icon: Award
    },
    {
      title: "Integrity",
      description: "We maintain the highest ethical standards in all our operations and business relationships.",
      icon: Shield
    },
    {
      title: "Innovation",
      description: "We continuously improve our platform to provide the best e-commerce experience in Nigeria.",
      icon: Globe
    }
  ];

  const achievements = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "20+", label: "Product Categories" },
    { number: "12", label: "States Covered" },
    { number: "24/7", label: "Customer Support" }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "Our Location",
      value: "No 33. H.M House behind Rahama, Unity road, Kantin Kwari. Kano State."
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+234 701 722 2999"
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "help@kasuwamall.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-50 py-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-kasuwa-primary to-kasuwa-secondary mb-6">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Kasuwa Mall
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your premier online shopping destination, connecting customers with quality products and trusted vendors across Nigeria.
            </p>
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 rounded-full bg-blue-50">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Story</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kasuwa Mall was founded with a vision to revolutionize online shopping in Nigeria. Our mission is to provide customers with a seamless, secure, and satisfying shopping experience while supporting local businesses and vendors.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We understand that online shopping can be challenging in Nigeria, which is why we've built a platform that prioritizes security, reliability, and customer satisfaction. Our team works tirelessly to ensure that every transaction is smooth and every delivery reaches its destination on time.
                </p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl font-bold text-kasuwa-primary mb-2">{achievement.number}</div>
                <div className="text-gray-600 text-sm">{achievement.label}</div>
              </div>
            ))}
          </div>

          {/* Our Values */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                <Heart className="h-6 w-6 text-kasuwa-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Core Values</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ourValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-kasuwa-primary/50 transition-colors duration-300">
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-2 rounded-full bg-kasuwa-primary/10 text-kasuwa-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                      <p className="text-gray-700 text-sm">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How We Operate */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                <Globe className="h-6 w-6 text-kasuwa-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How We Operate</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-kasuwa-primary text-white flex items-center justify-center text-sm font-bold">1</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Vendor Vetting</h3>
                  <p className="text-gray-700">
                    We carefully screen and verify all vendors to ensure they meet our quality and service standards.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-kasuwa-primary text-white flex items-center justify-center text-sm font-bold">2</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure Transactions</h3>
                  <p className="text-gray-700">
                    All transactions are processed through secure payment gateways with industry-standard encryption.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-kasuwa-primary text-white flex items-center justify-center text-sm font-bold">3</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                  <p className="text-gray-700">
                    We partner with reliable logistics providers to ensure timely and secure delivery of your purchases.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-kasuwa-primary text-white flex items-center justify-center text-sm font-bold">4</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Customer Support</h3>
                  <p className="text-gray-700">
                    Our dedicated support team is available 24/7 to assist with any questions or concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-gray-100">
                <Phone className="h-6 w-6 text-kasuwa-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100">
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-2 rounded-full bg-kasuwa-primary/10 text-kasuwa-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{contact.label}</h3>
                      <p className="text-gray-700 text-sm">{contact.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-kasuwa-primary/5 to-kasuwa-secondary/5 rounded-2xl shadow-lg p-6 md:p-8 border border-kasuwa-primary/20">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-kasuwa-primary/10">
                  <Award className="h-6 w-6 text-kasuwa-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To create a trusted, secure, and convenient online marketplace that connects customers with quality products while supporting local businesses and vendors across Nigeria.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="mr-3 flex-shrink-0 p-2 rounded-full bg-blue-100">
                  <Globe className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be Nigeria's leading e-commerce platform, setting the standard for quality, service, and innovation in online retail.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to start shopping with us?</h3>
            <p className="text-gray-600 mb-6">Join thousands of satisfied customers on Kasuwa Mall today!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/products" 
                className="px-6 py-3 bg-gradient-to-r from-kasuwa-primary to-kasuwa-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Shop Products
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 bg-white text-kasuwa-primary font-semibold rounded-lg border border-kasuwa-primary hover:bg-kasuwa-primary hover:text-white transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;