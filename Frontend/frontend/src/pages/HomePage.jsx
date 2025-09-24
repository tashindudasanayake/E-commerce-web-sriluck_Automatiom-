// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      

      
      {/* Future: Featured Products Section */}
      {/* This section can be added later for showcasing featured/popular products */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Featured Products</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover our most popular electronics and latest arrivals
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              We're preparing an amazing collection of featured products just for you.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Notify Me
            </button>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection />

      {/* About Section */}
      <AboutSection />
    </div>
  );
};

export default HomePage;