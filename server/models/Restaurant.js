const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const MenuCategorySchema = new mongoose.Schema({
  category: String,
  items: [MenuItemSchema],
});

const RestaurantSchema = new mongoose.Schema({
  name: String,
  image: {
    type: String,
    required: false,
  },
  cuisine: String,
  rating: Number,
  delivery: String,
  veg: Boolean,
  cost: Number,
  menu: [MenuCategorySchema],
  recommended: [MenuItemSchema],
  address: { type: String, required: false },
  phone: { type: String, required: false },
  minOrder: { type: Number, required: false },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema); 