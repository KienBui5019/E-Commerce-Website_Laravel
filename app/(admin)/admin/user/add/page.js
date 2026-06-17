"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    address: "",
    roles: "customer",
    password: "", // thêm trường password
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/admin/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "❌ Có lỗi xảy ra");
      } else {
        setMessage("✅ Thêm người dùng thành công!");
        setTimeout(() => router.push("/admin/user"), 1500);
      }
    } catch (err) {
      setMessage("❌ Lỗi server: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Thêm người dùng
        </h2>

        {message && (
          <p
            className={`mb-4 text-center font-semibold ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập (tùy chọn)"
            value={form.username}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={form.address}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400"
            required
          />
          <select
            name="roles"
            value={form.roles}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
          >
            {loading ? "Đang thêm..." : "Thêm người dùng"}
          </button>
        </form>
      </div>
    </div>
  );
}
