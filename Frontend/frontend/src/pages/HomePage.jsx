// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium electronics
            </p>
          </div>
          <Products showFeaturedOnly={true} limit={8} />
        </div>
      </section>

      {/* All Products Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">All Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our complete collection of quality electronics
            </p>
          </div>
          <Products showFeaturedOnly={false} limit={null} />
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="bg-gradient-to-r from-purple-50 to-blue-50">
        <AboutSection />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="bg-white">
        <ContactSection />
      </section>
    </div>
  );
};

export default HomePage;