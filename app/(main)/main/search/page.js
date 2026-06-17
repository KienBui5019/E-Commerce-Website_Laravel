"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/products?search=${encodeURIComponent(
            keyword
          )}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        // Dữ liệu có thể nằm trong data.data hoặc trực tiếp data
        const items = data.data || data;

        // Thêm URL đầy đủ cho ảnh
        const transformed = items.map((p) => ({
          ...p,
          thumbnail_url: p.thumbnail
            ? `http://localhost:8000/${p.thumbnail}`
            : "https://via.placeholder.com/150",
        }));

        setProducts(transformed);
      } catch (err) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) fetchProducts();
    else setProducts([]);
  }, [keyword]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-yellow-500 mb-4">
        Kết quả tìm kiếm: "{keyword}"
      </h1>

      {loading && <p>Đang tải sản phẩm...</p>}
      {!loading && products.length === 0 && (
        <p>Không tìm thấy sản phẩm phù hợp.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.thumbnail_url}
              alt={product.name}
              className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4">
              <h3 className="font-semibold text-yellow-500">{product.name}</h3>
              <p className="text-yellow-500 font-bold">{product.price_buy}₫</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
