import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTry } from "../context/TryContext";

function Toast({ message, onClose }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 2000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed top-6 right-6 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
      {message}
    </div>
  );
}

function TryCartSidebar() {
  const { tryItems, removeTryItem, clearTryItems, MAX_TRY } = useTry();
  const [show, setShow] = useState(false);
  React.useEffect(() => { setShow(tryItems.length > 0); }, [tryItems.length]);
  if (!show) return null;
  return (
    <div className="fixed left-4 top-24 bg-white rounded-2xl shadow-lg p-4 w-64 z-40 border border-blue-200">
      <div className="font-bold text-blue-700 mb-2">Try at Home ({tryItems.length}/{MAX_TRY})</div>
      <div className="flex flex-col gap-2 mb-2">
        {tryItems.map(item => (
          <div key={item._id} className="flex items-center gap-2">
            <img src={item.image} alt={item.name} className="w-8 h-8 rounded" />
            <span className="text-sm flex-1">{item.name}</span>
            <button onClick={() => removeTryItem(item._id)} className="text-red-400 hover:text-red-600 text-lg">×</button>
          </div>
        ))}
      </div>
      <button className="w-full bg-blue-500 text-white rounded py-2 font-semibold hover:bg-blue-600 transition mb-2">Schedule Try at Home</button>
      <button className="w-full text-xs text-blue-400 hover:underline" onClick={clearTryItems}>Clear All</button>
    </div>
  );
}

export default function ClothesHomePage() {
  const [categories, setCategories] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toast, setToast] = useState("");
  const navigate = useNavigate();
  const { tryItems, addTryItem, removeTryItem, MAX_TRY } = useTry();

  useEffect(() => {
    fetch("http://localhost:8080/api/clothes/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    let url = "http://localhost:8080/api/clothes";
    if (selectedCategory) url += `?category=${encodeURIComponent(selectedCategory)}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setClothes(data));
  }, [selectedCategory]);

  const handleTry = (item) => {
    if (tryItems.find(i => i._id === item._id)) {
      removeTryItem(item._id);
    } else {
      const success = addTryItem(item);
      if (!success) setToast("You can only select up to 4 items to try at home.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-50 pb-12">
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
      <TryCartSidebar />
      <div className="sticky top-0 z-30 bg-blue-50 py-4 px-2 md:px-8 flex flex-col gap-3 shadow-sm">
        <input
          type="text"
          placeholder="Search shirts, jeans, dresses..."
          className="w-full max-w-xl mx-auto px-5 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-base shadow"
          disabled
        />
      </div>
      {/* Category Slider */}
      <div className="w-full overflow-x-auto flex gap-6 py-6 px-4 scrollbar-hide border-b border-blue-100 min-h-[110px]">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`flex flex-col items-center min-w-[100px] cursor-pointer group ${selectedCategory === cat ? 'border-b-4 border-blue-500' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg mb-1">
              {cat[0]}
            </div>
            <span className="mt-1 text-blue-700 font-semibold text-sm group-hover:text-blue-900">{cat}</span>
          </div>
        ))}
      </div>
      {/* Clothes Grid */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="text-lg font-bold text-blue-700 mb-4">Clothes Collection</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clothes.map((item) => {
            const isTried = tryItems.find(i => i._id === item._id);
            return (
              <div key={item._id} className="bg-white rounded-2xl shadow flex flex-col items-center p-4 hover:shadow-xl transition cursor-pointer group">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl mb-2 group-hover:scale-105 transition" />
                <div className="font-semibold text-blue-700">{item.name}</div>
                <div className="text-gray-500 text-sm mb-1">{item.brand}</div>
                <div className="text-gray-500 text-sm mb-1">₹{item.price}</div>
                {item.discount > 0 && <div className="text-blue-600 text-xs font-bold mb-1">{item.discount}% OFF</div>}
                {!item.available && <div className="text-red-400 text-xs font-bold mb-1">Out of Stock</div>}
                <div className="flex gap-2 mt-2 w-full">
                  <button className="flex-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={() => navigate(`/clothes/${item._id}`)}>Details</button>
                  <button
                    className={`flex-1 px-2 py-1 rounded border-2 ${isTried ? 'bg-green-100 border-green-400 text-green-700' : 'bg-white border-blue-300 text-blue-700'} font-semibold hover:bg-blue-100 transition`}
                    onClick={() => handleTry(item)}
                  >
                    {isTried ? 'Remove' : 'Try'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 