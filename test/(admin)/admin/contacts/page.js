"use client";
import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ContactAdmin() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(""); // "" = tất cả, 1 = Hoạt động, 0 = Ẩn
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    content: "",
    status: 1,
  });
const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const userAdmin = localStorage.getItem("userad");
    if (!userAdmin) {
      router.push("/admin/login"); // chuyển ngay
    } else {
      setCheckingAdmin(false); // có quyền -> render tiếp
    }
  }, [router]);
  const apiUrl = "http://127.0.0.1:8000/api/contact";

  const fetchContacts = async () => {
    const res = await fetch(`${apiUrl}?page=${page}&search=${search}`);
    const data = await res.json();
    setContacts(data.data || []);
    setLastPage(data.last_page || 1);
  };

  useEffect(() => {
    if (!checkingAdmin) fetchContacts();
  }, [page, search,checkingAdmin]);
if (checkingAdmin) {
    // ✅ Render null hoặc loading trong lúc kiểm tra
    return null;
  }
  const handleAdd = () => {
    setEditingContact(null);
    setFormData({
      user_id: "",
      name: "",
      email: "",
      phone: "",
      content: "",
      status: 1,
    });
    setShowForm(true);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({ ...contact });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingContact ? "PUT" : "POST";
    const url = editingContact ? `${apiUrl}/${editingContact.id}` : apiUrl;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowForm(false);
      fetchContacts();
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
      const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (res.ok) fetchContacts();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý liên hệ</h1>

      {/* Tìm kiếm và thêm mới */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên..."
          className="border px-3 py-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Tất cả trạng thái --</option>
          <option value="1">Hoạt động</option>
          <option value="0">Ẩn</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-400 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Thêm liên hệ
        </button>
      </div>

      {/* Bảng liên hệ */}
      {/* <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Người dùng</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Điện thoại</th>
            <th className="border p-2">Nội dung</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="hover:bg-gray-100">
              <td className="border p-2">{c.id}</td>
              <td className="border p-2">{c.user?.name || "Khách vãng lai"}</td>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.phone}</td>
              <td className="border p-2">{c.content}</td>
              <td className="border p-2">
                {c.status ? "Hoạt động" : "Ẩn"}
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="bg-yellow-400 px-2 py-1 rounded text-white"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {contacts.map((c) => (
    <div
      key={c.id}
      className="border rounded-lg shadow bg-white p-4 hover:shadow-lg transition"
    >
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold">{c.name}</h2>
        <span className={`px-2 py-1 text-xs font-bold rounded ${c.status ? 'bg-green-200 text-green-800' : 'bg-gray-300 text-gray-700'}`}>
          {c.status ? "Hoạt động" : "Ẩn"}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {c.email}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Điện thoại:</strong> {c.phone || "Chưa có"}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Người dùng:</strong> {c.user?.name || "Khách vãng lai"}</p>
      <p className="text-sm text-gray-600 mb-3"><strong>Nội dung:</strong> {c.content}</p>
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(c)}
          className="bg-yellow-400 px-3 py-1 rounded text-white flex-1"
        >
          Sửa
        </button>
        <button
          onClick={() => handleDelete(c.id)}
          className="bg-red-500 px-3 py-1 rounded text-white flex-1"
        >
          Xóa
        </button>
      </div>
    </div>
  ))}
</div>

      {/* Phân trang */}
      <div className="flex gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Trước
        </button>
        <span className="px-3 py-1">
          Trang {page}/{lastPage}
        </span>
        <button
          disabled={page === lastPage}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>

      {/* Form thêm/sửa */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingContact ? "Sửa liên hệ" : "Thêm liên hệ"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="user_id"
                className="border px-3 py-2 w-full rounded"
                value={formData.user_id}
                onChange={(e) =>
                  setFormData({ ...formData, user_id: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Tên"
                className="border px-3 py-2 w-full rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border px-3 py-2 w-full rounded"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Điện thoại"
                className="border px-3 py-2 w-full rounded"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <textarea
                placeholder="Nội dung"
                className="border px-3 py-2 w-full rounded"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
