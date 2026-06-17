// "use client";

// import { useState, useEffect } from "react";

// export default function TopicsAdminPage() {
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const pageSize = 5;

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/topics");
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const data = await res.json();
//         setTopics(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTopics();
//   }, []);

//   const filteredTopics = topics.filter((t) =>
//     t.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredTopics.length / pageSize);
//   const displayedTopics = filteredTopics.slice(
//     (page - 1) * pageSize,
//     page * pageSize
//   );

//   const handleDelete = (id) => {
//     if (!confirm("Bạn có chắc muốn xóa chủ đề này?")) return;
//     setTopics((prev) => prev.filter((t) => t.id !== id));
//     // TODO: Gọi API xóa thực sự
//   };

//   return (
//     <div className="text-gray-900 p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Quản lý Chủ đề</h1>

//       <div className="flex justify-between mb-4">
//         <input
//           type="text"
//           placeholder="Tìm kiếm chủ đề..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded flex-grow mr-4"
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded">
//           Thêm mới
//         </button>
//       </div>

//       {loading && <p>Đang tải danh sách...</p>}
//       {error && <p className="text-red-600">Lỗi: {error}</p>}

//       {!loading && !error && (
//         <>
//           <table className="w-full border-collapse border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Tên</th>
//                 <th className="border p-2">Slug</th>
//                 <th className="border p-2">Mô tả</th>
//                 <th className="border p-2">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayedTopics.map((t) => (
//                 <tr key={t.id}>
//                   <td className="border p-2">{t.id}</td>
//                   <td className="border p-2">{t.name}</td>
//                   <td className="border p-2">{t.slug}</td>
//                   <td className="border p-2">{t.description}</td>
//                   <td className="border p-2 space-x-2">
//                     <button className="bg-yellow-500 text-white px-2 py-1 rounded">
//                       Sửa
//                     </button>
//                     <button
//                       onClick={() => handleDelete(t.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Xóa
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex justify-center mt-4 space-x-2">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Trước
//             </button>
//             <span className="px-3 py-1 border rounded">
//               {page} / {totalPages}
//             </span>
//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Sau
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TopicsAdminPage() {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/topics");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const filteredTopics = topics.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTopics.length / pageSize);
  const displayedTopics = filteredTopics.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa chủ đề này?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/topics/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      setTopics(topics.filter((t) => t.id !== id));
      alert("Xóa thành công!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="text-gray-900 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý Chủ đề</h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm chủ đề..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-grow mr-4"
        />
        <button
          onClick={() => router.push("/admin/topic/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm mới
        </button>
      </div>

      {loading && <p>Đang tải danh sách...</p>}
      {error && <p className="text-red-600">Lỗi: {error}</p>}

      {!loading && !error && (
        <>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Tên</th>
                <th className="border p-2">Slug</th>
                <th className="border p-2">Mô tả</th>
                <th className="border p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedTopics.map((t) => (
                <tr key={t.id}>
                  <td className="border p-2">{t.id}</td>
                  <td className="border p-2">{t.name}</td>
                  <td className="border p-2">{t.slug}</td>
                  <td className="border p-2">{t.description}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => router.push(`/admin/topic/edit/${t.id}`)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Trước
            </button>
            <span className="px-3 py-1 border rounded">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </>
      )}
    </div>
  );
}
