// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="text-3xl font-bold text-white">
            Click<span className="text-blue-500">Store.LK</span>
          </NavLink>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className="hover:text-blue-400 transition">
              Home
            </NavLink>
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition">
              About Us
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition">
              Contact
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/admin/login" className="hover:text-blue-400 transition">
              Admin
            </Link>
            <Link to="/cart" className="relative hover:text-blue-400 transition">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition py-2">
                Home
              </NavLink>
              <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition py-2 text-left">
                About Us
              </button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition py-2 text-left">
                Contact
              </button>
              <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition py-2">
                Admin
              </Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition py-2 flex items-center">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Cart (0)
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
