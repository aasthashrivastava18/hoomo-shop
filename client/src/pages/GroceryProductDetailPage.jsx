import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function GroceryProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    fetch(`http://localhost:8080/api/grocery/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-green-50 pb-12">
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.name} className="w-48 h-48 object-cover rounded-xl" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-2xl font-bold text-green-700 mb-2">{product.name}</div>
          <div className="text-gray-600 text-base mb-1">Brand: {product.brand}</div>
          <div className="text-gray-600 text-base mb-1">Category: {product.category}</div>
          <div className="text-gray-600 text-base mb-1">Price: ₹{product.price}</div>
          {product.discount > 0 && <div className="text-green-600 text-sm font-bold mb-1">{product.discount}% OFF</div>}
          {!product.available && <div className="text-red-400 text-sm font-bold mb-1">Out of Stock</div>}
          <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition w-fit" disabled={!product.available} onClick={() => addItem({ id: product._id, name: product.name, price: product.price, image: product.image, section: "grocery" })}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
} 