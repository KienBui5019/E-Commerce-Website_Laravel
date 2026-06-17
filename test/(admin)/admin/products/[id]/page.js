"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";

export default function ProductImagesPage() {
  const { id } = useParams(); // lấy productId từ URL
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newAlt, setNewAlt] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const fetchImages = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/images`);
    if (!res.ok) {
      setImages([]);
      return;
    }
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, [id]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newImage) return;

    const fd = new FormData();
    fd.append("image", newImage);
    fd.append("alt", newAlt);
    fd.append("title", newTitle);

    await fetch(`http://127.0.0.1:8000/api/products/${id}/images`, {
      method: "POST",
      body: fd,
    });
    setNewImage(null);
    setNewAlt("");
    setNewTitle("");
    fetchImages();
  };

  const handleDelete = async (imgId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa ảnh này?")) return;
    await fetch(`http://127.0.0.1:8000/api/products/productimage/${imgId}`, {
      method: "DELETE",
    });
    fetchImages();
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ⬅ Quay lại
      </button>

      <h1 className="text-xl font-bold mb-4">Ảnh của sản phẩm #{id}</h1>

      {/* Form thêm ảnh */}
      {/* <form onSubmit={handleUpload} className="flex items-center gap-3 mb-6">
        <input
          type="file"
          onChange={(e) => setNewImage(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Thêm ảnh
        </button>
      </form> */}
<form onSubmit={handleUpload} className="flex flex-col gap-3 mb-6">
  <input
    type="file"
    onChange={(e) => setNewImage(e.target.files[0])}
    className="border p-2 rounded"
  />
  <input
    type="text"
    placeholder="ALT ảnh"
    value={newAlt}
    onChange={(e) => setNewAlt(e.target.value)}
    className="border p-2 rounded"
  />
  <input
    type="text"
    placeholder="Title ảnh"
    value={newTitle}
    onChange={(e) => setNewTitle(e.target.value)}
    className="border p-2 rounded"
  />

  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
  >
    <FaPlus />  Thêm ảnh
  </button>
</form>

{/*  */}
{/* <form onSubmit={handleUpload} className="flex flex-col gap-3 mb-6">
  <input
    type="file"
    onChange={(e) => setNewImage(e.target.files[0])}
    className="border p-2 rounded"
  />
  <input
    type="text"
    placeholder="ALT ảnh"
    value={newAlt}
    onChange={(e) => setNewAlt(e.target.value)}
    className="border p-2 rounded"
  />
  <input
    type="text"
    placeholder="Title ảnh"
    value={newTitle}
    onChange={(e) => setNewTitle(e.target.value)}
    className="border p-2 rounded"
  />

  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
  >
    <FaPlus /> {editing ? "Cập nhật ảnh" : "Thêm ảnh"}
  </button>
</form> */}

      {/* Danh sách ảnh */}
      {images.length === 0 ? (
        <p className="text-gray-500">📭 Không có ảnh nào</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="border rounded p-2 relative">
              <img
                src={`http://127.0.0.1:8000/images/${img.image}`}
                alt={img.alt || "Ảnh sản phẩm"}
                className="w-full h-32 object-cover rounded"
              />
              <p className="text-sm text-center mt-1">
                {img.alt || "Không có mô tả"}
              </p>

              <p className="text-sm text-center mt-1">
                {img.title || "Không có mô tả"}
              </p>

              <div className="flex justify-center gap-2 mt-2">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <FaTrash /> Xóa
                </button>
                <button
                  onClick={() => alert("Chức năng sửa ảnh sẽ thêm sau")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <FaEdit /> Sửa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
