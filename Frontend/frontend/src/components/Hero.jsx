// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of background images
  const backgroundImages = [
    '/watch1.jpeg',
    '/watch2.jpeg',
    '/watch3.jpeg'
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white overflow-hidden min-h-screen">
      {/* Animated Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
              index === currentImageIndex 
                ? 'opacity-50 scale-100' 
                : 'opacity-0 scale-110'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              transform: index === currentImageIndex ? 'scale(1)' : 'scale(1.1)',
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/60 to-black/70"></div>
      
      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <div className="relative container mx-auto text-center py-24 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Animated slide indicators */}
          <div className="flex justify-center space-x-2 mb-8 animate-slide-in">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125 animate-pulse-glow' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          <h1 className="text-5xl md:text-5xl font-extrabold mb-6 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-float">
              SHOP SMART,SHOP EASY,
            </span>{' '}
            <br />
            <span className="text-5xl md:text-6xl text-white">SHOP WITH US.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in">
            "Discover innovation made simple. From everyday essentials to cutting-edge tech, shop smarter and save more."
          </p>
          
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-sm md:text-base glass-effect rounded-full py-3 px-6 transform hover:scale-105 transition-all duration-300 animate-slide-in" style={{animationDelay: '0.2s'}}>
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm md:text-base glass-effect rounded-full py-3 px-6 transform hover:scale-105 transition-all duration-300 animate-slide-in" style={{animationDelay: '0.4s'}}>
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Trusted Warranty</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm md:text-base glass-effect rounded-full py-3 px-6 transform hover:scale-105 transition-all duration-300 animate-slide-in" style={{animationDelay: '0.6s'}}>
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center animate-fade-in" style={{animationDelay: '0.8s'}}>
            <Link 
              to="/products" 
              className="btn-shop-now inline-block text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 ease-out relative group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Shop Now</span>
              </span>
            </Link>
            <Link 
              to="/about" 
              className="btn-learn-more inline-block text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 ease-out relative group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Learn More</span>
              </span>
            </Link>
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
    </div>
  );
};

export default Hero;