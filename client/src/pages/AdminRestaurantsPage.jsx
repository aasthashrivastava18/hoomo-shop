import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminRestaurantsPage() {
  const { token } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({ name: "", cuisine: "", address: "", image: "", rating: 0 });
  const [editingId, setEditingId] = useState(null);
  // Add state for image uploading
  const [uploading, setUploading] = useState(false);

  const fetchRestaurants = () => {
    fetch("https://hoomo-shop.onrender.com/api/restaurants")
      .then(res => res.json())
      .then(data => setRestaurants(data));
  };

  useEffect(() => { fetchRestaurants(); }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `https://hoomo-shop.onrender.com/api/admin/restaurants/${editingId}`
      : "https://hoomo-shop.onrender.com/api/admin/restaurants";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    setForm({ name: "", cuisine: "", address: "", image: "", rating: 0 });
    setEditingId(null);
    fetchRestaurants();
  };

  const handleEdit = item => {
    setForm({ ...item });
    setEditingId(item._id);
  };

  const handleDelete = async id => {
    await fetch(`https://hoomo-shop.onrender.com/api/admin/restaurants/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchRestaurants();
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

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow">
      <div className="text-2xl font-bold text-blue-700 mb-4">Manage Restaurants</div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-8 items-end">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="px-3 py-2 border rounded" required />
        <input name="cuisine" value={form.cuisine} onChange={handleChange} placeholder="Cuisine" className="px-3 py-2 border rounded" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="px-3 py-2 border rounded" required />
        <div className="flex flex-col">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-1" />
          {uploading && <span className="text-xs text-blue-500">Uploading...</span>}
          {form.image && <img src={form.image} alt="preview" className="w-16 h-16 object-cover rounded mb-1" />}
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (or upload above)" className="px-3 py-2 border rounded" />
        </div>
        <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" type="number" step="0.1" className="px-3 py-2 border rounded w-24" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", cuisine: "", address: "", image: "", rating: 0 }); }} className="ml-2 text-sm text-gray-500 underline">Cancel</button>}
      </form>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th className="py-2">Cuisine</th>
            <th className="py-2">Address</th>
            <th className="py-2">Image</th>
            <th className="py-2">Rating</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(item => (
            <tr key={item._id} className="border-b hover:bg-blue-50">
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.cuisine}</td>
              <td className="py-2">{item.address}</td>
              <td className="py-2"><img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" /></td>
              <td className="py-2">{item.rating}</td>
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