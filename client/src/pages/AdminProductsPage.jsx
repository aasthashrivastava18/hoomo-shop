import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", brand: "", price: "", category: "", image: "", available: true, discount: 0 });
  const [editingId, setEditingId] = useState(null);
  // Add state for image uploading
  const [uploading, setUploading] = useState(false);

  const fetchProducts = () => {
    fetch("https://hoomo-shop.onrender.com/api/grocery/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  // Add image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('https://hoomo-shop.onrender.com/api/upload/image', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setForm(f => ({ ...f, image: data.imageUrl }));
    setUploading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `https://hoomo-shop.onrender.com/api/admin/grocery/products/${editingId}`
      : "https://hoomo-shop.onrender.com/api/admin/grocery/products";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    setForm({ name: "", brand: "", price: "", category: "", image: "", available: true, discount: 0 });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = prod => {
    setForm({ ...prod });
    setEditingId(prod._id);
  };

  const handleDelete = async id => {
    await fetch(`https://hoomo-shop.onrender.com/api/admin/grocery/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow">
      <div className="text-2xl font-bold text-blue-700 mb-4">Manage Grocery Products</div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-8 items-end">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="px-3 py-2 border rounded" required />
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="px-3 py-2 border rounded" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="px-3 py-2 border rounded" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="px-3 py-2 border rounded" required />
        <div className="flex flex-col">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-1" />
          {uploading && <span className="text-xs text-blue-500">Uploading...</span>}
          {form.image && <img src={form.image} alt="preview" className="w-16 h-16 object-cover rounded mb-1" />}
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (or upload above)" className="px-3 py-2 border rounded" />
        </div>
        <label className="flex items-center gap-2">
          <input name="available" type="checkbox" checked={form.available} onChange={handleChange} /> Available
        </label>
        <input name="discount" value={form.discount} onChange={handleChange} placeholder="Discount" type="number" className="px-3 py-2 border rounded w-24" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", brand: "", price: "", category: "", image: "", available: true, discount: 0 }); }} className="ml-2 text-sm text-gray-500 underline">Cancel</button>}
      </form>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th className="py-2">Brand</th>
            <th className="py-2">Price</th>
            <th className="py-2">Category</th>
            <th className="py-2">Available</th>
            <th className="py-2">Discount</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id} className="border-b hover:bg-blue-50">
              <td className="py-2">{prod.name}</td>
              <td className="py-2">{prod.brand}</td>
              <td className="py-2">₹{prod.price}</td>
              <td className="py-2">{prod.category}</td>
              <td className="py-2">{prod.available ? "Yes" : "No"}</td>
              <td className="py-2">{prod.discount}%</td>
              <td className="py-2 flex gap-2">
                <button onClick={() => handleEdit(prod)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => handleDelete(prod._id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 