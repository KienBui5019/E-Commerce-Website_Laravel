// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";

// // export default function CartPage() {
// //   const [cart, setCart] = useState([]);
// //   const router = useRouter();

// //   // Load giỏ hàng từ localStorage
// //   useEffect(() => {
// //     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

// //     // Chuẩn hóa dữ liệu: luôn có price, salePrice, thumbnail
// //     const normalizedCart = storedCart.map((item) => ({
// //       id: item.id,
// //       name: item.name || "Sản phẩm",
// //       price: item.price || item.price_buy || 0,
// //       salePrice: item.salePrice || item.sale_price || 0,
// //       thumbnail: item.thumbnail || item.thumbnail_url || "/images/no-image.png",
// //       quantity: item.quantity || 1,
// //     }));

// //     setCart(normalizedCart);
// //   }, []);

// //   // Cập nhật số lượng
// //   const updateQuantity = (id, quantity) => {
// //     if (quantity < 1) return;
// //     const updatedCart = cart.map((item) =>
// //       item.id === id ? { ...item, quantity } : item
// //     );
// //     setCart(updatedCart);
// //     localStorage.setItem("cart", JSON.stringify(updatedCart));
// //   };

// //   // Xóa sản phẩm
// //   const removeItem = (id) => {
// //     const updatedCart = cart.filter((item) => item.id !== id);
// //     setCart(updatedCart);
// //     localStorage.setItem("cart", JSON.stringify(updatedCart));
// //   };

// //   // Tính tổng tiền
// //   const totalPrice = cart.reduce(
// //     (sum, item) =>
// //       sum + (item.salePrice || item.price || 0) * (item.quantity || 1),
// //     0
// //   );

// //   // Xử lý khi thanh toán
// //   const handleCheckout = () => {
// //     const user = localStorage.getItem("main_user");
// //     if (!user) {
// //       alert("❌ Bạn cần đăng nhập trước khi thanh toán!");
// //       router.push("/main/login");
// //     } else {
// //       router.push("/main/checkout");
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       <h1 className="text-2xl font-bold mb-6 text-center">Giỏ hàng</h1>

// //       {cart.length === 0 ? (
// //         <p className="text-center text-gray-500">🛒 Chưa chọn mua sản phẩm</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {cart.map((item) => (
// //             <div
// //               key={item.id}
// //               className="flex justify-between items-center border p-4 rounded-lg bg-white shadow"
// //             >
// //               <div className="flex items-center gap-4">
// //                 <img
// //                   src={item.thumbnail}
// //                   alt={item.name}
// //                   className="w-20 h-20 object-cover rounded"
// //                 />
// //                 <div>
// //                   <h2 className="text-gray-900 font-semibold">{item.name}</h2>
// //                   <p className="text-sm text-gray-600">
// //                     Giá: {(item.salePrice || item.price || 0).toLocaleString()}{" "}
// //                     đ
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex items-center gap-2">
// //                 <button
// //                   onClick={() =>
// //                     updateQuantity(item.id, (item.quantity || 1) - 1)
// //                   }
// //                   className="text-gray-900 px-2 py-1 border rounded"
// //                 >
// //                   -
// //                 </button>
// //                 <span className="text-gray-900 px-2 py-1  rounded">
// //                   {" "}
// //                   {item.quantity || 1}
// //                 </span>
// //                 <button
// //                   onClick={() =>
// //                     updateQuantity(item.id, (item.quantity || 1) + 1)
// //                   }
// //                   className="text-gray-900 px-2 py-1 border rounded"
// //                 >
// //                   +
// //                 </button>
// //               </div>

// //               <div className=" text-gray-900 text-right">
// //                 <p className="text-gray-900 font-bold">
// //                   {(
// //                     (item.salePrice || item.price || 0) * (item.quantity || 1)
// //                   ).toLocaleString()}{" "}
// //                   đ
// //                 </p>
// //                 <button
// //                   onClick={() => removeItem(item.id)}
// //                   className="text-red-500 text-sm hover:underline"
// //                 >
// //                   Xóa
// //                 </button>
// //               </div>
// //             </div>
// //           ))}

// //           {/* Tổng tiền */}
// //           <div className="text-right font-semibold text-lg mt-4">
// //             Tổng cộng: {totalPrice.toLocaleString()} đ
// //           </div>

// //           {/* Nút thanh toán */}
// //           <div className="text-black mt-4">
// //             <button
// //               onClick={handleCheckout}
// //               className="bg-yellow-400 px-6 py-2 rounded hover:bg-white hover:text-yellow-400 transition"
// //             >
// //               Thanh toán
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";

// // // export default function CartPage() {
// // //   const [cart, setCart] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [message, setMessage] = useState("");
// // //   const router = useRouter();

// // //   // Load giỏ hàng từ localStorage
// // //   useEffect(() => {
// // //     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
// // //     const normalizedCart = storedCart.map((item) => ({
// // //       id: item.id,
// // //       name: item.name || "Sản phẩm",
// // //       price: item.price || item.price_buy || 0,
// // //       salePrice: item.salePrice || item.sale_price || 0,
// // //       thumbnail: item.thumbnail || item.thumbnail_url || "/images/no-image.png",
// // //       quantity: item.quantity || 1,
// // //     }));
// // //     setCart(normalizedCart);
// // //   }, []);

// // //   // Cập nhật số lượng
// // //   const updateQuantity = (id, quantity) => {
// // //     if (quantity < 1) return;
// // //     const updatedCart = cart.map((item) =>
// // //       item.id === id ? { ...item, quantity } : item
// // //     );
// // //     setCart(updatedCart);
// // //     localStorage.setItem("cart", JSON.stringify(updatedCart));
// // //   };

// // //   // Xóa sản phẩm
// // //   const removeItem = (id) => {
// // //     const updatedCart = cart.filter((item) => item.id !== id);
// // //     setCart(updatedCart);
// // //     localStorage.setItem("cart", JSON.stringify(updatedCart));
// // //   };

// // //   // Tính tổng tiền
// // //   const totalPrice = cart.reduce(
// // //     (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
// // //     0
// // //   );

// // //   // Tạo đơn hàng
// // //   const handleCheckout = async () => {
// // //     const userStr = localStorage.getItem("main_user");
// // //     if (!userStr) {
// // //       alert("❌ Bạn cần đăng nhập trước khi thanh toán!");
// // //       router.push("/main/login");
// // //       return;
// // //     }

// // //     try {
// // //       const user = JSON.parse(userStr);
// // //       //if (!user.token) throw new Error("User không có token");

// // //       setLoading(true);
// // //       setMessage("");

// // //       const res = await fetch("http://localhost:8000/api/orders", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           // Authorization: `Bearer ${user.token}`,
// // //         },
// // //         body: JSON.stringify({
// // //           name: user.name || "Khách hàng",
// // //           email: user.email || "",
// // //           phone: user.phone || "",
// // //           address: user.address || "",
// // //           note: "",
// // //           products: cart.map((i) => ({
// // //             id: i.id,
// // //             name: i.name,
// // //             price: i.price,
// // //             salePrice: i.salePrice,
// // //             quantity: i.quantity,
// // //           })),
// // //           total_price: totalPrice,
// // //         }),
// // //       });

// // //       if (!res.ok) throw new Error("Không thể tạo đơn hàng");

// // //       const data = await res.json();
// // //       console.log("✅ Đơn hàng tạo thành công:", data);

// // //       // Xóa giỏ hàng sau khi thanh toán
// // //       localStorage.removeItem("cart");
// // //       setCart([]);
// // //       setMessage("✅ Đơn hàng đã được tạo thành công!");
// // //       router.push("/main/orders"); // Chuyển tới trang danh sách đơn hàng
// // //     } catch (err) {
// // //       console.error("❌ Lỗi khi tạo đơn hàng:", err);
// // //       setMessage("❌ Lỗi khi tạo đơn hàng! Vui lòng thử lại.");
// // //       localStorage.removeItem("main_user"); // Xoá user nếu token không hợp lệ
// // //       router.push("/main/login");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-4xl mx-auto p-6">
// // //       <h1 className="text-2xl font-bold mb-6 text-center">Giỏ hàng</h1>

// // //       {cart.length === 0 ? (
// // //         <p className="text-center text-gray-500">🛒 Chưa chọn mua sản phẩm</p>
// // //       ) : (
// // //         <div className="space-y-4">
// // //           {cart.map((item) => (
// // //             <div
// // //               key={item.id}
// // //               className="flex justify-between items-center border p-4 rounded-lg bg-white shadow"
// // //             >
// // //               <div className="flex items-center gap-4">
// // //                 <img
// // //                   src={item.thumbnail}
// // //                   alt={item.name}
// // //                   className="w-20 h-20 object-cover rounded"
// // //                 />
// // //                 <div>
// // //                   <h2 className="text-gray-900 font-semibold">{item.name}</h2>
// // //                   <p className="text-sm text-gray-600">
// // //                     Giá: {(item.salePrice || item.price).toLocaleString()} đ
// // //                   </p>
// // //                 </div>
// // //               </div>

// // //               <div className="flex items-center gap-2">
// // //                 <button
// // //                   onClick={() =>
// // //                     updateQuantity(item.id, (item.quantity || 1) - 1)
// // //                   }
// // //                   className="text-gray-900 px-2 py-1 border rounded"
// // //                 >
// // //                   -
// // //                 </button>
// // //                 <span className="text-gray-900 px-2 py-1 rounded">
// // //                   {item.quantity || 1}
// // //                 </span>
// // //                 <button
// // //                   onClick={() =>
// // //                     updateQuantity(item.id, (item.quantity || 1) + 1)
// // //                   }
// // //                   className="text-gray-900 px-2 py-1 border rounded"
// // //                 >
// // //                   +
// // //                 </button>
// // //               </div>

// // //               <div className="text-gray-900 text-right">
// // //                 <p className="text-gray-900 font-bold">
// // //                   {(
// // //                     (item.salePrice || item.price) * (item.quantity || 1)
// // //                   ).toLocaleString()}{" "}
// // //                   đ
// // //                 </p>
// // //                 <button
// // //                   onClick={() => removeItem(item.id)}
// // //                   className="text-red-500 text-sm hover:underline"
// // //                 >
// // //                   Xóa
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}

// // //           {/* Tổng tiền */}
// // //           <div className="text-right font-semibold text-lg mt-4">
// // //             Tổng cộng: {totalPrice.toLocaleString()} đ
// // //           </div>

// // //           {/* Nút thanh toán */}
// // //           <div className="text-black mt-4">
// // //             <button
// // //               onClick={handleCheckout}
// // //               className="bg-yellow-400 px-6 py-2 rounded hover:bg-white hover:text-yellow-400 transition"
// // //               disabled={loading}
// // //             >
// // //               {loading ? "Đang xử lý..." : "Thanh toán"}
// // //             </button>
// // //           </div>

// // //           {message && <p className="mt-4 text-center">{message}</p>}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";

// // // export default function CartPage() {
// // //   const [cart, setCart] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [message, setMessage] = useState("");
// // //   const router = useRouter();

// // //   // Load giỏ hàng từ localStorage
// // //   useEffect(() => {
// // //     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
// // //     const normalizedCart = storedCart.map((item) => ({
// // //       id: item.id,
// // //       name: item.name || "Sản phẩm",
// // //       price: item.price || item.price_buy || 0,
// // //       salePrice: item.salePrice || item.sale_price || 0,
// // //       thumbnail: item.thumbnail || item.thumbnail_url || "/images/no-image.png",
// // //       quantity: item.quantity || 1,
// // //     }));
// // //     setCart(normalizedCart);
// // //   }, []);

// // //   // Cập nhật số lượng
// // //   const updateQuantity = (id, quantity) => {
// // //     if (quantity < 1) return;
// // //     const updatedCart = cart.map((item) =>
// // //       item.id === id ? { ...item, quantity } : item
// // //     );
// // //     setCart(updatedCart);
// // //     localStorage.setItem("cart", JSON.stringify(updatedCart));
// // //   };

// // //   // Xóa sản phẩm
// // //   const removeItem = (id) => {
// // //     const updatedCart = cart.filter((item) => item.id !== id);
// // //     setCart(updatedCart);
// // //     localStorage.setItem("cart", JSON.stringify(updatedCart));
// // //   };

// // //   // Tính tổng tiền
// // //   const totalPrice = cart.reduce(
// // //     (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
// // //     0
// // //   );

// // //   // Tạo đơn hàng mà không cần token
// // //   const handleCheckout = async () => {
// // //     if (cart.length === 0) {
// // //       alert("🛒 Giỏ hàng trống!");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setMessage("");

// // //     try {
// // //       const res = await fetch("http://localhost:8000/api/orders", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           user_id: 1, // mặc định user_id = 1
// // //           name: "Khách hàng",
// // //           email: "",
// // //           phone: "",
// // //           address: "",
// // //           note: "",
// // //           products: cart.map((i) => ({
// // //             id: i.id,
// // //             name: i.name,
// // //             price: i.price,
// // //             salePrice: i.salePrice,
// // //             quantity: i.quantity,
// // //           })),
// // //           total_price: totalPrice,
// // //         }),
// // //       });

// // //       if (!res.ok) throw new Error("Không thể tạo đơn hàng");

// // //       const data = await res.json();
// // //       console.log("✅ Đơn hàng tạo thành công:", data);

// // //       // Xóa giỏ hàng sau khi thanh toán
// // //       localStorage.removeItem("cart");
// // //       setCart([]);
// // //       setMessage("✅ Đơn hàng đã được tạo thành công!");
// // //       router.push("/main/orders");
// // //     } catch (err) {
// // //       console.error("❌ Lỗi khi tạo đơn hàng:", err);
// // //       setMessage("❌ Lỗi khi tạo đơn hàng! Vui lòng thử lại.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-4xl mx-auto p-6">
// // //       <h1 className="text-2xl font-bold mb-6 text-center">Giỏ hàng</h1>

// // //       {cart.length === 0 ? (
// // //         <p className="text-center text-gray-500">🛒 Chưa chọn mua sản phẩm</p>
// // //       ) : (
// // //         <div className="space-y-4">
// // //           {cart.map((item) => (
// // //             <div
// // //               key={item.id}
// // //               className="flex justify-between items-center border p-4 rounded-lg bg-white shadow"
// // //             >
// // //               <div className="flex items-center gap-4">
// // //                 <img
// // //                   src={item.thumbnail}
// // //                   alt={item.name}
// // //                   className="w-20 h-20 object-cover rounded"
// // //                 />
// // //                 <div>
// // //                   <h2 className="text-gray-900 font-semibold">{item.name}</h2>
// // //                   <p className="text-sm text-gray-600">
// // //                     Giá: {(item.salePrice || item.price).toLocaleString()} đ
// // //                   </p>
// // //                 </div>
// // //               </div>

// // //               <div className="flex items-center gap-2">
// // //                 <button
// // //                   onClick={() =>
// // //                     updateQuantity(item.id, (item.quantity || 1) - 1)
// // //                   }
// // //                   className="text-gray-900 px-2 py-1 border rounded"
// // //                 >
// // //                   -
// // //                 </button>
// // //                 <span className="text-gray-900 px-2 py-1 rounded">
// // //                   {item.quantity || 1}
// // //                 </span>
// // //                 <button
// // //                   onClick={() =>
// // //                     updateQuantity(item.id, (item.quantity || 1) + 1)
// // //                   }
// // //                   className="text-gray-900 px-2 py-1 border rounded"
// // //                 >
// // //                   +
// // //                 </button>
// // //               </div>

// // //               <div className="text-gray-900 text-right">
// // //                 <p className="text-gray-900 font-bold">
// // //                   {(
// // //                     (item.salePrice || item.price) * (item.quantity || 1)
// // //                   ).toLocaleString()}{" "}
// // //                   đ
// // //                 </p>
// // //                 <button
// // //                   onClick={() => removeItem(item.id)}
// // //                   className="text-red-500 text-sm hover:underline"
// // //                 >
// // //                   Xóa
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}

// // //           <div className="text-right font-semibold text-lg mt-4">
// // //             Tổng cộng: {totalPrice.toLocaleString()} đ
// // //           </div>

// // //           <div className="text-black mt-4">
// // //             <button
// // //               onClick={handleCheckout}
// // //               className="bg-yellow-400 px-6 py-2 rounded hover:bg-white hover:text-yellow-400 transition"
// // //               disabled={loading}
// // //             >
// // //               {loading ? "Đang xử lý..." : "Thanh toán"}
// // //             </button>
// // //           </div>

// // //           {message && <p className="mt-4 text-center">{message}</p>}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function CartPage() {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   // Load giỏ hàng từ localStorage
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

//     const normalizedCart = storedCart.map((item) => ({
//       id: item.id,
//       name: item.name || "Sản phẩm",
//       price: item.price || item.price_buy || 0,
//       salePrice: item.salePrice || item.sale_price || 0,
//       thumbnail: item.thumbnail || item.thumbnail_url || "/images/no-image.png",
//       quantity: item.quantity || 1,
//     }));

//     setCart(normalizedCart);
//   }, []);

//   // Cập nhật số lượng
//   const updateQuantity = (id, quantity) => {
//     if (quantity < 1) return;
//     const updatedCart = cart.map((item) =>
//       item.id === id ? { ...item, quantity } : item
//     );
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Xóa sản phẩm
//   const removeItem = (id) => {
//     const updatedCart = cart.filter((item) => item.id !== id);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Tính tổng tiền
//   const totalPrice = cart.reduce(
//     (sum, item) =>
//       sum + (item.salePrice || item.price || 0) * (item.quantity || 1),
//     0
//   );

//   // Tạo đơn hàng — chỉ dùng user, không token
//   const handleCheckout = async () => {
//     const userStr = localStorage.getItem("main_user");
//     if (!userStr) {
//       alert("❌ Bạn cần đăng nhập trước khi thanh toán!");
//       router.push("/main/login");
//       return;
//     }

//     const user = JSON.parse(userStr);

//     if (cart.length === 0) {
//       alert("🛒 Giỏ hàng trống!");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("http://localhost:8000/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id: user.id,
//           name: user.name || "Khách hàng",
//           email: user.email || "",
//           phone: user.phone || "",
//           address: user.address || "",
//           note: "", // có thể lưu ghi chú từ input sau này
//           total_price: totalPrice,
//           products: cart.map((i) => ({
//             id: i.id,
//             name: i.name,
//             price: i.price,
//             salePrice: i.salePrice,
//             quantity: i.quantity,
//           })),
//           order_status: "Chưa xác thực",
//         }),
//       });

//       if (!res.ok) throw new Error("Không thể tạo đơn hàng");

//       const data = await res.json();
//       console.log("✅ Đơn hàng tạo thành công:", data);

//       localStorage.removeItem("cart");
//       setCart([]);
//       setMessage("✅ Đơn hàng đã được tạo thành công!");
//       router.push("/main/cart");
//     } catch (err) {
//       console.error("❌ Lỗi khi tạo đơn hàng:", err);
//       setMessage("❌ Lỗi khi tạo đơn hàng! Vui lòng thử lại.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center text-black">
//         Giỏ hàng
//       </h1>

//       {cart.length === 0 ? (
//         <p className="text-center text-gray-500">🛒 Chưa chọn mua sản phẩm</p>
//       ) : (
//         <div className="space-y-4">
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center border p-4 rounded-lg bg-white shadow"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.thumbnail}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <h2 className="text-gray-900 font-semibold">{item.name}</h2>
//                   <p className="text-sm text-gray-600">
//                     Giá: {(item.salePrice || item.price).toLocaleString()} đ
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() =>
//                     updateQuantity(item.id, (item.quantity || 1) - 1)
//                   }
//                   className="text-gray-900 px-2 py-1 border rounded"
//                 >
//                   -
//                 </button>
//                 <span className="text-gray-900 px-2 py-1 rounded">
//                   {item.quantity || 1}
//                 </span>
//                 <button
//                   onClick={() =>
//                     updateQuantity(item.id, (item.quantity || 1) + 1)
//                   }
//                   className="text-gray-900 px-2 py-1 border rounded"
//                 >
//                   +
//                 </button>
//               </div>

//               <div className="text-gray-900 text-right">
//                 <p className="font-bold">
//                   {(
//                     (item.salePrice || item.price) * (item.quantity || 1)
//                   ).toLocaleString()}{" "}
//                   đ
//                 </p>
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="text-red-500 text-sm hover:underline"
//                 >
//                   Xóa
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="text-right font-semibold text-lg mt-4">
//             Tổng cộng: {totalPrice.toLocaleString()} đ
//           </div>

//           <div className="text-black mt-4">
//             <button
//               onClick={handleCheckout}
//               className="bg-yellow-400 px-6 py-2 rounded hover:bg-black hover:text-yellow-400 transition"
//               disabled={loading}
//             >
//               {loading ? "Đang xử lý..." : "Thanh toán"}
//             </button>
//           </div>

//           {message && <p className="mt-4 text-center text-black">{message}</p>}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(30000); // phí vận chuyển cố định
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // Load giỏ hàng từ localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const normalizedCart = storedCart.map((item) => ({
      id: item.id,
      name: item.name || "Sản phẩm",
      price: item.price || item.price_buy || 0,
      salePrice: item.salePrice || item.sale_price || 0,
      thumbnail: item.thumbnail || item.thumbnail_url || "/images/no-image.png",
      quantity: item.quantity || 1,
    }));

    setCart(normalizedCart);

    const subtotalPrice = normalizedCart.reduce(
      (sum, item) =>
        sum + (item.salePrice || item.price) * (item.quantity || 1),
      0
    );
    setSubtotal(subtotalPrice);
    setTotal(subtotalPrice + shippingFee);
  }, []);

  useEffect(() => {
    setTotal(subtotal + shippingFee);
  }, [subtotal, shippingFee]);

  // Cập nhật số lượng
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const subtotalPrice = updatedCart.reduce(
      (sum, item) =>
        sum + (item.salePrice || item.price) * (item.quantity || 1),
      0
    );
    setSubtotal(subtotalPrice);
  };

  // Xóa sản phẩm
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const subtotalPrice = updatedCart.reduce(
      (sum, item) =>
        sum + (item.salePrice || item.price) * (item.quantity || 1),
      0
    );
    setSubtotal(subtotalPrice);
  };

  // Chuyển sang trang checkout
  const goToCheckout = () => {
    if (cart.length === 0) {
      alert("🛒 Giỏ hàng trống!");
      return;
    }

    const userStr = localStorage.getItem("main_user");
    if (!userStr) {
      alert("❌ Bạn cần đăng nhập trước khi thanh toán!");
      router.push("/main/login");
      return;
    }

    router.push("/main/checkout");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Giỏ hàng</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">🛒 Chưa chọn mua sản phẩm</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg bg-white shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-gray-900 font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    Giá: {(item.salePrice || item.price).toLocaleString()} đ
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, (item.quantity || 1) - 1)
                  }
                  className="text-gray-900 px-2 py-1 border rounded"
                >
                  -
                </button>
                <span className="text-gray-900 px-2 py-1 rounded">
                  {item.quantity || 1}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, (item.quantity || 1) + 1)
                  }
                  className="text-gray-900 px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>

              <div className="text-gray-900 text-right">
                <p className="font-bold">
                  {(
                    (item.salePrice || item.price) * (item.quantity || 1)
                  ).toLocaleString()}{" "}
                  đ
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-semibold text-lg mt-4">
            <p>Tạm tính: {subtotal.toLocaleString()} đ</p>
            <p>Phí vận chuyển: {shippingFee.toLocaleString()} đ</p>
            <p className="text-xl font-bold">
              Tổng thanh toán: {total.toLocaleString()} đ
            </p>
          </div>

          <div className="text-black mt-4">
            <button
              onClick={goToCheckout}
              className="bg-yellow-400 px-6 py-2 rounded hover:bg-black hover:text-yellow-400 transition"
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
