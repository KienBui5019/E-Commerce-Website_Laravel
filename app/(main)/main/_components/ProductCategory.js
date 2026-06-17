"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/categories");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setCategories(data); // backend trả về mảng category
      } catch (err) {
        console.error("❌ Lỗi khi lấy categories:", err);
        setError("Không thể tải danh mục");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center">Đang tải danh mục...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-center">📌 Danh mục sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => router.push(`/main/products?category_id=${cat.id}`)}
            className="cursor-pointer bg-black text-yellow-400 border-2 border-yellow-400 rounded-xl p-6 text-center hover:bg-yellow-400 hover:text-black transition"
          >
            <h3 className="font-semibold text-lg">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
