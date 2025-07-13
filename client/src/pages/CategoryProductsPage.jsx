import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CategoryProductsPage() {
  const { categoryName } = useParams();
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/grocery/products?category=${encodeURIComponent(categoryName)}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [categoryName]);

  const brands = [...new Set(products.map(p => p.brand))];

  let filtered = products.filter(p =>
    (!brand || p.brand === brand) &&
    (!availableOnly || p.available)
  );
  if (sort === "discount") filtered = [...filtered].sort((a, b) => b.discount - a.discount);
  if (sort === "popularity") filtered = [...filtered]; // No popularity in sample

  return (
    <div className="w-full min-h-screen bg-green-50 pb-12">
      <div className="max-w-5xl mx-auto py-8">
        <div className="text-2xl font-bold text-green-700 mb-4">{decodeURIComponent(categoryName)} Products</div>
        {/* Filters & Sort */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select value={brand} onChange={e => setBrand(e.target.value)} className="px-3 py-1 rounded border border-green-200">
            <option value="">All Brands</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <button onClick={() => setAvailableOnly(a => !a)} className={`px-3 py-1 rounded border ${availableOnly ? "bg-green-200 border-green-400 text-green-800" : "bg-white border-green-200 text-green-600"}`}>Available Only</button>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-1 rounded border border-green-200">
            <option value="">Sort By</option>
            <option value="discount">Discount</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow flex flex-col items-center p-4 hover:shadow-xl transition">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl mb-2" />
              <div className="font-semibold text-green-700">{item.name}</div>
              <div className="text-gray-500 text-sm mb-1">{item.brand}</div>
              <div className="text-gray-500 text-sm mb-1">₹{item.price}</div>
              {item.discount > 0 && <div className="text-green-600 text-xs font-bold mb-1">{item.discount}% OFF</div>}
              {!item.available && <div className="text-red-400 text-xs font-bold mb-1">Out of Stock</div>}
              <button className="px-3 py-1 bg-green-500 text-white rounded mt-2 hover:bg-green-600 transition" disabled={!item.available}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 