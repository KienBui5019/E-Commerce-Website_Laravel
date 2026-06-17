"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    address: "",
    roles: "customer",
    password: "", // để trống nếu không muốn đổi
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Lấy dữ liệu user để điền form
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/user/${userId}`);
        if (!res.ok) throw new Error("Không thể lấy thông tin người dùng");
        const data = await res.json();
        setForm({
          name: data.name || "",
          email: data.email || "",
          username: data.username || "",
          phone: data.phone || "",
          address: data.address || "",
          roles: data.roles || "customer",
          password: "", // trống mặc định
        });
      } catch (err) {
        setMessage("❌ " + err.message);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:8000/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "❌ Có lỗi xảy ra");
      } else {
        setMessage("✅ Cập nhật người dùng thành công!");
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
          Sửa người dùng
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
            placeholder="Tên đăng nhập"
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
          <select
            name="roles"
            value={form.roles}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu mới (để trống nếu không đổi)"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật người dùng"}
          </button>
        </form>
      </div>
    </div>
  );
}
