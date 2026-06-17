"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function UserAdmin() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    gender:"",
    password: "",
    roles: "customer",
    status: 1,
    address: "", // thêm địa chỉ
    // birthday:"",

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

  const apiUrl = "http://127.0.0.1:8000/api/user";

  const fetchUsers = async () => {
    const res = await fetch(
      `${apiUrl}?page=${page}&search=${search}&role=${role}`
    );
    const data = await res.json();
    setUsers(data.data);
    setLastPage(data.last_page);
  };

  useEffect(() => {
    if (!checkingAdmin) fetchUsers();
  }, [page, search, role,checkingAdmin]);
if (checkingAdmin) {
    // ✅ Render null hoặc loading trong lúc kiểm tra
    return null;
  }
  // Mở form thêm mới
  const handleAdd = () => {
    setEditingUser(null);
    setFormData({
      email: "",
      phone: "",
      username: "",
      gender:"",
      password: "",
      roles: "customer",
      status: 1,
      // address: "" ,
      address: "",
    });
    setShowForm(true);
  };

  // Mở form sửa
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...user, password: "" ,address: user.address || "" });
    setShowForm(true);
  };

  // Submit thêm/sửa
  const handleSubmit = async (e) => {
  e.preventDefault();

  //
    setErrorMessage(null); // reset lỗi cũ
  //

  const url = editingUser ? `${apiUrl}/${editingUser.id}` : apiUrl;

  const formDataToSend = new FormData();
  formDataToSend.append("username", formData.username);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("phone", formData.phone);
  formDataToSend.append("gender", formData.gender);
  formDataToSend.append("roles", formData.roles);
  formDataToSend.append("address", formData.address);
  formDataToSend.append("status", formData.status);

  if (!editingUser) {
    formDataToSend.append("password", formData.password);
  }

  if (avatar) {
    formDataToSend.append("avatar", avatar);
  }

  if (editingUser) {
    formDataToSend.append("_method", "PUT");
  }

  // Debug FormData
  for (let [key, value] of formDataToSend.entries()) {
    console.log("📤", key, value);
  }

  const res = await fetch(url, {
    method: "POST", // luôn POST, update Laravel sẽ hiểu nhờ _method
    body: formDataToSend,
  });

  if (res.ok) {
    setShowForm(false);
    fetchUsers();
    setAvatar(null);
  } else {
    const errorData = await res.json();
    console.error("❌ Error:", errorData);

    //
        setErrorMessage(errorData.message || "Có lỗi xảy ra!");
    //
  }
};

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const method = editingUser ? "PUT" : "POST";
//     const url = editingUser ? `${apiUrl}/${editingUser.id}` : apiUrl;
// console.log("📤 Sending data:", formData);
//   console.log("📤 Method:", method, "URL:", url);
//     const res = await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       setShowForm(false);
//       fetchUsers();
//     }
//   };

  // Xóa
  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa user này?")) {
      const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (res.ok) fetchUsers();
    }
  };

  // Đổi trạng thái
  const toggleStatus = async (user) => {
    const res = await fetch(`${apiUrl}/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, status: user.status === 1 ? 0 : 1 }),
    });
    if (res.ok) fetchUsers();
  };
const genderMap = {
  male: "Nam",
  female: "Nữ",
  other: "Khác",
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý thành viên</h1>

      {/* Bộ lọc */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên..."
          className="border px-3 py-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-400 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Thêm thành viên
        </button>
      </div>

      {/* Bảng danh sách */}
        {/* <table className="w-full border-collapse border rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Điện Thoại</th>
            <th className="p-2 border">Giới tính</th>
            <th className="p-2 border">Quyền</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-100">
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.username}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.phone}</td>
              <td className="p-2 border">{genderMap[u.gender]}</td>
              <td className="p-2 border">{u.roles}</td>
              <td className="p-2 border">
                <button
                  onClick={() => toggleStatus(u)}
                  className={`px-2 py-1 rounded ${
                    u.status === 1 ? "bg-green-500" : "bg-gray-500"
                  } text-white`}
                >
                  {u.status === 1 ? "Hoạt động" : "Khóa"}
                </button>
              </td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="bg-yellow-400 px-2 py-1 rounded text-white flex items-center gap-1"
                >
                  <FaEdit /> Sửa
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 px-2 py-1 rounded text-white flex items-center gap-1"
                >
                  <FaTrash /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
{/* Danh sách dạng thẻ CCCD */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {users.map((u) => (
    <div
      key={u.id}
      className="relative bg-gradient-to-r from-gray-100 to-gray-200 border rounded-xl shadow p-4"
    >
      {/* Header CCCD */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs px-2 py-1 rounded ${
            u.status === 1 ? "bg-green-500 text-white" : "bg-gray-500 text-white"
          }`}
        >
          {u.status === 1 ? "Hoạt động" : "Khóa"}
        </span>
      </div>
      <div className="flex mt-2 gap-2">
        {/* Ảnh đại diện */}
      <div className="w-32 h-20 bg-gray-300 rounded overflow-hidden flex items-center justify-center">
        <img
          src={`http://127.0.0.1:8000/images/${u.avatar}`}
          alt={u.name}
          className="w-full h-full object-cover"
        />
      </div>

        {/* Thông tin */}
        <div className="flex-1 text-sm">
          <p>
            {/* <span className="font-bold">STT:</span> {u.id} */}
          </p>
          <p>
            <span className="font-bold">Họ tên:</span> {u.username}
          </p>
          <p>
            <span className="font-bold">Giới tính:</span> {genderMap[u.gender]}
          </p>
          <p>
            <span className="font-bold">Địa chỉ:</span> {u.address}
          </p>
          <p>
            <span className="font-bold">Điện thoại:</span> {u.phone}
          </p>
          <p>
            <span className="font-bold">Email:</span> {u.email}
          </p>
          <p>
            <span className="font-bold">Quyền:</span> {u.roles}
          </p>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => handleEdit(u)}
          className="bg-yellow-400 px-3 py-1 rounded text-white flex items-center gap-1"
        >
          <FaEdit /> Sửa
        </button>
        <button
          onClick={() => handleDelete(u.id)}
          className="bg-red-500 px-3 py-1 rounded text-white flex items-center gap-1"
        >
          <FaTrash /> Xóa
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
              {editingUser ? "Sửa thành viên" : "Thêm thành viên"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                {errorMessage && (
                <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
                  {errorMessage}
                </div>
              )}
              <input
                type="text"
                placeholder="Tên"
                className="border px-3 py-2 w-full rounded"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
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
                placeholder="Phone"
                className="border px-3 py-2 w-full rounded"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Địa chỉ"
                className="border px-3 py-2 w-full rounded"
                value={formData.address || ""}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />

              {!editingUser && (
                <input
                  type="password"
                  placeholder="Password"
                  className="border px-3 py-2 w-full rounded"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="border px-3 py-2 w-full rounded"
                onChange={(e) => setAvatar(e.target.files[0])}
              />

              <select
                className="border px-3 py-2 w-full rounded"
                value={formData.gender||""}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>

              <select
                className="border px-3 py-2 w-full rounded"
                value={formData.roles}
                onChange={(e) =>
                  setFormData({ ...formData, roles: e.target.value })
                }
              >
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
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
