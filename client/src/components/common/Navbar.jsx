import React, { useState, useRef } from "react";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user } = useAuth();
  const cartCount = Array.isArray(cart.items) ? cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;

  // Auto-suggest state
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef();

  // Debounce search
  React.useEffect(() => {
    if (!search) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(search)}`)
        .then(res => res.json())
        .then(data => {
          const all = [];
          data.products.forEach(p => all.push({ type: "product", label: p.name, id: p._id }));
          data.categories.forEach(c => all.push({ type: "category", label: c }));
          data.restaurants.forEach(r => all.push({ type: "restaurant", label: r.name, id: r._id }));
          setSuggestions(all);
          setShowDropdown(true);
          setLoading(false);
        });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // Hide dropdown on outside click
  React.useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (s) => {
    setShowDropdown(false);
    setSearch("");
    if (s.type === "product") navigate(`/grocery/product/${s.id}`); // Go to product detail page
    else if (s.type === "category") navigate(`/grocery/category/${encodeURIComponent(s.label)}`);
    else if (s.type === "restaurant") navigate(`/restaurants/${s.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-blue-100 shadow flex items-center justify-between px-6 py-3 transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold text-blue-600 tracking-wide">Hoomo</span>
      </div>
      {/* Search Bar */}
      <div className="flex-1 mx-6 max-w-xl relative" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Search for products, restaurants, clothes..."
          className="w-full px-5 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => search && setShowDropdown(true)}
          onKeyDown={handleKeyDown}
        />
        {showDropdown && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-72 overflow-auto">
            {loading ? (
              <div className="p-4 text-gray-400 text-center">Loading...</div>
            ) : suggestions.length === 0 ? (
              <div className="p-4 text-gray-400 text-center">No results found</div>
            ) : (
              suggestions.map((s, i) => (
                <div
                  key={s.type + s.label + (s.id || i)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                  onClick={() => handleSelect(s)}
                >
                  <span className="text-xs font-bold text-gray-400 uppercase w-16">{s.type}</span>
                  <span>{s.label}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {/* Icons or Auth Buttons */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            {/* Cart Icon */}
            <button className="relative hover:bg-blue-50 p-2 rounded-full transition" onClick={() => navigate("/cart")}> 
              <FiShoppingCart className="text-2xl text-blue-600" />
              {/* Cart badge */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>
              )}
            </button>
            {/* Profile Icon */}
            <button className="hover:bg-blue-50 p-2 rounded-full transition" onClick={() => navigate("/profile")}> 
              <FiUser className="text-2xl text-blue-600" />
            </button>
            {user && user.role === 'admin' && (
              <button className="bg-yellow-500 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-600 transition" onClick={() => navigate('/admin')}>
                Admin Dashboard
              </button>
            )}
          </>
        ) : (
          <>
            <button className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition" onClick={() => navigate("/login")}>Login</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition" onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
} 