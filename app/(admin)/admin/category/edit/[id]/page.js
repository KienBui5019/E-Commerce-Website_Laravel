"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // lấy từ /category/edit/[id]

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    status: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy dữ liệu category từ API khi component mount
  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/categories/${id}`);
        if (!res.ok) throw new Error("Không lấy được category");
        const data = await res.json();
        setForm({
          name: data.name,
          slug: data.slug || "",
          description: data.description || "",
          status: data.status,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategory();
  }, [id]);

  // Hàm tạo slug từ name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
      .replace(/đ/g, "d") // chữ đ → d
      .trim()
      .replace(/\s+/g, "-") // space → -
      .replace(/[^\w\-]+/g, "") // xóa ký tự đặc biệt
      .replace(/\-\-+/g, "-"); // nhiều dấu - → 1 dấu
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setForm({ ...form, name: value, slug: generateSlug(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        status: Number(form.status),
      };

      const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Lỗi khi cập nhật category");
      }

      router.push("/admin/category"); // quay về danh sách
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">
        Chỉnh sửa Danh Mục
      </h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Tên category"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
        >
          {loading ? "Đang cập nhật..." : "Cập nhật Category"}
        </button>
      </form>
    </div>
  );
}
