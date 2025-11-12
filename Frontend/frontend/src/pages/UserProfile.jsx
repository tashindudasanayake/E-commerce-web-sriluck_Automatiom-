import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ShoppingBagIcon,
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        setError(data.message || 'Failed to fetch profile');
        if (response.status === 401) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('userData');
          navigate('/login');
        }
      }
    } catch (error) {
      setError('Error fetching profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadMessage('Please select an image file');
      setTimeout(() => setUploadMessage(''), 3000);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadMessage('Image size should be less than 5MB');
      setTimeout(() => setUploadMessage(''), 3000);
      return;
    }

    setUploading(true);
    setUploadMessage('');

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;

        // Update profile with the image
        const token = localStorage.getItem('userToken');
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: user.name,
            phone: user.phone,
            address: user.address,
            profilePicture: base64String
          })
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          setUploadMessage('Profile picture updated successfully!');
          setTimeout(() => setUploadMessage(''), 3000);
          
          // Update localStorage
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          userData.profilePicture = base64String;
          localStorage.setItem('userData', JSON.stringify(userData));
        } else {
          setUploadMessage('Failed to upload image');
          setTimeout(() => setUploadMessage(''), 3000);
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setUploadMessage('Error uploading image: ' + error.message);
      setTimeout(() => setUploadMessage(''), 3000);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Click<span className="text-blue-600">Store.LK</span>
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - User Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-blue-600 p-8 text-center">
                <div className="relative inline-block mb-4">
                  {/* Profile Picture */}
                  <div className="bg-white rounded-full p-1">
                    {user?.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.name}
                        className="h-32 w-32 rounded-full object-cover border-4 border-white"
                      />
                    ) : (
                      <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="h-20 w-20 text-blue-600" />
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Button */}
                  <label 
                    htmlFor="profile-upload" 
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition"
                  >
                    <CameraIcon className="h-5 w-5 text-blue-600" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
                
                {/* Upload Status Message */}
                {uploadMessage && (
                  <div className={`mb-2 text-sm ${uploadMessage.includes('success') ? 'text-green-200' : 'text-red-200'}`}>
                    {uploadMessage}
                  </div>
                )}
                
                {uploading && (
                  <div className="mb-2 text-sm text-blue-100">
                    Uploading...
                  </div>
                )}
                
                <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
                <p className="text-blue-100 text-sm">{user?.email}</p>
              </div>
              
              <div className="p-6 space-y-4">
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-left"
                >
                  <ShoppingBagIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">My Orders</span>
                </button>
                
                <button
                  onClick={() => navigate('/cart')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-left"
                >
                  <ShoppingCartIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Shopping Cart</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition text-left text-red-600"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
                  <div className="flex items-center gap-3 mt-2">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                    <p className="text-gray-800 text-lg">{user?.name}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
                  <div className="flex items-center gap-3 mt-2">
                    <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                    <p className="text-gray-800 text-lg">{user?.email}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Phone Number</label>
                  <div className="flex items-center gap-3 mt-2">
                    <PhoneIcon className="h-5 w-5 text-blue-600" />
                    <p className="text-gray-800 text-lg">{user?.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Member Since</label>
                  <div className="flex items-center gap-3 mt-2">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-800 text-lg">
                      {new Date(user?.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Address</label>
                  <div className="flex items-start gap-3 mt-2">
                    <MapPinIcon className="h-5 w-5 text-blue-600 mt-1" />
                    <p className="text-gray-800 text-lg">{user?.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b">Account Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <ShoppingBagIcon className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-blue-700">{user?.orders?.length || 0}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Orders</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <ShoppingCartIcon className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-green-700">{user?.cart?.length || 0}</p>
                  <p className="text-sm text-gray-600 mt-1">Cart Items</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/"
                  className="flex-1 bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Continue Shopping
                </Link>
                <Link
                  to="/cart"
                  className="flex-1 bg-gray-800 text-white text-center px-6 py-3 rounded-lg hover:bg-gray-900 transition font-semibold"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
