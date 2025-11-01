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

// Import admin components
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';
import Orders from './pages/admin/Orders';

// Import simple admin components
import SimpleAdminLogin from './pages/admin/SimpleAdminLogin';
import SimpleAdminDashboard from './pages/admin/SimpleAdminDashboard';


function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Routes>
          {/* Simple Admin Routes */}
          <Route path="/admin/login" element={<SimpleAdminLogin />} />
          <Route path="/admin/dashboard" element={<SimpleAdminDashboard />} />
          
          {/* Original Complex Admin Routes (backup) */}
          <Route path="/admin/login-complex" element={<AdminLogin />} />
          <Route path="/admin/dashboard-complex" element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/products" element={
            <ProtectedRoute>
              <AdminLayout>
                <Products />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/orders" element={
            <ProtectedRoute>
              <AdminLayout>
                <Orders />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
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
    </Router>
  );
}

export default App;