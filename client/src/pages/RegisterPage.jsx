import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await register(name, email, password);
    setLoading(false);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4">
        <div className="text-2xl font-bold text-center text-blue-700 mb-2">Register for Hoomo</div>
        {error && <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2 font-semibold hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="text-center text-sm mt-2">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
} 