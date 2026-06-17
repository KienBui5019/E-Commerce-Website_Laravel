"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteOrderPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Bạn có chắc muốn xóa đơn hàng #${id}?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      alert("✅ Đã xóa đơn hàng");
      router.push("/admin/order"); // quay về danh sách
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Xóa đơn hàng #{id}</h1>
      <p className="mb-6">Hành động này không thể hoàn tác!</p>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-500 px-6 py-2 rounded text-white hover:bg-red-600"
      >
        {loading ? "Đang xóa..." : "Xóa đơn hàng"}
      </button>
    </div>
  );
}
