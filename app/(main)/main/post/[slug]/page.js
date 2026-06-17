"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function PostDetail({ params }) {
  const { slug } = use(params); // unwrap params nếu cần
  const router = useRouter(); // dùng để quay lại

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/posts");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        const found = data.data.find((p) => p.slug === slug);
        if (!found) throw new Error("Không tìm thấy bài viết!");
        setPost(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <p className="p-6">Đang tải bài viết...</p>;
  if (error) return <p className="p-6 text-red-600">Lỗi: {error}</p>;
  if (!post)
    return <p className="p-6 text-red-600">Không tìm thấy bài viết!</p>;

  const imageUrl = post.image
    ? `http://localhost:8000/${post.image}`
    : "/images/no-image.png";

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Nút quay lại */}
      <button
        className="mb-4 px-4 py-2 bg-yellow-900 rounded hover:bg-gray-300 transition"
        onClick={() => router.back()}
      >
        ← Quay lại
      </button>

      {/* Ảnh bài viết */}
      <div className="w-full h-80 flex justify-center items-center bg-gray-100 rounded-lg shadow-md mb-6 overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Thông tin bài viết */}
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">Chủ đề: {post.topic?.name}</p>
      <p className="mb-6">{post.description}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
