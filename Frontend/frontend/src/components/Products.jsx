// src/components/Products.jsx
import React, { useState, useEffect } from 'react';

const Products = ({ showFeaturedOnly = false, limit = null, filters = {} }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [showFeaturedOnly]);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const endpoint = showFeaturedOnly 
        ? 'http://localhost:5000/api/products/featured' 
        : 'http://localhost:5000/api/products';
      
      const response = await fetch(endpoint);
      const data = await response.json();

      if (response.ok) {
        const displayProducts = limit ? data.slice(0, limit) : data;
        setProducts(displayProducts);
      } else {
        setError(data.message || 'Failed to fetch products');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      if (filters.priceRange === '2000+') {
        filtered = filtered.filter(product => product.price >= 2000);
      } else {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filtered = filtered.filter(product => 
          product.price >= min && product.price <= max
        );
      }
    }

    // Apply stock filter
    if (filters.inStock !== '') {
      const stockStatus = filters.inStock === 'true';
      filtered = filtered.filter(product => product.inStock === stockStatus);
    }

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'featured':
          filtered.sort((a, b) => b.featured - a.featured);
          break;
        case 'newest':
        default:
          // Keep original order or sort by date if available
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchProducts}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Use filtered products for display, fallback to original products if no filters
  const displayProducts = Object.keys(filters).length > 0 && Object.values(filters).some(filter => filter !== '') 
    ? filteredProducts 
    : products;

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">No Products Available</h3>
        <p className="text-gray-600">
          {showFeaturedOnly ? 'No featured products found.' : 'No products have been added yet.'}
        </p>
      </div>
    );
  }

  if (displayProducts.length === 0 && products.length > 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">No Products Found</h3>
        <p className="text-gray-600">Try adjusting your filters to see more products.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        Showing {displayProducts.length} of {products.length} products
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
        <div key={product._id} className="product-card bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="product-image w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
              }}
            />
            {product.featured && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Featured
              </div>
            )}
            {!product.inStock && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Out of Stock
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-lg font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Stock: {product.quantity}
              </span>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  product.inStock 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Products;