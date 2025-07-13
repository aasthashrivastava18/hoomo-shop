import React from "react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ image: user?.image || "" });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('http://localhost:8080/api/upload/image', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setForm(f => ({ ...f, image: data.imageUrl }));
    setUploading(false);
    // TODO: Optionally, send PATCH/PUT to update user profile image in backend
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8080/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ image: form.image }),
    });
    if (res.ok) setSuccess(true);
    setSaving(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow">
      <div className="text-2xl font-bold text-blue-700 mb-4">Your Profile</div>
      {form.image && <img src={form.image} alt="profile" className="w-16 h-16 object-cover rounded mb-2" />}
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
      {uploading && <span className="text-xs text-blue-500">Uploading...</span>}
      {success && <div className="text-green-600 text-sm mb-2">Profile updated!</div>}
      <button onClick={handleSave} disabled={saving} className="w-full bg-green-500 text-white rounded py-2 font-semibold hover:bg-green-600 transition mb-4">{saving ? 'Saving...' : 'Save'}</button>
      <div className="mb-2"><span className="font-semibold">Name:</span> {user?.name}</div>
      <div className="mb-2"><span className="font-semibold">Email:</span> {user?.email}</div>
      <button onClick={logout} className="mt-6 w-full bg-blue-500 text-white rounded py-2 font-semibold hover:bg-blue-600 transition">Logout</button>
    </div>
  );
} 