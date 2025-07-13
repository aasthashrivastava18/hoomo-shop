import React from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();
  const cartArray = Array.isArray(cart.items) ? cart.items : [];
  const total = cartArray.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow">
      <div className="text-2xl font-bold text-green-700 mb-4">Your Cart</div>
      {cartArray.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <table className="w-full text-left mb-6">
            <thead>
              <tr className="border-b">
                <th className="py-2">Product</th>
                <th className="py-2">Price</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Total</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartArray.map(item => (
                <tr key={item.id + item.section} className="border-b hover:bg-green-50">
                  <td className="py-2 flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded" />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-2">₹{item.price}</td>
                  <td className="py-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => updateQuantity(item, Number(e.target.value))}
                      className="w-16 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="py-2">₹{item.price * item.quantity}</td>
                  <td className="py-2">
                    <button onClick={() => removeItem(item)} className="text-red-500 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right text-lg font-bold text-green-700 mb-4">Total: ₹{total}</div>
          <button className="w-full bg-green-500 text-white rounded py-2 font-semibold hover:bg-green-600 transition">Checkout</button>
        </>
      )}
    </div>
  );
} 