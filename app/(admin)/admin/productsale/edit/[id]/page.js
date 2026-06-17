"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProductSale({ params }) {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [form, setForm] = useState({
    original_name: "",
    original_price: "",
    sale_name: "",
    price_sale: "",
    image: null,
    preview: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // unwrap params.id
  useEffect(() => {
    if (!params) return;
    if (typeof params.id === "string") setId(params.id);
    else if (params.id?.then) params.id.then((val) => setId(val));
  }, [params]);

  // Lấy dữ liệu sản phẩm khuyến mãi
  useEffect(() => {
    if (!id) return;

    const fetchSale = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/product-sale/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm khuyến mãi");
        const data = await res.json();
        console.log("DATA NHẬN ĐƯỢC:", data);

        setForm({
          original_name: data.product?.name || "",
          original_price: data.product?.price || "",
          sale_name: data.name || "",
          price_sale: data.price_sale || "",
          image: null,
          preview: data.product?.thumbnail_url || data.product?.thumbnail || "",
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSale();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file)
      setForm({ ...form, image: file, preview: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.sale_name);
      formData.append("price_sale", form.price_sale);
      if (form.image) formData.append("image", form.image);
      formData.append("_method", "PUT");

      const res = await fetch(`http://localhost:8000/api/product-sale/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Cập nhật thất bại");
      }

      alert("✅ Cập nhật thành công!");
      router.push("/admin/productsale");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">
        Sửa sản phẩm khuyến mãi
      </h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên gốc */}
        <div>
          <label className="block font-semibold mb-1">Tên sản phẩm gốc:</label>
          <input
            type="text"
            name="original_name"
            value={form.original_name}
            readOnly
            className="text-gray-900 w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Giá gốc */}
        <div>
          <label className="block font-semibold mb-1">Giá gốc:</label>
          <input
            type="number"
            name="original_price"
            value={form.original_price}
            readOnly
            className="text-gray-900 w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Tên khuyến mãi
        <div>
          <label className="block font-semibold mb-1">Tên khuyến mãi:</label>
          <input
            type="text"
            name="sale_name"
            value={form.sale_name}
            onChange={handleChange}
            placeholder="VD: Giảm giá Black Friday"
            className="text-gray-900 w-full border p-2 rounded"
            required
          />
        </div> */}

        {/* Giá khuyến mãi */}
        <div>
          <label className="block font-semibold mb-1">Giá khuyến mãi:</label>
          <input
            type="number"
            name="price_sale"
            value={form.price_sale}
            onChange={handleChange}
            placeholder="Nhập giá khuyến mãi"
            required
            className="text-gray-900 w-full border p-2 rounded"
          />
        </div>

        {/* Ảnh */}
        <div>
          <label className="block font-semibold mb-1">Ảnh sản phẩm:</label>
          {form.preview && (
            <img
              src={form.preview}
              alt="preview"
              className="w-32 h-32 object-cover mb-3 rounded shadow"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-gray-900 w-full border p-2 rounded"
          />
        </div>

        {/* Nút submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-semibold w-full"
        >
          {loading ? "Đang lưu..." : "Cập nhật sản phẩm khuyến mãi"}
        </button>
      </form>
    </div>
  );
}
