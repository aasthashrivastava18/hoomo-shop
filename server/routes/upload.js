const express = require('express');
const router = express.Router();
const parser = require('../config/multer');

// POST /api/upload/image
router.post('/image', parser.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ imageUrl: req.file.path });
});

module.exports = router; 