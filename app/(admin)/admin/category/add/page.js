// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddCategoryPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     description: "",
//     status: 1,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Hàm tạo slug chuẩn từ name
//   const generateSlug = (name) => {
//     return name
//       .toLowerCase()
//       .normalize("NFD") // tách dấu
//       .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
//       .replace(/đ/g, "d")
//       .trim()
//       .replace(/\s+/g, "-") // khoảng trắng → -
//       .replace(/[^\w\-]+/g, "") // xóa ký tự đặc biệt
//       .replace(/\-\-+/g, "-"); // nhiều - → 1 -
//   };

//   // Khi thay đổi input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "name") {
//       setForm({ ...form, name: value, slug: generateSlug(value) });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // Chuẩn hóa payload
//       const payload = {
//         name: form.name.trim(),
//         slug: form.slug.trim(),
//         description: form.description.trim() || "",
//         status: Number(form.status),
//         created_by: 1,
//       };

//       const res = await fetch("http://localhost:8000/api/categories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}));
//         throw new Error(data.message || "Lỗi tạo category");
//       }

//       alert("✅ Tạo category thành công!");
//       router.push("/admin/category"); // Quay về danh sách
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="text-black p-6 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-yellow-600">Thêm Danh Mục</h1>

//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Tên category"
//           value={form.name}
//           onChange={handleChange}
//           className=" text-black w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="slug"
//           placeholder="Slug"
//           value={form.slug}
//           onChange={(e) => setForm({ ...form, slug: e.target.value })}
//           className="text-black w-full border p-2 rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Mô tả"
//           value={form.description}
//           onChange={handleChange}
//           className="text-black w-full border p-2 rounded"
//           rows={3}
//         />

//         <select
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value={1}>Active</option>
//           <option value={0}>Inactive</option>
//         </select>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
//         >
//           {loading ? "Đang tạo..." : "Tạo Category"}
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    status: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hàm tạo slug từ name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
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
      // payload chuẩn cho controller
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim() || null,
        status: Number(form.status),
        created_by: 1, // ID user hiện tại
      };

      const res = await fetch("http://localhost:8000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Lỗi tạo category");
      }

      alert("✅ Tạo category thành công!");
      router.push("/admin/category"); // Quay về danh sách
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">Thêm Danh Mục</h1>

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
          {loading ? "Đang tạo..." : "Tạo Category"}
        </button>
      </form>
    </div>
  );
}
