// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components and pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <Router>
      <Routes>
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

        {/* User Authentication routes (no navbar/footer) */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        {/* Admin routes (no navbar/footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;