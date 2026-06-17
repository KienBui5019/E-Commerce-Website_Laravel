"use client";

import { useEffect, useState } from "react";

export default function ContactAdminPage() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [replyContent, setReplyContent] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:8000/api/contact?search=${search}&page=${page}`
    );
    const data = await res.json();
    setContacts(data.data || []);
    setMeta(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, [search, page]);

  const handleDelete = async (id) => {
    if (!confirm("Xóa liên hệ này?")) return;
    await fetch(`http://localhost:8000/api/contact/${id}`, {
      method: "DELETE",
    });
    fetchContacts();
  };

  const handleReply = async () => {
    if (!replyContent.trim()) return alert("Nhập nội dung trả lời");
    await fetch(`http://localhost:8000/api/contact/${selectedId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply_content: replyContent }),
    });
    setReplyContent("");
    setSelectedId(null);
    fetchContacts();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
        📩 Danh sách liên hệ
      </h1>

      {/* Thanh tìm kiếm */}
      <div className="flex justify-between mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Tìm theo tên, email hoặc SĐT"
          className="border px-3 py-2 w-1/2 rounded text-black"
        />
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white rounded shadow">
          <thead className="bg-yellow-400 text-black">
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Tên</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">SĐT</th>
              <th className="border px-3 py-2">Nội dung</th>
              <th className="border px-3 py-2">Trạng thái</th>
              <th className="border px-3 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="text-gray-900 text-center">
                <td className="border px-3 py-2">{c.id}</td>
                <td className="border px-3 py-2">{c.name}</td>
                <td className="border px-3 py-2">{c.email}</td>
                <td className="border px-3 py-2">{c.phone || "—"}</td>
                <td className="border px-3 py-2 max-w-[200px] truncate">
                  {c.content}
                </td>
                <td className="border px-3 py-2">
                  {c.status ? "Chưa phản hồi" : "Đã trả lời"}
                </td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    onClick={() => setSelectedId(c.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    💬 Trả lời
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    🗑 Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Khung trả lời liên hệ */}
      {selectedId && (
        <div className="text-gray-900 mt-6 border rounded p-4 bg-gray-100 shadow">
          <h3 className="font-bold text-lg mb-2">
            ✉️ Trả lời liên hệ #{selectedId}
          </h3>
          <textarea
            className="w-full border rounded p-2 text-black mb-2"
            rows="3"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Nhập nội dung phản hồi..."
          ></textarea>
          <button
            onClick={handleReply}
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
          >
            Gửi phản hồi
          </button>
        </div>
      )}

      {/* Phân trang */}
      <div className="flex justify-center mt-6 space-x-4">
        {meta.prev_page_url && (
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
          >
            ◀ Trước
          </button>
        )}
        {meta.next_page_url && (
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
          >
            Sau ▶
          </button>
        )}
      </div>
    </div>
  );
}
