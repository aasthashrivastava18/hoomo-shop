import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminClothesPage() {
  const { token } = useAuth();
  const [clothes, setClothes] = useState([]);
  const [form, setForm] = useState({ name: "", brand: "", price: "", category: "", image: "", available: true, discount: 0, sizes: "", colors: "", gender: "Unisex" });
  const [editingId, setEditingId] = useState(null);
  // Add state for image uploading
  const [uploading, setUploading] = useState(false);

  const fetchClothes = () => {
    fetch("https://hoomo-shop.onrender.com/api/clothes")
      .then(res => res.json())
      .then(data => setClothes(data));
  };

  useEffect(() => { fetchClothes(); }, []);

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
      ? `https://hoomo-shop.onrender.com/api/admin/clothes/${editingId}`
      : "https://hoomo-shop.onrender.com/api/admin/clothes";
    const body = {
      ...form,
      sizes: form.sizes.split(",").map(s => s.trim()),
      colors: form.colors.split(",").map(c => c.trim()),
    };
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    setForm({ name: "", brand: "", price: "", category: "", image: "", available: true, discount: 0, sizes: "", colors: "", gender: "Unisex" });
    setEditingId(null);
    fetchClothes();
  };

  const handleEdit = item => {
    setForm({ ...item, sizes: item.sizes.join(", "), colors: item.colors.join(", ") });
    setEditingId(item._id);
  };

  const handleDelete = async id => {
    await fetch(`https://hoomo-shop.onrender.com/api/admin/clothes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchClothes();
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow">
      <div className="text-2xl font-bold text-blue-700 mb-4">Manage Clothes Products</div>
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
        <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="Sizes (comma separated)" className="px-3 py-2 border rounded" />
        <input name="colors" value={form.colors} onChange={handleChange} placeholder="Colors (comma separated)" className="px-3 py-2 border rounded" />
        <select name="gender" value={form.gender} onChange={handleChange} className="px-3 py-2 border rounded">
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", brand: "", price: "", category: "", image: "", available: true, discount: 0, sizes: "", colors: "", gender: "Unisex" }); }} className="ml-2 text-sm text-gray-500 underline">Cancel</button>}
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
            <th className="py-2">Sizes</th>
            <th className="py-2">Colors</th>
            <th className="py-2">Gender</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clothes.map(item => (
            <tr key={item._id} className="border-b hover:bg-blue-50">
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.brand}</td>
              <td className="py-2">₹{item.price}</td>
              <td className="py-2">{item.category}</td>
              <td className="py-2">{item.available ? "Yes" : "No"}</td>
              <td className="py-2">{item.discount}%</td>
              <td className="py-2">{item.sizes?.join(", ")}</td>
              <td className="py-2">{item.colors?.join(", ")}</td>
              <td className="py-2">{item.gender}</td>
              <td className="py-2 flex gap-2">
                <button onClick={() => handleEdit(item)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 