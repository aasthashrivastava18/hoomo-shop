const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Update user profile (name, image, etc.)
router.put('/profile', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, image } = req.body;
    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: { name, image } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Profile update failed' });
  }
});

module.exports = router; 