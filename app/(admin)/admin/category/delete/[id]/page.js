"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteCategoryPage({ params }) {
  const { id } = params; // id từ route [id]
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirm(`Bạn có chắc chắn muốn xóa category ID ${id}?`)) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");

      router.push("/admin/category"); // Quay về list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDelete();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Xóa Category</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <p>Bạn có chắc chắn muốn xóa category ID {id}?</p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Đang xóa..." : "Xóa"}
        </button>

        <button
          onClick={() => router.push("/category")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Hủy
        </button>
      </div>
    </div>
  );
}
