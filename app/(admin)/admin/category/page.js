// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function CategoryPage() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:8000/api/categories");
//       if (!res.ok) throw new Error("Không thể tải danh sách category");
//       const data = await res.json();
//       setCategories(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className=" p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-yellow-600">Quản lý Danh Mục</h1>
//         <Link
//           href="/admin/category/add"
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           ➕ Thêm Danh mục
//         </Link>
//       </div>

//       {loading && <p className="text-gray-600">Đang tải...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {categories.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300 bg-white shadow-md rounded">
//             <thead className="bg-yellow-500 text-black">
//               <tr>
//                 <th className="px-4 py-2 border">ID</th>
//                 <th className="px-4 py-2 border">Tên</th>
//                 <th className="px-4 py-2 border">Mô tả</th>
//                 <th className="px-4 py-2 border">Status</th>
//                 <th className="px-4 py-2 border">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.map((cat) => (
//                 <tr
//                   key={cat.id}
//                   className="text-black text-center hover:bg-gray-50"
//                 >
//                   <td className="px-4 py-2 border">{cat.id}</td>
//                   <td className="px-4 py-2 border font-medium">{cat.name}</td>
//                   <td className="px-4 py-2 border">{cat.description}</td>
//                   <td className="px-4 py-2 border">
//                     {cat.status ? "Active" : "Inactive"}
//                   </td>
//                   <td className="px-4 py-2 border space-x-2">
//                     <Link
//                       href={`/admin/category/edit/${cat.id}`}
//                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       ✏️ Sửa
//                     </Link>
//                     <Link
//                       href={`/admin/category/delete/${cat.id}`}
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       🗑 Xóa
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         !loading && (
//           <p className="text-gray-500 text-center">Không có category</p>
//         )
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/categories");
      if (!res.ok) throw new Error("Không thể tải danh sách category");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Lọc dữ liệu
  const filteredCategories = categories.filter((cat) => {
    const matchesName = cat.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchesStatus =
      filterStatus === ""
        ? true
        : filterStatus === "active"
        ? cat.status === true
        : cat.status === false;
    return matchesName && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-600">Quản lý Danh Mục</h1>
        <Link
          href="/admin/category/add"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Thêm Danh mục
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="px-3 py-2 border rounded text-black"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded text-black"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {loading && <p className="text-gray-600">Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {filteredCategories.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow-md rounded">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Tên</th>
                <th className="px-4 py-2 border">Mô tả</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat) => (
                <tr
                  key={cat.id}
                  className="text-black text-center hover:bg-gray-50"
                >
                  <td className="px-4 py-2 border">{cat.id}</td>
                  <td className="px-4 py-2 border font-medium">{cat.name}</td>
                  <td className="px-4 py-2 border">{cat.description}</td>
                  <td className="px-4 py-2 border">
                    {cat.status ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <Link
                      href={`/admin/category/edit/${cat.id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      ✏️ Sửa
                    </Link>
                    <Link
                      href={`/admin/category/delete/${cat.id}`}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      🗑 Xóa
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && (
          <p className="text-gray-500 text-center">Không có category phù hợp</p>
        )
      )}
    </div>
  );
}
