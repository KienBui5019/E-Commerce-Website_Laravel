"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DeleteProductSale() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/product-sale/${id}`, {
        method: "DELETE",
      });
      console.log(res.status, await res.text());
      if (!res.ok) throw new Error("Không thể xóa");
      router.push("/productsale");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-600">
        Xóa sản phẩm khuyến mãi
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <p>Bạn có chắc chắn muốn xóa sản phẩm ID {id}?</p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Đang xóa..." : "Xóa"}
        </button>
        <button
          onClick={() => router.push("/productsale")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Hủy
        </button>
      </div>
    </div>
  );
}
