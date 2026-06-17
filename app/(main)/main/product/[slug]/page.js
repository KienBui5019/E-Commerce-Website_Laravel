// "use client";

// import { useState, useEffect, use } from "react";

// export default function ProductDetail({ params }) {
//   // unwrap params để lấy slug
//   const { slug } = use(params);

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`http://localhost:8000/api/products/${slug}`);
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [slug]);

//   if (loading) return <p className="p-6">Đang tải sản phẩm...</p>;
//   if (error) return <p className="p-6 text-red-600">Lỗi: {error}</p>;
//   if (!product)
//     return <p className="p-6 text-red-600">Không tìm thấy sản phẩm!</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       {/* Hình ảnh sản phẩm */}
//       {product.thumbnail_url && (
//         <div className="w-full h-80 flex justify-center items-center bg-gray-100 rounded-lg shadow-md mb-6 overflow-hidden">
//           <img
//             src={product.thumbnail_url}
//             alt={product.name}
//             className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
//           />
//         </div>
//       )}
//       {/* Thông tin sản phẩm */}
//       <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//       <p className="text-gray-600 mb-4">
//         Giá:{" "}
//         <span className="font-bold text-red-500">
//           {Number(product.price_buy).toLocaleString("vi-VN")}₫
//         </span>
//       </p>
//       <p className="mb-6">{product.description}</p>

//       {/* Tăng giảm số lượng */}
//       <div className="flex items-center gap-4 mb-6">
//         <button
//           className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-black hover:text-yellow-400 transition"
//           onClick={() => setQuantity(Math.max(1, quantity - 1))}
//         >
//           -
//         </button>
//         <span className="text-lg font-semibold">{quantity}</span>
//         <button
//           className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-black hover:text-yellow-400 transition"
//           onClick={() => setQuantity(quantity + 1)}
//         >
//           +
//         </button>
//       </div>

//       {/* Thêm vào giỏ hàng */}
//       <button
//         className="px-6 py-2 bg-black text-yellow-400 font-medium rounded hover:bg-yellow-400 hover:text-black border border-yellow-400 transition"
//         onClick={() => alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`)}
//       >
//         🛒 Thêm vào giỏ hàng
//       </button>
//     </div>
//   );
// }
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }) {
  const { slug } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${slug}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // ✅ Hàm thêm giỏ hàng (chặn nếu chưa login)
  const handleAddToCart = () => {
    const user = localStorage.getItem("main_user");

    if (!user) {
      alert("❌ Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      router.push("/main/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price_buy || 0,
        salePrice: product.sale_price || 0,
        thumbnail: product.thumbnail_url || "/images/no-image.png",
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`);
  };

  if (loading) return <p className="p-6">Đang tải sản phẩm...</p>;
  if (error) return <p className="p-6 text-red-600">Lỗi: {error}</p>;
  if (!product)
    return <p className="p-6 text-red-600">Không tìm thấy sản phẩm!</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Ảnh sản phẩm */}
      {product.thumbnail_url && (
        <div className="w-full h-80 flex justify-center items-center bg-gray-100 rounded-lg shadow-md mb-6 overflow-hidden">
          <img
            src={product.thumbnail_url}
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Thông tin sản phẩm */}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">
        Giá:{" "}
        <span className="font-bold text-red-500">
          {Number(product.price_buy).toLocaleString("vi-VN")}₫
        </span>
      </p>
      <p className="mb-6">{product.description}</p>

      {/* Tăng giảm số lượng */}
      <div className="flex items-center gap-4 mb-6">
        <button
          className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-black hover:text-yellow-400 transition"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-black hover:text-yellow-400 transition"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Nút thêm giỏ hàng */}
      <button
        className="px-6 py-2 bg-black text-yellow-400 font-medium rounded hover:bg-yellow-400 hover:text-black border border-yellow-400 transition"
        onClick={handleAddToCart}
      >
        🛒 Thêm vào giỏ hàng
      </button>
    </div>
  );
}
