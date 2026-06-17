// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import Link from "next/link";

// // // export default function ProductSalePage() {
// // //   const [sales, setSales] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   const fetchSales = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await fetch("http://localhost:8000/api/product-sale");
// // //       if (!res.ok) throw new Error("Không thể tải dữ liệu");
// // //       const data = await res.json();
// // //       setSales(data);
// // //     } catch (err) {
// // //       setError(err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Xóa sản phẩm khuyến mãi
// // //   const deleteSale = async (id) => {
// // //     if (!confirm("Bạn có chắc muốn xóa khuyến mãi này?")) return;
// // //     try {
// // //       const res = await fetch(`http://localhost:8000/api/product-sales/${id}`, {
// // //         method: "DELETE",
// // //       });
// // //       if (!res.ok) throw new Error("Không thể xóa");
// // //       alert("✅ Xóa thành công!");
// // //       fetchSales();
// // //     } catch (err) {
// // //       alert("❌ " + err.message);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchSales();
// // //   }, []);

// // //   return (
// // //     <div className="p-6">
// // //       {/* Tiêu đề + nút thêm */}
// // //       <div className="flex justify-between items-center mb-6">
// // //         <h1 className="text-3xl font-bold text-yellow-600">
// // //           Quản lý sản phẩm khuyến mãi
// // //         </h1>
// // //         <Link
// // //           href="/admin/productsale/add"
// // //           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// // //         >
// // //           ➕ Thêm khuyến mãi
// // //         </Link>
// // //       </div>

// // //       {loading && <p className="text-gray-600">Đang tải...</p>}
// // //       {error && <p className="text-red-500">{error}</p>}

// // //       {sales.length > 0 ? (
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full border border-gray-300 bg-white shadow-md rounded">
// // //             <thead className="bg-yellow-500 text-black">
// // //               <tr>
// // //                 <th className="px-4 py-2 border">ID</th>
// // //                 <th className="px-4 py-2 border">Ảnh</th>
// // //                 <th className="px-4 py-2 border">Tên sản phẩm</th>
// // //                 <th className="px-4 py-2 border">Giá gốc</th>
// // //                 <th className="px-4 py-2 border">Giá khuyến mãi</th>
// // //                 <th className="px-4 py-2 border">Hành động</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {sales.map((sale) => (
// // //                 <tr
// // //                   key={sale.id}
// // //                   className="text-black text-center hover:bg-gray-50"
// // //                 >
// // //                   {/* ID */}
// // //                   <td className="px-4 py-2 border">{sale.id}</td>

// // //                   {/* Ảnh */}
// // //                   <td className="px-4 py-2 border">
// // //                     {sale.product?.thumbnail_url ? (
// // //                       <img
// // //                         src={sale.product.thumbnail_url}
// // //                         alt={sale.product?.name}
// // //                         className="w-16 h-16 object-cover mx-auto rounded"
// // //                       />
// // //                     ) : (
// // //                       <span className="text-gray-400">Không có ảnh</span>
// // //                     )}
// // //                   </td>

// // //                   {/* Tên */}
// // //                   <td className="px-4 py-2 border font-medium">
// // //                     {sale.product?.name || "Sản phẩm"}
// // //                   </td>

// // //                   {/* Giá gốc */}
// // //                   <td className="px-4 py-2 border text-gray-500 line-through">
// // //                     {sale.product?.price_buy
// // //                       ? Number(sale.product.price_buy).toLocaleString("vi-VN") +
// // //                         "₫"
// // //                       : "—"}
// // //                   </td>

// // //                   {/* Giá khuyến mãi */}
// // //                   <td className="px-4 py-2 border text-black font-bold">
// // //                     {sale.price_sale
// // //                       ? Number(sale.price_sale).toLocaleString("vi-VN") + "₫"
// // //                       : "—"}
// // //                   </td>

// // //                   {/* Hành động */}
// // //                   <td className="px-4 py-2 border space-x-2">
// // //                     <Link
// // //                       href={`/admin/productsale/edit/${sale.id}`}
// // //                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
// // //                     >
// // //                       ✏️ Sửa
// // //                     </Link>
// // //                     <button
// // //                       onClick={() => deleteSale(sale.id)}
// // //                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
// // //                     >
// // //                       🗑 Xóa
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       ) : (
// // //         !loading && (
// // //           <p className="text-gray-500 text-center">
// // //             Không có sản phẩm khuyến mãi
// // //           </p>
// // //         )
// // //       )}
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";

// // export default function ProductSalePage() {
// //   const [sales, setSales] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [search, setSearch] = useState("");
// //   const [filter, setFilter] = useState("all");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 3;

// //   const fetchSales = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await fetch("http://localhost:8000/api/product-sale", {
// //         cache: "no-store", // ⬅️ dòng quan trọng nhất
// //       });
// //       if (!res.ok) throw new Error("Không thể tải dữ liệu");
// //       const data = await res.json();
// //       setSales(data);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Xóa sản phẩm khuyến mãi
// //   const deleteSale = async (id) => {
// //     if (!confirm("Bạn có chắc muốn xóa khuyến mãi này?")) return;
// //     try {
// //       const res = await fetch(`http://localhost:8000/api/product-sales/${id}`, {
// //         method: "DELETE",
// //       });
// //       if (!res.ok) throw new Error("Không thể xóa");
// //       alert("✅ Xóa thành công!");
// //       fetchSales();
// //     } catch (err) {
// //       alert("❌ " + err.message);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSales();
// //   }, []);

// //   // Lọc + tìm kiếm
// //   const filteredSales = sales.filter((sale) => {
// //     const matchesSearch = sale.product?.name
// //       ?.toLowerCase()
// //       .includes(search.toLowerCase());

// //     const now = new Date();
// //     const begin = new Date(sale.date_begin);
// //     const end = new Date(sale.date_end);

// //     const isActive = now >= begin && now <= end;

// //     if (filter === "active") return matchesSearch && isActive;
// //     if (filter === "expired") return matchesSearch && !isActive;
// //     return matchesSearch;
// //   });

// //   // Phân trang
// //   const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const paginatedSales = filteredSales.slice(
// //     startIndex,
// //     startIndex + itemsPerPage
// //   );

// //   const handlePageChange = (page) => {
// //     if (page < 1 || page > totalPages) return;
// //     setCurrentPage(page);
// //   };

// //   return (
// //     <div className="p-6">
// //       {/* Tiêu đề + nút thêm */}
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-3xl font-bold text-yellow-600">
// //           Quản lý sản phẩm khuyến mãi
// //         </h1>
// //         <Link
// //           href="/admin/productsale/add"
// //           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// //         >
// //           ➕ Thêm khuyến mãi
// //         </Link>
// //       </div>

// //       {/* Thanh tìm kiếm + lọc */}
// //       <div className="flex flex-wrap gap-3 mb-4">
// //         <input
// //           type="text"
// //           placeholder="🔍 Tìm kiếm sản phẩm..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="border border-gray-300 px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
// //         />
// //         <select
// //           value={filter}
// //           onChange={(e) => setFilter(e.target.value)}
// //           className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
// //         >
// //           <option value="all">Tất cả</option>
// //           <option value="active">Đang khuyến mãi</option>
// //           <option value="expired">Hết hạn</option>
// //         </select>
// //       </div>

// //       {loading && <p className="text-gray-600">Đang tải...</p>}
// //       {error && <p className="text-red-500">{error}</p>}

// //       {paginatedSales.length > 0 ? (
// //         <div className="overflow-x-auto">
// //           <table className="w-full border border-gray-300 bg-white shadow-md rounded">
// //             <thead className="bg-yellow-500 text-black">
// //               <tr>
// //                 <th className="px-4 py-2 border">ID</th>
// //                 <th className="px-4 py-2 border">Ảnh</th>
// //                 <th className="px-4 py-2 border">Tên sản phẩm</th>
// //                 <th className="px-4 py-2 border">Giá gốc</th>
// //                 <th className="px-4 py-2 border">Giá KM</th>
// //                 <th className="px-4 py-2 border">Thời gian</th>
// //                 <th className="px-4 py-2 border">Hành động</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {paginatedSales.map((sale) => {
// //                 const now = new Date();
// //                 const begin = new Date(sale.date_begin);
// //                 const end = new Date(sale.date_end);
// //                 const active = now >= begin && now <= end;

// //                 return (
// //                   <tr
// //                     key={sale.id}
// //                     className={`text-black text-center ${
// //                       active ? "bg-green-50" : "bg-gray-50"
// //                     } hover:bg-yellow-50`}
// //                   >
// //                     <td className="px-4 py-2 border">{sale.id}</td>
// //                     <td className="px-4 py-2 border">
// //                       {sale.product?.thumbnail_url ? (
// //                         <img
// //                           src={sale.product.thumbnail_url}
// //                           alt={sale.product?.name}
// //                           className="w-16 h-16 object-cover mx-auto rounded"
// //                         />
// //                       ) : (
// //                         <span className="text-gray-400">Không có ảnh</span>
// //                       )}
// //                     </td>
// //                     <td className="px-4 py-2 border font-medium">
// //                       {sale.product?.name || "—"}
// //                     </td>
// //                     <td className="px-4 py-2 border text-gray-500 line-through">
// //                       {sale.product?.price_buy
// //                         ? Number(sale.product.price_buy).toLocaleString(
// //                             "vi-VN"
// //                           ) + "₫"
// //                         : "—"}
// //                     </td>
// //                     <td className="px-4 py-2 border text-black font-bold">
// //                       {sale.price_sale
// //                         ? Number(sale.price_sale).toLocaleString("vi-VN") + "₫"
// //                         : "—"}
// //                     </td>
// //                     <td className="px-4 py-2 border text-sm">
// //                       {sale.date_begin} → {sale.date_end}
// //                       <div
// //                         className={`text-xs font-medium ${
// //                           active ? "text-green-600" : "text-red-500"
// //                         }`}
// //                       >
// //                         {active ? "Đang diễn ra" : "Đã hết hạn"}
// //                       </div>
// //                     </td>
// //                     <td className="px-4 py-2 border space-x-2">
// //                       <Link
// //                         href={`/admin/productsale/edit/${sale.id}`}
// //                         className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
// //                       >
// //                         ✏️ Sửa
// //                       </Link>
// //                       <button
// //                         onClick={() => deleteSale(sale.id)}
// //                         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
// //                       >
// //                         🗑 Xóa
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>

// //           {/* Phân trang */}
// //           <div className="flex justify-center items-center gap-2 mt-4">
// //             <button
// //               onClick={() => handlePageChange(currentPage - 1)}
// //               disabled={currentPage === 1}
// //               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
// //             >
// //               ← Trước
// //             </button>
// //             <span>
// //               Trang {currentPage}/{totalPages}
// //             </span>
// //             <button
// //               onClick={() => handlePageChange(currentPage + 1)}
// //               disabled={currentPage === totalPages}
// //               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
// //             >
// //               Sau →
// //             </button>
// //           </div>
// //         </div>
// //       ) : (
// //         !loading && (
// //           <p className="text-gray-500 text-center">
// //             Không có sản phẩm khuyến mãi
// //           </p>
// //         )
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ProductSalePage() {
//   const [sales, setSales] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3;

//   const fetchSales = async () => {
//     try {
//       setLoading(true);
//       // ✅ thêm cache: "no-store" để tắt cache + thêm timestamp để chắc chắn refetch
//       const res = await fetch(
//         `http://localhost:8000/api/product-sale?_t=${Date.now()}`,
//         { cache: "no-store" }
//       );
//       if (!res.ok) throw new Error("Không thể tải dữ liệu");
//       const data = await res.json();
//       setSales(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Xóa sản phẩm khuyến mãi
//   const deleteSale = async (id) => {
//     if (!confirm("Bạn có chắc muốn xóa khuyến mãi này?")) return;
//     try {
//       const res = await fetch(`http://localhost:8000/api/product-sales/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Không thể xóa");
//       alert("✅ Xóa thành công!");
//       fetchSales(); // reload danh sách mới
//     } catch (err) {
//       alert("❌ " + err.message);
//     }
//   };

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   // ✅ Lọc + tìm kiếm
//   const filteredSales = sales.filter((sale) => {
//     const matchesSearch = sale.product?.name
//       ?.toLowerCase()
//       .includes(search.toLowerCase());

//     const now = new Date();
//     const begin = new Date(sale.date_begin);
//     const end = new Date(sale.date_end);
//     const isActive = now >= begin && now <= end;

//     if (filter === "active") return matchesSearch && isActive;
//     if (filter === "expired") return matchesSearch && !isActive;
//     return matchesSearch;
//   });
//   const handleImport = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("http://localhost:8000/api/product-sale/import", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Import thất bại");

//       alert("✅ Import thành công!");
//       fetchSales(); // Reload danh sách mới
//     } catch (err) {
//       alert("❌ " + err.message);
//     }
//   };

//   // ✅ Phân trang
//   const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedSales = filteredSales.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <div className="p-6">
//       {/* Tiêu đề + nút thêm */}
//       <div className=" flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 ">
//           Quản lý sản phẩm khuyến mãi
//         </h1>
//         <Link
//           href="/admin/productsale/add"
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-gray-900"
//         >
//           ➕ Thêm khuyến mãi
//         </Link>
//         <label className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer hover:bg-yellow-600">
//           📤 Import file
//           <input
//             type="file"
//             accept=".csv,.xlsx"
//             className="hidden"
//             onChange={handleImport}
//           />
//         </label>
//       </div>

//       {/* Thanh tìm kiếm + lọc */}
//       <div className="text-gray-900 flex flex-wrap gap-3 mb-4">
//         <input
//           type="text"
//           placeholder="🔍 Tìm kiếm sản phẩm..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border border-gray-300 px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//         />
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border border-gray-900 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//         >
//           <option value="all">Tất cả</option>
//           <option value="active">Đang khuyến mãi</option>
//           <option value="expired">Hết hạn</option>
//         </select>
//       </div>

//       {loading && <p className="text-gray-600">Đang tải...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {paginatedSales.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300 bg-white shadow-md rounded">
//             <thead className="bg-gray-900 text-white">
//               <tr>
//                 <th className="px-4 py-2 border">ID</th>
//                 <th className="px-4 py-2 border">Ảnh</th>
//                 <th className="px-4 py-2 border">Tên sản phẩm</th>
//                 <th className="px-4 py-2 border">Giá gốc</th>
//                 <th className="px-4 py-2 border">Giá KM</th>
//                 <th className="px-4 py-2 border">Thời gian</th>
//                 <th className="px-4 py-2 border">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedSales.map((sale) => {
//                 const now = new Date();
//                 const begin = new Date(sale.date_begin);
//                 const end = new Date(sale.date_end);
//                 const active = now >= begin && now <= end;

//                 // ✅ Đường dẫn ảnh chính xác từ public/images/products
//                 const imageUrl = sale.product?.thumbnail
//                   ? `http://localhost:8000/${sale.product.thumbnail}`
//                   : sale.product?.thumbnail_url ||
//                     "http://localhost:8000/images/no-image.png";

//                 return (
//                   <tr
//                     key={sale.id}
//                     className={`text-black text-center ${
//                       active ? "bg-green-50" : "bg-gray-50"
//                     } hover:bg-yellow-50`}
//                   >
//                     <td className="px-4 py-2 border">{sale.id}</td>
//                     <td className="px-4 py-2 border">
//                       <img
//                         src={imageUrl}
//                         alt={sale.product?.name}
//                         className="w-16 h-16 object-cover mx-auto rounded"
//                         onError={(e) => (e.target.src = "/images/no-image.png")}
//                       />
//                     </td>
//                     <td className="px-4 py-2 border font-medium">
//                       {sale.product?.name || "—"}
//                     </td>
//                     <td className="px-4 py-2 border text-gray-500 line-through">
//                       {sale.product?.price_buy
//                         ? Number(sale.product.price_buy).toLocaleString(
//                             "vi-VN"
//                           ) + "₫"
//                         : "—"}
//                     </td>
//                     <td className="px-4 py-2 border text-black font-bold">
//                       {sale.price_sale
//                         ? Number(sale.price_sale).toLocaleString("vi-VN") + "₫"
//                         : "—"}
//                     </td>
//                     <td className="px-4 py-2 border text-sm">
//                       {sale.date_begin} → {sale.date_end}
//                       <div
//                         className={`text-xs font-medium ${
//                           active ? "text-green-600" : "text-red-500"
//                         }`}
//                       >
//                         {active ? "Đang diễn ra" : "Đã hết hạn"}
//                       </div>
//                     </td>
//                     <td className="px-4 py-2 border space-x-2">
//                       <Link
//                         href={`/admin/productsale/edit/${sale.id}`}
//                         className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                       >
//                         ✏️ Sửa
//                       </Link>
//                       <button
//                         onClick={() => deleteSale(sale.id)}
//                         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                       >
//                         🗑 Xóa
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {/* ✅ Phân trang */}
//           <div className="flex justify-center items-center gap-2 mt-4">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 bg-gray-900 rounded disabled:opacity-50"
//             >
//               ← Trước
//             </button>
//             <span className="text-gray-900">
//               Trang {currentPage}/{totalPages}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 bg-gray-900 rounded disabled:opacity-50"
//             >
//               Sau →
//             </button>
//           </div>
//         </div>
//       ) : (
//         !loading && (
//           <p className="text-gray-500 text-center">
//             Không có sản phẩm khuyến mãi
//           </p>
//         )
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductSalePage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/product-sale?_t=${Date.now()}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Không thể tải dữ liệu");
      const data = await res.json();
      setSales(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSale = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa khuyến mãi này?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/product-sales/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Không thể xóa");
      alert("✅ Xóa thành công!");
      fetchSales();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/product-sale/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Import thất bại");

      alert("✅ Import thành công!");
      fetchSales();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // lọc + phân trang
  const filteredSales = sales.filter((sale) => {
    const matchesSearch = sale.product?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const now = new Date();
    const begin = new Date(sale.date_begin);
    const end = new Date(sale.date_end);
    const isActive = now >= begin && now <= end;

    if (filter === "active") return matchesSearch && isActive;
    if (filter === "expired") return matchesSearch && !isActive;
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSales = filteredSales.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      {/* Tiêu đề + nút thêm + import */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Quản lý sản phẩm khuyến mãi
        </h1>
        <div className="flex gap-2">
          <Link
            href="/admin/productsale/add"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-gray-900"
          >
            ➕ Thêm khuyến mãi
          </Link>
          <label className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer hover:bg-yellow-600">
            📤 Import file
            <input
              type="file"
              accept=".csv,.xlsx"
              className="hidden"
              onChange={handleImport}
            />
          </label>
        </div>
      </div>

      {/* Thanh tìm kiếm + lọc */}
      <div className="flex flex-wrap gap-3 mb-4 text-gray-900">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-900 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="all">Tất cả</option>
          <option value="active">Đang khuyến mãi</option>
          <option value="expired">Hết hạn</option>
        </select>
      </div>

      {loading && <p className="text-gray-600">Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {paginatedSales.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow-md rounded">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Ảnh</th>
                <th className="px-4 py-2 border">Tên sản phẩm</th>
                <th className="px-4 py-2 border">Giá gốc</th>
                <th className="px-4 py-2 border">Giá KM</th>
                <th className="px-4 py-2 border">Thời gian</th>
                <th className="px-4 py-2 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSales.map((sale) => {
                const now = new Date();
                const begin = new Date(sale.date_begin);
                const end = new Date(sale.date_end);
                const active = now >= begin && now <= end;
                const imageUrl = sale.product?.thumbnail
                  ? `http://localhost:8000/${sale.product.thumbnail}`
                  : sale.product?.thumbnail_url ||
                    "http://localhost:8000/images/no-image.png";

                return (
                  <tr
                    key={sale.id}
                    className={`text-black text-center ${
                      active ? "bg-green-50" : "bg-gray-50"
                    } hover:bg-yellow-50`}
                  >
                    <td className="px-4 py-2 border">{sale.id}</td>
                    <td className="px-4 py-2 border">
                      <img
                        src={imageUrl}
                        alt={sale.product?.name}
                        className="w-16 h-16 object-cover mx-auto rounded"
                        onError={(e) => (e.target.src = "/images/no-image.png")}
                      />
                    </td>
                    <td className="px-4 py-2 border font-medium">
                      {sale.product?.name || "—"}
                    </td>
                    <td className="px-4 py-2 border text-gray-500 line-through">
                      {sale.product?.price_buy
                        ? Number(sale.product.price_buy).toLocaleString(
                            "vi-VN"
                          ) + "₫"
                        : "—"}
                    </td>
                    <td className="px-4 py-2 border text-black font-bold">
                      {sale.price_sale
                        ? Number(sale.price_sale).toLocaleString("vi-VN") + "₫"
                        : "—"}
                    </td>
                    <td className="px-4 py-2 border text-sm">
                      {sale.date_begin} → {sale.date_end}
                      <div
                        className={`text-xs font-medium ${
                          active ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {active ? "Đang diễn ra" : "Đã hết hạn"}
                      </div>
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <Link
                        href={`/admin/productsale/edit/${sale.id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        ✏️ Sửa
                      </Link>
                      <button
                        onClick={() => deleteSale(sale.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        🗑 Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* phân trang */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-900 rounded disabled:opacity-50"
            >
              ← Trước
            </button>
            <span className="text-gray-900">
              Trang {currentPage}/{totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-900 rounded disabled:opacity-50"
            >
              Sau →
            </button>
          </div>
        </div>
      ) : (
        !loading && (
          <p className="text-gray-500 text-center">
            Không có sản phẩm khuyến mãi
          </p>
        )
      )}
    </div>
  );
}
