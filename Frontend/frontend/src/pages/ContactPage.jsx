// src/pages/ContactPage.jsx
import React from 'react';

const ContactPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
      <div className="max-w-lg mx-auto">
        <p className="text-center text-gray-700 mb-8">
          We'd love to hear from you! Please fill out the form below or reach out to us via email or phone.
        </p>
        {/* A simple form placeholder. We will make this functional later. */}
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea id="message" rows="5" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
