// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>
      
      {/* About Section */}
      <section id="about" className="bg-white">
        <AboutSection />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-r from-blue-50 to-purple-50">
        <ContactSection />
      </section>
    </div>
  );
};

export default HomePage;