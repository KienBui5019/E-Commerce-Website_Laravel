"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ProductStoreEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [store, setStore] = useState(null);
  const [priceRoot, setPriceRoot] = useState("");
  const [qty, setQty] = useState("");
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(true);

  // --- Lấy dữ liệu phiếu nhập ---
  useEffect(() => {
    if (!id) return;

    const fetchStore = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8000/api/product-stores/${id}`
        );
        if (!res.ok) throw new Error("Không tìm thấy phiếu nhập");
        const data = await res.json();

        setStore(data);
        setPriceRoot(data.price_root ?? "");
        setQty(data.qty ?? "");
        setStatus(data.status ?? 1);
      } catch (err) {
        console.error(err);
        alert("❌ Lỗi khi tải phiếu nhập");
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  // --- Cập nhật phiếu nhập ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8000/api/product-stores/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price_root: parseFloat(priceRoot),
            qty: parseInt(qty),
            status: parseInt(status),
          }),
        }
      );

      if (!res.ok) throw new Error("Cập nhật thất bại");
      alert("✅ Cập nhật thành công!");
      router.push("/admin/product_store"); // Quay về danh sách
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi cập nhật phiếu nhập");
    }
  };

  if (loading)
    return (
      <p className="text-gray-700 text-center py-6">Đang tải dữ liệu...</p>
    );
  if (!store)
    return (
      <p className="text-red-500 text-center py-6">Không tìm thấy phiếu nhập</p>
    );

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        ✏️ Chỉnh sửa phiếu nhập #{id}
      </h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block mb-2 text-gray-900 font-semibold">
            Giá gốc
          </label>
          <input
            type="number"
            value={priceRoot}
            onChange={(e) => setPriceRoot(e.target.value)}
            className="border border-gray-400 px-3 py-2 w-full rounded text-gray-900 font-medium focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-900 font-semibold">
            Số lượng
          </label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border border-gray-400 px-3 py-2 w-full rounded text-gray-900 font-medium focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-900 font-semibold">
            Trạng thái
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-400 px-3 py-2 w-full rounded text-gray-900 font-medium focus:ring-2 focus:ring-yellow-500"
          >
            <option value={1}>✅ Hoạt động</option>
            <option value={0}>🚫 Ẩn</option>
          </select>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => router.push("/admin/product_store")}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            ← Quay lại
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            💾 Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
