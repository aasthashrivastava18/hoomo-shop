const express = require('express');
const Clothes = require('../models/Clothes');
const router = express.Router();

// GET all clothes (optionally filter by category or gender)
router.get('/', async (req, res) => {
  try {
    const { category, gender } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (gender) filter.gender = gender;
    const clothes = await Clothes.find(filter);
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all distinct categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Clothes.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET clothes by id
router.get('/:id', async (req, res) => {
  try {
    const item = await Clothes.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 