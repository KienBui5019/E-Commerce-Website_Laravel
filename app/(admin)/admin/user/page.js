"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Tìm kiếm, lọc và phân trang
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/index");
      if (!res.ok) throw new Error("Lỗi API");
      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      setError("Không thể tải danh sách người dùng");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => router.push(`/admin/user/edit/${user.id}`);
  const handleAdd = () => router.push(`/admin/user/add`);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/user/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Xóa thất bại");

      setMessage("✅ " + data.message);
      fetchUsers();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ " + (err.message || "Xóa thất bại"));
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Filter + search + pagination
  const filteredUsers = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => roleFilter === "all" || u.roles === roleFilter);

  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="relative text-black">
      {/* Toast thông báo */}
      {message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-md font-semibold ${
            message.startsWith("✅")
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Quản lý người dùng</h2>
        <button
          onClick={handleAdd}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition font-semibold"
        >
          Thêm người dùng
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tên hoặc email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400 flex-1"
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400"
        >
          <option value="all">Tất cả role</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {loading ? (
        <p>Đang tải danh sách...</p>
      ) : error ? (
        <p>{error}</p>
      ) : displayedUsers.length === 0 ? (
        <p>Chưa có người dùng nào</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-yellow-100 text-black">
                <th className="border p-2">ID</th>
                <th className="border p-2">Tên</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">SĐT</th>
                <th className="border p-2">Roles</th>
                <th className="border p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((u) => (
                <tr key={u.id} className="hover:bg-yellow-50">
                  <td className="border p-2">{u.id}</td>
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.phone || "-"}</td>
                  <td className="border p-2">{u.roles}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-blue-400 px-2 rounded hover:bg-blue-500 text-black font-semibold"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 px-2 rounded hover:bg-red-600 text-black font-semibold"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1 border rounded">{currentPage}</span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
