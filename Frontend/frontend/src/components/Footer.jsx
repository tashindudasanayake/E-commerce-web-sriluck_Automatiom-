// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold">ElectroShop</h3>
          <p className="text-gray-400">Your trusted partner for electronics.</p>
        </div>
        <div className="mb-4">
          <a href="/about" className="px-3 hover:text-gray-300">About Us</a>
          <a href="/contact" className="px-3 hover:text-gray-300">Contact</a>
          <a href="/privacy" className="px-3 hover:text-gray-300">Privacy Policy</a>
        </div>
        <p className="text-gray-500 text-sm">
          &copy; {currentYear} ElectroShop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;