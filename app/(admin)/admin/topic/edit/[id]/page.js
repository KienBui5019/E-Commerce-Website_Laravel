"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicPage({ params }) {
  const router = useRouter();
  const { id } = params;

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    sort_order: 1,
    status: 1,
    updated_by: 1,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Lấy chi tiết topic
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/topics/${id}`);
        if (!res.ok) throw new Error(`HTTP lỗi: ${res.status}`);
        const data = await res.json();
        setForm({
          name: data.name,
          slug: data.slug,
          description: data.description,
          sort_order: data.sort_order,
          status: data.status,
          updated_by: 1,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [id]);

  // Tự động sinh slug
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
    try {
      setSaving(true);
      setError("");
      const res = await fetch(`http://localhost:8000/api/topics/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP lỗi: ${res.status}`);

      router.push("/admin/topic");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Đang tải dữ liệu...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-xl mx-auto text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Chủ đề</h1>

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
            disabled={saving}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
}
