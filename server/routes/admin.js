const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User');
const Product = require('../models/Product');
// const Order = require('../models/Order'); // Placeholder for future
const router = express.Router();

// All routes below require admin
router.use(adminAuth);

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
});

// Add a grocery product
router.post('/grocery/products', async (req, res) => {
  const prod = await Product.create(req.body);
  res.json(prod);
});

// Edit a grocery product
router.put('/grocery/products/:id', async (req, res) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(prod);
});

// Delete a grocery product
router.delete('/grocery/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Get all orders (placeholder)
router.get('/orders', async (req, res) => {
  res.json([]); // Implement order model later
});

module.exports = router; 