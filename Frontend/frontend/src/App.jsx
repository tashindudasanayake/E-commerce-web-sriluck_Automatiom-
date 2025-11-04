// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import authentication context
import { AuthProvider, useAuth } from './context/AuthContext';

// Import your components and pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import Login from './pages/login';
import Register from './pages/registration';

// Import admin components (simple version)
import SimpleAdminLogin from './pages/admin/SimpleAdminLogin';
import SimpleAdminDashboard from './pages/admin/SimpleAdminDashboard';
import TestPage from './pages/admin/TestPage';


function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<SimpleAdminLogin />} />
        <Route path="/admin/dashboard" element={<TestPage />} />
        <Route path="/admin/dashboard-real" element={<SimpleAdminDashboard />} />
        
        {/* Public routes with navbar and footer */}
          <Route path="/" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <HomePage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/products" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <ProductsPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Login />
              </main>
              <Footer />
            </>
          } />
          <Route path="/register" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Register />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
  );
}

export default App;