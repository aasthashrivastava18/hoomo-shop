import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const categoryImages = {
  Vegetables: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=200&q=80",
  Snacks: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80",
  Dairy: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80",
  Fruits: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=200&q=80",
  Beverages: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80",
  Bakery: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=200&q=80",
};

const popularPicks = [
  { _id: "amul-milk", name: "Amul Milk", image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80", price: 55 },
  { _id: "tomato", name: "Tomato", image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=200&q=80", price: 30 },
  { _id: "lays-chips", name: "Lays Chips", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80", price: 20 },
  { _id: "brown-bread", name: "Brown Bread", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=200&q=80", price: 40 },
];

export default function GroceryHomePage() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    fetch("http://localhost:8080/api/grocery/categories")
      .then(res => res.json())
      .then(data => {
        console.log('Fetched categories:', data);
        setCategories(data);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-green-50 pb-12">
      {/* Search Bar */}
      <div className="sticky top-0 z-30 bg-green-50 py-4 px-2 md:px-8 flex flex-col gap-3 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search fruits, snacks, dairy…"
          className="w-full max-w-xl mx-auto px-5 py-2 rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-base shadow"
        />
      </div>
      {/* Category Slider */}
      <div className="w-full overflow-x-auto flex gap-6 py-6 px-4 scrollbar-hide border-b border-green-100 min-h-[110px]">
        {categories.length === 0 && (
          <div className="text-gray-400 text-sm italic">No categories found.</div>
        )}
        {categories.map((cat) => (
          <div
            key={cat}
            className="flex flex-col items-center min-w-[100px] cursor-pointer group"
            onClick={() => navigate(`/grocery/category/${encodeURIComponent(cat)}`)}
          >
            <img src={categoryImages[cat] || categoryImages.Vegetables} alt={cat} className="w-16 h-16 object-cover rounded-full border-2 border-green-200 group-hover:scale-110 transition" />
            <span className="mt-2 text-green-700 font-semibold text-sm group-hover:text-green-900">{cat}</span>
          </div>
        ))}
      </div>
      {/* Popular Picks */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="text-lg font-bold text-green-700 mb-4">Popular Picks & Offers</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularPicks.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow flex flex-col items-center p-4 hover:shadow-xl transition">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl mb-2" />
              <div className="font-semibold text-green-700">{item.name}</div>
              <div className="text-gray-500 text-sm mb-2">₹{item.price}</div>
              <button className="px-3 py-1 bg-green-500 text-white rounded mt-2 hover:bg-green-600 transition" onClick={() => addItem({ id: item._id, name: item.name, price: item.price, image: item.image, section: "grocery" })}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 