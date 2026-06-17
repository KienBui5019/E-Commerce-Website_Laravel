
// // "use client";
// // import { useEffect, useState } from "react";
// // import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// // export default function ProductAdmin() {
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [page, setPage] = useState(1);
// //   const [lastPage, setLastPage] = useState(1);

// //   const [showForm, setShowForm] = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     category_id: "",
// //     thumbnail: null,
// //     description: "",
// //     content: "",
// //     price_buy: "",
// //     // qty: "",
// //     // price_sale: "",
// //     status: 1,
// //   });

// //   const apiUrl = "http://127.0.0.1:8000/api/product";

// //   // --- Fetch products ---
// //   const fetchProducts = async () => {
// //     let url = `${apiUrl}?page=${page}&search=${search}`;
// //     const res = await fetch(url);
// //     const data = await res.json();
// //     setProducts(data.data || data);
// //     setLastPage(data.last_page || 1);
// //   };

// //   // --- Fetch categories (giống PostAdmin) ---
// //   const fetchCategories = async () => {
// //     const res = await fetch("http://127.0.0.1:8000/api/categories/all");
// //     const data = await res.json();
// //     setCategories(data); 
// //   };

// //   useEffect(() => {
// //     fetchProducts();
// //     fetchCategories();
// //   }, [page, search]);

// //   // --- Add / Edit ---
// //   const handleAdd = () => {
// //     setEditingProduct(null);
// //     setFormData({
// //       name: "",
// //       category_id: "",
// //       thumbnail: null,
// //       description: "",
// //       content: "",
// //       price_buy: "",
// //       // qty: "",
// //       // price_sale: "",
// //       status: 1,
// //     });
// //     setShowForm(true);
// //   };

// //   const handleEdit = (product) => {
// //     setEditingProduct(product);
// //     setFormData({
// //       name: product.name || "",
// //       category_id: product.category_id?.toString() || "",
// //       thumbnail: null, // không bắt buộc đổi ảnh
// //       description: product.description || "",
// //       content: product.content || "",
// //       price_buy: product.store?.price_root || "",
// //       // qty: product.store?.qty || "",
// //       // price_sale: product.sale?.price_sale || "",
// //       status: product.status || 1,
// //     });
// //     setShowForm(true);
// //   };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   const url = editingProduct ? `${apiUrl}/${editingProduct.id}` : apiUrl;

// //   const fd = new FormData();
// //   fd.append("name", formData.name);
// //   fd.append("category_id", formData.category_id);
// //   fd.append("thumbnail", formData.thumbnail);
// //   fd.append("description", formData.description || "");
// //   fd.append("content", formData.content || "");
// //   fd.append("price_buy", Number(formData.price_buy));
// //   // fd.append("qty", Number(formData.qty));
// //   // if (formData.price_sale) fd.append("price_sale", Number(formData.price_sale));
// //   fd.append("status", formData.status);

// //   // Thêm thumbnail nếu có chọn file mới
// //   if (formData.thumbnail instanceof File) {
// //     fd.append("thumbnail", formData.thumbnail);
// //   }

// //   // Nếu là edit, thêm _method để Laravel nhận là PUT
// //   if (editingProduct) {
// //     fd.append("_method", "PUT");
// //   }
// //  console.log("=== FormData gửi đi ===");
// //   for (let pair of fd.entries()) {
// //     console.log(pair[0], ":", pair[1]);
// //   }
// //   console.log("=======================");
// //   try {
// //     const res = await fetch(url, {
// //       method: "POST",
// //       body: fd,
// //     });

// //     if (!res.ok) {
// //       const err = await res.json();
// //       console.error("Lỗi server:", err);
// //       alert("Có lỗi xảy ra khi lưu sản phẩm. Kiểm tra console.");
// //       return;
// //     }

// //     // Thành công
// //     setShowForm(false);
// //     fetchProducts();
// //   } catch (error) {
// //     console.error("Lỗi mạng:", error);
// //     alert("Lỗi mạng. Vui lòng thử lại.");
// //   }
// // };

// //   // --- Delete ---
// //   const handleDelete = async (id) => {
// //     if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
// //     const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
// //     if (res.ok) fetchProducts();
// //   };

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm thêm tình trạng</h1>

// //       {/* Thanh tìm kiếm + add */}
// //       <div className="flex gap-2 mb-4">
// //         <input
// //           type="text"
// //           placeholder="Tìm kiếm theo tên..."
// //           className="border rounded px-3 py-2 w-1/3"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //         <button
// //           onClick={handleAdd}
// //           className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
// //         >
// //           <FaPlus /> Thêm sản phẩm
// //         </button>
// //       </div>

// //       {/* Bảng sản phẩm */}
// //       <table className="w-full border-collapse border rounded shadow">
// //         <thead>
// //           <tr className="bg-gray-200 text-left">
// //             <th className="p-2 border">STT</th>
// //             <th className="p-2 border">Tên</th>
// //             <th className="p-2 border">Ảnh</th>
// //             <th className="p-2 border">Danh mục</th>
// //             <th className="p-2 border">Mô tả</th>
// //             <th className="p-2 border">Thông tin</th>
// //             <th className="p-2 border">Giá mua</th>
// //             {/* <th className="p-2 border">SL tồn</th> */}
// //             {/* <th className="p-2 border">Giá KM</th> */}
// //             <th className="p-2 border">Hành động</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {products.map((p) => (
// //             <tr key={p.id} className="hover:bg-gray-100">
// //               <td className="p-2 border">{p.id}</td>
// //               <td className="p-2 border">{p.name}</td>
// //               <td className="p-2 border">
// //                 {p.thumbnail && (
// //                   <img
// //                     src={`http://127.0.0.1:8000/images/${p.thumbnail}`}
// //                     alt={p.name}
// //                     className="w-16 h-16 object-cover"
// //                   />
// //                 )}
// //               </td>
// //               <td className="p-2 border">{p.category?.name}</td>
// //               <td className="p-2 border">{p.content}</td>
// //               <td className="p-2 border">{p.description}</td>
// //               <td className="p-2 border">{p.price_buy}</td>
// //               {/* <td className="p-2 border">{p.store?.qty}</td> */}
// //               {/* <td className="p-2 border">{p.sale?.price_sale || "-"}</td> */}
// //               <td className="p-2 border flex gap-2">
// //                 <button
// //                   onClick={() => handleEdit(p)}
// //                   className="bg-yellow-400 px-2 py-1 rounded text-white flex items-center gap-1"
// //                 >
// //                   <FaEdit /> Sửa
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(p.id)}
// //                   className="bg-red-500 px-2 py-1 rounded text-white flex items-center gap-1"
// //                 >
// //                   <FaTrash /> Xóa
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Phân trang */}
// //       <div className="flex gap-2 mt-4">
// //         <button
// //           disabled={page === 1}
// //           onClick={() => setPage(page - 1)}
// //           className="px-3 py-1 border rounded disabled:opacity-50"
// //         >
// //           Trước
// //         </button>
// //         <span className="px-3 py-1">Trang {page}/{lastPage}</span>
// //         <button
// //           disabled={page === lastPage}
// //           onClick={() => setPage(page + 1)}
// //           className="px-3 py-1 border rounded disabled:opacity-50"
// //         >
// //           Sau
// //         </button>
// //       </div>

// //       {/* Modal thêm/sửa */}
// //       {showForm && (
// //         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
// //           <div className="bg-white p-6 rounded shadow-lg w-96">
// //             <h2 className="text-xl font-bold mb-4">{editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h2>
// //             <form onSubmit={handleSubmit} className="space-y-3">
// //               <input
// //                 type="text"
// //                 placeholder="Tên"
// //                 className="border px-3 py-2 w-full rounded"
// //                 value={formData.name}
// //                 onChange={e => setFormData({...formData, name: e.target.value})}
// //                 required
// //               />

// //               <select
// //                 className="border px-3 py-2 w-full rounded"
// //                 value={formData.category_id}
// //                 onChange={e => setFormData({...formData, category_id: e.target.value})}
// //                 required
// //               >
// //                 <option value="">-- Chọn danh mục --</option>
// //                 {categories.map(c => (
// //                   <option key={c.id} value={c.id.toString()}>{c.name}</option>
// //                 ))}
// //               </select>

// //               {editingProduct && editingProduct.thumbnail && !formData.thumbnail && (
// //                 <img
// //                   src={`http://127.0.0.1:8000/images/${editingProduct.thumbnail}`}
// //                   alt="preview"
// //                   className="w-24 h-24 object-cover mb-2 rounded"
// //                 />
// //               )}
// //               <input type="file" onChange={e => setFormData({...formData, thumbnail: e.target.files[0]})} />

// //               <input
// //                 placeholder="Mô tả"
// //                 className="border px-3 py-2 w-full rounded"
// //                 value={formData.content || ""}
// //                 onChange={e => setFormData({...formData, content: e.target.value})}
// //               /><input
// //                 placeholder="Chi tiết"
// //                 className="border px-3 py-2 w-full rounded"
// //                 value={formData.description || ""}
// //                 onChange={e => setFormData({...formData, description: e.target.value})}
// //               />

// //               <input
// //                 type="number"
// //                 placeholder="Giá gốc"
// //                 className="border px-3 py-2 w-full rounded"
// //                 value={formData.price_buy}
// //                 onChange={e => setFormData({...formData, price_buy: e.target.value})}
// //                 required
// //               />

// //               {/* <input
// //                 type="number"
// //                 placeholder="Số lượng"
// //                 className="border px-3 py-2 w-full rounded"
// //                 value={formData.qty}
// //                 onChange={e => setFormData({...formData, qty: e.target.value})}
// //                 required
// //               /> */}

// //               {/* <input
// //                 type="number"
// //                 placeholder="Giá KM"
// //                 className="border px-3 py-2 w-full rounded"
// //                 value={formData.price_sale}
// //                 onChange={e => setFormData({...formData, price_sale: e.target.value})}
// //               /> */}

// //               <div className="flex justify-end gap-2">
// //                 <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Hủy</button>
// //                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Lưu</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


//   "use client";
//   import { useEffect, useState } from "react";
//   import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
//   import Link from "next/link";

//   export default function ProductAdmin() {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [search, setSearch] = useState("");
//     const [page, setPage] = useState(1);
//     const [lastPage, setLastPage] = useState(1);
//     const [showForm, setShowForm] = useState(false);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [formData, setFormData] = useState({
//       name: "",
//       category_id: "",
//       thumbnail: null,
//       description: "",
//       content: "",
//       price_buy: "",
//       status: 1,
//     });

//     const apiUrl = "http://127.0.0.1:8000/api/product";

//     // --- Fetch products ---
//     const fetchProducts = async () => {
//       let url = `${apiUrl}?page=${page}&search=${search}`;
//       const res = await fetch(url);
//       const data = await res.json();
//       setProducts(data.data || data);
//       setLastPage(data.last_page || 1);
//     };

//     const fetchCategories = async () => {
//       const res = await fetch("http://127.0.0.1:8000/api/categories/all");
//       const data = await res.json();
//       setCategories(data);
//     };

//     useEffect(() => {
//       fetchProducts();
//       fetchCategories();
//     }, [page, search]);

//     // --- Add ---
//     const handleAdd = () => {
//       setEditingProduct(null);
//       setFormData({
//         name: "",
//         category_id: "",
//         thumbnail: null,
//         description: "",
//         content: "",
//         price_buy: "",
//         status: 1,
//       });
//       setShowForm(true);
//     };

//     const handleEdit = (product) => {
//       setEditingProduct(product);
//       setFormData({
//         name: product.name || "",
//         category_id: product.category_id?.toString() || "",
//         thumbnail: null,
//         description: product.description || "",
//         content: product.content || "",
//         price_buy: product.store?.price_root || "",
//         status: product.status || 1,
//       });
//       setShowForm(true);
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();

//       const url = editingProduct ? `${apiUrl}/${editingProduct.id}` : apiUrl;

//       const fd = new FormData();
//       fd.append("name", formData.name);
//       fd.append("category_id", formData.category_id);
//       fd.append("description", formData.description || "");
//       fd.append("content", formData.content || "");
//       fd.append("price_buy", Number(formData.price_buy));
//       fd.append("status", formData.status);

//       if (formData.thumbnail instanceof File) {
//         fd.append("thumbnail", formData.thumbnail);
//       }
//       if (editingProduct) fd.append("_method", "PUT");

//       const res = await fetch(url, { method: "POST", body: fd });
//       if (res.ok) {
//         setShowForm(false);
//         fetchProducts();
//       }
//     };

//     const handleDelete = async (id) => {
//       if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
//       await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
//       fetchProducts();
//     };
    
//     return (
//       <div className="p-6 min-h-screen">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
//           <button
//             onClick={handleAdd}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
//           >
//             <FaPlus /> Thêm sản phẩm
//           </button>
//         </div>

//         {/* Thanh tìm kiếm */}
//         <div className="mb-4 flex gap-3">
//           <input
//             type="text"
//             placeholder="🔍 Tìm kiếm sản phẩm..."
//             className="border px-4 py-2 rounded-lg shadow w-1/3 focus:ring focus:ring-blue-300"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Bảng danh sách */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="w-full text-sm text-left border-collapse">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="p-3 border">STT</th>
//                 <th className="p-3 border">Tên</th>
//                 <th className="p-3 border">Ảnh</th>
//                 <th className="p-3 border">Danh mục</th>
//                 <th className="p-3 border">Mô tả</th>
//                 <th className="p-3 border">Chi tiết</th>
//                 <th className="p-3 border">Giá mua</th>
//                 <th className="p-3 border text-center">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p, idx) => (
//                 <tr key={p.id} className="hover:bg-gray-50">
//                   <td className="p-3 border">{idx + 1}</td>
//                   <td className="p-3 border font-medium">{p.name}</td>
//                   <td className="p-3 border">
//                     {p.thumbnail && (
//                       <img
//                         src={`http://127.0.0.1:8000/images/${p.thumbnail}`}
//                         alt={p.name}
//                         className="w-14 h-14 object-cover rounded shadow"
//                       />
//                     )}
//                   </td>
//                   <td className="p-3 border">{p.category?.name}</td>
//                   <td className="p-3 border text-gray-600">{p.content}</td>
//                   <td className="p-3 border text-gray-500">{p.description}</td>
//                   <td className="p-3 border text-green-400 font-semibold">
//                     {Number(p.price_buy).toLocaleString()}vnđ
//                   </td>
//                   <td className="p-3 border flex gap-2 justify-center">
//                     <button
//                       onClick={() => handleEdit(p)}
//                       className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow flex items-center gap-1"
//                     >
//                       <FaEdit /> Sửa
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow flex items-center gap-1"
//                     >
//                       <FaTrash /> Xóa
//                     </button>
//                    <button
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow flex items-center gap-1"
//                   >
//                     <Link href={`/admin/products/${p.id}`}>🖼 Ảnh</Link>
//                   </button>

//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Phân trang */}
//         <div className="flex justify-center gap-2 mt-6">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             ⬅ Trước
//           </button>
//           <span className="px-3 py-1">
//             Trang {page}/{lastPage}
//           </span>
//           <button
//             disabled={page === lastPage}
//             onClick={() => setPage(page + 1)}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Sau ➡
//           </button>
//         </div>

//         {/* Modal thêm/sửa */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-[420px]">
//               <h2 className="text-lg font-bold mb-4">
//                 {editingProduct ? "✏️ Sửa sản phẩm" : "➕ Thêm sản phẩm"}
//               </h2>
//               <form onSubmit={handleSubmit} className="space-y-3">
//                 <input
//                   type="text"
//                   placeholder="Tên sản phẩm"
//                   className="border px-3 py-2 w-full rounded-lg"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                 />

//                 <select
//                   className="border px-3 py-2 w-full rounded-lg"
//                   value={formData.category_id}
//                   onChange={(e) =>
//                     setFormData({ ...formData, category_id: e.target.value })
//                   }
//                   required
//                 >
//                   <option value="">-- Chọn danh mục --</option>
//                   {categories.map((c) => (
//                     <option key={c.id} value={c.id.toString()}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>

//                 <input
//                   type="file"
//                   className="border p-2 w-full rounded-lg"
//                   onChange={(e) =>
//                     setFormData({ ...formData, thumbnail: e.target.files[0] })
//                   }
//                 />

//                 <input
//                   placeholder="Mô tả"
//                   className="border px-3 py-2 w-full rounded-lg"
//                   value={formData.content}
//                   onChange={(e) =>
//                     setFormData({ ...formData, content: e.target.value })
//                   }
//                 />
//                 <input
//                   placeholder="Chi tiết"
//                   className="border px-3 py-2 w-full rounded-lg"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                 />

//                 <input
//                   type="number"
//                   placeholder="Giá gốc"
//                   className="border px-3 py-2 w-full rounded-lg"
//                   value={formData.price_buy}
//                   onChange={(e) =>
//                     setFormData({ ...formData, price_buy: e.target.value })
//                   }
//                   required
//                 />

//                 <div className="flex justify-end gap-2 mt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowForm(false)}
//                     className="px-4 py-2 border rounded-lg hover:bg-gray-100"
//                   >
//                     Hủy
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
//                   >
//                     Lưu
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaFileAlt, FaPenFancy } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [lastPage, setLastPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    thumbnail: null,
    description: "",
    content: "",
    price_buy: "",
    status: 1,
  });
  const router = useRouter();
 const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const userAdmin = localStorage.getItem("userad");
    if (!userAdmin) {
      router.push("/admin/login"); // chuyển ngay
    } else {
      setCheckingAdmin(false); // có quyền -> render tiếp
    }
  }, [router]);
  const apiUrl = "http://127.0.0.1:8000/api/product";

  // --- Fetch products ---
  const fetchProducts = async () => {
    let url = `${apiUrl}?page=${page}&search=${search}`;
    if (selectedCategory) {
  url += `&category_id=${selectedCategory}`;
}
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data.data || data);
    setLastPage(data.last_page || 1);
  };

  const fetchCategories = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/categories/all");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    if (!checkingAdmin) fetchProducts();
    fetchCategories();
  }, [page, search,selectedCategory,checkingAdmin]);
if (checkingAdmin) {
    // ✅ Render null hoặc loading trong lúc kiểm tra
    return null;
  }

  // --- Add ---
  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category_id: "",
      thumbnail: null,
      description: "",
      content: "",
      price_buy: "",
      status: 1,
    });
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      category_id: product.category_id?.toString() || "",
      thumbnail: null,
      description: product.description || "",
      content: product.content || "",
      price_buy: product.store?.price_root || "",
      status: product.status || 1,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingProduct ? `${apiUrl}/${editingProduct.id}` : apiUrl;

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("category_id", formData.category_id);
    fd.append("description", formData.description || "");
    fd.append("content", formData.content || "");
    fd.append("price_buy", Number(formData.price_buy));
    fd.append("status", formData.status);
    if (formData.thumbnail instanceof File) {
      fd.append("thumbnail", formData.thumbnail);
    }
    if (editingProduct) fd.append("_method", "PUT");

    const res = await fetch(url, { method: "POST", body: fd });
    if (res.ok) {
      setShowForm(false);
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaFileAlt className="text-blue-500" /> Quản lý sản phẩm
        </h1>
        <button
          onClick={handleAdd}
          className="bg-blue-400 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
        >
          <FaPenFancy /> Thêm sản phẩm
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm sản phẩm..."
          className="border px-4 py-2 rounded-lg shadow w-1/3 focus:ring focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
          <select
            className="border px-4 py-2 rounded-lg shadow w-1/4"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1); // reset về trang 1 khi đổi category
            }}
          >
    <option value="">-- Tất cả danh mục --</option>
    {categories.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ))}
  </select>
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700">
            <tr>
              <th className="p-3 border">STT</th>
              <th className="p-3 border">Tên</th>
              <th className="p-3 border">Ảnh</th>
              <th className="p-3 border">Danh mục</th>
              <th className="p-3 border">Mô tả</th>
              <th className="p-3 border">Chi tiết</th>
              <th className="p-3 border">Giá mua</th>
              <th className="p-3 border text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 border">{idx + 1}</td>
                <td className="p-3 border font-medium">{p.name}</td>
                <td className="p-3 border">
                  {p.thumbnail && (
                    <img
                      src={`http://127.0.0.1:8000/images/${p.thumbnail}`}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded shadow"
                    />
                  )}
                </td>
                <td className="p-3 border">{p.category?.name}</td>
                <td className="p-3 border text-gray-600">{p.content}</td>
                <td className="p-3 border text-gray-500">{p.description}</td>
                <td className="p-3 border text-green-600 font-semibold">
                  {Number(p.price_buy).toLocaleString()} vnđ
                </td>
                <td className="p-3 border flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow flex items-center gap-1"
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow flex items-center gap-1"
                  >
                    <FaTrash /> Xóa
                  </button>
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow flex items-center gap-1"
                  >
                    🖼 Ảnh
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 bg-white shadow"
        >
          ⬅ Trước
        </button>
        <span className="px-3 py-1 bg-white shadow rounded">
          Trang {page}/{lastPage}
        </span>
        <button
          disabled={page === lastPage}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 bg-white shadow"
        >
          Sau ➡
        </button>
      </div>

      {/* Modal thêm/sửa */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[420px] border">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              {editingProduct ? (
                <>
                  <FaEdit className="text-yellow-500" /> Sửa sản phẩm
                </>
              ) : (
                <>
                  <FaPlus className="text-green-500" /> Thêm sản phẩm
                </>
              )}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Tên sản phẩm"
                className="border px-3 py-2 w-full rounded-lg"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <select
                className="border px-3 py-2 w-full rounded-lg"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id.toString()}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                type="file"
                className="border p-2 w-full rounded-lg"
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.files[0] })
                }
              />

              <input
                placeholder="Mô tả"
                className="border px-3 py-2 w-full rounded-lg"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
              <input
                placeholder="Chi tiết"
                className="border px-3 py-2 w-full rounded-lg"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Giá gốc"
                className="border px-3 py-2 w-full rounded-lg"
                value={formData.price_buy}
                onChange={(e) =>
                  setFormData({ ...formData, price_buy: Number(e.target.value) })
                }
                required
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
