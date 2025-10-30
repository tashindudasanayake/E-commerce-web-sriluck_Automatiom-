// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app startup
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check for admin authentication first
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const savedAdminUser = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
      
      if (adminToken && savedAdminUser) {
        const adminUser = JSON.parse(savedAdminUser);
        setUser(adminUser);
        setIsLoggedIn(true);
        setLoading(false);
        return;
      }

      // Check for regular user authentication
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        // Verify token is still valid by calling the backend
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
          setIsLoggedIn(true);
        } else {
          // Token is invalid, clear storage
          logout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // First, try admin login
      const adminResponse = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (adminResponse.ok) {
        const adminData = await adminResponse.json();
        
        // Store admin credentials with special keys
        localStorage.setItem('adminToken', adminData.token);
        localStorage.setItem('adminAuth', JSON.stringify(adminData.user));
        sessionStorage.setItem('adminToken', adminData.token);
        sessionStorage.setItem('adminAuth', JSON.stringify(adminData.user));
        
        setUser(adminData.user);
        setIsLoggedIn(true);
        
        return { 
          success: true, 
          message: 'Admin login successful!', 
          isAdmin: true,
          redirectTo: '/admin/dashboard'
        };
      }

      // If admin login fails, try regular user login
      const userResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const userData = await userResponse.json();

      if (userResponse.ok) {
        // Store regular user credentials
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));
        
        setUser(userData.user);
        setIsLoggedIn(true);
        
        return { 
          success: true, 
          message: 'Login successful!', 
          isAdmin: false,
          redirectTo: '/'
        };
      } else {
        return { success: false, message: userData.message || 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: 'Registration successful! Please login.' };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    // Clear both admin and regular user credentials
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminAuth');
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    register,
    logout,
    updateUser,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};