// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function OrderPage() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [cancelling, setCancelling] = useState(false);
//   const [updatingAvatar, setUpdatingAvatar] = useState(false);

//   useEffect(() => {
//     const userStr = localStorage.getItem("main_user");
//     if (!userStr) {
//       alert("❌ Bạn chưa đăng nhập!");
//       router.push("/main/login");
//       return;
//     }
//     const localUser = JSON.parse(userStr);
//     setUser(localUser);

//     const fetchOrders = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:8000/api/orders?user_id=${localUser.id}`
//         );
//         if (!res.ok) throw new Error("Không thể lấy đơn hàng");
//         const data = await res.json();
//         const ordersArray = Array.isArray(data) ? data : data.orders || [];

//         // Cập nhật đơn hàng thiếu thông tin
//         for (const order of ordersArray) {
//           if (!order.name || !order.address) {
//             await fetch(`http://localhost:8000/api/orders/${order.id}`, {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 name: localUser.name,
//                 email: localUser.email,
//                 phone: localUser.phone,
//                 address: localUser.address,
//               }),
//             }).catch(() =>
//               console.warn("⚠️ Không thể cập nhật thông tin cho đơn:", order.id)
//             );
//           }
//         }

//         setOrders(ordersArray);
//       } catch (err) {
//         console.error(err);
//         setMessage("❌ Không thể tải đơn hàng!");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [router]);

//   // const handleAvatarUpdate = async (event) => {
//   //   console.log("FormData:", file, user.id);

//   //   const file = event.target.files[0];
//   //   if (!file) return;
//   //   if (!file.type.startsWith("image/")) {
//   //     alert("❌ Vui lòng chọn file ảnh!");
//   //     return;
//   //   }
//   //   if (file.size > 2 * 1024 * 1024) {
//   //     alert("❌ File quá lớn! Tối đa 2MB.");
//   //     return;
//   //   }

//   //   setUpdatingAvatar(true);
//   //   const formData = new FormData();
//   //   formData.append("avatar", file);
//   //   formData.append("user_id", user.id);

//   //   try {
//   //     const res = await fetch(`http://localhost:8000/api/upload-avatar`, {
//   //       method: "POST",
//   //       body: formData,
//   //     });

//   //     if (!res.ok) throw new Error("Không thể cập nhật avatar");

//   //     const data = await res.json();
//   //     const updatedUser = { ...user, avatar: data.user.avatar };
//   //     localStorage.setItem("main_user", JSON.stringify(updatedUser));
//   //     setUser(updatedUser);
//   //     setMessage("✅ Avatar đã được cập nhật!");
//   //   } catch (err) {
//   //     console.error("❌ Lỗi cập nhật avatar:", err);
//   //     setMessage("❌ Lỗi cập nhật avatar!");
//   //   } finally {
//   //     setUpdatingAvatar(false);
//   //   }
//   // };
//   const handleAvatarUpdate = async (event) => {
//     const file = event.target.files[0]; // khai báo trước
//     console.log("FormData:", file, user?.id); // giờ mới gọi được

//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       alert("❌ Vui lòng chọn file ảnh!");
//       return;
//     }
//     if (file.size > 2 * 1024 * 1024) {
//       alert("❌ File quá lớn! Tối đa 2MB.");
//       return;
//     }

//     setUpdatingAvatar(true);
//     const formData = new FormData();
//     formData.append("avatar", file);
//     formData.append("user_id", user.id);

//     try {
//       const res = await fetch(`http://localhost:8000/api/upload-avatar`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Không thể cập nhật avatar");

//       const data = await res.json();
//       const updatedUser = { ...user, avatar: data.user.avatar };
//       localStorage.setItem("main_user", JSON.stringify(updatedUser));
//       setUser(updatedUser);
//       setMessage("✅ Avatar đã được cập nhật!");
//     } catch (err) {
//       console.error("❌ Lỗi cập nhật avatar:", err);
//       setMessage("❌ Lỗi cập nhật avatar!");
//     } finally {
//       setUpdatingAvatar(false);
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     if (cancelling) return;
//     setMessage("");

//     if (!confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;

//     setCancelling(true);
//     try {
//       const res = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!res.ok) throw new Error(`Lỗi API: ${res.status}`);

//       setOrders(orders.filter((o) => o.id !== orderId));
//       setMessage("✅ Đã hủy đơn hàng thành công!");
//     } catch (err) {
//       console.error("Cancel error:", err);
//       setMessage(`❌ ${err.message}`);
//     } finally {
//       setCancelling(false);
//     }
//   };

//   if (loading)
//     return <p className="text-center text-yellow-500 mt-10">⏳ Đang tải...</p>;
//   if (!user) return null;

//   return (
//     <div className="max-w-6xl mx-auto p-6 text-yellow-500">
//       {/* Thông tin người dùng */}
//       <div className="bg-black/80 border border-yellow-400 rounded-2xl p-5 mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             {user.avatar && (
//               <img
//                 src={`http://localhost:8000/${user.avatar}?t=${Date.now()}`}
//                 alt="Avatar"
//                 className="w-16 h-16 rounded-full border-2 border-yellow-400 mr-4"
//               />
//             )}
//             <h2 className="text-2xl font-semibold text-yellow-400">
//               Thông tin tài khoản
//             </h2>
//           </div>
//           <div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleAvatarUpdate}
//               className="hidden"
//               id="avatar-input"
//             />
//             <label
//               htmlFor="avatar-input"
//               className="px-3 py-1 text-sm bg-yellow-500 text-black rounded hover:bg-yellow-600 transition cursor-pointer disabled:opacity-50"
//             >
//               {updatingAvatar ? "⏳ Đang cập nhật..." : "📷 Cập nhật Avatar"}
//             </label>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white">
//           <p>
//             <span className="text-yellow-400">👤 Họ tên: </span>
//             {user.name || "Chưa có"}
//           </p>
//           <p>
//             <span className="text-yellow-400">📧 Email: </span>
//             {user.email || "Chưa có"}
//           </p>
//           <p>
//             <span className="text-yellow-400">📞 SĐT: </span>
//             {user.phone || "Chưa có"}
//           </p>
//           <p>
//             <span className="text-yellow-400">🏠 Địa chỉ: </span>
//             {user.address || "Chưa có"}
//           </p>
//         </div>
//       </div>

//       <h1 className="text-3xl font-bold text-center mb-8">
//         📦 Đơn hàng của bạn
//       </h1>
//       {message && <p className="text-center text-red-500 mb-4">{message}</p>}

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-300">Không có đơn hàng nào.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {orders.map((order) => {
//             let productsArray = [];
//             try {
//               productsArray = Array.isArray(order.products)
//                 ? order.products
//                 : JSON.parse(order.products || "[]");
//             } catch {}

//             return (
//               <div
//                 key={order.id}
//                 className="bg-white text-black rounded-2xl shadow-lg border border-yellow-400 p-5 flex flex-col justify-between hover:shadow-yellow-400/50 transition"
//               >
//                 <div>
//                   <h2 className="text-lg font-bold text-yellow-600 mb-2">
//                     Mã đơn: #{order.id}
//                   </h2>
//                   <p className="text-sm text-gray-700 mb-1">
//                     Ngày đặt:{" "}
//                     <span className="font-medium text-black">
//                       {new Date(order.created_at).toLocaleDateString("vi-VN")}
//                     </span>
//                   </p>
//                   <p className="text-sm text-gray-700 mb-1">
//                     Người nhận:{" "}
//                     <span className="font-semibold text-black">
//                       {order.name || user.name}
//                     </span>
//                   </p>
//                   <p className="text-sm text-gray-700 mb-1">
//                     Địa chỉ:{" "}
//                     <span className="font-medium">
//                       {order.address || user.address}
//                     </span>
//                   </p>
//                   <p className="text-sm text-gray-700 mb-2">
//                     Thanh toán:{" "}
//                     <span className="text-yellow-600 font-semibold">
//                       {order.payment_method || "COD"}
//                     </span>
//                   </p>
//                   <div className="mt-3">
//                     <span className="text-sm font-semibold text-gray-700">
//                       Sản phẩm:
//                     </span>
//                     {productsArray.length > 0 ? (
//                       <ul className="space-y-2 mt-2">
//                         {productsArray.map((p, idx) => (
//                           <li
//                             key={idx}
//                             className="flex items-center space-x-3 bg-gray-50 border border-gray-200 p-2 rounded"
//                           >
//                             {p.thumbnail && (
//                               <img
//                                 src={`http://localhost:8000/${p.thumbnail}`}
//                                 alt={p.name}
//                                 className="w-12 h-12 object-cover rounded"
//                               />
//                             )}
//                             <div>
//                               <p className="font-medium text-black">{p.name}</p>
//                               <p className="text-sm text-gray-600">
//                                 {p.quantity || 1} x{" "}
//                                 {Number(p.price).toLocaleString()} đ
//                               </p>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-sm text-gray-500 mt-1">
//                         Chưa có sản phẩm
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="mt-4 border-t border-yellow-300 pt-3">
//                   <p className="text-right font-bold text-yellow-600">
//                     Tổng hóa đơn:{" "}
//                     {Number(order.total_price || 0).toLocaleString()} đ
//                   </p>
//                   <p className="text-right text-sm text-gray-700 italic">
//                     {order.order_status || "Chờ xác nhận"}
//                   </p>
//                   <div className="flex justify-between mt-3">
//                     <button
//                       className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
//                       onClick={() => setSelectedOrder(order)}
//                     >
//                       Xem chi tiết
//                     </button>
//                     <button
//                       className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
//                       disabled={cancelling}
//                       onClick={() => cancelOrder(order.id)}
//                     >
//                       {cancelling ? "⏳ Đang hủy..." : "❌ Hủy đơn"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Modal chi tiết đơn hàng */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white text-black rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold text-yellow-600 mb-4">
//               Chi tiết đơn hàng #{selectedOrder.id}
//             </h2>
//             <div className="space-y-3">
//               <p>
//                 <strong>Ngày đặt:</strong>{" "}
//                 {new Date(selectedOrder.created_at).toLocaleDateString("vi-VN")}
//               </p>
//               <p>
//                 <strong>Người nhận:</strong> {selectedOrder.name || user.name}
//               </p>
//               <p>
//                 <strong>Email:</strong>{" "}
//                 {selectedOrder.customer_email || user.email}
//               </p>
//               <p>
//                 <strong>SĐT:</strong>{" "}
//                 {selectedOrder.customer_phone || user.phone}
//               </p>
//               <p>
//                 <strong>Địa chỉ:</strong>{" "}
//                 {selectedOrder.address || user.address}
//               </p>
//               <p>
//                 <strong>Thanh toán:</strong>{" "}
//                 {selectedOrder.payment_method || "COD"}
//               </p>
//               <p>
//                 <strong>Trạng thái:</strong>{" "}
//                 {selectedOrder.order_status || "Chờ xác nhận"}
//               </p>
//               <div>
//                 <strong>Sản phẩm:</strong>
//                 <ul className="mt-2 space-y-2">
//                   {(Array.isArray(selectedOrder.products)
//                     ? selectedOrder.products
//                     : JSON.parse(selectedOrder.products || "[]")
//                   ).map((p, idx) => (
//                     <li
//                       key={idx}
//                       className="flex items-center space-x-3 bg-gray-50 p-2 rounded"
//                     >
//                       {p.thumbnail && (
//                         <img
//                           src={`http://localhost:8000/${p.thumbnail}`}
//                           alt={p.name}
//                           className="w-12 h-12 object-cover rounded"
//                         />
//                       )}
//                       <div>
//                         <p className="font-medium">{p.name}</p>
//                         <p className="text-sm text-gray-600">
//                           {p.quantity || 1} x {Number(p.price).toLocaleString()}{" "}
//                           đ
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <p className="text-right font-bold text-yellow-600">
//                 Tổng hóa đơn:{" "}
//                 {Number(selectedOrder.total_price || 0).toLocaleString()} đ
//               </p>
//             </div>
//             <div className="mt-4 text-right">
//               <button
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                 onClick={() => setSelectedOrder(null)}
//               >
//                 Đóng
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [updatingAvatar, setUpdatingAvatar] = useState(false);
  const [editingInfo, setEditingInfo] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [updatingInfo, setUpdatingInfo] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("main_user");
    if (!userStr) {
      alert("❌ Bạn chưa đăng nhập!");
      router.push("/main/login");
      return;
    }
    const localUser = JSON.parse(userStr);
    setUser(localUser);
    setForm({
      name: localUser.name || "",
      email: localUser.email || "",
      phone: localUser.phone || "",
      address: localUser.address || "",
    });

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/orders?user_id=${localUser.id}`
        );
        if (!res.ok) throw new Error("Không thể lấy đơn hàng");
        const data = await res.json();
        const ordersArray = Array.isArray(data) ? data : data.orders || [];
        setOrders(ordersArray);
      } catch (err) {
        console.error(err);
        setMessage("❌ Không thể tải đơn hàng!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [router]);

  // Cập nhật avatar
  const handleAvatarUpdate = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("❌ Vui lòng chọn file ảnh!");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("❌ File quá lớn! Tối đa 2MB.");
      return;
    }

    setUpdatingAvatar(true);
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("user_id", user.id);

    try {
      const res = await fetch(`http://localhost:8000/api/upload-avatar`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Không thể cập nhật avatar");

      const data = await res.json();
      const updatedUser = { ...user, avatar: data.user.avatar };
      localStorage.setItem("main_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage("✅ Avatar đã được cập nhật!");
    } catch (err) {
      console.error("❌ Lỗi cập nhật avatar:", err);
      setMessage("❌ Lỗi cập nhật avatar!");
    } finally {
      setUpdatingAvatar(false);
    }
  };

  // Cập nhật thông tin người dùng
  const handleInfoUpdate = async (e) => {
    e.preventDefault();
    setUpdatingInfo(true);
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Không thể cập nhật thông tin!");

      const data = await res.json();
      const updatedUser = { ...user, ...form };
      localStorage.setItem("main_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditingInfo(false);
      setMessage("✅ Thông tin người dùng đã được cập nhật!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Lỗi khi cập nhật thông tin!");
    } finally {
      setUpdatingInfo(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (cancelling) return;
    setMessage("");

    if (!confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;

    setCancelling(true);
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`Lỗi API: ${res.status}`);

      setOrders(orders.filter((o) => o.id !== orderId));
      setMessage("✅ Đã hủy đơn hàng thành công!");
    } catch (err) {
      console.error("Cancel error:", err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setCancelling(false);
    }
  };

  if (loading)
    return <p className="text-center text-yellow-500 mt-10">⏳ Đang tải...</p>;
  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 text-yellow-500">
      {/* --- Thông tin người dùng --- */}
      <div className="bg-black/80 border border-yellow-400 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {user.avatar && (
              <img
                src={`http://localhost:8000/${user.avatar}?t=${Date.now()}`}
                alt="Avatar"
                className="w-16 h-16 rounded-full border-2 border-yellow-400 mr-4"
              />
            )}
            <h2 className="text-2xl font-semibold text-yellow-400">
              Thông tin tài khoản
            </h2>
          </div>
          <div className="space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpdate}
              className="hidden"
              id="avatar-input"
            />
            <label
              htmlFor="avatar-input"
              className="px-3 py-1 text-sm bg-yellow-500 text-black rounded hover:bg-yellow-600 transition cursor-pointer disabled:opacity-50"
            >
              {updatingAvatar ? "⏳ Đang cập nhật..." : "📷 Cập nhật Avatar"}
            </label>
            <button
              onClick={() => setEditingInfo(!editingInfo)}
              className="px-3 py-1 text-sm bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
            >
              {editingInfo ? "✖️ Hủy" : "📝 Cập nhật thông tin"}
            </button>
          </div>
        </div>

        {!editingInfo ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white">
            <p>
              <span className="text-yellow-400">👤 Họ tên: </span>
              {user.name || "Chưa có"}
            </p>
            <p>
              <span className="text-yellow-400">📧 Email: </span>
              {user.email || "Chưa có"}
            </p>
            <p>
              <span className="text-yellow-400">📞 SĐT: </span>
              {user.phone || "Chưa có"}
            </p>
            <p>
              <span className="text-yellow-400">🏠 Địa chỉ: </span>
              {user.address || "Chưa có"}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleInfoUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 text-black mt-3"
          >
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Họ tên"
              className="text-white p-2 rounded border border-yellow-400"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="text-white p-2 rounded border border-yellow-400"
            />
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Số điện thoại"
              className=" text-white p-2 rounded border border-yellow-400"
            />
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Địa chỉ"
              className=" text-white p-2 rounded border border-yellow-400"
            />
            <div className="col-span-2 text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition disabled:opacity-50"
                disabled={updatingInfo}
              >
                {updatingInfo ? "⏳ Đang lưu..." : "💾 Lưu thay đổi"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* --- Danh sách đơn hàng --- */}
      <h1 className="text-3xl font-bold text-center mb-8">
        📦 Đơn hàng của bạn
      </h1>

      {message && <p className="text-center text-red-500 mb-4">{message}</p>}

      {orders.length === 0 ? (
        <p className="text-center text-white">Không có đơn hàng nào.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-black/70 border border-yellow-400 rounded-xl p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>🆔 Mã đơn: {order.id}</p>
                  <p>💰 Tổng: {order.total_price} VNĐ</p>
                  <p>📅 Trạng thái: {order.order_status}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
                  >
                    🔍 Xem chi tiết
                  </button>
                  {order.order_status !== "cancelled" && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      disabled={cancelling}
                    >
                      ❌ Hủy
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Chi tiết đơn hàng --- */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-gray-900 border border-yellow-400 rounded-2xl p-6 w-11/12 md:w-1/2 text-yellow-400">
            <h2 className="text-2xl font-bold mb-4">
              📦 Chi tiết đơn #{selectedOrder.id}
            </h2>
            <p>👤 Khách hàng: {selectedOrder.name}</p>
            <p>📧 Email: {selectedOrder.email}</p>
            <p>📞 SĐT: {selectedOrder.phone}</p>
            <p>🏠 Địa chỉ: {selectedOrder.address}</p>
            <p>💰 Tổng tiền: {selectedOrder.total_price} VNĐ</p>
            <p>📅 Trạng thái: {selectedOrder.order_status}</p>

            <h3 className="text-xl mt-4 mb-2">🛒 Sản phẩm:</h3>
            <ul className="list-disc pl-5 text-white">
              {selectedOrder.products?.map((p, i) => (
                <li key={i}>
                  {p.name} - {p.quantity} x {p.price} VNĐ
                </li>
              ))}
            </ul>

            <div className="text-right mt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
              >
                ✖️ Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
