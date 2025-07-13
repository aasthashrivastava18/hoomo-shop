const express = require('express');
const Product = require('../models/Product');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// GET /api/search?q=term
router.get('/', async (req, res) => {
  const q = req.query.q || '';
  if (!q) return res.json({ products: [], categories: [], restaurants: [] });
  // Products
  const products = await Product.find({ name: { $regex: q, $options: 'i' } }).limit(5);
  // Categories
  const categories = await Product.distinct('category', { category: { $regex: q, $options: 'i' } });
  // Restaurants
  const restaurants = await Restaurant.find({ name: { $regex: q, $options: 'i' } }).limit(5);
  res.json({ products, categories, restaurants });
});

module.exports = router; 