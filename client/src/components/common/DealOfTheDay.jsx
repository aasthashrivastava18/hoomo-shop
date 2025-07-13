import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const deals = [
  {
    id: "grocery1",
    name: "Fresh Blueberries",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    price: 120,
    discount: 20,
    section: "grocery",
    link: "/grocery/product/1",
  },
  {
    id: "clothes1",
    name: "Summer T-Shirt",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    price: 499,
    discount: 30,
    section: "clothes",
    link: "/clothes/1",
  },
  {
    id: "restaurant1",
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80",
    price: 199,
    discount: 15,
    section: "restaurant",
    link: "/restaurants/1",
  },
  {
    id: "grocery2",
    name: "Organic Almonds",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    price: 350,
    discount: 25,
    section: "grocery",
    link: "/grocery/product/2",
  },
];

export default function DealOfTheDay() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  return (
    <section className="max-w-6xl mx-auto mt-10 mb-12 px-4">
      <div className="text-2xl font-bold text-pink-700 mb-6">Deal of the Day</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center relative group hover:shadow-2xl transition">
            <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">{deal.discount}% OFF</div>
            <img src={deal.image} alt={deal.name} className="w-28 h-28 object-cover rounded-xl mb-3 cursor-pointer" onClick={() => navigate(deal.link)} />
            <div className="font-semibold text-gray-800 text-center mb-1 cursor-pointer" onClick={() => navigate(deal.link)}>{deal.name}</div>
            <div className="text-lg font-bold text-pink-700 mb-2">₹{deal.price - Math.round(deal.price * deal.discount / 100)}</div>
            <button
              className="bg-pink-500 text-white px-5 py-2 rounded font-semibold hover:bg-pink-600 transition mt-auto"
              onClick={() => addItem({
                id: deal.id,
                name: deal.name,
                price: deal.price - Math.round(deal.price * deal.discount / 100),
                image: deal.image,
                section: deal.section,
              })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
} 