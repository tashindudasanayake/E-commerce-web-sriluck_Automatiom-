// src/components/admin/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if admin is authenticated by checking for token and admin data
  const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  const adminAuthData = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
  
  // Verify token exists and user has admin role
  const isAuthenticated = () => {
    if (!adminToken && !adminAuthData) {
      return false;
    }

    try {
      // Parse admin data if it exists
      if (adminAuthData) {
        const authData = JSON.parse(adminAuthData);
        return authData.user && authData.user.role === 'admin';
      }
      return !!adminToken;
    } catch (error) {
      console.error('Error parsing admin data:', error);
      return false;
    }
  };

  if (!isAuthenticated()) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;