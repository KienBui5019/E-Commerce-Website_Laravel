"use client";
import { useEffect, useState } from "react";
import OrderDetailModal from "../orderdetail/page";
import { useRouter } from "next/navigation";

export default function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
 const [checkingAdmin, setCheckingAdmin] = useState(true);
   const router = useRouter();


  useEffect(() => {
    const userAdmin = localStorage.getItem("userad");
    if (!userAdmin) {
      router.push("/admin/login"); // chuyển ngay
    } else {
      setCheckingAdmin(false); // có quyền -> render tiếp
    }
  }, [router]);
  const fetchOrders = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/order?page=${page}&search=${search}`
    );
    const data = await res.json();
    setOrders(data.data);
    setLastPage(data.last_page);
  };

  useEffect(() => {
    if (!checkingAdmin) fetchOrders();
  }, [page, search,checkingAdmin]);
if (checkingAdmin) {
    // ✅ Render null hoặc loading trong lúc kiểm tra
    return null;
  }
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa đơn hàng này?")) return;
    await fetch(`http://127.0.0.1:8000/api/order/${id}`, { method: "DELETE" });
    fetchOrders();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Quản lý đơn hàng</h1>

      {/* Search */}
        <input
          type="text"
          placeholder="🔍 Tìm kiếm sản phẩm..."
          className="border px-4 py-2 rounded-lg shadow w-1/3 focus:ring focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      {/* Danh sách đơn hàng dạng card */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {orders.map((o) => (
    <div
      key={o.id}
      className="relative bg-gradient-to-r from-gray-100 to-gray-200 border rounded-xl shadow p-4"
    >
      {/* Header trạng thái */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs px-2 py-1 rounded ${
            o.status === 1
              ? "bg-green-500 text-white"
              : o.status === 2
              ? "bg-yellow-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {o.status === 1
            ? "Mới"
            : o.status === 2
            ? "Đang xử lý"
            : "Hoàn tất"}
        </span>
      </div>

      {/* Nội dung đơn hàng */}
      <div className="text-sm space-y-1">
        <p>
          <span className="font-bold">Mã đơn:</span> {o.id}
        </p>
        <p>
          <span className="font-bold">Khách hàng:</span> {o.name}
        </p>
        <p>
          <span className="font-bold">Email:</span> {o.email}
        </p>
        <p>
          <span className="font-bold">Điện thoại:</span> {o.phone}
        </p>
        <p>
          <span className="font-bold">Ghi chú:</span> {o.note}
        </p>
        <p>
          <span className="font-bold">Ngày tạo:</span>{" "}
          {new Date(o.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Nút hành động */}
      <div className="flex justify-end gap-2 mt-3">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setSelectedOrder(o.id)}
        >
          Xem
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => handleDelete(o.id)}
        >
          Xóa
        </button>
      </div>
    </div>
  ))}
</div>

      {/* <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.email}</td>
              <td>{o.phone}</td>
              <td>
                {o.status === 1 ? "Mới" : o.status === 2 ? "Đang xử lý" : "Hoàn tất"}
              </td>
              <td>{new Date(o.created_at).toLocaleDateString()}</td>
              <td className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => setSelectedOrder(o.id)}
                >
                  Xem
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(o.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* Phân trang */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: lastPage }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <OrderDetailModal
          orderId={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
