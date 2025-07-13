const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Clothes = require('./models/Clothes');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hoomo';

const sampleClothes = [
  {
    name: 'Classic White Shirt',
    brand: 'Raymond',
    price: 999,
    category: 'Shirts',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80',
    available: true,
    discount: 10,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White'],
    gender: 'Men',
  },
  {
    name: 'Blue Denim Jeans',
    brand: 'Levis',
    price: 1999,
    category: 'Jeans',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=200&q=80',
    available: true,
    discount: 15,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue'],
    gender: 'Men',
  },
  {
    name: 'Floral Summer Dress',
    brand: 'Biba',
    price: 1499,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    available: true,
    discount: 20,
    sizes: ['S', 'M', 'L'],
    colors: ['Pink', 'White'],
    gender: 'Women',
  },
  {
    name: 'Kids Cartoon T-shirt',
    brand: 'Max',
    price: 499,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=200&q=80',
    available: true,
    discount: 5,
    sizes: ['XS', 'S', 'M'],
    colors: ['Yellow', 'Blue'],
    gender: 'Unisex',
  },
  {
    name: 'Women Black Jeggings',
    brand: 'Zara',
    price: 1299,
    category: 'Jeggings',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80',
    available: false,
    discount: 0,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    gender: 'Women',
  },
  {
    name: 'Men Grey Hoodie',
    brand: 'H&M',
    price: 1799,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    available: true,
    discount: 12,
    sizes: ['M', 'L', 'XL'],
    colors: ['Grey'],
    gender: 'Men',
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Clothes.deleteMany({});
  await Clothes.insertMany(sampleClothes);
  const count = await Clothes.countDocuments();
  const dbName = mongoose.connection.name;
  console.log(`Sample clothes inserted! Product count: ${count} | Database: ${dbName}`);
  mongoose.disconnect();
}

seed(); 