"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/orders/${id}`);
      if (!res.ok) throw new Error("Không thể lấy chi tiết đơn hàng");
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!order) return;
    try {
      setStatusLoading(true);
      const res = await fetch(`http://localhost:8000/api/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_status: newStatus }),
      });
      if (!res.ok) throw new Error("Cập nhật trạng thái thất bại");
      setOrder((prev) => ({ ...prev, order_status: newStatus }));
      alert("✅ Cập nhật trạng thái thành công");
    } catch (err) {
      alert(err.message);
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading)
    return <p className="text-center mt-6">Đang tải chi tiết đơn hàng...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!order)
    return <p className="text-center mt-6">Không tìm thấy đơn hàng</p>;

  return (
    <div className=" text-black max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Chi tiết đơn hàng #{order.id}
      </h1>

      <div className="text-black mb-6 border p-4 rounded shadow bg-white">
        <h2 className="font-semibold mb-2">Thông tin khách hàng</h2>
        <p>Họ tên: {order.name}</p>
        <p>Email: {order.email}</p>
        <p>Điện thoại: {order.phone}</p>
        <p>Địa chỉ: {order.address}</p>
        <p>
          Trạng thái:{" "}
          <select
            value={order.order_status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={statusLoading}
            className="border rounded px-2 py-1"
          >
            <option value="Chưa xác thực">⏳ Chờ xử lý</option>
            <option value="Đang xử lý">🔧 Đang xử lý</option>
            <option value="Đã giao">✅ Hoàn thành</option>
            <option value="Đã hủy">❌ Đã hủy</option>
          </select>
        </p>
      </div>

      <div className="border p-4 rounded shadow bg-white">
        <h2 className="font-semibold mb-2">Sản phẩm</h2>
        {Array.isArray(order.products) && order.products.length > 0 ? (
          <table className="w-full border-collapse">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="border px-3 py-1">Tên sản phẩm</th>
                <th className="border px-3 py-1">Giá</th>
                <th className="border px-3 py-1">Số lượng</th>
                <th className="border px-3 py-1">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((p, idx) => (
                <tr key={idx} className="text-center hover:bg-gray-50">
                  <td className="border px-3 py-1 text-left">{p.name}</td>
                  <td className="border px-3 py-1">
                    {(p.salePrice || p.price).toLocaleString()} đ
                  </td>
                  <td className="border px-3 py-1">{p.quantity}</td>
                  <td className="border px-3 py-1">
                    {((p.salePrice || p.price) * p.quantity).toLocaleString()} đ
                  </td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td colSpan={3} className="border px-3 py-1 text-right">
                  Tổng thanh toán
                </td>
                <td className="border px-3 py-1">
                  {Number(order.total_price).toLocaleString()} đ
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Không có sản phẩm</p>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => router.push("/admin/order")}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          ← Quay về
        </button>
      </div>
    </div>
  );
}
