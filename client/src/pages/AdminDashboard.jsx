import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow">
      <div className="text-2xl font-bold text-blue-700 mb-4">Welcome, {user?.name || "Admin"}!</div>
      <div className="mb-6 text-gray-600">This is your admin dashboard. Use the links below to manage the platform.</div>
      <div className="flex flex-col gap-4">
        <Link to="/admin/products" className="px-4 py-3 bg-blue-100 rounded-lg text-blue-700 font-semibold hover:bg-blue-200">Manage Products</Link>
        <Link to="/admin/users" className="px-4 py-3 bg-green-100 rounded-lg text-green-700 font-semibold hover:bg-green-200">View Users</Link>
        <Link to="/admin/orders" className="px-4 py-3 bg-yellow-100 rounded-lg text-yellow-700 font-semibold hover:bg-yellow-200">View Orders</Link>
      </div>
    </div>
  );
} 