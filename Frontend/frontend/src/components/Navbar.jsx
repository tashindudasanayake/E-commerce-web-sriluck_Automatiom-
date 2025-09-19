// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Style for active NavLink
  const activeLinkStyle = {
    color: '#3b82f6', // A nice blue color for active links
    textDecoration: 'underline',
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand Name */}
          <NavLink to="/" className="text-2xl font-bold text-white">
            Electro<span className="text-blue-500">Shop</span>
          </NavLink>

          {/* Primary Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className="hover:text-blue-400 transition" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Home</NavLink>
            <NavLink to="/products" className="hover:text-blue-400 transition" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Products</NavLink>
            <NavLink to="/about" className="hover:text-blue-400 transition" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>About Us</NavLink>
            <NavLink to="/contact" className="hover:text-blue-400 transition" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Contact</NavLink>
          </div>

          {/* Search, Cart, and User Icons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-gray-700 text-white px-3 py-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-40" 
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <button className="relative p-2 hover:bg-gray-700 rounded-full">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span>
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full">
              <UserIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Home</NavLink>
            <NavLink to="/products" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Products</NavLink>
            <NavLink to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>About Us</NavLink>
            <NavLink to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Contact</NavLink>
            {/* You can add cart/user icons for mobile here as well if needed */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;