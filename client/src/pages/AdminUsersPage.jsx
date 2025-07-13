import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminUsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [token]);
  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow">
      <div className="text-2xl font-bold text-blue-700 mb-4">All Users</div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b hover:bg-blue-50">
              <td className="py-2">{u.name}</td>
              <td className="py-2">{u.email}</td>
              <td className="py-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 