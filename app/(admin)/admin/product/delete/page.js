"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/products");
      if (!res.ok) throw new Error("Không tải được sản phẩm");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      alert("✅ Xóa thành công!");
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-600">Quản lý sản phẩm</h1>
        <Link
          href="/admin/product/add"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Thêm sản phẩm
        </Link>
      </div>

      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border border-gray-300 bg-white shadow-md rounded">
        <thead className="bg-yellow-500 text-black">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Ảnh</th>
            <th className="px-4 py-2 border">Tên sản phẩm</th>
            <th className="px-4 py-2 border">Giá</th>
            <th className="px-4 py-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="text-black text-center hover:bg-gray-50">
              <td className="px-4 py-2 border">{p.id}</td>
              <td className="px-4 py-2 border">
                {p.thumbnail_url ? (
                  <img
                    src={p.thumbnail_url}
                    alt={p.name}
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                ) : (
                  <span className="text-gray-400">Không có ảnh</span>
                )}
              </td>
              <td className="px-4 py-2 border font-medium">{p.name}</td>
              <td className="px-4 py-2 border text-gray-500">
                {Number(p.price_buy).toLocaleString("vi-VN")}₫
              </td>
              <td className="px-4 py-2 border space-x-2">
                <Link
                  href={`/admin/product/edit/${p.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  ✏️ Sửa
                </Link>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  🗑 Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
