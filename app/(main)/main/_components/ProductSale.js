// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ProductSale() {
//   const [sales, setSales] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Hàm thêm vào giỏ
//   const addToCart = (product) => {
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

//   useEffect(() => {
//     const fetchSales = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:8000/api/product-sale-top?limit=3"
//         );

//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const data = await res.json();

//         setSales(data); // dữ liệu backend đã có thumbnail_url
//       } catch (err) {
//         console.error("Lỗi khi lấy sản phẩm khuyến mãi:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSales();
//   }, []);

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8 text-yellow-400">
//         <h2 className="text-2xl font-bold mb-6">Sản phẩm khuyến mãi</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[...Array(3)].map((_, i) => (
//             <div
//               key={i}
//               className="rounded-lg p-4 bg-white shadow animate-pulse"
//             >
//               <div className="w-full h-40 bg-gray-200 rounded mb-3" />
//               <div className="h-6 bg-gray-200 rounded mb-2"></div>
//               <div className="h-6 bg-gray-200 rounded w-1/2"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <p className="text-center text-red-500 py-6">
//         Lỗi khi tải sản phẩm khuyến mãi: {error}
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 text-yellow-400">
//       <h2 className="text-2xl font-bold mb-6">Sản phẩm khuyến mãi</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {sales.map((sale) => {
//           const salePrice = Number(sale.price_sale) || 0;
//           const oldPrice = sale.product
//             ? Number(sale.product.price_buy) || 0
//             : 0;

//           return (
//             <div
//               key={sale.id}
//               className="rounded-lg p-4 bg-white shadow hover:shadow-md transition"
//             >
//               {/* Hình ảnh sản phẩm */}
//               {sale.product?.thumbnail_url && (
//                 <div className="w-full h-80 flex justify-center items-center bg-white rounded-lg mb-6 overflow-hidden">
//                   <img
//                     src={sale.product.thumbnail_url}
//                     alt={sale.product.name}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                   />
//                 </div>
//               )}

//               <h3 className="font-semibold mb-2">
//                 {sale.product?.name || "Sản phẩm"}
//               </h3>

//               <div className="mb-3">
//                 <span className="text-red-500 font-bold">
//                   {salePrice.toLocaleString("vi-VN")}đ
//                 </span>
//                 {oldPrice > 0 && (
//                   <span className="line-through text-gray-400 ml-2">
//                     {oldPrice.toLocaleString("vi-VN")}đ
//                   </span>
//                 )}
//               </div>

//               <p className="text-sm">{sale.name}</p>

//               <div className="flex flex-row space-x-2 mt-3">
//                 <Link
//                   href={`/main/product/${sale.product?.slug}`}
//                   className="flex-1 px-2 py-2 bg-yellow-400 text-white font-medium rounded
//                  hover:bg-white hover:text-green-400 border border-yellow-400 transition text-center"
//                 >
//                   Xem chi tiết
//                 </Link>

//                 <button
//                   onClick={() => addToCart(sale.product)}
//                   className="flex-1 px-2 py-2 bg-green-500 text-white font-medium rounded
//                  hover:bg-white hover:text-yellow-400 border border-green-500 transition"
//                 >
//                   Thêm vào giỏ
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductSale() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  // Hàm thêm vào giỏ
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price_buy || 0,
        salePrice: product.sale_price || 0,
        thumbnail: product.thumbnail_url || "/images/no-image.png",
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const fetchSales = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/product-sale-top?page=${pageNumber}&limit=${limit}`
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      // Giả sử backend trả về: { data: [...], total: 10 }
      setSales(data.data || data);
      if (data.total) {
        setTotalPages(Math.ceil(data.total / limit));
      }
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm khuyến mãi:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales(page);
  }, [page]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-yellow-400">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm khuyến mãi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg p-4 bg-white shadow animate-pulse"
            >
              <div className="w-full h-40 bg-gray-200 rounded mb-3" />
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-6">
        Lỗi khi tải sản phẩm khuyến mãi: {error}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-yellow-400">
      <h2 className="text-2xl font-bold mb-6">Sản phẩm khuyến mãi</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sales.map((sale) => {
          const salePrice = Number(sale.price_sale) || 0;
          const oldPrice = sale.product
            ? Number(sale.product.price_buy) || 0
            : 0;

          return (
            <div
              key={sale.id}
              className="rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              {/* Hình ảnh sản phẩm */}
              {sale.product?.thumbnail_url && (
                <div className="w-full h-80 flex justify-center items-center bg-white rounded-lg mb-6 overflow-hidden">
                  <img
                    src={sale.product.thumbnail_url}
                    alt={sale.product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              <h3 className="font-semibold mb-2">
                {sale.product?.name || "Sản phẩm"}
              </h3>

              <div className="mb-3">
                <span className="text-red-500 font-bold">
                  {salePrice.toLocaleString("vi-VN")}đ
                </span>
                {oldPrice > 0 && (
                  <span className="line-through text-gray-400 ml-2">
                    {oldPrice.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>

              <p className="text-sm">{sale.name}</p>

              <div className="flex flex-row space-x-2 mt-3">
                <Link
                  href={`/main/product/${sale.product?.slug}`}
                  className="flex-1 px-2 py-2 bg-yellow-400 text-white font-medium rounded 
                 hover:bg-white hover:text-green-400 border border-yellow-400 transition text-center"
                >
                  Xem chi tiết
                </Link>

                <button
                  onClick={() => addToCart(sale.product)}
                  className="flex-1 px-2 py-2 bg-green-500 text-white font-medium rounded 
                 hover:bg-white hover:text-yellow-400 border border-green-500 transition"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded border ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-300"
          }`}
        >
          ← Trước
        </button>

        <span className="px-3 py-2 font-semibold text-black bg-white rounded border">
          Trang {page}/{totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded border ${
            page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-300"
          }`}
        >
          Sau →
        </button>
      </div>
    </div>
  );
}
