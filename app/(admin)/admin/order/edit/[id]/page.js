"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditOrderPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    order_status: "Chưa xác thực",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/orders/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy đơn hàng");
        const data = await res.json();
        setOrder(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          order_status: data.order_status || "Chưa xác thực",
        });
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      router.push(`/admin/order/detail/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (!order) return <p>Không tìm thấy đơn hàng</p>;

  return (
    <div className="text-black p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sửa đơn hàng #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Tên khách"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Email"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Số điện thoại"
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Địa chỉ"
        />
        <select
          name="order_status"
          value={form.order_status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Chưa xác thực">Chưa xác thực</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đã giao">Đã giao</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
        <button
          type="submit"
          className="w-full bg-yellow-400 py-2 rounded font-medium hover:bg-black hover:text-yellow-400 transition"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
