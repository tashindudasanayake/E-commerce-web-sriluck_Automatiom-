// src/components/AboutSection.jsx
import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white overflow-hidden py-20 px-4">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-blue-900/30 to-black/40"></div>

      <div className="relative container mx-auto z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose 
            </span>{' '}
            <span className="text-white animate-float">ClickStore.LK?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-in" style={{animationDelay: '0.3s'}}>
            Since 2020, we've been dedicated to bringing you the latest technology with unmatched quality and service.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Quality Products */}
          <div className={`text-center p-6 glass-effect rounded-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 animate-float" style={{animationDelay: '0.5s'}}>Premium Quality</h3>
            <p className="text-gray-300">
              Every product is carefully selected and tested to ensure it meets our high-quality standards.
            </p>
          </div>

          {/* Fast Delivery */}
          <div className={`text-center p-6 glass-effect rounded-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 animate-float" style={{animationDelay: '0.7s'}}>Lightning Fast Delivery</h3>
            <p className="text-gray-300">
              Get your tech gadgets delivered within 24-48 hours with our express shipping service.
            </p>
          </div>

          {/* Customer Support */}
          <div className={`text-center p-6 glass-effect rounded-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{animationDelay: '0.3s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 animate-float" style={{animationDelay: '0.9s'}}>24/7 Expert Support</h3>
            <p className="text-gray-300">
              Our technical experts are always ready to help you choose the right product and solve any issues.
            </p>
          </div>

          {/* Secure Shopping */}
          <div className={`text-center p-6 glass-effect rounded-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 animate-float" style={{animationDelay: '1.1s'}}>Secure Shopping</h3>
            <p className="text-gray-300">
              Shop with confidence knowing your data is protected with bank-level security encryption.
            </p>
          </div>

          {/* Warranty */}
          <div className={`text-center p-6 glass-effect rounded-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{animationDelay: '0.5s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 animate-float" style={{animationDelay: '1.3s'}}>Extended Warranty</h3>
            <p className="text-gray-300">
              All products come with comprehensive warranty coverage and hassle-free replacement service.
            </p>
          </div>

          {/* Best Prices */}
          <div className={`text-center p-6 glass-effect rounded-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{animationDelay: '0.6s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 animate-float" style={{animationDelay: '1.5s'}}>Best Prices</h3>
            <p className="text-gray-300">
              We guarantee competitive prices and offer price matching to ensure you get the best deal.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`glass-effect rounded-3xl p-8 md:p-12 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{animationDelay: '0.8s'}}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{animationDelay: '1s'}}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 animate-float">
                50K+
              </div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{animationDelay: '1.2s'}}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2 animate-float">
                10K+
              </div>
              <div className="text-gray-300">Products Sold</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{animationDelay: '1.4s'}}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-float">
                99%
              </div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{animationDelay: '1.6s'}}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent mb-2 animate-float">
                5
              </div>
              <div className="text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-70" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-white rounded-full animate-pulse opacity-80" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-300 rounded-full animate-float opacity-70" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-5 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-5 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-90" style={{animationDelay: '2.5s'}}></div>
        
        {/* Larger floating shapes */}
        <div className="absolute top-10 right-1/4 w-6 h-6 border-2 border-blue-400 rounded-full animate-float opacity-30" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-10 left-1/4 w-8 h-8 border-2 border-purple-400 rounded-full animate-bounce opacity-25" style={{animationDelay: '1.2s'}}></div>
      </div>
    </section>
  );
};

export default AboutSection;