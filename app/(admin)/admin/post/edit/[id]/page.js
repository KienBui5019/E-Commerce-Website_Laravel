// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter, useParams } from "next/navigation";

// // export default function EditPostPage() {
// //   const router = useRouter();
// //   const params = useParams();
// //   const { id } = params;

// //   const [form, setForm] = useState({
// //     title: "",
// //     slug: "",
// //     description: "",
// //     content: "",
// //     status: 1,
// //     image: null,
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [error, setError] = useState("");

// //   const generateSlug = (title) =>
// //     title
// //       .toLowerCase()
// //       .normalize("NFD")
// //       .replace(/[\u0300-\u036f]/g, "")
// //       .replace(/đ/g, "d")
// //       .trim()
// //       .replace(/\s+/g, "-")
// //       .replace(/[^\w\-]+/g, "")
// //       .replace(/\-\-+/g, "-");

// //   useEffect(() => {
// //     const fetchPost = async () => {
// //       try {
// //         const res = await fetch(`http://localhost:8000/api/posts/${id}`);
// //         if (!res.ok) throw new Error("Không thể lấy dữ liệu bài viết");
// //         const data = await res.json();
// //         setForm({
// //           title: data.title || "",
// //           slug: data.slug || "",
// //           description: data.description || "",
// //           content: data.content || "",
// //           status: data.status ?? 1,
// //           image: null,
// //         });
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPost();
// //   }, [id]);

// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (name === "title") {
// //       setForm({ ...form, title: value, slug: generateSlug(value) });
// //     } else if (name === "image" && files?.length > 0) {
// //       setForm({ ...form, image: files[0] });
// //     } else {
// //       setForm({ ...form, [name]: value });
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSaving(true);
// //     setError("");

// //     try {
// //       const formData = new FormData();
// //       Object.entries(form).forEach(([key, value]) => {
// //         if (value !== null) formData.append(key, value);
// //       });
// //       formData.append("updated_by", 1);

// //       const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
// //         method: "POST",
// //         headers: {
// //           "X-HTTP-Method-Override": "PUT",
// //         },
// //         body: formData,
// //       });

// //       if (!res.ok) {
// //         const data = await res.json().catch(() => ({}));
// //         throw new Error(data.error || "Lỗi cập nhật bài viết");
// //       }

// //       alert("✅ Cập nhật bài viết thành công!");
// //       router.push("/admin/post");
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   if (loading) return <p className="text-center mt-6">Đang tải bài viết...</p>;
// //   if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

// //   return (
// //     <div className="max-w-2xl mx-auto p-6 text-black">
// //       <h1 className="text-2xl font-bold mb-4 text-yellow-600">Sửa bài viết</h1>

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           type="text"
// //           name="title"
// //           placeholder="Tiêu đề"
// //           value={form.title}
// //           onChange={handleChange}
// //           className="w-full border p-2 rounded"
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="slug"
// //           placeholder="Slug"
// //           value={form.slug}
// //           onChange={handleChange}
// //           className="w-full border p-2 rounded"
// //           required
// //         />
// //         <textarea
// //           name="description"
// //           placeholder="Mô tả ngắn"
// //           value={form.description}
// //           onChange={handleChange}
// //           className="w-full border p-2 rounded"
// //         />
// //         <textarea
// //           name="content"
// //           placeholder="Nội dung chi tiết"
// //           value={form.content}
// //           onChange={handleChange}
// //           className="w-full border p-2 rounded"
// //           rows={6}
// //         />
// //         <input
// //           type="file"
// //           name="image"
// //           accept="image/*"
// //           onChange={handleChange}
// //           className="w-full border p-2 rounded"
// //         />
// //         <select
// //           name="status"
// //           value={form.status}
// //           onChange={handleChange}
// //           className="w-full border p-2 rounded"
// //         >
// //           <option value={1}>Hiển thị</option>
// //           <option value={0}>Ẩn</option>
// //         </select>

// //         <button
// //           type="submit"
// //           disabled={saving}
// //           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
// //         >
// //           {saving ? "Đang lưu..." : "Lưu thay đổi"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function EditPostPage() {
//   const router = useRouter();
//   const { id } = useParams();

//   const [form, setForm] = useState({
//     topic_id: "",
//     title: "",
//     slug: "",
//     description: "",
//     content: "",
//     status: 1,
//     image: null,
//   });
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const generateSlug = (title) =>
//     title
//       .toLowerCase()
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "")
//       .replace(/đ/g, "d")
//       .trim()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w\-]+/g, "")
//       .replace(/\-\-+/g, "-");

//   // Load danh sách chủ đề
//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/topics");
//         const data = await res.json();
//         setTopics(data.data || data || []);
//       } catch (err) {
//         console.error("Không thể tải danh sách chủ đề", err);
//       }
//     };
//     fetchTopics();
//   }, []);

//   // Load dữ liệu bài viết
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await fetch(`http://localhost:8000/api/posts/${id}`);
//         if (!res.ok) throw new Error("Không thể lấy dữ liệu bài viết");
//         const data = await res.json();
//         setForm({
//           topic_id: data.topic_id || "",
//           title: data.title || "",
//           slug: data.slug || "",
//           description: data.description || "",
//           content: data.content || "",
//           status: data.status ?? 1,
//           image: null,
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "title") {
//       setForm({ ...form, title: value, slug: generateSlug(value) });
//     } else if (name === "image" && files?.length > 0) {
//       setForm({ ...form, image: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       Object.entries(form).forEach(([key, value]) => {
//         if (value !== null) formData.append(key, value);
//       });
//       formData.append("updated_by", 1);

//       const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
//         method: "POST",
//         headers: { "X-HTTP-Method-Override": "PUT" },
//         body: formData,
//       });

//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}));
//         throw new Error(data.error || "Lỗi cập nhật bài viết");
//       }

//       alert("✅ Cập nhật bài viết thành công!");
//       router.push("/admin/post");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-6">Đang tải bài viết...</p>;
//   if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-6 text-black">
//       <h1 className="text-2xl font-bold mb-4 text-yellow-600">Sửa bài viết</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Chọn chủ đề */}
//         <select
//           name="topic_id"
//           value={form.topic_id}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="">Chọn chủ đề</option>
//           {topics.map((topic) => (
//             <option key={topic.id} value={topic.id}>
//               {topic.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           name="title"
//           placeholder="Tiêu đề"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="slug"
//           placeholder="Slug"
//           value={form.slug}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Mô tả ngắn"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="content"
//           placeholder="Nội dung chi tiết"
//           value={form.content}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           rows={6}
//         />
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <select
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value={1}>Hiển thị</option>
//           <option value={0}>Ẩn</option>
//         </select>

//         <button
//           type="submit"
//           disabled={saving}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {saving ? "Đang lưu..." : "Lưu thay đổi"}
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    topic_id: "",
    title: "",
    slug: "",
    description: "",
    content: "",
    status: 1,
    image: null,
  });
  const [preview, setPreview] = useState(null); // preview ảnh
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

  // Load danh sách chủ đề
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/topics");
        const data = await res.json();
        setTopics(data.data || data || []);
      } catch (err) {
        console.error("Không thể tải danh sách chủ đề", err);
      }
    };
    fetchTopics();
  }, []);

  // Load dữ liệu bài viết
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/posts/${id}`);
        if (!res.ok) throw new Error("Không thể lấy dữ liệu bài viết");
        const data = await res.json();
        setForm({
          topic_id: data.topic_id || "",
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
          content: data.content || "",
          status: data.status ?? 1,
          image: null,
        });
        setPreview(data.image ? `http://localhost:8000/${data.image}` : null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "title") {
      setForm({ ...form, title: value, slug: generateSlug(value) });
    } else if (name === "image" && files?.length > 0) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });
      formData.append("updated_by", 1);

      const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "POST",
        headers: { "X-HTTP-Method-Override": "PUT" },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Lỗi cập nhật bài viết");
      }

      alert("✅ Cập nhật bài viết thành công!");
      router.push("/admin/post");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-6">Đang tải bài viết...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">Sửa bài viết</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Chọn chủ đề */}
        <select
          name="topic_id"
          value={form.topic_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Chọn chủ đề</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          placeholder="Tiêu đề"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Mô tả ngắn"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="content"
          placeholder="Nội dung chi tiết"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={6}
        />

        {/* Upload ảnh */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded mt-2"
          />
        )}

        {/* Trạng thái */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value={1}>Hiển thị</option>
          <option value={0}>Ẩn</option>
        </select>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}
