"use client";
import { useState, useEffect, useRef } from "react";
import { FaPlus, FaUpload, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ProductStoreAdmin() {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editStore, setEditStore] = useState(null);
  const [formData, setFormData] = useState({
    product_id: "",
    price_root: "",
    qty: "",
    status: 1,
  });

  const fileInputRef = useRef(null);
const [checkingAdmin, setCheckingAdmin] = useState(true);
  const router = useRouter();

  // ✅ Hook luôn ở top level
  useEffect(() => {
    const userAdmin = localStorage.getItem("userad");
    if (!userAdmin) {
      router.push("/admin/login");
    } else {
      setCheckingAdmin(false);
    }
  }, [router]);
  useEffect(() => {
    if (!checkingAdmin) loadData();
  }, [page, search,checkingAdmin]);
  // if (checkingAdmin) return null;

  // Load danh sách tồn kho
  const loadData = () => {
    fetch(`http://127.0.0.1:8000/api/productstore?page=${page}&keyword=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setStores(data.data);
        setLastPage(data.last_page);
      }); 
  };


  // Load danh sách sản phẩm
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data ?? data);
      });
  }, []);

  // Thêm/sửa tồn kho
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "http://127.0.0.1:8000/api/productstore";
    let method = "POST";

    if (editStore) {
      url = `http://127.0.0.1:8000/api/productstore/${editStore.id}`;
      method = "PUT";
    }

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    alert(editStore ? "Cập nhật thành công!" : "Thêm mới thành công!");
    setShowForm(false);
    setEditStore(null);
    loadData();
  };

  // Import Excel
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/api/productstore/import", {
      method: "POST",
      body: formDataUpload,
    });

    const data = await res.json();
    alert(data.message);
    loadData();
  };

  // Khi chọn sản phẩm trong form
  const handleProductChange = (e) => {
    const id = e.target.value;
    setFormData({ ...formData, product_id: parseInt(id) });
    const product = products.find((p) => p.id === parseInt(id));
    setSelectedProduct(product || null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-bold text-gray-700">📦 Quản lý tồn kho</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm..."
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setFormData({ product_id: "", price_root: "", qty: "", status: 1 });
              setEditStore(null);
              setShowForm(true);
            }}
            className="bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
          >
            <FaPlus /> Thêm mới
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
          >
            <FaUpload /> Import
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Form thêm/sửa */}
      {showForm && (
        <div className="bg-white border rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">
            {editStore ? "✏️ Sửa tồn kho" : "➕ Thêm tồn kho"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="border p-2 rounded w-full"
              value={formData.product_id}
              onChange={handleProductChange}
              required
            >
              <option value="">-- Chọn sản phẩm --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Giá gốc"
              className="border p-2 rounded"
              value={formData.price_root}
              onChange={(e) => setFormData({ ...formData, price_root: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Số lượng"
              className="border p-2 rounded"
              value={formData.qty}
              onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
              required
            />
            <select
              className="border p-2 rounded"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
            >
              <option value={1}>Hoạt động</option>
              <option value={0}>Ẩn</option>
            </select>

            {/* Hiển thị sản phẩm khi chọn */}
            {selectedProduct && (
              <div className="col-span-2 flex items-center gap-4 p-3 border rounded-lg bg-gray-50 shadow-inner">
                {selectedProduct.image && (
                  <img
                    src={`http://localhost:8000/images/${selectedProduct.thumbnail}`}
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                )}
                <div>
                  <h4 className="font-bold">{selectedProduct.name}</h4>
                  <p className="text-gray-600">
                    Giá mua:{" "}
                    {Number(selectedProduct.price_buy).toLocaleString()} đ
                  </p>
                </div>
              </div>
            )}

            <div className="col-span-2 flex gap-3 mt-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded shadow hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bảng danh sách */}
      <div className="overflow-x-auto border rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50 text-blue-700">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Sản phẩm</th>
              <th className="p-3 text-left">Ảnh</th>
              <th className="p-3 text-left">Giá gốc</th>
              <th className="p-3 text-left">Số lượng</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((item, idx) => (
              <tr
                key={item.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{item.product?.name}</td>
                <td className="p-3">
                  {item.product?.image && (
                    // <img
                    //   src={`http://localhost:8000/images/${item.product?.thumbnail}`}
                    //   alt={item.product.name}
                    //   className="w-14 h-14 object-cover rounded border"
                    // />
                    <img
                    src={`http://localhost:8000/images/${item.product?.thumbnail}`}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  )}
                </td>
                <td className="p-3">{Number(item.price_root).toLocaleString()}vnđ</td>
                <td className="p-3">{item.qty}</td>

                <td className="p-3">
                  {item.status === 1 ? (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-600">
                      Ẩn
                    </span>
                  )}
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setEditStore(item);
                      setFormData(item);
                      setShowForm(true);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded shadow"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Xóa bản ghi này?")) {
                        await fetch(`http://127.0.0.1:8000/api/productstore/${item.id}`, {
                          method: "DELETE",
                        });
                        loadData();
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: lastPage }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded-lg shadow ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
