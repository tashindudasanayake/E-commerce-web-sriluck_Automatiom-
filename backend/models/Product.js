import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Laptops', 'Phones', 'Tablets', 'Accessories', 'Audio', 'Cameras', 'Gaming', 'Other']
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=No+Image'
  },
  featured: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual field to check stock status
productSchema.virtual('stockStatus').get(function() {
  return this.quantity > 0 ? 'In Stock' : 'Out of Stock';
});

const Product = mongoose.model('Product', productSchema);

export default Product;
