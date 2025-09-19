// src/components/ContactSection.jsx
import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Have a question or need help with an order? Our team is ready to assist you.
        </p>
        <a 
          href="/contact" 
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
