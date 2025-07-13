import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ClothesDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/clothes/${id}`)
      .then(res => res.json())
      .then(data => setItem(data));
  }, [id]);

  if (!item) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-blue-50 pb-12">
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row gap-8">
        <img src={item.image} alt={item.name} className="w-48 h-48 object-cover rounded-xl" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-2xl font-bold text-blue-700 mb-2">{item.name}</div>
          <div className="text-gray-600 text-base mb-1">Brand: {item.brand}</div>
          <div className="text-gray-600 text-base mb-1">Category: {item.category}</div>
          <div className="text-gray-600 text-base mb-1">Gender: {item.gender}</div>
          <div className="text-gray-600 text-base mb-1">Price: ₹{item.price}</div>
          {item.discount > 0 && <div className="text-blue-600 text-sm font-bold mb-1">{item.discount}% OFF</div>}
          {!item.available && <div className="text-red-400 text-sm font-bold mb-1">Out of Stock</div>}
          <div className="flex gap-2 mt-2">
            <span className="font-semibold">Sizes:</span>
            {item.sizes.map(size => (
              <span key={size} className="px-2 py-1 bg-blue-100 rounded text-blue-700 text-xs font-semibold">{size}</span>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <span className="font-semibold">Colors:</span>
            {item.colors.map(color => (
              <span key={color} className="px-2 py-1 bg-blue-100 rounded text-blue-700 text-xs font-semibold">{color}</span>
            ))}
          </div>
          <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-fit" disabled={!item.available}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
} 