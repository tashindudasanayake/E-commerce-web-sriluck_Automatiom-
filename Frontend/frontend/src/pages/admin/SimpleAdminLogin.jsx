import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🚀 ADMIN LOGIN STARTED');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      console.log('📡 Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Response data:', data);

      if (response.ok) {
        console.log('✅ LOGIN SUCCESS!');
        
        // Store token
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        console.log('� Token stored:', localStorage.getItem('adminToken'));
        console.log('👤 User stored:', localStorage.getItem('adminUser'));
        
        console.log('�🚀 Navigating to dashboard...');
        
        // Add a small delay to ensure storage is complete
        setTimeout(() => {
          console.log('🔄 Starting navigation to /admin/dashboard');
          navigate('/admin/dashboard', { replace: true });
          console.log('✅ Navigate function called');
        }, 100);
      } else {
        console.log('❌ LOGIN FAILED:', data.message);
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('💥 ERROR:', err);
      setError('Connection error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          🔐 Admin Login
        </h1>

        {/* Credentials Display */}
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #c3e6c3'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#2d5a2d' }}>
            <strong>Demo Credentials:</strong><br/>
            Email: admin@clickstore.lk<br/>
            Password: Admin@123
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#ffe6e6',
            color: '#d8000c',
            padding: '0.75rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            border: '1px solid #d8000c'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Enter admin email"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a 
            href="/"
            style={{
              color: '#007bff',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default SimpleAdminLogin;