
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostAdmin() {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({});
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "", image: "", topic_id: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

   const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const userAdmin = localStorage.getItem("userad");
    if (!userAdmin) {
      router.push("/admin/login"); // chuyển ngay
    } else {
      setCheckingAdmin(false); // có quyền -> render tiếp
    }
  }, [router]);

  const apiUrl = "http://127.0.0.1:8000/api/post";

  // const fetchPosts = async () => {
  //   const res = await fetch(`${apiUrl}?search=${search}&page=${page}`, {
  //     mode: "cors", // thêm CORS
  //   });
  //   const data = await res.json();
  //   setPosts(data.data);
  //   setMeta(data);
  // };
// Thêm selectedTopic vào fetchPosts
const fetchPosts = async () => {
  let url = `${apiUrl}?page=${page}`;
  if (search) url += `&search=${search}`;
  if (selectedTopic) url += `&topic_id=${selectedTopic}`; // <- thêm filter

  const res = await fetch(url, { mode: "cors" });
  const data = await res.json();
  setPosts(data.data);
  setMeta(data);
};

  const fetchTopics = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/topic", {
      mode: "cors",
    });
    const data = await res.json();
    // setTopics(data);
      setTopics(data.data ?? data);

  };

  useEffect(() => {
    if (!checkingAdmin) fetchPosts();
    fetchTopics();
  }, [page, search,selectedTopic,checkingAdmin]);
  
  if (checkingAdmin) {
    // ✅ Render null hoặc loading trong lúc kiểm tra
    return null;
  }
const handleSubmit = async (e) => {
  e.preventDefault();
  const method = editingId ? "POST" : "POST"; // Laravel hỗ trợ PUT qua POST + _method nếu cần
  const url = editingId ? `${apiUrl}/${editingId}` : apiUrl;

  const formDataToSend = new FormData();
  formDataToSend.append("title", form.title);
  formDataToSend.append("content", form.content);
  formDataToSend.append("topic_id", form.topic_id);

  // Nếu file mới thì gửi, nếu không thì bỏ qua
  if (form.image instanceof File) {
    formDataToSend.append("image", form.image);
  }

  // Nếu là edit, thêm _method=PUT để Laravel hiểu
  if (editingId) formDataToSend.append("_method", "PUT");

  try {
    const res = await fetch(url, {
      method: "POST", // luôn POST, Laravel xử lý PUT bằng _method
      body: formDataToSend,
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Lỗi từ server:", err);
      return;
    }

    // Reset form
    setForm({ title: "", content: "", image: "", topic_id: "" });
    setEditingId(null);
    setShowForm(false);
    fetchPosts();
  } catch (error) {
    console.error("Lỗi fetch:", error);
  }
};
  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa?")) {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE", mode: "cors" });
      fetchPosts();
    }
  };

  const handleEdit = (post) => {
    setForm({
      title: post.title,
      content: post.content,
      image: post.image,
      topic_id: post.topic_id,
    });
    setEditingId(post.id);
    setShowForm(true);
  };
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Quản lý Bài viết</h1>

      {/* Thanh công cụ */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên..."
          className="border px-3 py-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
          <select
            className="border rounded px-3 py-2 w-1/4"
            value={selectedTopic}
            onChange={(e) => { setSelectedTopic(e.target.value); setPage(1); }}
          >
            <option value="">-- Tất cả chủ đề --</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.name}</option>
            ))}
          </select>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-400 text-white px-4 py-2 rounded shadow"
        >
          + Thêm bài viết
        </button>
      </div>

      {/* Bảng danh sách */}
      {/* <table className="w-full border bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Chủ đề</th>
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">Nội dung</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="border p-2">{post.id}</td>
              <td className="border p-2 font-medium">{post.title}</td>
              <td className="border p-2">{post.topic?.name || "Không có"}</td>
              <td className="border p-2">
                {post.image && (
                  <img
                    src={`http://127.0.0.1:8000/images/${post.image}`}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="border p-2">{post.content.slice(0, 50)}...</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {posts.map((post) => (
    <div key={post.id} className="border rounded shadow p-4 hover:shadow-lg bg-white relative">
      {post.topic && (
        <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
          {post.topic.name}
        </span>
      )}
      {post.image && (
        <img
          src={`http://127.0.0.1:8000/images/${post.image}`}
          alt={post.title}
          className="w-full h-36 object-cover rounded mb-2"
        />
      )}
      <h3 className="font-bold text-lg mb-1">{post.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{post.content.slice(0, 100)}...</p>
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded flex-1">Sửa</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded flex-1">Xóa</button>
      </div>
    </div>
  ))}
</div>

      {/* Modal thêm/sửa */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Cập nhật bài viết" : "Thêm bài viết"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Tiêu đề"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 w-full rounded"
              />
               <select
                value={form.topic_id}
                  onChange={(e) => setForm({ ...form, topic_id: e.target.value })}
                  className="border p-2 w-full rounded"      >
                <option value="">-- Chọn chủ đề --</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
              {form.image && !(form.image instanceof File) && (
                <img
                  src={`http://127.0.0.1:8000/images/${form.image}`}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded mb-2"
                />
              )}

              <input
                type="file"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className="border p-2 w-full rounded"
              />

              <textarea
                placeholder="Nội dung"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="border p-2 w-full rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm({ title: "", content: "", image: "", topic_id: "" });
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
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
