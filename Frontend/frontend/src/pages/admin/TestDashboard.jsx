import React from 'react';

const TestDashboard = () => {
  console.log('🧪 TestDashboard loaded successfully!');
  
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#2c3e50' }}>🎉 Navigation Success!</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        Admin dashboard navigation is working correctly!
      </p>
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '8px',
        margin: '2rem auto',
        maxWidth: '500px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>Debug Info:</h3>
        <p>Token: {localStorage.getItem('adminToken') ? '✅ Found' : '❌ Missing'}</p>
        <p>User: {localStorage.getItem('adminUser') ? '✅ Found' : '❌ Missing'}</p>
        <p>Current Path: {window.location.pathname}</p>
      </div>
    </div>
  );
};

export default TestDashboard;