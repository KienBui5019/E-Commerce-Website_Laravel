// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function EditProductPage() {
//   const router = useRouter();
//   const { id } = useParams(); // /product/edit/[id]

//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     description: "",
//     content: "",
//     price_buy: "",
//     category_id: "",
//     thumbnail: null, // file mới nếu chọn
//     status: 1,
//   });
//   const [oldThumbnail, setOldThumbnail] = useState(""); // ảnh cũ từ DB
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Lấy dữ liệu sản phẩm từ API khi mount
//   useEffect(() => {
//     if (!id) return;
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`http://localhost:8000/api/products/${id}`);
//         //const res = await fetch(`http://localhost:8000/api/products`);
//         if (!res.ok) throw new Error("Không lấy được sản phẩm");

//         const data = await res.json();

//         if (!data.data || data.data.length === 0)
//           throw new Error("Sản phẩm không tồn tại");

//         const product = data.data[0];

//         setForm({
//           name: data.name || "",
//           slug: data.slug || "",
//           description: data.description || "",
//           content: data.content || "",
//           price_buy: data.price_buy || "",
//           category_id: data.category_id || "",
//           thumbnail: null,
//           status: data.status ?? 1,
//         });
//         setOldThumbnail(data.thumbnail || "");
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Sinh slug từ name
//   const generateSlug = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[\s_]+/g, "-")
//       .replace(/[^\w-]+/g, "")
//       .replace(/--+/g, "-");

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "name") {
//       setForm({ ...form, name: value, slug: generateSlug(value) });
//     } else if (name === "thumbnail") {
//       setForm({ ...form, thumbnail: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError("");

//   //   try {
//   //     const formData = new FormData();

//   //     // append các field khác
//   //     Object.entries(form).forEach(([key, value]) => {
//   //       if (value !== null && key !== "thumbnail") {
//   //         formData.append(key, value);
//   //       }
//   //     });

//   //     // chỉ append file nếu chọn mới
//   //     if (form.thumbnail) {
//   //       formData.append("thumbnail", form.thumbnail);
//   //     }

//   //     const res = await fetch(`http://localhost:8000/api/products/${id}`, {
//   //       method: "POST", // override PUT
//   //       headers: { "X-HTTP-Method-Override": "PUT" },
//   //       body: formData,
//   //     });

//   //     const text = await res.text();
//   //     let data;
//   //     try {
//   //       data = JSON.parse(text);
//   //     } catch {
//   //       throw new Error(`Server trả về không phải JSON:\n${text}`);
//   //     }

//   //     if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");
//   //     alert("✅ Cập nhật sản phẩm thành công!");
//   //     router.push("/admin/product/list");
//   //   } catch (err) {
//   //     console.error("❌ Error:", err);
//   //     setError(err.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       Object.entries(form).forEach(([key, value]) => {
//         if (value !== null && key !== "thumbnail") {
//           formData.append(key, value);
//         }
//       });
//       if (form.thumbnail) {
//         formData.append("thumbnail", form.thumbnail);
//       }

//       const res = await fetch(`http://localhost:8000/api/products/${id}`, {
//         method: "POST",
//         headers: { "X-HTTP-Method-Override": "PUT" },
//         body: formData,
//       });

//       // 🟢 Đọc JSON ở đây — phải có dòng này
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");

//       // 🟢 Cập nhật lại form và ảnh sau khi update
//       setOldThumbnail(data.product.thumbnail);
//       setForm({
//         ...form,
//         thumbnail: null,
//       });

//       alert("✅ Cập nhật sản phẩm thành công!");
//       router.push("/admin/product/list");
//     } catch (err) {
//       console.error("❌ Error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto text-black">
//       <h1 className="text-2xl font-bold mb-4 text-yellow-600">
//         Chỉnh sửa sản phẩm
//       </h1>

//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Tên sản phẩm"
//           value={form.name}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="slug"
//           placeholder="Slug"
//           value={form.slug}
//           onChange={(e) => setForm({ ...form, slug: e.target.value })}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Mô tả"
//           value={form.description}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           rows={3}
//         />
//         <textarea
//           name="content"
//           placeholder="Nội dung"
//           value={form.content}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           rows={3}
//         />
//         <input
//           type="number"
//           name="price_buy"
//           placeholder="Giá"
//           value={form.price_buy}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="category_id"
//           placeholder="Category ID"
//           value={form.category_id}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />

//         {/* Thumbnail với preview */}
//         <div>
//           <label className="block mb-1">Thumbnail</label>

//           <img
//             src={
//               form.thumbnail
//                 ? URL.createObjectURL(form.thumbnail)
//                 : oldThumbnail
//                 ? `http://localhost:8000/${oldThumbnail}`
//                 : null
//             }
//             alt="Thumbnail"
//             className="w-40 h-40 object-cover mb-2 border"
//           />

//           <input
//             type="file"
//             name="thumbnail"
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <select
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         >
//           <option value={1}>Active</option>
//           <option value={0}>Inactive</option>
//         </select>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
//         >
//           {loading ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    content: "",
    price_buy: "",
    category_id: "",
    thumbnail: null,
    status: 1,
  });
  const [oldThumbnail, setOldThumbnail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products");
        if (!res.ok) throw new Error("Không lấy được danh sách sản phẩm");

        const data = await res.json();

        const product = data.data.find((p) => p.id == id);
        if (!product) throw new Error("Sản phẩm không tồn tại");

        setForm({
          name: product.name || "",
          slug: product.slug || "",
          description: product.description || "",
          content: product.content || "",
          price_buy: product.price_buy || "",
          category_id: product.category_id || "",
          thumbnail: null,
          status: product.status ?? 1,
        });
        setOldThumbnail(product.thumbnail || "");
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "name") {
      setForm({ ...form, name: value, slug: generateSlug(value) });
    } else if (name === "thumbnail") {
      setForm({ ...form, thumbnail: files[0] });
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
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && key !== "thumbnail") {
          formData.append(key, value);
        }
      });
      if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "POST",
        headers: { "X-HTTP-Method-Override": "PUT" },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");

      setOldThumbnail(data.data?.thumbnail || oldThumbnail);
      setForm({ ...form, thumbnail: null });

      alert("✅ Cập nhật sản phẩm thành công!");
      router.push("/admin/product/list");
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">
        Chỉnh sửa sản phẩm
      </h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
          rows={3}
        />
        <textarea
          name="content"
          placeholder="Nội dung"
          value={form.content}
          onChange={handleChange}
          className="border p-2 rounded"
          rows={3}
        />
        <input
          type="number"
          name="price_buy"
          placeholder="Giá"
          value={form.price_buy}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category_id"
          placeholder="Category ID"
          value={form.category_id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <div>
          <label className="block mb-1">Thumbnail</label>
          <img
            src={
              form.thumbnail
                ? URL.createObjectURL(form.thumbnail)
                : oldThumbnail
                ? `http://localhost:8000/${oldThumbnail}`
                : null
            }
            alt="Thumbnail"
            className="w-40 h-40 object-cover mb-2 border"
          />
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
        >
          {loading ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
        </button>
      </form>
    </div>
  );
}
