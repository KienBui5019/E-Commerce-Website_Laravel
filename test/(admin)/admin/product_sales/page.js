// // "use client";
// // import { useState, useEffect, useRef } from "react";
// // import { FaPlus, FaUpload, FaEdit, FaTrash } from "react-icons/fa";

// // export default function ProductSaleAdmin() {
// //   const [sales, setSales] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [page, setPage] = useState(1);
// //   const [lastPage, setLastPage] = useState(1);
// //   const [products, setProducts] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editSale, setEditSale] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     product_id: "",
// //     price_sale: "",
// //     date_begin: "",
// //     date_end: "",
// //     status: 1,
// //   });

// //   const fileInputRef = useRef(null);

// //   // Load dữ liệu
// //   const loadData = () => {
// //     fetch(`http://127.0.0.1:8000/api/productsale?page=${page}&keyword=${search}`)
// //       .then(res => res.json())
// //       .then(data => {
// //         setSales(data.data);
// //         setLastPage(data.last_page);
// //       });
// //   };

// //   useEffect(() => {
// //     loadData();
// //   }, [page, search]);

// //   // Submit thêm/sửa
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     let url = "http://127.0.0.1:8000/api/productsale";
// //     let method = "POST";

// //     if (editSale) {
// //       url = `http://127.0.0.1:8000/api/productsale/${editSale.id}`;
// //       method = "PUT";
// //     }

// //     const res = await fetch(url, {
// //       method,
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(formData),
// //     });

// //     const data = await res.json();
// //     alert(editSale ? "Cập nhật thành công!" : "Thêm mới thành công!");
// //     setShowForm(false);
// //     setEditSale(null);
// //     loadData();
// //   };

// //   // Import file Excel
// //   const handleFileChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const formDataUpload = new FormData();
// //     formDataUpload.append("file", file);

// //     const res = await fetch("http://127.0.0.1:8000/api/productsales/import", {
// //       method: "POST",
// //       body: formDataUpload,
// //     });

// //     const data = await res.json();
// //     alert(data.message);
// //     loadData();
// //   };
// // useEffect(() => {
// //   fetch("http://localhost:8000/api/product")
// //     .then((res) => res.json())
// //     .then((data) => {
// //         console.log("API products:", data);
// //   setProducts(data.data ?? data); 
// //       // nếu API trả về dạng { data: [...] }
// //       if (Array.isArray(data)) {
// //         setProducts(data);
// //       } else if (Array.isArray(data.data)) {
// //         setProducts(data.data);
// //       } else {
// //         setProducts([]); // fallback
// //       }
// //     })
// //     .catch((err) => {
// //       console.error("Error fetching products:", err);
// //       setProducts([]);
// //     });
// // }, []);

// //   // Khi chọn sản phẩm
// //   const handleProductChange = (e) => {
// //     const id = e.target.value;
// //     setFormData({ ...formData, product_id: parseInt(id) });
// //     const product = products.find((p) => p.id === parseInt(id));
// //     setSelectedProduct(product || null);
// //   };

// //   return (
// //     <div className="p-6">
// //       <div className="flex items-center justify-between mb-4">
// //         <h2 className="text-xl font-bold">Quản lý KM</h2>
// //         <div className="flex gap-2">
// //           <button
// //             onClick={() => {
// //               setFormData({
// //                 name: "",
// //                 product_id: "",
// //                 price_sale: "",
// //                 date_begin: "",
// //                 date_end: "",
// //                 status: 1,
// //               });
// //               setEditSale(null);
// //               setShowForm(true);
// //             }}
// //             className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-1"
// //           >
// //             <FaPlus /> Thêm khuyến mãi
// //           </button>
// //           <button
// //             onClick={() => fileInputRef.current.click()}
// //             className="bg-green-500 text-white px-3 py-2 rounded-lg flex items-center gap-1"
// //           >
// //             <FaUpload /> Import Excel
// //           </button>
// //           <input
// //             type="file"
// //             ref={fileInputRef}
// //             accept=".xlsx,.xls"
// //             className="hidden"
// //             onChange={handleFileChange}
// //           />
// //         </div>
// //       </div>

// //       {/* Form thêm/sửa */}
// //       {showForm && (
// //         <form
// //           onSubmit={handleSubmit}
// //           className="border p-4 mb-4 bg-gray-50 rounded"
// //         >
// //           <h3 className="font-bold mb-2">
// //             {editSale ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}
// //           </h3>
// //           <div className="grid grid-cols-2 gap-4">
// //             <input
// //               type="text"
// //               placeholder="Tên khuyến mãi"
// //               className="border p-2 rounded"
// //               value={formData.name}
// //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //               required
// //             />
// //             {/* Chọn sản phẩm */}
// //             <select
// //               className="border p-2 rounded w-full"
// //               value={formData.product_id}
// //               onChange={handleProductChange}
// //               required
// //             >
// //               <option value="">-- Chọn sản phẩm --</option>
// //               {products.map((p) => (
// //                 <option key={p.id} value={p.id}>
// //                   {p.name}
// //                 </option>
// //               ))}
// //             </select>

// //             {/* Hiển thị card sản phẩm */}
// //             {selectedProduct && (
// //               <div className="border rounded-lg p-4 shadow-md">
// //                 <h3 className="font-bold text-lg">{selectedProduct.name}</h3>
// //                 <p className="text-gray-600">Giá: {Number(selectedProduct.price_buy).toLocaleString()} đ</p>
// //                 <p className="text-sm text-gray-500">{selectedProduct.description}</p>
// //                 {selectedProduct.image && (
// //                   <img
// //                     src={`http://localhost:8000/images/${selectedProduct.image}`}
// //                     alt={selectedProduct.name}
// //                     className="w-32 mt-2 rounded"
// //                   />
// //                 )}
// //               </div>
// //             )}
// //             <input
// //               type="number"
// //               placeholder="Giá khuyến mãi"
// //               className="border p-2 rounded"
// //               value={formData.price_sale}
// //               onChange={(e) => setFormData({ ...formData, price_sale: e.target.value })}
// //               required
// //             />
// //             <input
// //               type="date"
// //               className="border p-2 rounded"
// //               value={formData.date_begin}
// //               onChange={(e) => setFormData({ ...formData, date_begin: e.target.value })}
// //               required
// //             />
// //             <input
// //               type="date"
// //               className="border p-2 rounded"
// //               value={formData.date_end}
// //               onChange={(e) => setFormData({ ...formData, date_end: e.target.value })}
// //               required
// //             />
// //             <select
// //               className="border p-2 rounded"
// //               value={formData.status}
// //               onChange={(e) => setFormData({ ...formData, status:parseInt( e.target.value) })}
// //             >
// //               <option value={1}>Hoạt động</option>
// //               <option value={0}>Ẩn</option>
// //             </select>
// //           </div>
// //           <div className="mt-4 flex gap-2">
// //             <button
// //               type="submit"
// //               className="bg-blue-500 text-white px-4 py-2 rounded"
// //             >
// //               Lưu
// //             </button>
// //             <button
// //               type="button"
// //               onClick={() => setShowForm(false)}
// //               className="bg-gray-500 text-white px-4 py-2 rounded"
// //             >
// //               Hủy
// //             </button>
// //           </div>
// //         </form>
// //       )}

// //       {/* Bảng danh sách */}
// //       <table className="w-full border-collapse border">
// //         <thead className="bg-gray-100">
// //           <tr>
// //             <th className="border p-2">#</th>
// //             <th className="border p-2">Tên khuyến mãi</th>
// //             <th className="border p-2">Sản phẩm</th>
// //             <th className="border p-2">Giá KM</th>
// //             <th className="border p-2">Ngày bắt đầu</th>
// //             <th className="border p-2">Ngày kết thúc</th>
// //             <th className="border p-2">Trạng thái</th>
// //             <th className="border p-2">Hành động</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {sales.map((item, idx) => (
// //             <tr key={item.id} className="hover:bg-gray-50">
// //               <td className="border p-2">{idx + 1}</td>
// //               <td className="border p-2">{item.name}</td>
// //               <td className="border p-2">{item.product?.name}</td>
// //               <td className="border p-2 text-red-500">{item.price_sale}₫</td>
// //               <td className="border p-2">{item.date_begin}</td>
// //               <td className="border p-2">{item.date_end}</td>
// //               <td className="border p-2">
// //                 {item.status === 1 ? (
// //                   <span className="text-green-600">Hoạt động</span>
// //                 ) : (
// //                   <span className="text-gray-500">Ẩn</span>
// //                 )}
// //               </td>
// //               <td className="border p-2 flex gap-2">
// //                 <button
// //                   onClick={() => {
// //                     setEditSale(item);
// //                     setFormData(item);
// //                     setShowForm(true);
// //                   }}
// //                   className="bg-yellow-400 text-white px-2 py-1 rounded"
// //                 >
// //                   <FaEdit />
// //                 </button>
// //                 <button
// //                   onClick={async () => {
// //                     if (confirm("Xóa khuyến mãi này?")) {
// //                       await fetch(`http://127.0.0.1:8000/api/productsale/${item.id}`, {
// //                         method: "DELETE",
// //                       });
// //                       loadData();
// //                     }
// //                   }}
// //                   className="bg-red-500 text-white px-2 py-1 rounded"
// //                 >
// //                   <FaTrash />
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Phân trang */}
// //       <div className="mt-4 flex justify-center gap-2">
// //         {Array.from({ length: lastPage }, (_, i) => (
// //           <button
// //             key={i}
// //             onClick={() => setPage(i + 1)}
// //             className={`px-3 py-1 border rounded ${
// //               page === i + 1 ? "bg-blue-500 text-white" : "bg-white"
// //             }`}
// //           >
// //             {i + 1}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { useState, useEffect, useRef } from "react";
// import { FaPlus, FaUpload, FaEdit, FaTrash } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function ProductSaleAdmin() {
//   const [sales, setSales] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [editSale, setEditSale] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     product_id: "",
//     price_sale: "",
//     date_begin: "",
//     date_end: "",
//     status: 1,
//   });
//   const router = useRouter();

//   const fileInputRef = useRef(null);
//   const [checkingAdmin, setCheckingAdmin] = useState(true);

//   useEffect(() => {
//     const userAdmin = localStorage.getItem("userad");
//     if (!userAdmin) {
//       router.push("/admin/login"); // chuyển ngay
//     } else {
//       setCheckingAdmin(false); // có quyền -> render tiếp
//     }
//   }, [router]);
//   // Load dữ liệu
//   const loadData = () => {
//     fetch(`http://127.0.0.1:8000/api/productsale?page=${page}&keyword=${search}`)
//       .then(res => res.json())
//       .then(data => {
//         setSales(data.data);
//         setLastPage(data.last_page);
//       });
//   };

//   useEffect(() => {
//      if (!checkingAdmin) {loadData();}
//   }, [page, search,checkingAdmin]);

//   if (checkingAdmin) {
//     // ✅ Render null hoặc loading trong lúc kiểm tra
//     return null;
//   }
//   // Submit thêm/sửa
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let url = "http://127.0.0.1:8000/api/productsale";
//     let method = "POST";

//     if (editSale) {
//       url = `http://127.0.0.1:8000/api/productsale/${editSale.id}`;
//       method = "PUT";
//     }

//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     alert(editSale ? "Cập nhật thành công!" : "Thêm mới thành công!");
//     setShowForm(false);
//     setEditSale(null);
//     loadData();
//   };

//   // Import file Excel
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formDataUpload = new FormData();
//     formDataUpload.append("file", file);

//     const res = await fetch("http://127.0.0.1:8000/api/productsales/import", {
//       method: "POST",
//       body: formDataUpload,
//     });

//     const data = await res.json();
//     alert(data.message);
//     loadData();
//   };

//   // Load danh sách sản phẩm
//   useEffect(() => {
//     fetch("http://localhost:8000/api/product")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setProducts(data);
//         } else if (Array.isArray(data.data)) {
//           setProducts(data.data);
//         } else {
//           setProducts([]);
//         }
//       })
//       .catch(() => setProducts([]));
//   }, []);

//   // Khi chọn sản phẩm
//   const handleProductChange = (e) => {
//     const id = e.target.value;
//     setFormData({ ...formData, product_id: parseInt(id) });
//     const product = products.find((p) => p.id === parseInt(id));
//     setSelectedProduct(product || null);
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
//         <h2 className="text-2xl font-bold text-gray-700">🎉 Quản lý khuyến mãi</h2>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="🔍 Tìm kiếm..."
//             className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button
//             onClick={() => {
//               setFormData({
//                 name: "",
//                 product_id: "",
//                 price_sale: "",
//                 date_begin: "",
//                 date_end: "",
//                 status: 1,
//               });
//               setEditSale(null);
//               setShowForm(true);
//             }}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
//           >
//             <FaPlus /> Thêm KM
//           </button>
//           <button
//             onClick={() => fileInputRef.current.click()}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
//           >
//             <FaUpload /> Import
//           </button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             accept=".xlsx,.xls"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>

//       {/* Form thêm/sửa */}
//       {showForm && (
//         <div className="bg-white border rounded-xl shadow p-6 mb-6">
//           <h3 className="text-lg font-bold mb-4">
//             {editSale ? "✏️ Sửa khuyến mãi" : "➕ Thêm khuyến mãi"}
//           </h3>
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Tên khuyến mãi"
//               className="border p-2 rounded"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               required
//             />

//             <select
//               className="border p-2 rounded w-full"
//               value={formData.product_id}
//               onChange={handleProductChange}
//               required
//             >
//               <option value="">-- Chọn sản phẩm --</option>
//               {products.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.name}
//                 </option>
//               ))}
//             </select>

//             {/* Hiển thị sản phẩm khi chọn */}
//             {selectedProduct && (
//               <div className="col-span-2 flex items-center gap-4 p-3 border rounded-lg bg-gray-50 shadow-inner">
//                 {selectedProduct.image && (
//                   <img
//                     src={`http://localhost:8000/images/${selectedProduct.image}`}
//                     alt={selectedProduct.name}
//                     className="w-20 h-20 object-cover rounded-lg border"
//                   />
//                 )}
//                 <div>
//                   <h4 className="font-bold">{selectedProduct.name}</h4>
//                   <p className="text-gray-600">
//                     Giá gốc: {Number(selectedProduct.price_buy).toLocaleString()} đ
//                   </p>
//                   <p className="text-sm text-gray-500">{selectedProduct.description}</p>
//                 </div>
//               </div>
//             )}

//             <input
//               type="number"
//               placeholder="Giá khuyến mãi"
//               className="border p-2 rounded"
//               value={formData.price_sale}
//               onChange={(e) => setFormData({ ...formData, price_sale: e.target.value })}
//               required
//             />
//             <input
//               type="date"
//               className="border p-2 rounded"
//               value={formData.date_begin}
//               onChange={(e) => setFormData({ ...formData, date_begin: e.target.value })}
//               required
//             />
//             <input
//               type="date"
//               className="border p-2 rounded"
//               value={formData.date_end}
//               onChange={(e) => setFormData({ ...formData, date_end: e.target.value })}
//               required
//             />
//             <select
//               className="border p-2 rounded"
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
//             >
//               <option value={1}>Hoạt động</option>
//               <option value={0}>Ẩn</option>
//             </select>

//             <div className="col-span-2 flex gap-3 mt-3">
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
//               >
//                 Lưu
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="bg-gray-500 text-white px-5 py-2 rounded shadow hover:bg-gray-600"
//               >
//                 Hủy
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Bảng danh sách */}
//       <div className="overflow-x-auto border rounded-xl shadow">
//         <table className="w-full border-collapse">
//           <thead className="bg-blue-50 text-blue-700">
//             <tr>
//               <th className="p-3 text-left">#</th>
//               <th className="p-3 text-left">Tên KM</th>
//               <th className="p-3 text-left">Sản phẩm</th>
//               <th className="p-3 text-left">Giá KM</th>
//               <th className="p-3 text-left">Ngày bắt đầu</th>
//               <th className="p-3 text-left">Ngày kết thúc</th>
//               <th className="p-3 text-left">Trạng thái</th>
//               <th className="p-3 text-center">Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sales.map((item, idx) => (
//               <tr
//                 key={item.id}
//                 className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
//               >
//                 <td className="p-3">{idx + 1}</td>
//                 <td className="p-3">{item.name}</td>
//                 <td className="p-3">{item.product?.name}</td>
//                 <td className="p-3 text-red-500">{Number(item.price_sale).toLocaleString()} vnđ</td>
//                 <td className="p-3">{item.date_begin}</td>
//                 <td className="p-3">{item.date_end}</td>
//                 <td className="p-3">
//                   {item.status === 1 ? (
//                     <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
//                       Hoạt động
//                     </span>
//                   ) : (
//                     <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-600">
//                       Ẩn
//                     </span>
//                   )}
//                 </td>
//                 <td className="p-3 flex justify-center gap-2">
//                   <button
//                     onClick={() => {
//                       setEditSale(item);
//                       setFormData(item);
//                       setShowForm(true);
//                     }}
//                     className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded shadow"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={async () => {
//                       if (confirm("Xóa khuyến mãi này?")) {
//                         await fetch(`http://127.0.0.1:8000/api/productsale/${item.id}`, {
//                           method: "DELETE",
//                         });
//                         loadData();
//                       }
//                     }}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Phân trang */}
//       <div className="mt-6 flex justify-center gap-2">
//         {Array.from({ length: lastPage }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={`px-4 py-2 border rounded-lg shadow ${
//               page === i + 1
//                 ? "bg-blue-600 text-white"
//                 : "bg-white hover:bg-gray-100"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect, useRef } from "react";
import { FaPlus, FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ProductSaleAdmin() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editSale, setEditSale] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    product_id: "",
    price_sale: "",
    date_begin: "",
    date_end: "",
    status: 1,
  });
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  // Kiểm tra quyền admin
  useEffect(() => {
    const userAdmin = localStorage.getItem("userad");
    if (!userAdmin) {
      router.push("/admin/login");
    } else {
      setCheckingAdmin(false);
    }
  }, [router]);

  // Load danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/product");
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
        else if (Array.isArray(data.data)) setProducts(data.data);
        else setProducts([]);
      } catch {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // Load dữ liệu khuyến mãi
  useEffect(() => {
    if (!checkingAdmin) {
      const loadData = async () => {
        try {
          const res = await fetch(
            `http://127.0.0.1:8000/api/productsale?page=${page}&keyword=${search}`
          );
          const data = await res.json();
          setSales(data.data);
          setLastPage(data.last_page);
        } catch (err) {
          console.error(err);
        }
      };
      loadData();
    }
  }, [page, search, checkingAdmin]);

  if (checkingAdmin) return null; // Loading hoặc redirect

  // Khi chọn sản phẩm
  const handleProductChange = (e) => {
    const id = parseInt(e.target.value);
    setFormData({ ...formData, product_id: id });
    const product = products.find((p) => p.id === id);
    setSelectedProduct(product || null);
  };

  // Thêm / sửa khuyến mãi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editSale
      ? `http://127.0.0.1:8000/api/productsale/${editSale.id}`
      : "http://127.0.0.1:8000/api/productsale";
    const method = editSale ? "PUT" : "POST";
 console.log("Sending request to:", url);
  console.log("Method:", method);
  console.log("Payload:", formData);

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert(editSale ? "Cập nhật thành công!" : "Thêm mới thành công!");
      setShowForm(false);
      setEditSale(null);
      setFormData({
        name: "",
        product_id: "",
        price_sale: "",
        date_begin: "",
        date_end: "",
        status: 1,
      });
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      alert("Lỗi! Không thể lưu khuyến mãi.");
    }
  };

  // Import file Excel
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/productsales/import", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Lỗi import file!");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-bold text-gray-700">🎉 Quản lý khuyến mãi/tránh chồng khuyến mãi và trùng ngày startend</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm..."
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setFormData({
                name: "",
                product_id: "",
                price_sale: "",
                date_begin: "",
                date_end: "",
                status: 1,
              });
              setEditSale(null);
              setSelectedProduct(null);
              setShowForm(true);
            }}
            className="bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
          >
            <FaPlus /> Thêm KM
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
          >
            <FaUpload /> Import
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Form thêm/sửa */}
      {showForm && (
        <div className="bg-white border rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">
            {editSale ? "✏️ Sửa khuyến mãi" : "➕ Thêm khuyến mãi"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Tên khuyến mãi"
              className="border p-2 rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <select
              className="border p-2 rounded w-full"
              value={formData.product_id}
              onChange={handleProductChange}
              required
            >
              <option value="">-- Chọn sản phẩm --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {selectedProduct && (
              <div className="col-span-2 flex items-center gap-4 p-3 border rounded-lg bg-gray-50 shadow-inner">
                {selectedProduct.image && (
                  <img
                    src={`http://localhost:8000/images/${selectedProduct.image}`}
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                )}
                <div>
                  <h4 className="font-bold">{selectedProduct.name}</h4>
                  <p className="text-gray-600">
                    Giá gốc: {Number(selectedProduct.price_buy).toLocaleString()} đ
                  </p>
                  <p className="text-sm text-gray-500">{selectedProduct.description}</p>
                </div>
              </div>
            )}

            <input
              type="number"
              placeholder="Giá khuyến mãi"
              className="border p-2 rounded"
              value={formData.price_sale}
              onChange={(e) => setFormData({ ...formData, price_sale: e.target.value })}
              required
            />
            <input
              type="date"
              className="border p-2 rounded"
              value={formData.date_begin}
              onChange={(e) => setFormData({ ...formData, date_begin: e.target.value })}
              required
            />
            <input
              type="date"
              className="border p-2 rounded"
              value={formData.date_end}
              onChange={(e) => setFormData({ ...formData, date_end: e.target.value })}
              required
            />
            <select
              className="border p-2 rounded"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
            >
              <option value={1}>Hoạt động</option>
              <option value={0}>Ẩn</option>
            </select>

            <div className="col-span-2 flex gap-3 mt-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded shadow hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bảng danh sách */}
      <div className="overflow-x-auto border rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50 text-blue-700">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Tên KM</th>
              <th className="p-3 text-left">Sản phẩm</th>
              <th className="p-3 text-left">Giá KM</th>
              <th className="p-3 text-left">Ngày bắt đầu</th>
              <th className="p-3 text-left">Ngày kết thúc</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((item, idx) => (
              <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.product?.name}</td>
                <td className="p-3 text-red-500">{Number(item.price_sale).toLocaleString()} vnđ</td>
                <td className="p-3">{item.date_begin}</td>
                <td className="p-3">{item.date_end}</td>
                <td className="p-3">
                  {item.status === 1 ? (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-600">
                      Ẩn
                    </span>
                  )}
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setEditSale(item);
                      setFormData(item);
                      const product = products.find((p) => p.id === item.product_id);
                      setSelectedProduct(product || null);
                      setShowForm(true);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded shadow"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Xóa khuyến mãi này?")) {
                        await fetch(`http://127.0.0.1:8000/api/productsale/${item.id}`, {
                          method: "DELETE",
                        });
                        setSales((prev) => prev.filter((s) => s.id !== item.id));
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: lastPage }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded-lg shadow ${
              page === i + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
