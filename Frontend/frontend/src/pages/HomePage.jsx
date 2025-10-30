// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Products from '../components/Products';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>
      
      {/* Featured Products Section */}
      <section id="products" className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular electronics and latest arrivals
            </p>
          </div>
          <Products showFeaturedOnly={true} limit={8} filters={null} />
        </div>
      </section>

      {/* All Products Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">All Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our complete collection of electronic products
            </p>
          </div>
          <Products showFeaturedOnly={false} limit={12} filters={null} />
          
          {/* View All Products Button */}
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>
    </div>
  );
};

export default HomePage;