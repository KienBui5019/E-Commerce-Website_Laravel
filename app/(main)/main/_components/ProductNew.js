// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function ProductNew() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchNewProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/products-new");
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const data = await res.json();

//         const transformed = data.data.map((p) => ({
//           ...p,
//           thumbnail_url: p.thumbnail
//             ? `http://localhost:8000/${p.thumbnail}`
//             : "https://via.placeholder.com/150",
//         }));

//         setProducts(transformed);
//       } catch (err) {
//         console.error("Lỗi khi tải sản phẩm mới:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNewProducts();
//   }, []);

//   // ✅ Hàm thêm vào giỏ hàng có kiểm tra đăng nhập
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

//   if (loading)
//     return <p className="text-center py-4">Đang tải sản phẩm mới...</p>;
//   if (products.length === 0)
//     return <p className="text-center py-4">Không có sản phẩm mới.</p>;

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-6 text-yellow-500">
//         🆕 Sản phẩm mới
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
//           >
//             <img
//               src={product.thumbnail_url}
//               alt={product.name}
//               className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105"
//             />

//             <div className="p-4">
//               <h3 className="font-semibold text-yellow-500 mb-2">
//                 {product.name}
//               </h3>
//               <p className="text-yellow-600 font-bold mb-4">
//                 {Number(product.price_buy).toLocaleString("vi-VN")}₫
//               </p>

//               {/* Nút */}
//               <div className="flex flex-row space-x-2">
//                 <Link
//                   href={`/main/product/${product.slug}`}
//                   className="flex-1 px-2 py-2 bg-yellow-400 text-black font-medium rounded
//                     hover:bg-black hover:text-yellow-400 border border-yellow-400 transition text-center"
//                 >
//                   Xem chi tiết
//                 </Link>

//                 <button
//                   onClick={() => addToCart(product)}
//                   className="flex-1 px-2 py-2 bg-green-500 text-white font-medium rounded
//                     hover:bg-white hover:text-green-500 border border-green-500 transition"
//                 >
//                   Thêm vào giỏ
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductNew() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchNewProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/products-new?page=${page}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        const transformed = data.data.map((p) => ({
          ...p,
          thumbnail_url: p.thumbnail
            ? `http://localhost:8000/${p.thumbnail}`
            : "https://via.placeholder.com/150",
        }));

        setProducts(transformed);
        setTotalPages(data.last_page || 1);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm mới:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, [page]);

  const addToCart = (product) => {
    const user = localStorage.getItem("main_user");
    if (!user) {
      alert("❌ Bạn cần đăng nhập để thêm sản phẩm vào giỏ!");
      router.push("/main/login");
      return;
    }

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

  if (loading)
    return <p className="text-center py-4">Đang tải sản phẩm mới...</p>;
  if (products.length === 0)
    return <p className="text-center py-4">Không có sản phẩm mới.</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-yellow-500">
        🆕 Sản phẩm mới
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.thumbnail_url}
              alt={product.name}
              className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4">
              <h3 className="font-semibold text-yellow-500 mb-2">
                {product.name}
              </h3>
              <p className="text-yellow-600 font-bold mb-4">
                {Number(product.price_buy).toLocaleString("vi-VN")}₫
              </p>
              <div className="flex flex-row space-x-2">
                <Link
                  href={`/main/product/${product.slug}`}
                  className="flex-1 px-2 py-2 bg-yellow-400 text-black font-medium rounded 
                    hover:bg-black hover:text-yellow-400 border border-yellow-400 transition text-center"
                >
                  Xem chi tiết
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 px-2 py-2 bg-green-500 text-white font-medium rounded 
                    hover:bg-white hover:text-green-500 border border-green-500 transition"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-3">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className={`px-4 py-2 rounded ${
            page <= 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-500"
          }`}
        >
          ← Trước
        </button>

        <span className="font-semibold text-yellow-600">
          Trang {page}/{totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className={`px-4 py-2 rounded ${
            page >= totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-500"
          }`}
        >
          Sau →
        </button>
      </div>
    </section>
  );
}
