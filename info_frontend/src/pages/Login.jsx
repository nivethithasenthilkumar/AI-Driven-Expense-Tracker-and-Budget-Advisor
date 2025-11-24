import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../utils/auth";
import "../index.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", form);
      if (res.data.token) {
        saveAuth(res.data.token, res.data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Check credentials"));
    }
  };

  return (
    <div className="auth-bg flex items-center justify-center min-h-screen">
      <div className="glass-box w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="btn-accent w-full py-2">Login</button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-purple-600 font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
