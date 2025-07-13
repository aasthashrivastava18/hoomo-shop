import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const { cart, addItem, removeItem, updateQuantity } = useCart();

  useEffect(() => {
    fetch(`https://hoomo-shop.onrender.com/api/restaurants/${id}`)
      .then(res => res.json())
      .then(data => setRestaurant(data));
  }, [id]);

  if (!restaurant) return <div className="text-center mt-20 text-orange-400 text-xl">Loading...</div>;

  // Helper to get quantity from global cart
  const getQty = (item) => {
    const found = cart.items.find(
      (ci) => ci.id === item.name && ci.section === "restaurant" && ci.restaurantId === restaurant._id
    );
    return found ? found.quantity : 0;
  };

  // Add/Remove handlers for global cart
  const handleAdd = (item) => {
    addItem({
      id: item.name,
      name: item.name,
      price: item.price,
      image: item.image,
      section: "restaurant",
      restaurantId: restaurant._id,
    });
  };
  const handleRemove = (item) => {
    const qty = getQty(item);
    if (qty <= 1) {
      removeItem({ id: item.name, section: "restaurant", restaurantId: restaurant._id });
    } else {
      updateQuantity({ id: item.name, section: "restaurant", restaurantId: restaurant._id }, qty - 1);
    }
  };

  return (
    <div className="w-full min-h-screen bg-orange-50 pb-16">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-orange-100/80 backdrop-blur flex items-center gap-4 px-4 py-3 shadow">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-orange-200 transition">
          <FaArrowLeft className="text-orange-600" />
        </button>
        <img src={restaurant.image} alt={restaurant.name} className="w-16 h-16 object-cover rounded-xl border-2 border-orange-200" />
        <div className="flex-1">
          <div className="text-xl font-bold text-orange-700">{restaurant.name}</div>
          <div className="text-sm text-gray-500">{restaurant.cuisine}</div>
          <div className="flex items-center gap-3 text-sm mt-1">
            <span className="flex items-center gap-1 text-yellow-500 font-semibold"><FaStar /> {restaurant.rating}</span>
            <span className="text-gray-400">•</span>
            <span className="text-orange-500 font-semibold">{restaurant.delivery}</span>
          </div>
        </div>
      </div>
      {/* Add info bar after header */}
      <div className="max-w-4xl mx-auto mt-6 mb-8 flex flex-wrap gap-8 items-center justify-between bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-2 text-gray-700">
          <FaMapMarkerAlt className="text-orange-500" />
          <span className="font-bold">Address:</span>
          <span>{restaurant.address}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaPhoneAlt className="text-orange-500" />
          <span className="font-bold">Phone:</span>
          <span>{restaurant.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaRupeeSign className="text-orange-500" />
          <span className="font-bold">Min Order:</span>
          <span>₹{restaurant.minOrder}</span>
        </div>
      </div>
      {/* Menu Categories */}
      <div className="max-w-4xl mx-auto mt-8">
        {restaurant.menu && restaurant.menu.map((cat, idx) => (
          <div key={cat.category} className="mb-8">
            <div className="text-lg font-bold text-orange-700 mb-4">{cat.category}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.items.map((item) => (
                <div key={item.name} className="bg-white rounded-2xl shadow flex items-center gap-4 p-6 border border-orange-100">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-orange-700 mb-1">{item.name}</div>
                    {item.description && <div className="text-gray-500 text-sm mb-1">{item.description}</div>}
                    <div className="text-xl font-bold text-gray-800 mb-2">₹{item.price}</div>
                    {getQty(item) > 0 ? (
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => handleRemove(item)} className="px-3 py-1 bg-orange-100 text-orange-600 rounded text-lg font-bold">-</button>
                        <span className="font-bold text-lg w-6 text-center">{getQty(item)}</span>
                        <button onClick={() => handleAdd(item)} className="px-3 py-1 bg-orange-500 text-white rounded text-lg font-bold">+</button>
                      </div>
                    ) : (
                      <button onClick={() => handleAdd(item)} className="px-4 py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition mt-2">Add</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Recommended Dishes */}
        {restaurant.recommended && (
          <div className="mt-12">
            <div className="text-lg font-bold text-orange-700 mb-4">Recommended Dishes</div>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {restaurant.recommended.map((item) => (
                <div key={item.name} className="min-w-[220px] bg-white rounded-2xl shadow flex flex-col items-center p-4 border border-orange-100">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl mb-2" />
                  <div className="font-bold text-orange-700 mb-1">{item.name}</div>
                  <div className="text-xl font-bold text-gray-800 mb-2">₹{item.price}</div>
                  {getQty(item) > 0 ? (
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => handleRemove(item)} className="px-3 py-1 bg-orange-100 text-orange-600 rounded text-lg font-bold">-</button>
                      <span className="font-bold text-lg w-6 text-center">{getQty(item)}</span>
                      <button onClick={() => handleAdd(item)} className="px-3 py-1 bg-orange-500 text-white rounded text-lg font-bold">+</button>
                    </div>
                  ) : (
                    <button onClick={() => handleAdd(item)} className="px-4 py-1 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition mt-2">Add</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Sticky cart summary bar at bottom */}
      {cart.items.filter(i => i.section === "restaurant" && i.restaurantId === restaurant._id).length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full shadow-lg flex items-center gap-6 px-8 py-3 border border-orange-200">
          <FaShoppingCart className="text-2xl text-orange-500" />
          <span className="font-bold text-lg">{cart.items.filter(i => i.section === "restaurant" && i.restaurantId === restaurant._id).reduce((a, b) => a + b.quantity, 0)} items</span>
          <span className="font-bold text-lg">Total: ₹{cart.items.filter(i => i.section === "restaurant" && i.restaurantId === restaurant._id).reduce((sum, i) => sum + i.price * i.quantity, 0)}</span>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition" onClick={() => navigate("/cart")}>Go to Cart</button>
        </div>
      )}
    </div>
  );
} 