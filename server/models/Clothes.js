const mongoose = require('mongoose');

const ClothesSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
  image: {
    type: String,
    required: false, // Will be required if you want every product to have an image
  },
  available: Boolean,
  discount: Number,
  sizes: [String],
  colors: [String],
  gender: { type: String, enum: ['Men', 'Women', 'Unisex'] },
});

module.exports = mongoose.model('Clothes', ClothesSchema); 