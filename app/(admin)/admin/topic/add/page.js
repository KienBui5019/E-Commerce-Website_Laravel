"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddTopicPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    sort_order: 1,
    status: 1,
    created_by: 1, // mặc định
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Tự động sinh slug từ name
  useEffect(() => {
    const slug = form.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
    setForm((prev) => ({ ...prev, slug }));
  }, [form.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.slug) {
      setError("Tên và slug bắt buộc!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:8000/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP lỗi: ${res.status}`);

      router.push("/admin/topic"); // quay về danh sách
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Thêm mới Chủ đề</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tên</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mô tả</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            className="px-4 py-2 border rounded"
            onClick={() => router.push("/admin/topic")}
          >
            Quay lại
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </form>
    </div>
  );
}
