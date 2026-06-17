"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterAdminPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    address: "",
    password: "",
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
      const res = await fetch("http://127.0.0.1:8000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "❌ Có lỗi xảy ra");
      } else {
        setMessage("✅ Đăng ký admin thành công!");
        setTimeout(() => router.push("/admin/athen/login"), 1500);
      }
    } catch (err) {
      setMessage("❌ Lỗi server: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white">Đăng ký Admin</h2>
          <p className="text-gray-400 mt-2">
            Tạo tài khoản quản trị để truy cập bảng điều khiển
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 text-center font-semibold px-3 py-2 rounded ${
              message.startsWith("✅")
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập (tùy chọn)"
            value={form.username}
            onChange={handleChange}
            className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={handleChange}
            className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={form.address}
            onChange={handleChange}
            className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-bold py-3 rounded-lg transition"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký Admin"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Đã có tài khoản?{" "}
          <a
            href="/admin/athen/login"
            className="text-yellow-400 hover:underline"
          >
            Đăng nhập ngay
          </a>
        </div>
      </div>
    </div>
  );
}
