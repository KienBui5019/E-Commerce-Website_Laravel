// "use client";
// import { useEffect, useState } from "react";

// export default function BannerAdmin() {
//   const [banners, setBanners] = useState([]);
//   const [form, setForm] = useState({ name: "", link: "", image: "",position:"" });
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
// const [meta, setMeta] = useState({});

// const [search, setSearch] = useState(""); 
// const [page, setPage] = useState(1);      
//   const apiUrl = "http://127.0.0.1:8000/api/banner";

// //   const fetchBanners = async () => {
// //     const res = await fetch(apiUrl, { mode: "cors" });
// //     const data = await res.json();
// //     console.log("API banner:", data);

// //     setBanners(data);
// //   };
// const fetchBanners = async () => {
//   const res = await fetch(`${apiUrl}?search=${search}&page=${page}`, {
//     // mode: "cors",
//       method: "GET",
//   headers: {
//     "Accept": "application/json",
//   },
//   });
//   const data = await res.json();

//   setBanners(data.data); // ✅ chỉ lấy mảng banner
//   setMeta(data);         // ✅ giữ lại meta để phân trang
// };

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = editingId ? `${apiUrl}/${editingId}` : apiUrl;

//     const formDataToSend = new FormData();
//     formDataToSend.append("name", form.name);
//     formDataToSend.append("link", form.link);
//     formDataToSend.append("sort_order", form.sort_order);
//     formDataToSend.append("description", form.description);
//     formDataToSend.append("position", form.position);
//     formDataToSend.append("status", form.status);

//     if (form.image instanceof File) {
//       formDataToSend.append("image", form.image);
//     }

//     if (editingId) formDataToSend.append("_method", "PUT");

//     const res = await fetch(url, {
//       method: "POST",
//       body: formDataToSend,
//     });

//     if (res.ok) {
//       setForm({ name: "", link: "", image: "" ,sort_order:"",description:"",position: "",status:""});
//       setEditingId(null);
//       setShowForm(false);
//       fetchBanners();
//     } else {
//       console.error("Lỗi:", await res.json());
//     }
//   };

//   const handleDelete = async (id) => {
//     if (confirm("Xóa banner này?")) {
//       await fetch(`${apiUrl}/${id}`, { method: "DELETE", mode: "cors" });
//       fetchBanners();
//     }
//   };

//   const handleEdit = (banner) => {
//     setForm({
//       name: banner.name,
//       link: banner.link,
//       image: banner.image,
//         sort_order: banner.sort_order,
//         position: banner.position,
//         description: banner.description,
//         status: banner.status,
//     });
//     setEditingId(banner.id);
//     setShowForm(true);
//   };

//   return (
//     <div className="p-6 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Quản lý Banner</h1>
//       {/* Thanh tìm kiếm */}
//         <input
//           type="text"
//           placeholder="🔍 Tìm kiếm sản phẩm..."
//           className="border px-4 py-2 rounded-lg shadow w-1/3 focus:ring focus:ring-blue-300"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           + Thêm banner
//         </button>
//       </div>

//       <table className="w-full border bg-white shadow rounded">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Tiêu đề</th>
//             <th className="border p-2">Ảnh</th>
//             <th className="border p-2">Đường đẫn</th>
//             <th className="border p-2">Vị trí</th>
//             <th className="border p-2">Chi tiết</th>
//             <th className="border p-2">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {banners.map((banner) => (
//             <tr key={banner.id} className="hover:bg-gray-50">
//               <td className="border p-2">{banner.id}</td>
//               <td className="border p-2">{banner.name}</td>
//               <td className="border p-2">
//                 {banner.image && (
//                   <img
//                     src={`http://127.0.0.1:8000/images/${banner.image}`}
//                     alt={banner.name}
//                     className="w-32 h-20 object-cover rounded"
//                   />
//                 )}
//               </td>
//               <td className="border p-2">{banner.link}</td>
//               <td className="border p-2">{banner.position}</td>
//               <td className="border p-2">{banner.description||"Không có"}</td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => handleEdit(banner)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
//                 >
//                   Sửa
//                 </button>
//                 <button
//                   onClick={() => handleDelete(banner.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Xóa
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg w-1/2">
//             <h2 className="text-xl font-bold mb-4">
//               {editingId ? "Cập nhật banner" : "Thêm banner"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Tiêu đề"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="border p-2 w-full rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Link"
//                 value={form.link}
//                 onChange={(e) => setForm({ ...form, link: e.target.value })}
//                 className="border p-2 w-full rounded"
//               />

//               {form.image && !(form.image instanceof File) && (
//                 <img
//                   src={`http://127.0.0.1:8000/images/${form.image}`}
//                   alt="preview"
//                   className="w-32 h-20 object-cover rounded"
//                 />
//               )}

//               <input
//                 type="file"
//                 onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//                 className="border p-2 w-full rounded"
//               />
//             <input
//                 type="number"
//                 placeholder="sort_order"
//                 value={form.sort_order}
//                 onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
//                 className="border p-2 w-full rounded"
//               /><input
//                 type="text"
//                 placeholder="description"
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//                 className="border p-2 w-full rounded"
//               /><input
//                 type="text"
//                 placeholder="Position"
//                 value={form.position}
//                 onChange={(e) => setForm({ ...form, position: e.target.value })}
//                 className="border p-2 w-full rounded"
//               /><input
//                 type="number"
//                 placeholder="status"
//                 value={form.status}
//                 onChange={(e) => setForm({ ...form, status: e.target.value })}
//                 className="border p-2 w-full rounded"
//               />
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowForm(false);
//                     setEditingId(null);
//                     setForm({ name: "", link: "", image: "",sort_order:"",description:"", position: 1,status:1 });
//                   }}
//                   className="px-4 py-2 border rounded"
//                 >
//                   Hủy
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                   {editingId ? "Cập nhật" : "Thêm"}
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
import { useRouter } from "next/navigation";

export default function BannerAdmin() {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({ name: "", link: "", image: "", position: "", sort_order: "", description: "", status: 1 });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [meta, setMeta] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [positionFilter, setPositionFilter] = useState(""); // ✅ thêm state lọc position
  const router = useRouter();

  // const apiUrl = "http://127.0.0.1:8000/api/banner";

  // const fetchBanners = async () => {
  //   const res = await fetch(`${apiUrl}?search=${search}&page=${page}`, {
  //     method: "GET",
  //     headers: { Accept: "application/json" },
  //   });
  //   const data = await res.json();
  //   setBanners(data.data);
  //   setMeta(data);
  // };

  // useEffect(() => {
  //   fetchBanners();
  // }, []);
//     useEffect(() => {
//     const userAdmin = localStorage.getItem("userad");
//     if (!userAdmin) {
//       router.push("/admin/login");
//     }
//   }, [router]);

// const fetchBanners = async () => {
//   const queryParams = new URLSearchParams({
//     search,
//     page,
//     position: positionFilter, // ✅ thêm filter position
//   });

//   const res = await fetch(`${apiUrl}?${queryParams.toString()}`, {
//     method: "GET",
//     headers: { Accept: "application/json" },
//   });
//   const data = await res.json();
//   setBanners(data.data);
//   setMeta(data);
// };
// useEffect(() => {
//   fetchBanners();
// }, [search, page, positionFilter]);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const userAdmin = localStorage.getItem("userad");
    if (!userAdmin) {
      router.push("/admin/login"); // chuyển ngay
    } else {
      setCheckingAdmin(false); // có quyền -> render tiếp
    }
  }, [router]);

  const apiUrl = "http://127.0.0.1:8000/api/banner";

  const fetchBanners = async () => {
    const queryParams = new URLSearchParams({
      search,
      page,
      position: positionFilter,
    });

    const res = await fetch(`${apiUrl}?${queryParams.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const data = await res.json();
    setBanners(data.data);
    setMeta(data);
  };

  useEffect(() => {
    if (!checkingAdmin) fetchBanners(); // chỉ fetch khi đã xác nhận admin
  }, [search, page, positionFilter, checkingAdmin]);

  if (checkingAdmin) {
    // ✅ Render null hoặc loading trong lúc kiểm tra
    return null;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `${apiUrl}/${editingId}` : apiUrl;

    const formDataToSend = new FormData();
    formDataToSend.append("name", form.name);
    formDataToSend.append("link", form.link);
    formDataToSend.append("sort_order", form.sort_order);
    formDataToSend.append("description", form.description);
    formDataToSend.append("position", form.position);
    formDataToSend.append("status", form.status);

    if (form.image instanceof File) {
      formDataToSend.append("image", form.image);
    }

    if (editingId) formDataToSend.append("_method", "PUT");

    const res = await fetch(url, {
      method: "POST",
      body: formDataToSend,
    });

    if (res.ok) {
      setForm({ name: "", link: "", image: "", sort_order: "", description: "", position: "", status: 1 });
      setEditingId(null);
      setShowForm(false);
      fetchBanners();
    } else {
      console.error("Lỗi:", await res.json());
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Xóa banner này?")) {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      fetchBanners();
    }
  };

  const handleEdit = (banner) => {
    setForm({
      name: banner.name,
      link: banner.link,
      image: banner.image,
      sort_order: banner.sort_order,
      position: banner.position,
      description: banner.description,
      status: banner.status,
    });
    setEditingId(banner.id);
    setShowForm(true);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Quản lý Banner</h1>

      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="🔍 Tìm kiếm banner..."
        className="border px-4 py-2 rounded-lg shadow w-1/3 focus:ring focus:ring-blue-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
<select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className="border px-3 py-2 rounded shadow"
        >
          <option value="">-- Tất cả vị trí --</option>
          <option value="slideshow">Trang chủ</option>
          <option value="ads">Quảng cáo</option>
        </select>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-400 text-white px-4 py-2 rounded"
        >
          + Thêm banner
        </button>
      </div>

      {/* Grid thay vì Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="border rounded-lg shadow bg-white overflow-hidden hover:shadow-lg transition"
          >
            {banner.image && (
              <img
                src={`http://127.0.0.1:8000/images/${banner.image}`}
                alt={banner.name}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{banner.name}</h2>
              <p className="text-sm text-gray-600">{banner.description || "Không có mô tả"}</p>
              {/* <p className="text-sm text-gray-500 mt-1">Vị trí: {banner.position}</p> */}
              <p className="text-sm text-gray-500 mt-1">
                Vị trí: {banner.position === "slideshow" ? "Trang chủ" : "Quảng cáo"}
              </p>

              <p className="text-sm text-gray-500">Link: {banner.link}</p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleEdit(banner)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal form thêm/sửa */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Cập nhật banner" : "Thêm banner"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Tiêu đề"
                value={form.name||""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 w-full rounded"
              />
              <input
                type="text"
                placeholder="Link"
                value={form.link||""}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="border p-2 w-full rounded"
              />

              {form.image && !(form.image instanceof File) && (
                <img
                  src={`http://127.0.0.1:8000/images/${form.image}`}
                  alt="preview"
                  className="w-32 h-20 object-cover rounded"
                />
              )}

              <input
                type="file"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className="border p-2 w-full rounded"
              />
              <input
                type="number"
                placeholder="sort_order"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                className="border p-2 w-full rounded"
              />
              <input
                type="text"
                placeholder="description"
                value={form.description||""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border p-2 w-full rounded"
              />
              {/* <input
                type="text"
                placeholder="Position"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="border p-2 w-full rounded"
              /> */}
              <select
                value={form.position || ""}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="border p-2 w-full rounded"
              >
                <option value="">-- Chọn vị trí --</option>
                <option value="slideshow">Slideshow (trang chủ)</option>
                <option value="ads">Quảng cáo</option>
              </select>

              <input
                type="number"
                placeholder="status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="border p-2 w-full rounded"
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm({ name: "", link: "", image: "", sort_order: "", description: "", position: "", status: "" });
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                  {editingId ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
