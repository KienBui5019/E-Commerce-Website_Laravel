// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";

// // export default function AddPostPage() {
// //   const router = useRouter();

// //   const [form, setForm] = useState({
// //     topic_id: "",
// //     title: "",
// //     slug: "",
// //     description: "",
// //     content: "",
// //     status: 1,
// //     image: null,
// //   });

// //   const [topics, setTopics] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // Sinh slug từ title
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

// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (name === "title") {
// //       setForm({ ...form, title: value, slug: generateSlug(value) });
// //     } else if (name === "image" && files.length > 0) {
// //       setForm({ ...form, image: files[0] });
// //     } else {
// //       setForm({ ...form, [name]: value });
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");

// //     try {
// //       const formData = new FormData();
// //       formData.append("topic_id", form.topic_id);
// //       formData.append("title", form.title);
// //       formData.append("slug", form.slug);
// //       formData.append("description", form.description);
// //       formData.append("content", form.content);
// //       formData.append("post_type", "post");
// //       formData.append("status", form.status);
// //       formData.append("created_by", 1);
// //       if (form.image) formData.append("image", form.image);

// //       for (let [key, value] of formData.entries()) {
// //         console.log(key, value);
// //       }
// //       const res = await fetch("http://localhost:8000/api/posts", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       if (!res.ok) {
// //         const data = await res.json().catch(() => ({}));
// //         throw new Error(data.message || "Lỗi tạo bài viết");
// //       }

// //       alert("✅ Tạo bài viết thành công");
// //       router.push("/admin/post");
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-xl mx-auto p-6 text-black">
// //       <h1 className="text-2xl font-bold mb-4 text-yellow-600">Thêm bài viết</h1>

// //       {error && <p className="text-red-500 mb-2">{error}</p>}

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {/* <select
// //           name="topic_id"
// //           value={form.topic_id}
// //           onChange={handleChange}
// //           className="w-full border p-2 rounded"
// //           required
// //         >
// //           <option value="">Chọn chủ đề</option>
// //           {topics.map((t) => (
// //             <option key={t.id} value={t.id}>
// //               {t.name}
// //             </option>
// //           ))}
// //         </select> */}

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
// //           rows={2}
// //         />

// //         <textarea
// //           name="content"
// //           placeholder="Nội dung chi tiết"
// //           value={form.content}
// //           onChange={handleChange}
// //           className="w-full border p-2 rounded"
// //           rows={6}
// //           required
// //         />

// //         <input
// //           type="file"
// //           name="image"
// //           onChange={handleChange}
// //           accept="image/*"
// //           className="w-full"
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
// //           disabled={loading}
// //           className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
// //         >
// //           {loading ? "Đang tạo..." : "Tạo bài viết"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddPostPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     topic_id: "",
//     title: "",
//     slug: "",
//     description: "",
//     content: "",
//     status: 1,
//     image: null,
//   });

//   const [preview, setPreview] = useState(null); // preview ảnh
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Sinh slug từ title
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

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "title") {
//       setForm({ ...form, title: value, slug: generateSlug(value) });
//     } else if (name === "image" && files.length > 0) {
//       setForm({ ...form, image: files[0] });
//       setPreview(URL.createObjectURL(files[0]));
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       formData.append("topic_id", form.topic_id);
//       formData.append("title", form.title);
//       formData.append("slug", form.slug);
//       formData.append("description", form.description);
//       formData.append("content", form.content);
//       formData.append("post_type", "post");
//       formData.append("status", form.status);
//       formData.append("created_by", 1);
//       if (form.image) formData.append("image", form.image);

//       const res = await fetch("http://localhost:8000/api/posts", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}));
//         throw new Error(data.message || "Lỗi tạo bài viết");
//       }

//       alert("✅ Tạo bài viết thành công");
//       router.push("/admin/post");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 text-black">
//       <h1 className="text-2xl font-bold mb-4 text-yellow-600">Thêm bài viết</h1>

//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
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
//           rows={2}
//         />

//         <textarea
//           name="content"
//           placeholder="Nội dung chi tiết"
//           value={form.content}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           rows={6}
//           required
//         />

//         <input
//           type="file"
//           name="image"
//           onChange={handleChange}
//           accept="image/*"
//           className="w-full"
//         />

//         {preview && (
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-full h-64 object-cover rounded mt-2"
//           />
//         )}

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
//           disabled={loading}
//           className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
//         >
//           {loading ? "Đang tạo..." : "Tạo bài viết"}
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddPostPage() {
  const router = useRouter();

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [topics, setTopics] = useState([]);

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

  // Sinh slug từ title
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "title") {
      setForm({ ...form, title: value, slug: generateSlug(value) });
    } else if (name === "image" && files.length > 0) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("topic_id", form.topic_id);
      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("content", form.content);
      formData.append("post_type", "post");
      formData.append("status", form.status);
      formData.append("created_by", 1);
      if (form.image) formData.append("image", form.image);

      const res = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Lỗi tạo bài viết");
      }

      alert("✅ Tạo bài viết thành công");
      router.push("/admin/post");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">Thêm bài viết</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

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

        {/* Tiêu đề */}
        <input
          type="text"
          name="title"
          placeholder="Tiêu đề"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Slug */}
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Mô tả ngắn */}
        <textarea
          name="description"
          placeholder="Mô tả ngắn"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={2}
        />

        {/* Nội dung chi tiết */}
        <textarea
          name="content"
          placeholder="Nội dung chi tiết"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={6}
          required
        />

        {/* Upload ảnh */}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full"
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
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
        >
          {loading ? "Đang tạo..." : "Tạo bài viết"}
        </button>
      </form>
    </div>
  );
}
