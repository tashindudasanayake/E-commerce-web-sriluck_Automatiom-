import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleAdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');

    if (!token || !adminUser) {
      console.log('❌ No admin token found, redirecting to login');
      navigate('/admin/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(adminUser);
      setUser(parsedUser);
      console.log('✅ Admin authenticated:', parsedUser);
    } catch (error) {
      console.error('❌ Error parsing user data:', error);
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    console.log('👋 Admin logged out');
    navigate('/admin/login');
  };

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>
          🏪 ClickStore Admin Dashboard
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Welcome, {user.name}!</span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        {/* Welcome Message */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#2c3e50', marginTop: 0 }}>
            🎉 Admin Login Successful!
          </h2>
          <p style={{ color: '#666', marginBottom: 0 }}>
            You have successfully logged in as an administrator. 
            This is your admin dashboard where you can manage your e-commerce website.
          </p>
        </div>

        {/* Admin Info Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0 }}>Admin Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
            <div>
              <strong>ID:</strong> {user.id}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>📦</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Products</div>
            <div>Manage Inventory</div>
          </div>

          <div style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>👥</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Users</div>
            <div>Customer Management</div>
          </div>

          <div style={{
            backgroundColor: '#9b59b6',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>📋</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Orders</div>
            <div>Order Processing</div>
          </div>

          <div style={{
            backgroundColor: '#f39c12',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>💰</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Revenue</div>
            <div>Financial Reports</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0 }}>Quick Actions</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            <button style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              Add New Product
            </button>
            <button style={{
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              View All Orders
            </button>
            <button style={{
              backgroundColor: '#9b59b6',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              Manage Users
            </button>
            <button style={{
              backgroundColor: '#e67e22',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAdminDashboard;