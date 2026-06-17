// // "use client";

// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import Link from "next/link";

// // export default function PostsPage() {
// //   const [posts, setPosts] = useState([]);
// //   const [topics, setTopics] = useState([]);
// //   const [selectedTopic, setSelectedTopic] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [lastPage, setLastPage] = useState(1);

// //   useEffect(() => {
// //     fetchTopics();
// //   }, []);

// //   useEffect(() => {
// //     fetchPosts(currentPage, selectedTopic);
// //   }, [currentPage, selectedTopic]);

// //   const fetchTopics = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:8000/api/topics");
// //       const data = Array.isArray(res.data) ? res.data : res.data.data || [];
// //       setTopics(data);
// //     } catch (err) {
// //       console.error("Lỗi khi tải chủ đề:", err);
// //     }
// //   };
// //   const perPage = 3;
// //   const fetchPosts = async (page = 1, topic = "") => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(
// //         "http://localhost:8000/api/posts?page=1&per_page=3",
// //         {
// //           params: { page, topic_id: topic, perPage },
// //         }
// //       );
// //       const data = res.data;

// //       setPosts(Array.isArray(data.data) ? data.data : []);
// //       setCurrentPage(Number(data.page) || 1);
// //       setLastPage(Math.ceil((data.total || 0) / perPage));
// //     } catch (err) {
// //       console.error("Lỗi khi tải bài viết:", err);
// //       setError("Không thể tải bài viết.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleTopicChange = (e) => {
// //     setSelectedTopic(e.target.value);
// //     setCurrentPage(1);
// //   };

// //   const handlePrev = () => {
// //     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
// //   };

// //   const handleNext = () => {
// //     if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
// //   };

// //   // Tạo mảng số trang để render nút nhảy trang
// //   const pageNumbers = [];
// //   for (let i = 1; i <= lastPage; i++) {
// //     pageNumbers.push(i);
// //   }

// //   return (
// //     <div className="max-w-5xl mx-auto p-6">
// //       <h1 className="text-3xl font-bold mb-6 text-center">
// //         Danh sách bài viết
// //       </h1>

// //       {/* Bộ lọc chủ đề */}
// //       <div className="flex justify-end mb-6">
// //         <select
// //           value={selectedTopic}
// //           onChange={handleTopicChange}
// //           className="border border-gray-300 rounded px-3 py-2"
// //         >
// //           <option value="">Tất cả chủ đề</option>
// //           {topics.map((topic) => (
// //             <option key={topic.id} value={topic.id}>
// //               {topic.name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Nội dung */}
// //       {loading ? (
// //         <p className="text-center">Đang tải bài viết...</p>
// //       ) : error ? (
// //         <p className="text-center text-red-500">{error}</p>
// //       ) : posts.length === 0 ? (
// //         <p className="text-center">Không có bài viết nào.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {posts.map((post) => {
// //             const imageUrl = post.image
// //               ? post.image.startsWith("http")
// //                 ? post.image
// //                 : `http://localhost:8000/${post.image}`
// //               : "/no-image.png";

// //             return (
// //               <div
// //                 key={post.id}
// //                 className="border rounded-lg overflow-hidden shadow hover:shadow-md bg-white transition"
// //               >
// //                 <img
// //                   src={imageUrl}
// //                   alt={post.title}
// //                   className="w-full h-48 object-cover"
// //                 />
// //                 <div className="p-4">
// //                   <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
// //                   <p className="text-gray-700 line-clamp-3 mb-3">
// //                     {post.description || "Không có mô tả."}
// //                   </p>
// //                   <Link
// //                     href={`/main/posts/${post.slug}`}
// //                     className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
// //                   >
// //                     Xem chi tiết
// //                   </Link>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}

// //       {/* Phân trang */}
// //       <div className="text-white flex justify-center items-center mt-8 gap-2 flex-wrap">
// //         <button
// //           onClick={handlePrev}
// //           disabled={currentPage === 1}
// //           className={`px-3 py-1 border rounded ${
// //             currentPage === 1
// //               ? "text-gray-400 border-gray-300"
// //               : "text-black border-black hover:bg-white hover:text-yellow-500"
// //           }`}
// //         >
// //           &laquo;
// //         </button>

// //         {pageNumbers.map((num) => (
// //           <button
// //             key={num}
// //             onClick={() => setCurrentPage(num)}
// //             className={`px-3 py-1 border rounded ${
// //               currentPage === num
// //                 ? "bg-yellow-500 text-white border-yellow-500"
// //                 : "text-black border-black hover:bg-gray-100"
// //             }`}
// //           >
// //             {num}
// //           </button>
// //         ))}

// //         <button
// //           onClick={handleNext}
// //           disabled={currentPage === lastPage}
// //           className={`px-3 py-1 border rounded ${
// //             currentPage === lastPage
// //               ? "text-gray-400 border-gray-300"
// //               : "text-black border-black hover:bg-gray-100"
// //           }`}
// //         >
// //           &raquo;
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";

// export default function PostsPage() {
//   const [posts, setPosts] = useState([]);
//   const [topics, setTopics] = useState([]);
//   const [selectedTopic, setSelectedTopic] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1);
//   const perPage = 3;

//   // Lấy danh sách chủ đề
//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/api/topics");
//         const data = Array.isArray(res.data) ? res.data : res.data.data || [];
//         setTopics(data);
//       } catch (err) {
//         console.error("Lỗi khi tải chủ đề:", err);
//       }
//     };
//     fetchTopics();
//   }, []);

//   // Lấy danh sách bài viết
//   useEffect(() => {
//     fetchPosts(currentPage, selectedTopic);
//   }, [currentPage, selectedTopic]);

//   const fetchPosts = async (page = 1, topic = "") => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:8000/api/posts", {
//         params: {
//           page,
//           per_page: perPage,
//           ...(topic && { topic_id: topic }),
//         },
//       });

//       const data = res.data;
//       setPosts(Array.isArray(data.data) ? data.data : []);
//       setCurrentPage(Number(data.page) || 1);
//       setLastPage(Math.ceil((data.total || 0) / perPage));
//       setError("");
//     } catch (err) {
//       console.error("Lỗi khi tải bài viết:", err);
//       setError("Không thể tải bài viết.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTopicChange = (e) => {
//     setSelectedTopic(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
//   };

//   const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Danh sách bài viết
//       </h1>

//       {/* Bộ lọc chủ đề */}
//       <div className="flex justify-end mb-6">
//         <select
//           value={selectedTopic}
//           onChange={handleTopicChange}
//           className="border border-gray-300 rounded px-3 py-2"
//         >
//           <option value="">Tất cả chủ đề</option>
//           {topics.map((topic) => (
//             <option key={topic.id} value={topic.id}>
//               {topic.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Nội dung */}
//       {loading ? (
//         <p className="text-center">Đang tải bài viết...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : posts.length === 0 ? (
//         <p className="text-center">Không có bài viết nào.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {posts.map((post) => {
//             const imageUrl = post.image
//               ? post.image.startsWith("http")
//                 ? post.image
//                 : `http://localhost:8000/${post.image}`
//               : "/no-image.png";

//             // Lấy tên chủ đề dựa vào topic_id
//             const topicName =
//               topics.find((t) => t.id === post.topic_id)?.name ||
//               "Chưa có chủ đề";

//             return (
//               <div
//                 key={post.id}
//                 className="border rounded-lg overflow-hidden shadow hover:shadow-md bg-white transition"
//               >
//                 <img
//                   src={imageUrl}
//                   alt={post.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
//                   <p className="text-gray-700 line-clamp-3 mb-2">
//                     {post.description || "Không có mô tả."}
//                   </p>
//                   <p className="text-gray-500 mb-3">Chủ đề: {topicName}</p>
//                   <Link
//                     href={`/main/posts/${post.slug}`}
//                     className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
//                   >
//                     Xem chi tiết
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Phân trang */}
//       <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
//         <button
//           onClick={handlePrev}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 border rounded ${
//             currentPage === 1
//               ? "text-gray-400 border-white-300"
//               : "text-yellow-500 border-black hover:bg-yellow-100"
//           }`}
//         >
//           &laquo;
//         </button>

//         {pageNumbers.map((num) => (
//           <button
//             key={num}
//             onClick={() => setCurrentPage(num)}
//             className={`px-3 py-1 border rounded ${
//               currentPage === num
//                 ? "bg-yellow-500 text-white border-yellow-500"
//                 : "text-white border-black hover:bg-yellow-100"
//             }`}
//           >
//             {num}
//           </button>
//         ))}

//         <button
//           onClick={handleNext}
//           disabled={currentPage === lastPage}
//           className={`px-3 py-1 border rounded ${
//             currentPage === lastPage
//               ? "text-gray-400 border-white-300"
//               : "text-white border-black hover:bg-yellow-100"
//           }`}
//         >
//           &raquo;
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 3;

  // Lấy danh sách chủ đề
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/topics");
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setTopics(data);
      } catch (err) {
        console.error("Lỗi khi tải chủ đề:", err);
      }
    };
    fetchTopics();
  }, []);

  // Lấy danh sách bài viết
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/posts", {
          params: {
            page: currentPage,
            per_page: perPage,
            ...(selectedTopic && { topic_id: selectedTopic }),
          },
        });

        const data = res.data;
        setPosts(Array.isArray(data.data) ? data.data : []);
        setLastPage(Math.ceil((data.total || 0) / perPage));
        setError("");
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        setError("Không thể tải bài viết.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, selectedTopic]);

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi đổi chủ đề
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
  };

  const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Danh sách bài viết
      </h1>

      {/* Bộ lọc chủ đề */}
      <div className="flex justify-end mb-6">
        <select
          value={selectedTopic}
          onChange={handleTopicChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Tất cả chủ đề</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>

      {/* Nội dung bài viết */}
      {loading ? (
        <p className="text-center">Đang tải bài viết...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-center">Không có bài viết nào.</p>
      ) : (
        <div className="text-yellow-900 grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => {
            const imageUrl = post.image
              ? post.image.startsWith("http")
                ? post.image
                : `http://localhost:8000/${post.image}`
              : "/no-image.png";

            const topicName =
              topics.find((t) => t.id === post.topic_id)?.name ||
              "Chưa có chủ đề";

            return (
              <div
                key={post.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-md bg-white transition"
              >
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-700 line-clamp-3 mb-2">
                    {post.description || "Không có mô tả."}
                  </p>
                  <p className="text-gray-900 mb-3">Chủ đề: {topicName}</p>
                  <Link
                    href={`/main/post/${post.slug}`}
                    className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Phân trang */}
      <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded ${
            currentPage === 1
              ? "text-yellow-400 border-gray-300 bg-white"
              : "text-black border-black bg-white hover:bg-gray-100"
          }`}
        >
          &laquo;
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-3 py-1 border rounded ${
              currentPage === num
                ? "bg-yellow-500 text-white border-yellow-500"
                : "text-black border-black bg-white hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === lastPage}
          className={`px-3 py-1 border rounded ${
            currentPage === lastPage
              ? "text-yellow-400 border-gray-300 bg-white"
              : "text-black border-black bg-white hover:bg-gray-100"
          }`}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}
