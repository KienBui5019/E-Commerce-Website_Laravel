"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PostNew() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/posts-new?limit=3");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        // Chuẩn hóa dữ liệu
        const transformed = data.map((p) => ({
          ...p,
          image_url: p.image
            ? p.image.startsWith("http")
              ? p.image
              : `http://localhost:8000/${p.image}`
            : null,
        }));

        setPosts(transformed);
      } catch (err) {
        console.error("Lỗi khi tải bài viết mới:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return <p className="text-center py-4">Đang tải bài viết mới...</p>;
  if (!posts.length)
    return <p className="text-center py-4">Không có bài viết mới.</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-yellow-500">
        📰 Bài viết mới
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 text-yellow-500 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
          >
            {post.image_url && (
              <div className="w-full h-48 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <p className="text-gray-600 mb-3">{post.description}</p>
            <Link
              href={`/posts/${post.slug}`} // cần có route động [slug]/page.js
              className="mt-3 px-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-black hover:text-yellow-400 border border-yellow-400 transition"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
