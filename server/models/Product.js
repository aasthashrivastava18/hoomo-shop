const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
  image: {
    type: String,
    required: false,
  },
  available: Boolean,
  discount: Number,
});

module.exports = mongoose.model('Product', ProductSchema); 