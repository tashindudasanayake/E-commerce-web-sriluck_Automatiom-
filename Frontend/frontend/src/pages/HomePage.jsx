// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      {/* We can add a "Featured Products" section here later */}
      <ContactSection />
    </>
  );
};

export default HomePage;