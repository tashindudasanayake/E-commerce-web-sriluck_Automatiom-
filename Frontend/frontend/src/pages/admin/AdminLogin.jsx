// src/pages/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LockClosedIcon, 
  UserIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  
  // Debug: Check if adminLogin function is available
  console.log('AdminLogin component - adminLogin function:', adminLogin);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      console.log('🚀 ADMIN LOGIN ATTEMPT');
      console.log('� Email entered:', `"${formData.email}"`);
      console.log('🔑 Password entered:', `"${formData.password}"`);
      console.log('� Email length:', formData.email.length);
      console.log('� Password length:', formData.password.length);
      
      // Clean the input data
      const cleanEmail = formData.email.trim();
      const cleanPassword = formData.password.trim();
      
      console.log('🧹 Cleaned email:', `"${cleanEmail}"`);
      console.log('🧹 Cleaned password:', `"${cleanPassword}"`);
      
      // Prepare request
      const requestBody = {
        email: cleanEmail,
        password: cleanPassword
      };
      
      const apiUrl = 'http://localhost:5000/api/auth/admin/login';
      console.log('🌐 API URL:', apiUrl);
      console.log('📦 Request payload:', JSON.stringify(requestBody, null, 2));
      
      // Make the API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response status text:', response.statusText);
      console.log('📡 Response ok:', response.ok);
      
      // Parse response
      let responseData;
      try {
        responseData = await response.json();
        console.log('📦 Response data:', responseData);
      } catch (parseError) {
        console.error('💥 JSON parse error:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (response.ok && responseData) {
        console.log('✅ LOGIN SUCCESS!');
        
        // Store authentication data
        if (responseData.token) {
          localStorage.setItem('adminToken', responseData.token);
          sessionStorage.setItem('adminToken', responseData.token);
          console.log('💾 Token stored');
        }
        
        if (responseData.user) {
          localStorage.setItem('adminAuth', JSON.stringify(responseData.user));
          sessionStorage.setItem('adminAuth', JSON.stringify(responseData.user));
          console.log('👤 User data stored');
        }
        
        // Redirect to dashboard
        console.log('🚀 Redirecting to dashboard...');
        navigate('/admin/dashboard');
        
      } else {
        console.log('❌ LOGIN FAILED');
        console.log('❌ Error message:', responseData?.message || 'Unknown error');
        setError(responseData?.message || 'Login failed. Please check your credentials.');
      }
      
    } catch (error) {
      console.error('💥 NETWORK/CONNECTION ERROR:', error);
      setError(`Connection error: ${error.message}. Please check if the backend server is running.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              ClickStore.LK
            </h1>
            <h2 className="text-lg font-semibold text-gray-700">Admin Login</h2>
          </div>

          {/* Admin Credentials Notice */}
          <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-2">
              <ExclamationCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-900 mb-1">Demo Admin Credentials</p>
                <p className="text-xs text-green-700 mb-1">
                  <strong>Email:</strong> admin@clickstore.lk
                </p>
                <p className="text-xs text-green-700">
                  <strong>Password:</strong> Admin@123
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <ExclamationCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="admin@clickstore.lk"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/admin/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LockClosedIcon className="h-5 w-5 mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </div>

            {/* Additional Options */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="flex justify-center text-sm">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Store
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secure admin area - All sessions are encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;