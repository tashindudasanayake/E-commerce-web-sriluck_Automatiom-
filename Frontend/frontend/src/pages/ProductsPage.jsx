// src/pages/ProductsPage.jsx
import React, { useState } from 'react';
import Products from '../components/Products';

const ProductsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    inStock: '',
    search: '',
    sortBy: 'newest'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      inStock: '',
      search: '',
      sortBy: 'newest'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover our complete collection of electronic products, from the latest gadgets to essential tech accessories
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto h-full sidebar-scroll">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
              <div className="space-y-2">
                {['All Categories', 'Smartphones', 'Laptops', 'Tablets', 'Audio', 'Electronics'].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category === 'All Categories' ? '' : category}
                      checked={filters.category === (category === 'All Categories' ? '' : category)}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
              <div className="space-y-2">
                {[
                  { label: 'All Prices', value: '' },
                  { label: 'Under $100', value: '0-100' },
                  { label: '$100 - $500', value: '100-500' },
                  { label: '$500 - $1000', value: '500-1000' },
                  { label: '$1000 - $2000', value: '1000-2000' },
                  { label: 'Over $2000', value: '2000+' }
                ].map((price) => (
                  <label key={price.value} className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value={price.value}
                      checked={filters.priceRange === price.value}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{price.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Availability</label>
              <div className="space-y-2">
                {[
                  { label: 'All Products', value: '' },
                  { label: 'In Stock', value: 'true' },
                  { label: 'Out of Stock', value: 'false' }
                ].map((stock) => (
                  <label key={stock.value} className="flex items-center">
                    <input
                      type="radio"
                      name="inStock"
                      value={stock.value}
                      checked={filters.inStock === stock.value}
                      onChange={(e) => handleFilterChange('inStock', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{stock.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <div className="pt-4 border-t">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Top Bar */}
          <div className="bg-white border-b px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-md"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium">Filters</span>
                </button>

                <h1 className="text-xl font-semibold text-gray-900">Products</h1>
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <label className="text-sm text-gray-700">Sort by:</label>
                <select 
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-6">
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing products 
                {filters.category && ` in ${filters.category}`}
                {filters.priceRange && ` • Price: ${filters.priceRange.includes('+') ? `Over $${filters.priceRange.replace('+', '')}` : `$${filters.priceRange.replace('-', ' - $')}`}`}
                {filters.inStock === 'true' && ` • In Stock Only`}
                {filters.inStock === 'false' && ` • Out of Stock`}
              </p>
            </div>
            
            {/* Products Component */}
            <Products showFeaturedOnly={false} filters={filters} />
            
            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md">
                Load More Products
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ProductsPage;