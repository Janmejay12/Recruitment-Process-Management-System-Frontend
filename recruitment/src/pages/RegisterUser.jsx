import { useState } from "react";
import api from "../api/axios";
import Layout from "../components/common/Layout";

const RegisterUser = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const roles = ["Recruiter", "HR", "Interviewer", "Reviewer", "Viewer"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/auth/admin-register", form);

      setMessage("User registered successfully");
      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Layout>
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Register New User</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full border p-2 rounded"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full border p-2 rounded"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register User
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default RegisterUser;
