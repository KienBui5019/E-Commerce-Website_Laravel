// "use client";
// import { useEffect, useState } from "react";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// export default function CategoryAdmin() {
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState(""); // lọc trạng thái
//   const [page, setPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1);

//   const [showForm, setShowForm] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     description: "",
//     status: 1,
//   });

//   const apiUrl = "http://127.0.0.1:8000/api/category";

//   const fetchCategories = async () => {
//     try {
//       const res = await fetch(
//         `${apiUrl}?page=${page}&search=${search}&status=${status}`
//       );
//       const data = await res.json();
//       setCategories(data.data || data);
//       setLastPage(data.last_page || 1);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, [page, search, status]);

//   // Mở form thêm mới
//   const handleAdd = () => {
//     setEditingCategory(null);
//     setFormData({ name: "", slug: "", description: "", status: 1 });
//     setShowForm(true);
//   };

//   // Mở form sửa
//   const handleEdit = (cat) => {
//     setEditingCategory(cat);
//     setFormData({ ...cat });
//     setShowForm(true);
//   };

//   // Submit thêm/sửa
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const method = editingCategory ? "PUT" : "POST";
//     const url = editingCategory ? `${apiUrl}/${editingCategory.id}` : apiUrl;

//     const res = await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       setShowForm(false);
//       fetchCategories();
//     }
//   };

//   // Xóa
//   const handleDelete = async (id) => {
//     if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
//       const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
//       if (res.ok) fetchCategories();
//     }
//   };

//   // Đổi trạng thái
//   const toggleStatus = async (cat) => {
//     const res = await fetch(`${apiUrl}/${cat.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...cat, status: cat.status === 1 ? 0 : 1 }),
//     });
//     if (res.ok) fetchCategories();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Quản lý danh mục sử lý thêm slug giôngd bên product</h1>

//       {/* Bộ lọc + thêm */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Tìm kiếm theo tên..."
//           className="border rounded px-3 py-2 w-1/3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           className="border rounded px-3 py-2"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <option value="">Tất cả</option>
//           <option value="1">Hiển thị</option>
//           <option value="0">Ẩn</option>
//         </select>
//         <button
//           onClick={handleAdd}
//           className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <FaPlus /> Thêm danh mục
//         </button>
//       </div>

//       {/* Bảng danh sách */}
//       <table className="w-full border-collapse border rounded shadow">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="p-2 border">ID</th>
//             <th className="p-2 border">Tên</th>
//             <th className="p-2 border">Mô tả</th>
//             <th className="p-2 border">Trạng thái</th>
//             <th className="p-2 border">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((cat) => (
//             <tr key={cat.id} className="hover:bg-gray-100">
//               <td className="p-2 border">{cat.id}</td>
//               <td className="p-2 border">{cat.name}</td>
//               <td className="p-2 border">{cat.description}</td>
//               <td className="p-2 border">
//                 <button
//                   onClick={() => toggleStatus(cat)}
//                   className={`px-2 py-1 rounded ${
//                     cat.status === 1 ? "bg-green-500" : "bg-gray-500"
//                   } text-white`}
//                 >
//                   {cat.status === 1 ? "Hiển thị" : "Ẩn"}
//                 </button>
//               </td>
//               <td className="p-2 border flex gap-2">
//                 <button
//                   onClick={() => handleEdit(cat)}
//                   className="bg-yellow-400 px-2 py-1 rounded text-white flex items-center gap-1"
//                 >
//                   <FaEdit /> Sửa
//                 </button>
//                 <button
//                   onClick={() => handleDelete(cat.id)}
//                   className="bg-red-500 px-2 py-1 rounded text-white flex items-center gap-1"
//                 >
//                   <FaTrash /> Xóa
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Phân trang */}
//       <div className="flex gap-2 mt-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Trước
//         </button>
//         <span className="px-3 py-1">
//           Trang {page}/{lastPage}
//         </span>
//         <button
//           disabled={page === lastPage}
//           onClick={() => setPage(page + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Sau
//         </button>
//       </div>

//       {/* Form thêm/sửa */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">
//               {editingCategory ? "Sửa danh mục" : "Thêm danh mục"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Tên danh mục"
//                 className="border px-3 py-2 w-full rounded"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Slug"
//                 className="border px-3 py-2 w-full rounded"
//                 value={formData.slug}
//                 onChange={(e) =>
//                   setFormData({ ...formData, slug: e.target.value })
//                 }
//                 required
//               />
//               <textarea
//                 placeholder="Mô tả"
//                 className="border px-3 py-2 w-full rounded"
//                 value={formData.description||""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//               />
//               <select
//                 className="border px-3 py-2 w-full rounded"
//                 value={formData.status}
//                 onChange={(e) =>
//                   setFormData({ ...formData, status: parseInt(e.target.value) })
//                 }
//               >
//                 <option value={1}>Hiển thị</option>
//                 <option value={0}>Ẩn</option>
//               </select>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-4 py-2 border rounded"
//                 >
//                   Hủy
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   Lưu
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  //
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    status: 1,
  });
  //
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  useEffect(() => {
    const userAdmin = localStorage.getItem("userad");
    if (!userAdmin) {
      router.push("/admin/login"); // chuyển ngay
    } else {
      setCheckingAdmin(false); // có quyền -> render tiếp
    }
  }, [router]);
  //
  const apiUrl = "http://127.0.0.1:8000/api/category";

  const fetchCategories = async () => {
    const res = await fetch(
      `${apiUrl}?page=${page}&search=${search}&status=${status}`
    );
    const data = await res.json();
    setCategories(data.data || data);
    setLastPage(data.last_page || 1);
  };

  useEffect(() => {
    if (!checkingAdmin) fetchCategories();
  }, [page, search, status,checkingAdmin]);
if (checkingAdmin) {
    // ✅ Render null hoặc loading trong lúc kiểm tra
    return null;
  }
  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", status: 1 });
    setShowForm(true);
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ ...cat });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const method = editingCategory ? "PUT" : "POST";
    const url = editingCategory ? `${apiUrl}/${editingCategory.id}` : apiUrl;
 console.log("Sending request to:", url);
  console.log("Method:", method);
  console.log("Payload:", formData);
    try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowForm(false); 
      fetchCategories();
    } else if (res.status === 422) { // lỗi validation từ Laravel
      const data = await res.json();
      // Laravel trả về lỗi theo kiểu { errors: { field: ["msg"] } }
      setErrorMessage(data.errors?.name ? data.errors.name[0] : "Có lỗi xảy ra");
    } else {
      setErrorMessage("Có lỗi xảy ra, thử lại sau");
    }
  } catch (error) {
    setErrorMessage("Không thể kết nối đến server");
  }
};

  //   const res = await fetch(url, {
  //     method,
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   });

  //   if (res.ok) {
  //     setShowForm(false);
  //     fetchCategories();
  //   }
  // };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (res.ok) fetchCategories();
    }
  };

  const toggleStatus = async (cat) => {
    const res = await fetch(`${apiUrl}/${cat.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...cat, status: cat.status === 1 ? 0 : 1 }),
    });
    if (res.ok) fetchCategories();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-400 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 shadow"
        >
          <FaPlus /> Thêm danh mục
        </button>
      </div>

      {/* Bộ lọc */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên..."
          className="border px-3 py-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">-- Tất cả trạng thái --</option>
          <option value="1">Hiển thị</option>
          <option value="0">Ẩn</option>
        </select>
      </div>

      {/* Bảng */}
      {/* <table className="w-full border border-gray-300 rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Tên</th>

            <th className="p-2 border">Mô tả</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="hover:bg-gray-50">
              <td className="p-2 border">{cat.id}</td>
              <td className="p-2 border">{cat.name}</td>
              <td className="p-2 border">{cat.description}</td>
              <td className="p-2 border">
                <button
                  onClick={() => toggleStatus(cat)}
                  className={`px-3 py-1 rounded text-white ${
                    cat.status === 1 ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {cat.status === 1 ? "Hiển thị" : "Ẩn"}
                </button>
              </td>
              <td className="p-2 border text-center">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded text-white flex items-center gap-1"
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white flex items-center gap-1"
                  >
                    <FaTrash /> Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="relative bg-gradient-to-r from-gray-100 to-gray-200 border rounded-xl shadow p-4"
        >
        <button
            onClick={() => toggleStatus(cat)}
            className={`px-3 py-1 rounded text-white mb-2 ${
              cat.status === 1 ? "bg-green-400" : "bg-gray-400"
            }`}
          >
            {cat.status === 1 ? "Hiển thị" : "Ẩn"}
          </button>

          <h3 className="text-lg font-bold mb-2">{cat.name}</h3>
          <p className="text-gray-600 mb-2">{cat.description || "Chưa có mô tả"}</p>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => handleEdit(cat)}
              className="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded text-white flex items-center gap-1"
            >
              <FaEdit /> Sửa
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white flex items-center gap-1"
            >
              <FaTrash /> Xóa
            </button>
          </div>
        </div>
      ))}
    </div>

      {/* Phân trang */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ◀ Trước
        </button>
        <span className="px-3 py-1">
          Trang {page}/{lastPage}
        </span>
        <button
          disabled={page === lastPage}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Sau ▶
        </button>
      </div>

      {/* Modal thêm/sửa */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? "✏️ Sửa danh mục" : "➕ Thêm danh mục"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Tên danh mục"
                className="border px-3 py-2 w-full rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <textarea
                placeholder="Mô tả"
                className="border px-3 py-2 w-full rounded"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <select
                className="border px-3 py-2 w-full rounded"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: parseInt(e.target.value) })
                }
              >
                <option value={1}>Hiển thị</option>
                <option value={0}>Ẩn</option>
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
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
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
