// // "use client";

// // import Link from "next/link";
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useRouter } from "next/navigation";

// // export default function ProductsPage() {
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [viewMode, setViewMode] = useState("grid");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const router = useRouter();
// //   const [filters, setFilters] = useState([]); // lưu category_id được chọn
// //   const perPage = 6;

// //   const addToCart = (product) => {
// //     const user = localStorage.getItem("main_user"); // kiểm tra login
// //     if (!user) {
// //       alert("❌ Bạn cần đăng nhập để thêm sản phẩm vào giỏ!");
// //       router.push("/main/login"); // redirect sang login
// //       return;
// //     }

// //     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
// //     const existing = cart.find((item) => item.id === product.id);

// //     if (existing) {
// //       existing.quantity = (existing.quantity || 1) + 1;
// //     } else {
// //       cart.push({
// //         id: product.id,
// //         name: product.name,
// //         price: product.price_buy || 0,
// //         salePrice: product.sale_price || 0,
// //         thumbnail: product.thumbnail_url || "/images/no-image.png",
// //         quantity: 1,
// //       });
// //     }

// //     localStorage.setItem("cart", JSON.stringify(cart));
// //     alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
// //   };

// //   // ✅ Lấy sản phẩm
// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       setLoading(true);
// //       try {
// //         const res = await axios.get(
// //           `http://localhost:8000/api/products?limit=${perPage}&page=${currentPage}`
// //         );
// //         const productsArray = res.data.data || res.data || [];
// //         setProducts(productsArray);
// //       } catch (err) {
// //         console.error("Lỗi khi lấy sản phẩm:", err);
// //         setProducts([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, [currentPage]);

// //   // ✅ Lấy danh mục
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:8000/api/categories");
// //         setCategories(res.data || []);
// //       } catch (err) {
// //         console.error("Lỗi khi lấy categories:", err);
// //         setCategories([]);
// //       }
// //     };

// //     fetchCategories();
// //   }, []);

// //   // ✅ Tick/untick filter
// //   const handleFilterChange = (id) => {
// //     if (filters.includes(id)) {
// //       setFilters(filters.filter((f) => f !== id));
// //     } else {
// //       setFilters([...filters, id]);
// //     }
// //   };

// //   // ✅ Lọc sản phẩm theo category_id
// //   const filteredProducts =
// //     filters.length === 0
// //       ? products
// //       : products.filter((p) => filters.includes(p.category_id));

// //   if (loading)
// //     return (
// //       <div className="text-center py-10 text-yellow-400">
// //         Đang tải sản phẩm...
// //       </div>
// //     );

// //   const goToPage = (page) => setCurrentPage(page);

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8 text-yellow-400">
// //       <h1 className="text-2xl font-bold mb-6">Sản phẩm</h1>

// //       <div className="grid grid-cols-4 gap-6">
// //         {/* Sidebar */}
// //         <aside className="col-span-1 border rounded-lg p-4 bg-gray-900">
// //           <h2 className="font-semibold mb-4">Bộ lọc</h2>
// //           <div className="mb-3">
// //             <h3 className="font-medium">Danh mục</h3>
// //             <ul className="text-sm space-y-1">
// //               {categories.map((cat) => (
// //                 <li key={cat.id}>
// //                   <label>
// //                     <input
// //                       type="checkbox"
// //                       checked={filters.includes(cat.id)}
// //                       onChange={() => handleFilterChange(cat.id)}
// //                     />{" "}
// //                     {cat.name}
// //                   </label>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </aside>

// //         {/* Main */}
// //         <main className="col-span-3">
// //           <div
// //             className={
// //               viewMode === "grid"
// //                 ? "grid grid-cols-3 gap-6"
// //                 : "flex flex-col space-y-4"
// //             }
// //           >
// //             {filteredProducts.map((p) => (
// //               <div
// //                 key={p.id}
// //                 className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
// //               >
// //                 <div className="w-full h-64 flex justify-center items-center bg-white rounded-lg overflow-hidden mb-3">
// //                   <img
// //                     src={p.thumbnail_url || "/images/no-image.png"}
// //                     alt={p.name}
// //                     className="w-full h-full object-cover"
// //                   />
// //                 </div>

// //                 <h3 className="font-semibold">{p.name}</h3>
// //                 <div className="mb-3">
// //                   <span className="font-bold text-red-500">
// //                     {parseFloat(p.price_buy).toLocaleString()}đ
// //                   </span>
// //                 </div>

// //                 {/* Nút */}
// //                 <div className="flex flex-row space-x-2 mt-3">
// //                   <Link
// //                     href={`/main/product/${p.slug}`}
// //                     className="flex-1 px-2 py-2 bg-yellow-400 text-white font-medium rounded
// //                hover:bg-white hover:text-green-400 border border-yellow-400 transition text-center"
// //                   >
// //                     Xem chi tiết
// //                   </Link>

// //                   <button
// //                     onClick={() => addToCart(p)}
// //                     className="flex-1 px-2 py-2 bg-green-500 text-white font-medium rounded
// //                hover:bg-white hover:text-yellow-400 border border-green-500 transition"
// //                   >
// //                     Thêm vào giỏ
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Pagination */}
// //           <div className="flex justify-center mt-6 space-x-2">
// //             <button
// //               onClick={() => goToPage(currentPage - 1)}
// //               disabled={currentPage === 1}
// //               className="px-3 py-1 border rounded disabled:opacity-50"
// //             >
// //               Trước
// //             </button>
// //             {[...Array(5)].map((_, i) => {
// //               const page = i + 1;
// //               return (
// //                 <button
// //                   key={page}
// //                   onClick={() => goToPage(page)}
// //                   className={`px-3 py-1 border rounded ${
// //                     currentPage === page ? "bg-yellow-400 text-black" : ""
// //                   }`}
// //                 >
// //                   {page}
// //                 </button>
// //               );
// //             })}
// //             <button
// //               onClick={() => goToPage(currentPage + 1)}
// //               className="px-3 py-1 border rounded"
// //             >
// //               Tiếp
// //             </button>
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }
// // "use client";

// // import Link from "next/link";
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useRouter } from "next/navigation";

// // export default function ProductsPage() {
// //   const router = useRouter();
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [viewMode, setViewMode] = useState("grid"); // grid | list
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [filters, setFilters] = useState({
// //     categories: [],
// //     price: "",
// //     color: "",
// //     size: "",
// //     status: "",
// //   });
// //   const [sort, setSort] = useState("newest");
// //   const perPage = 10;

// //   // ✅ Thêm giỏ hàng
// //   const addToCart = (product) => {
// //     const user = localStorage.getItem("main_user");
// //     if (!user) {
// //       alert("❌ Bạn cần đăng nhập để thêm sản phẩm vào giỏ!");
// //       router.push("/main/login");
// //       return;
// //     }

// //     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
// //     const existing = cart.find((item) => item.id === product.id);
// //     if (existing) {
// //       existing.quantity = (existing.quantity || 1) + 1;
// //     } else {
// //       cart.push({
// //         id: product.id,
// //         name: product.name,
// //         price: product.price_buy || 0,
// //         salePrice: product.sale_price || 0,
// //         thumbnail: product.thumbnail_url || "/images/no-image.png",
// //         quantity: 1,
// //       });
// //     }
// //     localStorage.setItem("cart", JSON.stringify(cart));
// //     alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
// //   };

// //   // ✅ Lấy sản phẩm
// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       setLoading(true);
// //       try {
// //         const res = await axios.get(`http://localhost:8000/api/products`);
// //         setProducts(res.data.data || res.data || []);
// //       } catch (err) {
// //         console.error("Lỗi khi lấy sản phẩm:", err);
// //         setProducts([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchProducts();
// //   }, [currentPage]);

// //   // ✅ Lấy danh mục
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:8000/api/categories");
// //         setCategories(res.data || []);
// //       } catch (err) {
// //         console.error("Lỗi khi lấy categories:", err);
// //         setCategories([]);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   // ✅ Lọc sản phẩm theo filters
// //   const filteredProducts = products
// //     .filter((p) => {
// //       if (
// //         filters.categories.length > 0 &&
// //         !filters.categories.includes(p.category_id)
// //       )
// //         return false;

// //       if (filters.price === "<500k") return p.price_buy < 500000;
// //       if (filters.price === "500k-2m")
// //         return p.price_buy >= 500000 && p.price_buy <= 2000000;
// //       if (filters.price === ">2m") return p.price_buy > 2000000;

// //       if (filters.status === "sale" && !p.sale_price) return false;
// //       if (filters.status === "out" && p.stock > 0) return false;
// //       if (filters.status === "new" && p.is_new !== true) return false;

// //       return true;
// //     })
// //     .sort((a, b) => {
// //       switch (sort) {
// //         case "low-high":
// //           return a.price_buy - b.price_buy;
// //         case "high-low":
// //           return b.price_buy - a.price_buy;
// //         case "discount":
// //           return (b.sale_price || 0) - (a.sale_price || 0);
// //         default:
// //           return b.id - a.id; // newest
// //       }
// //     });

// //   if (loading)
// //     return <p className="text-center py-10 text-yellow-400">Đang tải...</p>;

// //   const toggleCategory = (id) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       categories: prev.categories.includes(id)
// //         ? prev.categories.filter((c) => c !== id)
// //         : [...prev.categories, id],
// //     }));
// //   };

// //   const goToPage = (page) => setCurrentPage(page);

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8 text-yellow-400">
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-2xl font-bold">Sản phẩm</h1>
// //         <div className="flex gap-3 items-center">
// //           <select
// //             value={sort}
// //             onChange={(e) => setSort(e.target.value)}
// //             className="text-yellow px-2 py-1 rounded"
// //           >
// //             <option value="newest">Mới nhất</option>
// //             <option value="low-high">Giá thấp → cao</option>
// //             <option value="high-low">Giá cao → thấp</option>
// //             <option value="discount">Giảm giá nhiều nhất</option>
// //           </select>

// //           <button
// //             onClick={() => setViewMode("grid")}
// //             className={`px-3 py-1 border rounded ${
// //               viewMode === "grid" ? "bg-yellow-400 text-black" : ""
// //             }`}
// //           >
// //             Lưới
// //           </button>
// //           <button
// //             onClick={() => setViewMode("list")}
// //             className={`px-3 py-1 border rounded ${
// //               viewMode === "list" ? "bg-yellow-400 text-black" : ""
// //             }`}
// //           >
// //             Danh sách
// //           </button>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-4 gap-6">
// //         {/* Sidebar */}
// //         <aside className="col-span-1 border rounded-lg p-4 bg-gray-900">
// //           <h2 className="font-semibold mb-4">Bộ lọc</h2>

// //           <div className="mb-4">
// //             <h3 className="font-medium">Danh mục</h3>
// //             <ul className="text-sm space-y-1">
// //               {categories.map((cat) => (
// //                 <li key={cat.id}>
// //                   <label>
// //                     <input
// //                       type="checkbox"
// //                       checked={filters.categories.includes(cat.id)}
// //                       onChange={() => toggleCategory(cat.id)}
// //                     />{" "}
// //                     {cat.name}
// //                   </label>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           <div className="mb-4">
// //             <h3 className="font-medium">Khoảng giá</h3>
// //             <ul className="text-sm space-y-1">
// //               {["<500k", "500k-2m", ">2m"].map((v) => (
// //                 <li key={v}>
// //                   <label>
// //                     <input
// //                       type="radio"
// //                       name="price"
// //                       checked={filters.price === v}
// //                       onChange={() =>
// //                         setFilters((prev) => ({ ...prev, price: v }))
// //                       }
// //                     />{" "}
// //                     {v === "<500k"
// //                       ? "< 500.000đ"
// //                       : v === "500k-2m"
// //                       ? "500.000đ - 2.000.000đ"
// //                       : "> 2.000.000đ"}
// //                   </label>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           <div className="mb-4">
// //             <h3 className="font-medium">Tình trạng</h3>
// //             <select
// //               value={filters.status}
// //               onChange={(e) =>
// //                 setFilters((prev) => ({ ...prev, status: e.target.value }))
// //               }
// //               className="w-full text-black px-2 py-1 rounded"
// //             >
// //               <option value="">Tất cả</option>
// //               <option value="ProductNew">Mới</option>
// //               <option value="sale">Giảm giá</option>
// //               <option value="out">Hết hàng</option>
// //             </select>
// //           </div>
// //         </aside>

// //         {/* Main */}
// //         <main className="col-span-3">
// //           {filteredProducts.length === 0 ? (
// //             <p>Không tìm thấy sản phẩm phù hợp</p>
// //           ) : viewMode === "grid" ? (
// //             <div className="grid grid-cols-3 gap-6">
// //               {filteredProducts.map((p) => (
// //                 <div
// //                   key={p.id}
// //                   className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
// //                 >
// //                   <img
// //                     src={p.thumbnail_url || "/images/no-image.png"}
// //                     alt={p.name}
// //                     className="w-full h-56 object-cover mb-3 rounded"
// //                   />
// //                   <h3 className="font-semibold text-black">{p.name}</h3>
// //                   <div className="mb-3 text-red-500 font-bold">
// //                     {parseFloat(p.price_buy).toLocaleString()}đ
// //                   </div>

// //                   <div className="flex space-x-2">
// //                     <Link
// //                       href={`/main/product/${p.slug}`}
// //                       className="flex-1 px-2 py-2 bg-yellow-400 text-white font-medium rounded
// //                       hover:bg-white hover:text-green-400 border border-yellow-400 transition text-center"
// //                     >
// //                       Xem chi tiết
// //                     </Link>
// //                     <button
// //                       onClick={() => addToCart(p)}
// //                       className="flex-1 px-2 py-2 bg-green-500 text-white font-medium rounded
// //                       hover:bg-white hover:text-yellow-400 border border-green-500 transition"
// //                     >
// //                       Thêm vào giỏ
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             // list view
// //             <div className="space-y-4">
// //               {filteredProducts.map((p) => (
// //                 <div
// //                   key={p.id}
// //                   className="flex border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
// //                 >
// //                   <img
// //                     src={p.thumbnail_url || "/images/no-image.png"}
// //                     alt={p.name}
// //                     className="w-40 h-40 object-cover rounded mr-4"
// //                   />
// //                   <div className="flex-1 text-black">
// //                     <h3 className="font-semibold text-lg">{p.name}</h3>
// //                     <p className="text-sm text-gray-600 mb-2">
// //                       {p.description?.slice(0, 100) || "Không có mô tả"}
// //                     </p>
// //                     <div className="text-red-500 font-bold mb-2">
// //                       {parseFloat(p.price_buy).toLocaleString()}đ
// //                     </div>
// //                     <div className="flex space-x-2">
// //                       <Link
// //                         href={`/main/product/${p.slug}`}
// //                         className="px-3 py-2 bg-yellow-400 text-white rounded hover:bg-white hover:text-green-400 border border-yellow-400 transition"
// //                       >
// //                         Xem chi tiết
// //                       </Link>
// //                       <button
// //                         onClick={() => addToCart(p)}
// //                         className="px-3 py-2 bg-green-500 text-white rounded hover:bg-white hover:text-yellow-400 border border-green-500 transition"
// //                       >
// //                         Thêm vào giỏ
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* Pagination */}
// //           <div className="flex justify-center mt-6 space-x-2">
// //             <button
// //               onClick={() => goToPage(currentPage - 1)}
// //               disabled={currentPage === 1}
// //               className="px-3 py-1 border rounded disabled:opacity-50"
// //             >
// //               Trước
// //             </button>
// //             {[...Array(5)].map((_, i) => {
// //               const page = i + 1;
// //               return (
// //                 <button
// //                   key={page}
// //                   onClick={() => goToPage(page)}
// //                   className={`px-3 py-1 border rounded ${
// //                     currentPage === page ? "bg-yellow-400 text-black" : ""
// //                   }`}
// //                 >
// //                   {page}
// //                 </button>
// //               );
// //             })}
// //             <button
// //               onClick={() => goToPage(currentPage + 1)}
// //               className="px-3 py-1 border rounded"
// //             >
// //               Tiếp
// //             </button>
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function ProductsPage() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState("grid"); // grid | list
//   const [currentPage, setCurrentPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1);
//   const perPage = 6;

//   // Filters & sort
//   const [filters, setFilters] = useState({
//     categories: [],
//     price: "",
//     status: "",
//   });
//   const [sort, setSort] = useState("newest");

//   // ✅ Thêm giỏ hàng
//   const addToCart = (product) => {
//     const user = localStorage.getItem("main_user");
//     if (!user) {
//       alert("❌ Bạn cần đăng nhập để thêm sản phẩm vào giỏ!");
//       router.push("/main/login");
//       return;
//     }

//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existing = cart.find((item) => item.id === product.id);
//     if (existing) {
//       existing.quantity = (existing.quantity || 1) + 1;
//     } else {
//       cart.push({
//         id: product.id,
//         name: product.name,
//         price: product.price_buy || 0,
//         salePrice: product.sale_price || 0,
//         thumbnail: product.thumbnail_url || "/images/no-image.png",
//         quantity: 1,
//       });
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
//   };

//   // ✅ Lấy sản phẩm phân trang từ API
//   const fetchProducts = async (page = 1) => {
//     setLoading(true);
//     try {
//       const params = { page, limit: perPage };

//       // Thêm filter server-side nếu cần
//       if (filters.categories.length)
//         params.category_id = filters.categories.join(",");
//       if (filters.price) params.price = filters.price;
//       if (filters.status) params.status = filters.status;
//       if (sort) params.sort = sort;

//       const res = await axios.get("http://localhost:8000/api/products", {
//         params,
//       });

//       setProducts(res.data.data || []);
//       setCurrentPage(res.data.current_page || page);
//       setLastPage(res.data.last_page || 1);
//     } catch (err) {
//       console.error("Lỗi khi lấy sản phẩm:", err);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Lấy danh mục
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/api/categories");
//         setCategories(res.data || []);
//       } catch (err) {
//         console.error("Lỗi khi lấy categories:", err);
//         setCategories([]);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // ✅ Fetch products khi thay đổi page, filter, sort
//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage, filters, sort]);

//   const toggleCategory = (id) => {
//     setFilters((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(id)
//         ? prev.categories.filter((c) => c !== id)
//         : [...prev.categories, id],
//     }));
//     setCurrentPage(1); // reset về trang 1 khi filter
//   };

//   const goToPage = (page) => {
//     if (page < 1 || page > lastPage) return;
//     setCurrentPage(page);
//   };

//   if (loading)
//     return <p className="text-center py-10 text-yellow-400">Đang tải...</p>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 text-yellow-400">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Sản phẩm</h1>
//         <div className="flex gap-3 items-center">
//           <select
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             className="text-yellow px-2 py-1 rounded"
//           >
//             <option value="newest">Mới nhất</option>
//             <option value="low-high">Giá thấp → cao</option>
//             <option value="high-low">Giá cao → thấp</option>
//             <option value="discount">Giảm giá nhiều nhất</option>
//           </select>

//           <button
//             onClick={() => setViewMode("grid")}
//             className={`px-3 py-1 border rounded ${
//               viewMode === "grid" ? "bg-yellow-400 text-black" : ""
//             }`}
//           >
//             Lưới
//           </button>
//           <button
//             onClick={() => setViewMode("list")}
//             className={`px-3 py-1 border rounded ${
//               viewMode === "list" ? "bg-yellow-400 text-black" : ""
//             }`}
//           >
//             Danh sách
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-4 gap-6">
//         {/* Sidebar */}
//         <aside className="col-span-1 border rounded-lg p-4 bg-gray-900">
//           <h2 className="font-semibold mb-4">Bộ lọc</h2>

//           <div className="mb-4">
//             <h3 className="font-medium">Danh mục</h3>
//             <ul className="text-sm space-y-1">
//               {categories.map((cat) => (
//                 <li key={cat.id}>
//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={filters.categories.includes(cat.id)}
//                       onChange={() => toggleCategory(cat.id)}
//                     />{" "}
//                     {cat.name}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mb-4">
//             <h3 className="font-medium">Khoảng giá</h3>
//             <ul className="text-sm space-y-1">
//               {["<500k", "500k-2m", ">2m"].map((v) => (
//                 <li key={v}>
//                   <label>
//                     <input
//                       type="radio"
//                       name="price"
//                       checked={filters.price === v}
//                       onChange={() =>
//                         setFilters((prev) => ({ ...prev, price: v }))
//                       }
//                     />{" "}
//                     {v === "<500k"
//                       ? "< 500.000đ"
//                       : v === "500k-2m"
//                       ? "500.000đ - 2.000.000đ"
//                       : "> 2.000.000đ"}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mb-4">
//             <h3 className="font-medium">Tình trạng</h3>
//             <select
//               value={filters.status}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, status: e.target.value }))
//               }
//               className="w-full text-black px-2 py-1 rounded"
//             >
//               <option value="">Tất cả</option>
//               <option value="new">Mới</option>
//               <option value="sale">Giảm giá</option>
//               <option value="out">Hết hàng</option>
//             </select>
//           </div>
//         </aside>

//         {/* Main */}
//         <main className="col-span-3">
//           {products.length === 0 ? (
//             <p>Không tìm thấy sản phẩm phù hợp</p>
//           ) : viewMode === "grid" ? (
//             <div className="grid grid-cols-3 gap-6">
//               {products.map((p) => (
//                 <div
//                   key={p.id}
//                   className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
//                 >
//                   <img
//                     src={p.thumbnail_url || "/images/no-image.png"}
//                     alt={p.name}
//                     className="w-full h-56 object-cover mb-3 rounded"
//                   />
//                   <h3 className="font-semibold text-black">{p.name}</h3>
//                   <div className="mb-3 text-red-500 font-bold">
//                     {parseFloat(p.price_buy).toLocaleString()}đ
//                   </div>

//                   <div className="flex space-x-2">
//                     <Link
//                       href={`/main/product/${p.slug}`}
//                       className="flex-1 px-2 py-2 bg-yellow-400 text-white font-medium rounded
//                       hover:bg-white hover:text-green-400 border border-yellow-400 transition text-center"
//                     >
//                       Xem chi tiết
//                     </Link>
//                     <button
//                       onClick={() => addToCart(p)}
//                       className="flex-1 px-2 py-2 bg-green-500 text-white font-medium rounded
//                       hover:bg-white hover:text-yellow-400 border border-green-500 transition"
//                     >
//                       Thêm vào giỏ
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             // list view
//             <div className="space-y-4">
//               {products.map((p) => (
//                 <div
//                   key={p.id}
//                   className="flex border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
//                 >
//                   <img
//                     src={p.thumbnail_url || "/images/no-image.png"}
//                     alt={p.name}
//                     className="w-40 h-40 object-cover rounded mr-4"
//                   />
//                   <div className="flex-1 text-black">
//                     <h3 className="font-semibold text-lg">{p.name}</h3>
//                     <p className="text-sm text-gray-600 mb-2">
//                       {p.description?.slice(0, 100) || "Không có mô tả"}
//                     </p>
//                     <div className="text-red-500 font-bold mb-2">
//                       {parseFloat(p.price_buy).toLocaleString()}đ
//                     </div>
//                     <div className="flex space-x-2">
//                       <Link
//                         href={`/main/product/${p.slug}`}
//                         className="px-3 py-2 bg-yellow-400 text-white rounded hover:bg-white hover:text-green-400 border border-yellow-400 transition"
//                       >
//                         Xem chi tiết
//                       </Link>
//                       <button
//                         onClick={() => addToCart(p)}
//                         className="px-3 py-2 bg-green-500 text-white rounded hover:bg-white hover:text-yellow-400 border border-green-500 transition"
//                       >
//                         Thêm vào giỏ
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           <div className="flex justify-center mt-6 space-x-2">
//             <button
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Trước
//             </button>
//             {Array.from({ length: lastPage }, (_, i) => {
//               const page = i + 1;
//               return (
//                 <button
//                   key={page}
//                   onClick={() => goToPage(page)}
//                   className={`px-3 py-1 border rounded ${
//                     currentPage === page ? "bg-yellow-400 text-black" : ""
//                   }`}
//                 >
//                   {page}
//                 </button>
//               );
//             })}
//             <button
//               onClick={() => goToPage(currentPage + 1)}
//               disabled={currentPage === lastPage}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Tiếp
//             </button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 6;

  // Filters & sort
  const [filters, setFilters] = useState({
    categories: [],
    price: "",
    status: "",
  });
  const [sort, setSort] = useState("newest");

  // add to cart (unchanged)
  const addToCart = (product) => {
    const user = localStorage.getItem("main_user");
    if (!user) {
      alert("❌ Bạn cần đăng nhập để thêm sản phẩm vào giỏ!");
      router.push("/main/login");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);
    if (existing) existing.quantity = (existing.quantity || 1) + 1;
    else
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price_buy || 0,
        salePrice: product.sale_price || 0,
        thumbnail: product.thumbnail_url || "/images/no-image.png",
        quantity: 1,
      });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  // Robustly extract array from various response shapes
  const extractDataArray = (resData) => {
    if (!resData) return [];
    if (Array.isArray(resData)) return resData;
    // common shapes:
    // - { data: [...] }
    if (Array.isArray(resData.data)) return resData.data;
    // - { data: { data: [...] } } (laravel with resource collection)
    if (resData.data && Array.isArray(resData.data.data))
      return resData.data.data;
    // - fallback: maybe object with items in 'items' or 'results'
    if (Array.isArray(resData.items)) return resData.items;
    if (Array.isArray(resData.results)) return resData.results;
    return [];
  };

  // Robustly extract pagination fields from various shapes
  const extractPageInfo = (resData, defaultPage = 1) => {
    if (!resData) return { current: defaultPage, last: 1 };
    // possible keys: current_page, last_page, lastPage, meta.last_page, meta.total, meta.per_page
    const current =
      resData.current_page ||
      resData.page ||
      (resData.meta && resData.meta.current_page) ||
      defaultPage;
    const last =
      resData.last_page ||
      resData.total_pages ||
      resData.lastPage ||
      (resData.meta && resData.meta.last_page) ||
      1;
    return { current: Number(current) || defaultPage, last: Number(last) || 1 };
  };

  // Fetch products from server (server-side pagination)
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: perPage };

      // Add server-side filters if backend supports them
      if (filters.categories.length)
        params.category_id = filters.categories.join(",");
      if (filters.price) params.price = filters.price;
      if (filters.status) params.status = filters.status;
      if (sort) params.sort = sort;

      const res = await axios.get("http://localhost:8000/api/products", {
        params,
      });

      // Log for debugging (remove later)
      console.debug("Products API response:", res.data);

      // extract array and pagination info defensively
      const arr = extractDataArray(res.data);
      setProducts(arr);

      const pageInfo = extractPageInfo(res.data, page);
      setCurrentPage(pageInfo.current);
      setLastPage(pageInfo.last);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      // helpful error message for dev: include response if present
      if (err.response) {
        console.error("response.data:", err.response.data);
        console.error("response.status:", err.response.status);
      }
      setProducts([]);
      setCurrentPage(1);
      setLastPage(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories (robust)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        const catData =
          res.data &&
          (Array.isArray(res.data)
            ? res.data
            : res.data.data
            ? res.data.data
            : res.data);
        setCategories(Array.isArray(catData) ? catData : []);
      } catch (err) {
        console.error("Lỗi khi lấy categories:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when page / filters / sort change
  useEffect(() => {
    fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters, sort]);

  const toggleCategory = (id) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((c) => c !== id)
        : [...prev.categories, id],
    }));
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page < 1 || page > lastPage) return;
    setCurrentPage(page);
  };

  if (loading)
    return <p className="text-center py-10 text-yellow-400">Đang tải...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-yellow-400">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sản phẩm</h1>
        <div className="flex gap-3 items-center">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-yellow px-2 py-1 rounded"
          >
            <option value="newest">Mới nhất</option>
            <option value="low-high">Giá thấp → cao</option>
            <option value="high-low">Giá cao → thấp</option>
            <option value="discount">Giảm giá nhiều nhất</option>
          </select>

          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 border rounded ${
              viewMode === "grid" ? "bg-yellow-400 text-black" : ""
            }`}
          >
            Lưới
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 border rounded ${
              viewMode === "list" ? "bg-yellow-400 text-black" : ""
            }`}
          >
            Danh sách
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="col-span-1 border rounded-lg p-4 bg-gray-900">
          <h2 className="font-semibold mb-4">Bộ lọc</h2>

          <div className="mb-4">
            <h3 className="font-medium">Danh mục</h3>
            <ul className="text-sm space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                    />{" "}
                    {cat.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-medium">Khoảng giá</h3>
            <ul className="text-sm space-y-1">
              {["<500k", "500k-2m", ">2m"].map((v) => (
                <li key={v}>
                  <label>
                    <input
                      type="radio"
                      name="price"
                      checked={filters.price === v}
                      onChange={() =>
                        setFilters((prev) => ({ ...prev, price: v }))
                      }
                    />{" "}
                    {v === "<500k"
                      ? "< 500.000đ"
                      : v === "500k-2m"
                      ? "500.000đ - 2.000.000đ"
                      : "> 2.000.000đ"}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-medium">Tình trạng</h3>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full text-black px-2 py-1 rounded"
            >
              <option value="">Tất cả</option>
              <option value="new">Mới</option>
              <option value="sale">Giảm giá</option>
              <option value="out">Hết hàng</option>
            </select>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-3">
          {products.length === 0 ? (
            <p>Không tìm thấy sản phẩm phù hợp</p>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
                >
                  <img
                    src={p.thumbnail_url || "/images/no-image.png"}
                    alt={p.name}
                    className="w-full h-56 object-cover mb-3 rounded"
                  />
                  <h3 className="font-semibold text-black">{p.name}</h3>
                  <div className="mb-3 text-red-500 font-bold">
                    {parseFloat(p.price_buy).toLocaleString()}đ
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      href={`/main/product/${p.slug}`}
                      className="flex-1 px-2 py-2 bg-yellow-400 text-white font-medium rounded hover:bg-white hover:text-green-400 border border-yellow-400 transition text-center"
                    >
                      Xem chi tiết
                    </Link>
                    <button
                      onClick={() => addToCart(p)}
                      className="flex-1 px-2 py-2 bg-green-500 text-white font-medium rounded hover:bg-white hover:text-yellow-400 border border-green-500 transition"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
                >
                  <img
                    src={p.thumbnail_url || "/images/no-image.png"}
                    alt={p.name}
                    className="w-40 h-40 object-cover rounded mr-4"
                  />
                  <div className="flex-1 text-black">
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {p.description?.slice(0, 100) || "Không có mô tả"}
                    </p>
                    <div className="text-red-500 font-bold mb-2">
                      {parseFloat(p.price_buy).toLocaleString()}đ
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/main/product/${p.slug}`}
                        className="px-3 py-2 bg-yellow-400 text-white rounded hover:bg-white hover:text-green-400 border border-yellow-400 transition"
                      >
                        Xem chi tiết
                      </Link>
                      <button
                        onClick={() => addToCart(p)}
                        className="px-3 py-2 bg-green-500 text-white rounded hover:bg-white hover:text-yellow-400 border border-green-500 transition"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Trước
            </button>
            {Array.from({ length: lastPage }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page ? "bg-yellow-400 text-black" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === lastPage}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Tiếp
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
