const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// GET all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}, '-menu -recommended'); // Exclude menu for list
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET restaurant by id (with menu)
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: 'Not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 