import React from "react";
import { MdLocalGroceryStore, MdRestaurantMenu } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Groceries",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    icon: <MdLocalGroceryStore className="text-5xl mb-2 text-green-500" />,
    color: "bg-green-50 border-green-400 hover:bg-green-100",
    link: "/grocery",
  },
  {
    title: "Restaurants",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
    icon: <MdRestaurantMenu className="text-5xl mb-2 text-orange-500" />,
    color: "bg-orange-50 border-orange-400 hover:bg-orange-100",
    link: "/restaurants",
  },
  {
    title: "Try Clothes",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    icon: <GiClothes className="text-5xl mb-2 text-blue-500" />,
    color: "bg-blue-50 border-blue-400 hover:bg-blue-100",
    link: "/clothes",
  },
];

export default function CategoryCards() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-center gap-8 mt-12 px-0">
      {categories.map((cat) => (
        <button
          key={cat.title}
          className={`flex-1 h-64 rounded-2xl border-2 ${cat.color} flex flex-col items-center justify-center text-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none`}
          onClick={() => navigate(cat.link)}
        >
          <img
            src={cat.image}
            alt={cat.title}
            className="w-20 h-20 object-cover rounded-xl mb-2 shadow"
            draggable={false}
          />
          {cat.icon}
          {cat.title}
        </button>
      ))}
    </div>
  );
} 