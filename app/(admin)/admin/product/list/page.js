// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";

// // export default function ProductsPage() {
// //   const router = useRouter();
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [search, setSearch] = useState("");
// //   const [categoryId, setCategoryId] = useState("");
// //   const [page, setPage] = useState(1);
// //   const [lastPage, setLastPage] = useState(1);
// //   const itemsPerPage = 3;

// //   // const fetchProducts = async () => {
// //   //   setLoading(true);
// //   //   try {
// //   //     const res = await fetch(
// //   //       `http://localhost:8000/api/products?search=${search}&category_id=${categoryId}&page=${page}`
// //   //     );
// //   //     if (!res.ok) throw new Error("Lỗi API");
// //   //     const result = await res.json();
// //   //     setProducts(result.data || []);
// //   //     setLastPage(result.last_page || 1);
// //   //   } catch (err) {
// //   //     console.error(err);
// //   //     setError("Không thể tải sản phẩm");
// //   //     setProducts([]);
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };
// //   const fetchProducts = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch(
// //         `http://localhost:8000/api/products?search=${search}&category_id=${categoryId}&page=${page}&limit=${itemsPerPage}`
// //       );
// //       if (!res.ok) throw new Error("Lỗi API");
// //       const result = await res.json();
// //       setProducts(result.data || []);
// //       setLastPage(result.last_page || 1);
// //     } catch (err) {
// //       console.error(err);
// //       setError("Không thể tải sản phẩm");
// //       setProducts([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchCategories = async () => {
// //     try {
// //       const res = await fetch("http://localhost:8000/api/categories");
// //       const result = await res.json();
// //       setCategories(result || []);
// //     } catch (err) {
// //       console.error("Lỗi tải categories", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   useEffect(() => {
// //     fetchProducts();
// //   }, [search, categoryId, page]);

// //   const handleEdit = (p) => {
// //     router.push(`/admin/product/edit/${p.id}`);
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
// //     try {
// //       const res = await fetch(`http://localhost:8000/api/products/${id}`, {
// //         method: "DELETE",
// //       });
// //       if (!res.ok) throw new Error("Xóa thất bại");
// //       fetchProducts();
// //     } catch (err) {
// //       console.error(err);
// //       alert(err.message || "Xóa thất bại");
// //     }
// //   };

// //   return (
// //     <div className="text-gray-800 bg-gray-50 min-h-screen p-6">
// //       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
// //         <h2 className="text-3xl font-bold text-yellow-600">Quản lý sản phẩm</h2>
// //         <button
// //           onClick={() => router.push("/admin/product/add")}
// //           className="bg-yellow-500 text-black px-4 py-2 rounded shadow hover:bg-yellow-600 transition font-semibold"
// //         >
// //           Thêm sản phẩm
// //         </button>
// //       </div>

// //       {/* Thanh tìm kiếm + lọc */}
// //       <div className="flex flex-col md:flex-row gap-4 mb-6">
// //         <input
// //           type="text"
// //           placeholder="Tìm kiếm sản phẩm..."
// //           value={search}
// //           onChange={(e) => {
// //             setSearch(e.target.value);
// //             setPage(1);
// //           }}
// //           className="border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full md:w-1/3"
// //         />

// //         <select
// //           value={categoryId}
// //           onChange={(e) => {
// //             setCategoryId(e.target.value);
// //             setPage(1);
// //           }}
// //           className="border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full md:w-1/4"
// //         >
// //           <option value="">-- Tất cả danh mục --</option>
// //           {categories.map((c) => (
// //             <option key={c.id} value={c.id}>
// //               {c.name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {loading ? (
// //         <p className="text-center py-10">Đang tải sản phẩm...</p>
// //       ) : error ? (
// //         <p className="text-center text-red-500 py-10">{error}</p>
// //       ) : products.length === 0 ? (
// //         <p className="text-center py-10">Không có sản phẩm</p>
// //       ) : (
// //         <>
// //           <table className="w-full border-collapse bg-white shadow rounded overflow-hidden">
// //             <thead className="bg-yellow-100 text-black">
// //               <tr>
// //                 <th className="border p-3 text-left">ID</th>
// //                 <th className="border p-3 text-left">Ảnh</th>
// //                 <th className="border p-3 text-left">Tên sản phẩm</th>
// //                 <th className="border p-3 text-left">Category</th>
// //                 <th className="border p-3 text-left">Giá</th>
// //                 <th className="border p-3 text-left">Hành động</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {products.map((product) => (
// //                 <tr key={product.id} className="hover:bg-yellow-50 transition">
// //                   <td className="border p-3">{product.id}</td>
// //                   <td className="border p-3">
// //                     {product.thumbnail_url && (
// //                       <img
// //                         src={product.thumbnail_url}
// //                         alt={product.name}
// //                         className="w-32 h-32 object-cover"
// //                       />
// //                     )}
// //                   </td>
// //                   <td className="border p-3 font-medium">{product.name}</td>
// //                   <td className="border p-3">
// //                     {product.category?.name || "-"}
// //                   </td>
// //                   <td className="border p-3">
// //                     {product.price_buy.toLocaleString()}₫
// //                   </td>
// //                   <td className="border p-2 text-center">
// //                     <div className="inline-flex gap-2">
// //                       <button
// //                         onClick={() => handleEdit(product)}
// //                         className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600 transition font-semibold"
// //                       >
// //                         Sửa
// //                       </button>
// //                       <button
// //                         onClick={() => handleDelete(product.id)}
// //                         className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition font-semibold"
// //                       >
// //                         Xóa
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>

// //           {/* Pagination */}
// //           <div className="flex justify-center items-center mt-6 gap-2">
// //             <button
// //               disabled={page <= 1}
// //               onClick={() => setPage(page - 1)}
// //               className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
// //             >
// //               « Trước
// //             </button>
// //             <span className="px-3 py-2">
// //               Trang {page} / {lastPage}
// //             </span>
// //             <button
// //               disabled={page >= lastPage}
// //               onClick={() => setPage(page + 1)}
// //               className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
// //             >
// //               Sau »
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const itemsPerPage = 3;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/products?search=${search}&category_id=${categoryId}&page=${page}&limit=${itemsPerPage}`
      );
      if (!res.ok) throw new Error("Lỗi API");
      const result = await res.json();
      setProducts(result.data || []);
      setLastPage(result.last_page || 1);
    } catch (err) {
      console.error(err);
      setError("Không thể tải sản phẩm");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/categories");
      const result = await res.json();
      setCategories(result || []);
    } catch (err) {
      console.error("Lỗi tải categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, categoryId, page]);

  const handleEdit = (p) => router.push(`/admin/product/edit/${p.id}`);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.message || "Xóa thất bại");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h2>
        <button
          onClick={() => router.push("/admin/product/add")}
          className="bg-gray-900 text-white px-4 py-2 rounded shadow hover:bg-yellow-900 transition font-semibold"
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Tìm kiếm & Lọc */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 px-3 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/4 px-3 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">-- Tất cả danh mục --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center py-10">Đang tải sản phẩm...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-10">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center py-10">Không có sản phẩm</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow rounded">
            <table className=" w-full border-collapse text-left">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-3 border-b">ID</th>
                  <th className="p-3 border-b">Ảnh</th>
                  <th className="p-3 border-b">Tên sản phẩm</th>
                  <th className="p-3 border-b">Danh mục</th>
                  <th className="p-3 border-b">Giá</th>
                  <th className="p-3 border-b">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-yellow-50 transition cursor-pointer"
                  >
                    <td className="p-3 border-b">{p.id}</td>
                    <td className="p-3 border-b">
                      {p.thumbnail_url && (
                        <img
                          src={p.thumbnail_url}
                          alt={p.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="p-3 border-b font-medium">{p.name}</td>
                    <td className="p-3 border-b">{p.category?.name || "-"}</td>
                    <td className="p-3 border-b">
                      {p.price_buy.toLocaleString()}₫
                    </td>
                    <td className="p-3 border-b text-center">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600 transition font-semibold"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition font-semibold"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-900 transition"
            >
              « Trước
            </button>
            {Array.from({ length: lastPage }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-2 border rounded transition ${
                  page === i + 1 ? "bg-yellow-200 font-semibold" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page >= lastPage}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-900 transition"
            >
              Sau »
            </button>
          </div>
        </>
      )}
    </div>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function ProductsPage() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [page, setPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1);
//   const itemsPerPage = 3;

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(
//         `http://localhost:8000/api/products?search=${search}&category_id=${categoryId}&page=${page}&limit=${itemsPerPage}`
//       );
//       const result = await res.json();
//       setProducts(result.data || []); // chỉ cần data
//       setLastPage(result.last_page || 1);
//       console.log("Products API result:", result);

//       // Cố gắng lấy dữ liệu, fallback nếu key không tồn tại
//       const data = result.data || result.products || result.items || []; // thử các key phổ biến
//       const last_page =
//         result.last_page ||
//         result.pagination?.last_page ||
//         result.meta?.last_page ||
//         1;

//       setProducts(data);
//       setLastPage(last_page);
//     } catch (err) {
//       console.error(err);
//       setError("Không thể tải sản phẩm");
//       setProducts([]);
//       setLastPage(1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/categories");
//       const result = await res.json();
//       console.log("Categories API result:", result);
//       setCategories(result || []);
//     } catch (err) {
//       console.error("Lỗi tải categories", err);
//       setCategories([]);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [search, categoryId, page]);

//   const handleEdit = (product) =>
//     router.push(`/admin/product/edit/${product.id}`);
//   const handleDelete = async (id) => {
//     if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
//     try {
//       const res = await fetch(`http://localhost:8000/api/products/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Xóa thất bại");
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Xóa thất bại");
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <h2 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h2>
//         <button
//           onClick={() => router.push("/admin/product/add")}
//           className="bg-gray-900 text-white px-4 py-2 rounded shadow hover:bg-yellow-900 transition font-semibold"
//         >
//           Thêm sản phẩm
//         </button>
//       </div>

//       {/* Search & Filter */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Tìm kiếm sản phẩm..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//           className="w-full md:w-1/3 px-3 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
//         />
//         <select
//           value={categoryId}
//           onChange={(e) => {
//             setCategoryId(e.target.value);
//             setPage(1);
//           }}
//           className="w-full md:w-1/4 px-3 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
//         >
//           <option value="">-- Tất cả danh mục --</option>
//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Products Table */}
//       {loading ? (
//         <p className="text-center py-10">Đang tải sản phẩm...</p>
//       ) : error ? (
//         <p className="text-center text-red-500 py-10">{error}</p>
//       ) : products.length === 0 ? (
//         <p className="text-center py-10">Không có sản phẩm</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto bg-white shadow rounded">
//             <table className=" w-full border-collapse text-left">
//               <thead className="bg-gray-900 text-white">
//                 <tr>
//                   <th className="p-3 border-b">ID</th>
//                   <th className="p-3 border-b">Ảnh</th>
//                   <th className="p-3 border-b">Tên sản phẩm</th>
//                   <th className="p-3 border-b">Danh mục</th>
//                   <th className="p-3 border-b">Giá</th>
//                   <th className="p-3 border-b">Hành động</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((p) => (
//                   <tr
//                     key={p.id}
//                     className="hover:bg-yellow-50 transition cursor-pointer"
//                   >
//                     <td className="p-3 border-b">{p.id}</td>
//                     <td className="p-3 border-b">
//                       {p.thumbnail_url || p.thumbnail ? (
//                         <img
//                           src={p.thumbnail_url || p.thumbnail}
//                           alt={p.name}
//                           className="w-24 h-24 object-cover rounded"
//                         />
//                       ) : (
//                         <span>-</span>
//                       )}
//                     </td>
//                     <td className="p-3 border-b font-medium">{p.name}</td>
//                     <td className="p-3 border-b">{p.category?.name || "-"}</td>
//                     <td className="p-3 border-b">
//                       {p.price_buy
//                         ? Number(p.price_buy).toLocaleString() + "₫"
//                         : "-"}
//                     </td>
//                     <td className="p-3 border-b text-center">
//                       <div className="inline-flex gap-2">
//                         <button
//                           onClick={() => handleEdit(p)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600 transition font-semibold"
//                         >
//                           Sửa
//                         </button>
//                         <button
//                           onClick={() => handleDelete(p.id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition font-semibold"
//                         >
//                           Xóa
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-3 mt-6">
//             <button
//               disabled={page <= 1}
//               onClick={() => setPage(page - 1)}
//               className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-900 transition"
//             >
//               « Trước
//             </button>
//             {Array.from({ length: lastPage }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-3 py-2 border rounded transition ${
//                   page === i + 1 ? "bg-yellow-200 font-semibold" : ""
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               disabled={page >= lastPage}
//               onClick={() => setPage(page + 1)}
//               className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-900 transition"
//             >
//               Sau »
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
