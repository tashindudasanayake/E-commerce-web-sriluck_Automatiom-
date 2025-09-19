// src/components/AboutSection.jsx
import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          ElectroShop was born from a passion for technology. We believe in providing our customers not just with products, but with solutions that enhance their daily lives. From high-performance laptops to smart home devices, we're dedicated to bringing you the best in quality and innovation.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;