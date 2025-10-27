// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon, UserPlusIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { scrollToSection } from '../utils/scrollUtils';
import { useActiveSection } from '../hooks/useActiveSection';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get user state from auth context
  const { user, isLoggedIn, logout } = useAuth();
  
  // Get current location and navigation
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const activeSection = useActiveSection();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
  };

  // Handle navigation - scroll to section if on home page, otherwise navigate
  const handleNavigation = (sectionId, fallbackPath) => {
    if (isHomePage) {
      scrollToSection(sectionId);
      setIsMobileMenuOpen(false);
    } else {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand Name */}
          <NavLink to="/" className="text-3xl font-bold text-white">
            Click<span className="text-blue-500">Store.LK</span>
          </NavLink>

          {/* Primary Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation('home')}
              className={`hover:text-blue-400 transition ${
                isHomePage && activeSection === 'home' ? 'text-blue-400 underline' : ''
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('products')}
              className={`hover:text-blue-400 transition ${
                isHomePage && activeSection === 'products' ? 'text-blue-400 underline' : ''
              }`}
            >
              Products
            </button>
            <button 
              onClick={() => handleNavigation('about')}
              className={`hover:text-blue-400 transition ${
                isHomePage && activeSection === 'about' ? 'text-blue-400 underline' : ''
              }`}
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className={`hover:text-blue-400 transition ${
                isHomePage && activeSection === 'contact' ? 'text-blue-400 underline' : ''
              }`}
            >
              Contact
            </button>
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
            
            {/* Shopping Cart */}
            <button className="relative p-2 hover:bg-gray-700 rounded-full transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span>
            </button>

            {/* Admin Panel Link */}
            <NavLink 
              to="/admin/login" 
              className="hidden lg:block px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              🔐 Admin
            </NavLink>
            
            {/* User Authentication Section */}
            <div className="relative" ref={dropdownRef}>
              {isLoggedIn ? (
                /* Logged In User Dropdown */
                <div className="relative">
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <UserIcon className="h-6 w-6" />
                    <span className="hidden lg:block text-sm">{user?.fullName || user?.name || 'User'}</span>
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">{user?.fullName || user?.name || 'User'}</p>
                        <p className="text-gray-500">{user?.email}</p>
                      </div>
                      <a href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <UserIcon className="h-4 w-4" />
                        <span>Profile</span>
                      </a>
                      <a href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <Cog6ToothIcon className="h-4 w-4" />
                        <span>Settings</span>
                      </a>
                      <a href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <ShoppingCartIcon className="h-4 w-4" />
                        <span>Orders</span>
                      </a>
                      <hr className="my-1" />
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Login/Register Buttons */
                <div className="flex items-center space-x-2">
                  <Link 
                    to="/login"
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white border border-blue-500 rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register"
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <UserPlusIcon className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
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
            <button 
              onClick={() => handleNavigation('home')}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${
                isHomePage && activeSection === 'home' ? 'text-blue-400 bg-gray-700' : ''
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('products')}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${
                isHomePage && activeSection === 'products' ? 'text-blue-400 bg-gray-700' : ''
              }`}
            >
              Products
            </button>
            <button 
              onClick={() => handleNavigation('about')}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${
                isHomePage && activeSection === 'about' ? 'text-blue-400 bg-gray-700' : ''
              }`}
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${
                isHomePage && activeSection === 'contact' ? 'text-blue-400 bg-gray-700' : ''
              }`}
            >
              Contact
            </button>
            
            {/* Admin Link - Mobile */}
            <Link
              to="/admin/login"
              className="block px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-md text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🔐 Admin Portal
            </Link>
            
            {/* Mobile User Authentication */}
            <div className="border-t border-gray-700 pt-4 mt-4 w-full flex flex-col items-center space-y-2">
              {isLoggedIn ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-center">
                    <p className="text-white font-medium">{user?.fullName || user?.name || 'User'}</p>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-2 text-sm text-white hover:bg-gray-700 rounded-md">
                    <UserIcon className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-sm text-white hover:bg-gray-700 rounded-md">
                    <ShoppingCartIcon className="h-4 w-4" />
                    <span>Orders</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-md"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 w-full max-w-xs">
                  <Link 
                    to="/login"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-white border border-blue-500 rounded-lg hover:bg-blue-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlusIcon className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;