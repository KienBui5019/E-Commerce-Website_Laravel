"use client";
import Link from "next/link";

export default function ProductCard({ product }) {
  const addToCart = (product) => {
    console.log("Thêm vào giỏ:", product);

    // Lấy giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Kiểm tra sản phẩm đã tồn tại chưa
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1; // tăng số lượng
    } else {
      cart.push({ ...product, quantity: 1 }); // thêm mới với quantity = 1
    }

    // Lưu lại localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Thông báo người dùng
    alert("✅ Thêm vào giỏ hàng thành công!");
  };

  return (
    <div className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition">
      {/* Ảnh sản phẩm */}
      <Link href={`/products/${product.slug}`}>
        <img
          src={product.thumbnail_url || "/images/no-image.png"}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      </Link>

      {/* Thông tin sản phẩm */}
      <h3 className="text-lg font-semibold text-gray-800 truncate">
        {product.name}
      </h3>
      <p className="text-yellow-600 font-bold mt-2">
        {product.price_buy?.toLocaleString("vi-VN")} ₫
      </p>

      {/* Nút xem chi tiết và thêm giỏ */}
      <div className="mt-4">
        <Link
          href={`/products/${product.slug}`}
          className="block w-full text-center bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 transition mb-2"
        >
          Xem chi tiết
        </Link>

        <button
          onClick={() => addToCart(product)} // phải là product
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
