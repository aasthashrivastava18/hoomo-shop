const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hoomo';

const sampleProducts = [
  { name: "Tomato", brand: "FreshFarm", price: 30, category: "Vegetables", image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=200&q=80", available: true, discount: 10 },
  { name: "Potato", brand: "FreshFarm", price: 25, category: "Vegetables", image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=200&q=80", available: true, discount: 5 },
  { name: "Apple", brand: "FreshFarm", price: 80, category: "Fruits", image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=200&q=80", available: true, discount: 5 },
  { name: "Banana", brand: "FreshFarm", price: 40, category: "Fruits", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80", available: true, discount: 0 },
  { name: "Amul Milk", brand: "Amul", price: 55, category: "Dairy", image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80", available: true, discount: 0 },
  { name: "Mother Dairy Curd", brand: "Mother Dairy", price: 35, category: "Dairy", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80", available: true, discount: 10 },
  { name: "Brown Bread", brand: "Harvest", price: 40, category: "Bakery", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=200&q=80", available: false, discount: 5 },
  { name: "Croissant", brand: "Harvest", price: 60, category: "Bakery", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80", available: true, discount: 8 },
  { name: "Lays Chips", brand: "Lays", price: 20, category: "Snacks", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80", available: true, discount: 15 },
  { name: "Kurkure", brand: "Kurkure", price: 15, category: "Snacks", image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80", available: true, discount: 10 },
  { name: "Orange Juice", brand: "Tropicana", price: 60, category: "Beverages", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80", available: true, discount: 10 },
  { name: "Coca Cola", brand: "Coca Cola", price: 40, category: "Beverages", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80", available: true, discount: 5 },
  { name: "Paracetamol", brand: "PharmaLife", price: 25, category: "Pharmacy", image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80", available: true, discount: 0 },
  { name: "Frozen Peas", brand: "Safal", price: 70, category: "Frozen", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80", available: true, discount: 12 },
  { name: "Organic Spinach", brand: "Organic Farm", price: 50, category: "Organic", image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=200&q=80", available: true, discount: 7 },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  const count = await Product.countDocuments();
  const dbName = mongoose.connection.name;
  console.log(`Sample grocery products inserted! Product count: ${count} | Database: ${dbName}`);
  mongoose.disconnect();
}

seed(); 