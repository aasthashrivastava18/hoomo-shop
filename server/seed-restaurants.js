const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('./models/Restaurant');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hoomo';

const sampleRestaurants = [
  {
    name: "Spice Villa",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    cuisine: "North Indian, Chinese",
    rating: 4.5,
    delivery: "30 mins",
    veg: false,
    cost: 2,
    address: "123 Main Street, City Center",
    phone: "+91 98765 43210",
    minOrder: 200,
    menu: [
      {
        category: "Starters",
        items: [
          {
            name: "Paneer Tikka",
            price: 180,
            image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
          },
          {
            name: "Spring Rolls",
            price: 120,
            image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
          },
        ],
      },
      {
        category: "Main Course",
        items: [
          {
            name: "Butter Chicken",
            price: 260,
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
          },
          {
            name: "Dal Makhani",
            price: 200,
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80",
          },
        ],
      },
    ],
    recommended: [
      {
        name: "Gulab Jamun",
        price: 90,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Masala Chai",
        price: 50,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Green Bowl",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    cuisine: "Salads, Healthy, Continental",
    rating: 4.7,
    delivery: "25 mins",
    veg: true,
    cost: 3,
    address: "456 Green Avenue, Park Lane",
    phone: "+91 91234 56789",
    minOrder: 150,
    menu: [
      {
        category: "Salads",
        items: [
          {
            name: "Caesar Salad",
            price: 150,
            image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
          },
          {
            name: "Greek Salad",
            price: 170,
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
          },
        ],
      },
      {
        category: "Continental",
        items: [
          {
            name: "Grilled Veggie Bowl",
            price: 220,
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
          },
        ],
      },
    ],
    recommended: [
      {
        name: "Fruit Smoothie",
        price: 120,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Pizza Hub",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
    cuisine: "Pizza, Italian",
    rating: 4.2,
    delivery: "40 mins",
    veg: false,
    cost: 1,
    address: "789 Pizza Street, Food Plaza",
    phone: "+91 99887 66554",
    minOrder: 100,
    menu: [
      {
        category: "Pizza",
        items: [
          {
            name: "Margherita",
            price: 200,
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80",
          },
          {
            name: "Farmhouse",
            price: 250,
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
          },
        ],
      },
    ],
    recommended: [
      {
        name: "Garlic Bread",
        price: 80,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Restaurant.deleteMany({});
  await Restaurant.insertMany(sampleRestaurants);
  console.log('Sample restaurants inserted!');
  mongoose.disconnect();
}

seed(); 