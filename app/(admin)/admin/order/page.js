// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function OrderPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:8000/api/orders?all=true");
//       if (!res.ok) throw new Error("Không thể tải danh sách đơn hàng");
//       const data = await res.json();
//       setOrders(data.orders || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const res = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ order_status: newStatus }),
//       });
//       if (!res.ok) throw new Error("Cập nhật trạng thái thất bại");
//       // Cập nhật local state luôn
//       setOrders((prev) =>
//         prev.map((o) =>
//           o.id === orderId ? { ...o, order_status: newStatus } : o
//         )
//       );
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
//         Quản lý Đơn hàng
//       </h1>

//       {loading && <p className="text-gray-600 text-center">Đang tải...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {orders.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300 bg-white shadow-md rounded">
//             <thead className="bg-yellow-500 text-black">
//               <tr>
//                 <th className="px-4 py-2 border">ID</th>
//                 <th className="px-4 py-2 border">Ngày tạo</th>
//                 <th className="px-4 py-2 border">Tổng tiền</th>
//                 <th className="px-4 py-2 border">Trạng thái</th>
//                 <th className="px-4 py-2 border">Sản phẩm</th>
//                 <th className="px-4 py-2 border">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr
//                   key={order.id}
//                   className="text-black text-center hover:bg-gray-50"
//                 >
//                   <td className="px-4 py-2 border">{order.id}</td>
//                   <td className="px-4 py-2 border">
//                     {new Date(order.created_at).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {Number(order.total_price).toLocaleString()} đ
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select
//                       value={order.order_status}
//                       onChange={(e) =>
//                         handleStatusChange(order.id, e.target.value)
//                       }
//                       className="border rounded px-2 py-1"
//                     >
//                       <option value="pending">⏳ Chờ xử lý</option>
//                       <option value="processing">🔧 Đang xử lý</option>
//                       <option value="completed">✅ Hoàn thành</option>
//                       <option value="cancelled">❌ Đã hủy</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {Array.isArray(order.products) &&
//                     order.products.length > 0 ? (
//                       <div className="flex flex-col gap-2">
//                         {order.products.map((p, idx) => (
//                           <div
//                             key={idx}
//                             className="flex items-center gap-3 border-b pb-2 last:border-none"
//                           >
//                             {/* Ảnh sản phẩm */}
//                             {/* <img
//                               src={
//                                 p.thumbnail_url
//                                   ? p.thumbnail_url
//                                   : "http://localhost:8000/image/product/no-image.jpg"
//                               }
//                               alt={p.name}
//                               style={{
//                                 width: "80px",
//                                 height: "80px",
//                                 objectFit: "cover",
//                                 borderRadius: "8px",
//                               }}
//                             /> */}

//                             {/* Thông tin sản phẩm */}
//                             <div className="flex-1 text-left">
//                               <p className="font-medium">{p.name}</p>
//                               <p className="text-sm text-gray-600">
//                                 Giá: {(p.salePrice || p.price).toLocaleString()}{" "}
//                                 đ
//                               </p>
//                               <p className="text-sm text-gray-600">
//                                 Số lượng: {p.quantity} ×{" "}
//                                 {(p.salePrice || p.price).toLocaleString()} đ
//                               </p>
//                             </div>

//                             {/* Thành tiền */}
//                             <p className="font-semibold text-right">
//                               {(
//                                 (p.salePrice || p.price) * (p.quantity || 1)
//                               ).toLocaleString()}{" "}
//                               đ
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-500">Chưa có sản phẩm</p>
//                     )}
//                   </td>

//                   <td className="px-4 py-2 border space-x-2">
//                     <Link
//                       href={`/admin/order/detail/${order.id}`}
//                       className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                     >
//                       🔍 Xem
//                     </Link>
//                     <Link
//                       href={`/admin/order/edit/${order.id}`}
//                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       ✏️ Sửa
//                     </Link>
//                     <Link
//                       href={`/admin/order/delete/${order.id}`}
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       🗑 Xóa
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         !loading && (
//           <p className="text-gray-500 text-center">Không có đơn hàng</p>
//         )
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/orders?all=true");
      if (!res.ok) throw new Error("Không thể tải danh sách đơn hàng");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_status: newStatus }),
      });
      if (!res.ok) throw new Error("Cập nhật trạng thái thất bại");
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, order_status: newStatus } : o
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Bộ lọc + tìm kiếm
  const filteredOrders = orders.filter((order) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      (order.name && order.name.toLowerCase().includes(searchTerm)) ||
      (order.email && order.email.toLowerCase().includes(searchTerm)) ||
      (order.order_status &&
        order.order_status.toLowerCase().includes(searchTerm));

    const matchesFilter =
      filter === "all" ? true : order.order_status === filter;

    return matchesSearch && matchesFilter;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
        Quản lý Đơn hàng
      </h1>

      {/* Thanh tìm kiếm & lọc */}
      <div className="text-black-900 flex flex-wrap justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="🔍 Tìm theo ID, tên, email hoặc trạng thái..."
          className="text-black border p-2 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className=" text-black border p-2 rounded w-full md:w-1/4"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="Chưa xác thực">⏳ Chờ xử lý</option>
          <option value="Đang xử lý">🔧 Đang xử lý</option>
          <option value="Đã giao">✅ Hoàn thành</option>
          <option value="Đã hủy">❌ Đã hủy</option>
        </select>
      </div>

      {loading && <p className="text-gray-600 text-center">Đang tải...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {paginatedOrders.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 bg-white shadow-md rounded">
              <thead className="bg-yellow-500 text-black">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Ngày tạo</th>
                  <th className="px-4 py-2 border">Tổng tiền</th>
                  <th className="px-4 py-2 border">Trạng thái</th>
                  <th className="px-4 py-2 border">Sản phẩm</th>
                  <th className="px-4 py-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="text-black text-center hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 border">{order.id}</td>
                    <td className="px-4 py-2 border">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">
                      {Number(order.total_price).toLocaleString()} đ
                    </td>
                    <td className="px-4 py-2 border">
                      <select
                        value={order.order_status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="Chưa xác thực">⏳ Chờ xử lý</option>
                        <option value="Đang xử lý">🔧 Đang xử lý</option>
                        <option value="Đã giao">✅ Hoàn thành</option>
                        <option value="Đã hủy">❌ Đã hủy</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border">
                      {Array.isArray(order.products) &&
                      order.products.length > 0 ? (
                        <ul className="text-left text-sm">
                          {order.products.map((p, idx) => (
                            <li key={idx}>
                              {p.name} × {p.quantity} (
                              {p.price.toLocaleString()}đ)
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">Không có sản phẩm</p>
                      )}
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <Link
                        href={`/admin/order/detail/${order.id}`}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        🔍 Xem
                      </Link>
                      <Link
                        href={`/admin/order/edit/${order.id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        ✏️ Sửa
                      </Link>
                      <Link
                        href={`/admin/order/delete/${order.id}`}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        🗑 Xóa
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          <div className="text-black flex justify-center items-center mt-4 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              ← Trước
            </button>
            <span>
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Sau →
            </button>
          </div>
        </>
      ) : (
        !loading && (
          <p className="text-gray-500 text-center">Không có đơn hàng</p>
        )
      )}
    </div>
  );
}
