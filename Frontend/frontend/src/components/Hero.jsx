// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gray-900 text-white text-center py-20 px-4">
      <h1 className="text-5xl font-extrabold mb-4">Latest in Tech & Electronics</h1>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
        Discover the future of technology with our curated selection of top-tier electronic gadgets and devices.
      </p>
      <Link 
        to="/products" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default Hero;