// src/pages/admin/Dashboard.jsx
import React, { useState } from 'react';
import {
  ShoppingBagIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import AddProduct from '../../components/AddProduct';

const Dashboard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Simple stats
  const stats = [
    { name: 'Products', value: '124', icon: ShoppingBagIcon, color: 'bg-blue-500' },
    { name: 'Users', value: '567', icon: UserGroupIcon, color: 'bg-green-500' },
    { name: 'Orders', value: '89', icon: ClipboardDocumentListIcon, color: 'bg-purple-500' },
    { name: 'Revenue', value: '$12,345', icon: CurrencyDollarIcon, color: 'bg-yellow-500' }
  ];

  const handleProductAdded = (newProduct) => {
    setShowAddProduct(false);
    // You can add additional logic here, like refreshing stats
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin panel</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowAddProduct(!showAddProduct)}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showAddProduct ? 'Hide Add Product' : 'Add New Product'}
          </button>
          <button className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
            View All Orders
          </button>
          <button className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors">
            Manage Users
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddProduct && (
        <AddProduct onProductAdded={handleProductAdded} />
      )}

      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">New order received</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">Product added to inventory</span>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">New user registered</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;