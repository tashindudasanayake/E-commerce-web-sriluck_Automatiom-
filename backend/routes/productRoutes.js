import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, featured, inStock, limit } = req.query;
    
    let query = {};
    
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    if (inStock) query.inStock = inStock === 'true';
    
    let productsQuery = Product.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }
    
    const products = await productsQuery;
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

export default router;
