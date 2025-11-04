// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components and pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';


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
        <Route path="/products" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <ProductsPage />
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;