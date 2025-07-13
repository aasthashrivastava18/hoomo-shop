import React, { useState, useEffect } from "react";
import { FaStar, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const costLabels = ["₹", "₹₹", "₹₹₹"];

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [cost, setCost] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/restaurants")
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      });
  }, []);

  const filtered = restaurants.filter(r =>
    (!vegOnly || r.veg) &&
    (cost === 0 || r.cost === cost) &&
    (minRating === 0 || r.rating >= minRating) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full min-h-screen bg-orange-50 pb-12">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-30 bg-orange-50 py-4 px-2 md:px-8 flex flex-col gap-3 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for restaurants or dishes..."
          className="w-full max-w-xl mx-auto px-5 py-2 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-base shadow"
        />
        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mt-1">
          <button
            className={`px-4 py-1 rounded-full border ${vegOnly ? "bg-green-100 border-green-400 text-green-700" : "bg-white border-orange-200 text-orange-600"}`}
            onClick={() => setVegOnly(v => !v)}
          >
            <FaLeaf className="inline mr-1" /> Veg Only
          </button>
          {costLabels.map((label, idx) => (
            <button
              key={label}
              className={`px-4 py-1 rounded-full border ${cost === idx + 1 ? "bg-orange-200 border-orange-400 text-orange-800" : "bg-white border-orange-200 text-orange-600"}`}
              onClick={() => setCost(cost === idx + 1 ? 0 : idx + 1)}
            >
              {label}
            </button>
          ))}
          {[4, 4.5].map(r => (
            <button
              key={r}
              className={`px-4 py-1 rounded-full border ${minRating === r ? "bg-orange-200 border-orange-400 text-orange-800" : "bg-white border-orange-200 text-orange-600"}`}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
            >
              <FaStar className="inline mr-1 text-yellow-400" /> {r}+
            </button>
          ))}
        </div>
      </div>
      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 md:p-8">
        {loading && <div className="col-span-full text-center text-orange-400 text-xl mt-8">Loading...</div>}
        {!loading && filtered.length === 0 && (
          <div className="col-span-full text-center text-orange-400 text-xl mt-8">No restaurants found.</div>
        )}
        {filtered.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition border-2 border-orange-100 flex flex-col cursor-pointer"
            onClick={() => navigate(`/restaurants/${r._id}`)}
          >
            <img src={r.image} alt={r.name} className="w-full h-40 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-orange-700">{r.name}</span>
                  {r.veg && <FaLeaf className="text-green-500" title="Veg" />}
                </div>
                <div className="text-sm text-gray-500 mb-2">{r.cuisine}</div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-yellow-500 font-semibold"><FaStar /> {r.rating}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-orange-500 font-semibold">{r.delivery}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-orange-400 font-bold">{costLabels[r.cost - 1]}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 