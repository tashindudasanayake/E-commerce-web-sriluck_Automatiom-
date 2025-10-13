// routes/productRoutes.js
import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all products (public route)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get featured products (public route)
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single product (public route)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new product (protected route - admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, price, category, image, quantity, featured } = req.body;

    // Basic validation
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      quantity: quantity || 0,
      featured: featured || false,
      inStock: (quantity || 0) > 0
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product (protected route - admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, price, category, image, quantity, featured } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;
    product.quantity = quantity !== undefined ? quantity : product.quantity;
    product.featured = featured !== undefined ? featured : product.featured;
    product.inStock = product.quantity > 0;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product (protected route - admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;