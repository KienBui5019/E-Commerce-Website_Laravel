"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostPage() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [perPage] = useState(3);
  const [totalPages, setTotalPages] = useState(2);

  const [search, setSearch] = useState(""); // hiển thị input
  const [debouncedSearch, setDebouncedSearch] = useState(search); // query thực tế
  const [statusFilter, setStatusFilter] = useState("");

  // Debounce search 500ms
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:8000/api/posts?limit=${perPage}&page=${page}`;

      if (debouncedSearch)
        url += `&search=${encodeURIComponent(debouncedSearch)}`;
      if (statusFilter !== "") url += `&status=${statusFilter}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Không thể lấy danh sách bài viết");
      const data = await res.json();

      setPosts(data.data || data || []);
      if (data.total) setTotalPages(Math.ceil(data.total / perPage));
      else setTotalPages(1);
    } catch (err) {
      setError(err.message || "Lỗi khi lấy bài viết");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, debouncedSearch, statusFilter]);

  const handleDelete = async (id) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết ID ${id}?`)) return;

    try {
      const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      setPosts((prev) => prev.filter((post) => post.id !== id));
      alert("✅ Xóa bài viết thành công");
    } catch (err) {
      alert(err.message || "Lỗi khi xóa bài viết");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">
        Danh sách bài viết
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <input
          type="text"
          placeholder="Tìm theo tên Tiêu đề..."
          value={search} // chỉ hiển thị input
          onChange={(e) => setSearch(e.target.value)} // không fetch ngay
          className="border p-2 rounded w-full sm:w-64"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-40"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="1">Hiển thị</option>
          <option value="0">Ẩn</option>
        </select>

        <button
          onClick={() => router.push("/admin/post/add")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
        >
          Thêm bài viết mới
        </button>
      </div>

      {loading ? (
        <p className="text-center mt-6">Đang tải bài viết...</p>
      ) : posts.length === 0 ? (
        <p>Chưa có bài viết nào</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-1">ID</th>
              <th className="border px-3 py-1">Tiêu đề</th>
              <th className="border px-3 py-1">Slug</th>
              <th className="border px-3 py-1">Mô tả</th>
              <th className="border px-3 py-1">Chủ đề</th>
              <th className="border px-3 py-1">Ảnh</th>
              <th className="border px-3 py-1">Trạng thái</th>
              <th className="border px-3 py-1">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="text-center hover:bg-gray-50">
                <td className="border px-3 py-1">{post.id}</td>
                <td className="border px-3 py-1 text-left">{post.title}</td>
                <td className="border px-3 py-1 text-left">{post.slug}</td>
                <td className="border px-3 py-1 text-left">
                  {post.description}
                </td>
                <td className="border px-3 py-1">
                  {post.topic ? post.topic.name : "Chưa có chủ đề"}
                </td>
                <td className="border px-3 py-1">
                  {post.image ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={`http://localhost:8000/${post.image}`}
                        alt={post.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </div>
                  ) : (
                    <span>Chưa có ảnh</span>
                  )}
                </td>
                <td className="border px-3 py-1">
                  {post.status ? "Hiển thị" : "Ẩn"}
                </td>
                <td className="border px-3 py-1 space-x-2">
                  <button
                    onClick={() => router.push(`/admin/post/edit/${post.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Trước
        </button>
        <span className="px-2 py-1">
          Trang {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
