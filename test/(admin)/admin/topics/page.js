// "use client";
// import"./globals.css";  
// import { useEffect, useState } from "react";

// export default function TopicAdmin() {
//   const [topics, setTopics] = useState([]);
//   const [form, setForm] = useState({ id: null, name: "", description: "", status: 1 });
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   // Load danh sách
//   useEffect(() => {
//     fetchTopics();
//   }, [search]);

//   const fetchTopics = () => {
//     fetch(`http://127.0.0.1:8000/api/topic?search=${search}`)
//       .then((res) => res.json())
//       .then((data) => setTopics(data.data || []))
//       .catch(() => setTopics([]));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const method = form.id ? "PUT" : "POST";
//     const url = form.id
//       ? `http://127.0.0.1:8000/api/topic/${form.id}`
//       : "http://127.0.0.1:8000/api/topic";

//     const res = await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       fetchTopics();
//       setForm({ id: null, name: "", description: "", status: 1 });
//       setShowForm(false); // ẩn form sau khi lưu
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Bạn có chắc muốn xóa?")) return;
//     await fetch(`http://127.0.0.1:8000/api/topic/${id}`, { method: "DELETE" });
//     fetchTopics();
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Quản lý chủ đề bài viết</h1>

//       {/* Thanh tìm kiếm + nút thêm */}
//       <div className="flex items-center gap-2 mb-4">
//         <input
//           type="text"
//           className="border p-2"
//           placeholder="Tìm kiếm..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button
//           onClick={() => {
//             setForm({ id: null, name: "", description: "", status: 1 });
//             setShowForm(true);
//           }}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           + Thêm chủ đề
//         </button>
//       </div>

//       {/* Form thêm / sửa */}
//       {showForm && (
//         <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50">
//           <h2 className="text-lg font-semibold mb-2">
//             {form.id ? "Sửa chủ đề" : "Thêm chủ đề"}
//           </h2>
//           <input
//             className="border p-2 w-full mb-2"
//             placeholder="Tên chủ đề"
//             value={form.name ?? ""}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//           <input
//             className="border p-2 w-full mb-2"
//             placeholder="Mô tả"
//             value={form.description ?? ""}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//           />
//           <select
//             className="border p-2 w-full mb-2"
//             value={form.status}
//             onChange={(e) => setForm({ ...form, status: parseInt(e.target.value) })}
//           >
//             <option value={1}>Hiển thị</option>
//             <option value={0}>Ẩn</option>
//           </select>
//           <div className="flex gap-2">
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//               Lưu
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="bg-gray-400 text-white px-4 py-2 rounded"
//             >
//               Hủy
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Danh sách chủ đề */}
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Tên</th>
//             <th className="border p-2">Mô tả</th>
//             <th className="border p-2">Trạng thái</th>
//             <th className="border p-2">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {topics.map((t) => (
//             <tr key={t.id}>
//               <td className="border p-2">{t.id}</td>
//               <td className="border p-2">{t.name}</td>
//               <td className="border p-2">{t.description}</td>
//               <td className="border p-2">{t.status === 1 ? "Hiển thị" : "Ẩn"}</td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => {
//                     setForm(t);
//                     setShowForm(true);
//                   }}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Sửa
//                 </button>
//                 <button
//                   onClick={() => handleDelete(t.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Xóa
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";
// import "../globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TopicAdmin() {
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", description: "", status: 1 });
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
const [checkingAdmin, setCheckingAdmin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userAdmin = localStorage.getItem("userad");
    if (!userAdmin) {
      router.push("/admin/login"); // chuyển ngay
    } else {
      setCheckingAdmin(false); // có quyền -> render tiếp
    }
  }, [router]);
  useEffect(() => {
    if (!checkingAdmin) fetchTopics();
  }, [search,checkingAdmin]);
if (checkingAdmin) {
    // ✅ Render null hoặc loading trong lúc kiểm tra
    return null;
  }

  const fetchTopics = () => {
    fetch(`http://127.0.0.1:8000/api/topic?search=${search}`)
      .then((res) => res.json())
      .then((data) => setTopics(data.data || []))
      .catch(() => setTopics([]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `http://127.0.0.1:8000/api/topic/${form.id}`
      : "http://127.0.0.1:8000/api/topic";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchTopics();
      setForm({ id: null, name: "", description: "", status: 1 });
      setShowForm(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;
    await fetch(`http://127.0.0.1:8000/api/topic/${id}`, { method: "DELETE" });
    fetchTopics();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold ">Quản lý chủ đề bài viết</h1>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên..."
          className="border px-3 py-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => { setForm({ id: null, name: "", description: "", status: 1 }); setShowForm(true); }}
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-400 transition duration-200 shadow"
        >
          + Thêm chủ đề
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded shadow-md animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">{form.id ? "Sửa chủ đề" : "Thêm chủ đề"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Tên chủ đề"
              value={form.name ?? ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Mô tả"
              value={form.description ?? ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
          <select
            className="border p-2 rounded mb-4 w-full sm:w-1/3"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: parseInt(e.target.value) })}
          >
            <option value={1}>Hiển thị</option>
            <option value={0}>Ẩn</option>
          </select>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Lưu
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Topic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((t) => (
          <div
            key={t.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold mb-2">{t.name}</h3>
            <p className="text-gray-600 mb-2">Chi tiết:{t.description||"Không có mô tả"}</p>
            <span
              className={`inline-block px-2 py-1 text-sm rounded ${
                t.status === 1 ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"
              }`}
            >
              {t.status === 1 ? "Hiển thị" : "Ẩn"}
            </span>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => { setForm(t); setShowForm(true); }}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
