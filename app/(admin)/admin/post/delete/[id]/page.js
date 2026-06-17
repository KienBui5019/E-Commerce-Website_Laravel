"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function DeletePostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết ID ${id}?`)) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      alert("✅ Xóa bài viết thành công");
      router.push("/admin/post");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDelete();
  }, []);

  return (
    <p className="text-center mt-6">{loading ? "Đang xóa bài viết..." : ""}</p>
  );
}
