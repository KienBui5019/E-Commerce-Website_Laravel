"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    price_buy: "",
    category_id: "",
    content: "",
    description: "",
    status: 1,
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [productId, setProductId] = useState(null);
  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [addedAttributes, setAddedAttributes] = useState([]);

  // Auto slug
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

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleImageChange = (e) => setImages(Array.from(e.target.files));

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Tên sản phẩm không được để trống");
    if (!form.category_id) return alert("Chọn danh mục");
    if (!fileInputRef.current?.files[0]) return alert("Chọn thumbnail");
    if (!form.price_buy || isNaN(form.price_buy))
      return alert("Nhập giá hợp lệ");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("category_id", Number(form.category_id));
      formData.append("price_buy", parseFloat(form.price_buy));
      formData.append("content", form.content);
      formData.append("description", form.description);
      formData.append("status", Number(form.status));
      formData.append("thumbnail", fileInputRef.current.files[0]);
      images.forEach((img) => formData.append("images[]", img));

      const res = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Thêm sản phẩm thất bại");

      const productData = await res.json();
      setProductId(productData.data.id);
      alert("✅ Thêm sản phẩm thành công! Bây giờ có thể thêm thuộc tính.");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm sản phẩm");
    }
  };

  const handleAddAttribute = async () => {
    if (!productId) return alert("❗ Vui lòng thêm sản phẩm trước");
    if (!attributeName.trim() || !attributeValue.trim())
      return alert("Điền đầy đủ tên và giá trị thuộc tính");

    try {
      const res = await fetch(
        `http://localhost:8000/api/products/${productId}/attributes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: attributeName, value: attributeValue }),
        }
      );
      if (!res.ok) throw new Error("Thêm thuộc tính thất bại");

      setAddedAttributes((prev) => [
        ...prev,
        { name: attributeName, value: attributeValue },
      ]);
      setAttributeName("");
      setAttributeValue("");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm thuộc tính");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Thêm Sản Phẩm
      </h1>

      <form
        onSubmit={handleSubmitProduct}
        className="bg-white shadow-md rounded-lg p-6 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-900 mb-1">Tên sản phẩm</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="text-gray-900 w-full p-2 border rounded bg-gray-100"
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div>
            <label className="block text-gray-900 mb-1">Slug</label>
            <input
              type="text"
              value={form.slug}
              readOnly
              className="text-gray-900 w-full p-2 border rounded bg-gray-100"
              placeholder="Slug tự tạo"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Giá nhập</label>
            <input
              type="number"
              value={form.price_buy}
              onChange={(e) => setForm({ ...form, price_buy: e.target.value })}
              className="text-gray-900 w-full p-2 border rounded bg-gray-100"
              placeholder="Nhập giá"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Danh mục</label>
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({ ...form, category_id: e.target.value })
              }
              className="text-gray-900 w-full p-2 border rounded bg-gray-100"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ảnh gốc + ảnh phụ */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Ảnh gốc */}
          <div>
            <label className="block text-gray-700 mb-1">Ảnh gốc</label>
            <input
              type="file"
              ref={fileInputRef}
              className="text-gray-900 w-full p-2 border rounded bg-gray-100"
            />
            {fileInputRef.current?.files[0] && (
              <img
                src={URL.createObjectURL(fileInputRef.current.files[0])}
                alt="Thumbnail preview"
                className="w-32 h-32 object-cover border rounded mt-2 shadow-sm"
              />
            )}
          </div>

          {/* Ảnh phụ */}
          <div>
            <label className="block text-gray-700 mb-1">Ảnh phụ</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="text-gray-900 w-full p-2 border rounded bg-gray-100"
            />
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-32 h-32 object-cover border rounded shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Nội dung</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="text-gray-900 w-full p-2 border rounded bg-gray-100"
            placeholder="Nhập nội dung sản phẩm"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Mô tả</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="text-gray-900 w-full p-2 border rounded bg-gray-100"
            placeholder="Nhập mô tả"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Trạng thái</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: Number(e.target.value) })
            }
            className="text-gray-900 w-full p-2 border rounded bg-gray-100"
          >
            <option value={1}>Hoạt động</option>
            <option value={0}>Ẩn</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600 transition font-semibold"
        >
          Lưu sản phẩm
        </button>
      </form>

      {/* Thuộc tính */}
      {productId && (
        <div className="mt-8 bg-white shadow-md rounded-lg p-5">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Thêm thuộc tính cho sản phẩm #{productId}
          </h3>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Tên thuộc tính"
              value={attributeName}
              onChange={(e) => setAttributeName(e.target.value)}
              className="text-gray-900 w-full p-2 border rounded bg-gray-100"
            />
            <input
              type="text"
              placeholder="Giá trị"
              value={attributeValue}
              onChange={(e) => setAttributeValue(e.target.value)}
              className="text-gray-900 w-full p-2 border rounded bg-gray-100"
            />
            <button
              type="button"
              onClick={handleAddAttribute}
              className="bg-gray-800 text-white px-2 py-2 rounded hover:bg-gray-900 transition"
            >
              Thêm
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/product/list")}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Quay về danh sách
            </button>
          </div>

          {addedAttributes.length > 0 && (
            <ul className="mt-3 list-disc pl-5 space-y-1">
              {addedAttributes.map((a, i) => (
                <li key={i}>
                  <b>{a.name}</b>: {a.value}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
