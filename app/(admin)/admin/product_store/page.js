"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductStorePage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [qtyMin, setQtyMin] = useState("");
  const [qtyMax, setQtyMax] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedProduct, setSelectedProduct] = useState("");
  const [priceRoot, setPriceRoot] = useState("");
  const [qty, setQty] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [importFile, setImportFile] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // --- Fetch sản phẩm ---
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error("Lỗi load sản phẩm:", err);
      setProducts([]);
    }
  };

  // --- Fetch phiếu nhập kho ---
  const fetchStores = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/product-stores");
      const data = await res.json();
      setStores(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error("Lỗi load kho:", err);
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchStores();
  }, []);

  // --- Thêm phiếu nhập kho ---
  const handleAddStore = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return alert("Chọn sản phẩm");
    if (!priceRoot || isNaN(priceRoot)) return alert("Nhập giá gốc hợp lệ");
    if (!qty || isNaN(qty)) return alert("Nhập số lượng hợp lệ");

    try {
      const res = await fetch("http://localhost:8000/api/product-stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: Number(selectedProduct),
          price_root: parseFloat(priceRoot),
          qty: parseInt(qty),
          status: 1,
        }),
      });
      if (!res.ok) throw new Error("Thêm phiếu nhập kho thất bại");
      const data = await res.json();
      alert(data.message || "✅ Thêm phiếu nhập kho thành công!");
      setSelectedProduct("");
      setPriceRoot("");
      setQty("");
      setShowForm(false);
      fetchStores();
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm phiếu nhập kho");
    }
  };

  // --- Import file ---
  const handleImport = async () => {
    if (!importFile) return alert("Chọn file để import");
    const formData = new FormData();
    formData.append("file", importFile);
    formData.append("status", statusFilter);
    if (selectedProduct) formData.append("product_id", selectedProduct);
    if (qtyMin) formData.append("qty_min", qtyMin);
    if (qtyMax) formData.append("qty_max", qtyMax);

    try {
      const res = await fetch(
        "http://localhost:8000/api/product-stores/import",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Import thất bại");
      const data = await res.json();
      alert(data.message || "✅ Import thành công!");
      setImportFile(null);
      fetchStores();
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi import file");
    }
  };

  // --- Filter ---
  const filteredStores = stores.filter((s) => {
    const productName = s.product?.name?.toLowerCase() || "";
    const matchSearch = productName.includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? s.status === 1
        : s.status === 0;
    const matchQty =
      (!qtyMin || s.qty >= parseInt(qtyMin)) &&
      (!qtyMax || s.qty <= parseInt(qtyMax));
    return matchSearch && matchStatus && matchQty;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStores.length / itemsPerPage)
  );
  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="text-gray-900 p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý nhập kho</h1>

      {/* --- Lọc & Import --- */}
      <div className="mb-4 p-4 border rounded bg-gray-100 space-y-2">
        <h2 className="font-semibold">Lọc & Import nâng cao</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Ẩn</option>
          </select>
          <input
            type="number"
            placeholder="Số lượng từ"
            value={qtyMin}
            onChange={(e) => {
              setQtyMin(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 w-32 rounded"
          />
          <input
            type="number"
            placeholder="Số lượng đến"
            value={qtyMax}
            onChange={(e) => {
              setQtyMax(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 w-32 rounded"
          />
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => setImportFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <button
            onClick={handleImport}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Import
          </button>
        </div>
      </div>

      {/* --- Nút tạo phiếu --- */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-gray-900 text-white px-4 py-2 rounded"
        >
          Tạo phiếu nhập kho
        </button>
      )}

      {/* --- Form tạo phiếu nhập --- */}
      {showForm && (
        <form
          onSubmit={handleAddStore}
          className="mb-6 p-4 border rounded bg-gray-50 space-y-2"
        >
          <h2 className="font-semibold">Tạo phiếu nhập kho</h2>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border p-2 w-full rounded"
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
            value={priceRoot}
            onChange={(e) => setPriceRoot(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            placeholder="Số lượng"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Thêm phiếu nhập
          </button>
        </form>
      )}

      {/* --- Danh sách phiếu nhập --- */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Hình ảnh</th>
            <th className="border p-2">Sản phẩm</th>
            <th className="border p-2">Giá gốc</th>
            <th className="border p-2">Số lượng</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Ngày tạo</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStores.map((s, idx) => (
            <tr key={s.id}>
              <td className="border p-2">
                {(currentPage - 1) * itemsPerPage + idx + 1}
              </td>
              <td className="text-gray-900 border p-2">
                {s.product?.thumbnail ? (
                  <img
                    src={`http://localhost:8000/${s.product.thumbnail}`}
                    alt={s.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "—"
                )}
              </td>
              <td className="border p-2">{s.product?.name || "—"}</td>
              <td className="border p-2">{s.price_root}</td>
              <td className="border p-2">{s.qty}</td>
              <td className="border p-2">{s.status ? "Hoạt động" : "Ẩn"}</td>
              <td className="border p-2">
                {new Date(s.created_at).toLocaleString()}
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() =>
                    router.push(`/admin/product_store/edit/${s.id}`)
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Bạn có chắc muốn xóa?")) return;
                    try {
                      const res = await fetch(
                        `http://localhost:8000/api/product-stores/${s.id}`,
                        {
                          method: "DELETE",
                        }
                      );
                      if (!res.ok) throw new Error("Xóa thất bại");
                      alert("✅ Xóa thành công!");
                      fetchStores();
                    } catch (err) {
                      console.error(err);
                      alert("❌ Lỗi khi xóa phiếu nhập");
                    }
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- Pagination --- */}
      {filteredStores.length > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="border px-3 py-1 rounded"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`border px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-gray-300" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="border px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
