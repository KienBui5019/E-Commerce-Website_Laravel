// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/admin/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage(data.message || "❌ Email hoặc mật khẩu không đúng");
//       } else {
//         localStorage.setItem("admin_user", JSON.stringify(data.user));
//         router.push("/admin");
//       }
//     } catch (err) {
//       setMessage("❌ Lỗi server: " + err.message);
//     }

//     setLoading(false);
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setMessage("");

//   //   // ✅ Kiểm tra rỗng trước khi gửi API
//   //   if (!form.email.trim() && !form.password.trim()) {
//   //     setMessage("❌ Vui lòng nhập Email và Mật khẩu");
//   //     return;
//   //   } else if (!form.email.trim()) {
//   //     setMessage("❌ Vui lòng nhập Email");
//   //     return;
//   //   } else if (!form.password.trim()) {
//   //     setMessage("❌ Vui lòng nhập Mật khẩu");
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     const res = await fetch("http://127.0.0.1:8000/api/admin/login", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(form),
//   //     });

//   //     const data = await res.json();

//   //     // ✅ Kiểm tra tài khoản không khả dụng
//   //     if (data.user && data.user.status !== "active") {
//   //       setMessage("❌ Tài khoản của bạn hiện không khả dụng");
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     // ✅ Sai tài khoản / mật khẩu
//   //     if (!res.ok) {
//   //       setMessage(data.message || "❌ Email hoặc mật khẩu không đúng");
//   //     } else {
//   //       localStorage.setItem("admin_user", JSON.stringify(data.user));
//   //       router.push("/admin");
//   //     }
//   //   } catch (err) {
//   //     setMessage("❌ Lỗi server: " + err.message);
//   //   }

//   //   setLoading(false);
//   // };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="bg-gray-800 shadow-2xl rounded-2xl p-10 max-w-md w-full">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white">Admin Login</h1>
//           <p className="text-gray-400 mt-2">
//             Đăng nhập để truy cập bảng điều khiển
//           </p>
//         </div>

//         {message && (
//           <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 text-center">
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Mật khẩu"
//             value={form.password}
//             onChange={handleChange}
//             className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-lg transition"
//           >
//             {loading ? "Đang đăng nhập..." : "Đăng nhập"}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-gray-400 text-sm">
//           Chưa có tài khoản admin?{" "}
//           <a
//             href="/admin/athen/register"
//             className="text-yellow-400 hover:underline"
//           >
//             Đăng ký ngay
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

// import "../../globals.css";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const adminUser = localStorage.getItem("admin_user");
    if (adminUser) setUser(JSON.parse(adminUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    setUser(null);
    router.push("/admin/athen/login");
  };

  const menuItems = [
    { label: "Trang tổng quan", href: "/admin" },
    { label: "Quản lý sản phẩm", href: "/admin/product/list" },
    { label: "Quản lý khuyến mãi", href: "/admin/productsale" },
    { label: "Quản lý nhập kho", href: "/admin/product_store" },
    { label: "Quản lý danh mục", href: "/admin/category" },
    { label: "Quản lý đơn hàng", href: "/admin/order" },
    { label: "Quản lý liên hệ", href: "/admin/contact" },
    { label: "Quản lý bài viết", href: "/admin/post" },
    { label: "Quản lý chủ đề bài viết", href: "/admin/topic" },
    { label: "Quản lý thành viên", href: "/admin/user" },
    { label: "Quản lý menu", href: "/admin/menu" },
    { label: "Cài đặt", href: "/admin/settings" },
  ];

  return (
    <html lang="en">
      <head />
      <body className="min-h-screen flex bg-gray-100 text-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col min-h-screen shadow-lg">
          <div className="flex items-center justify-center h-16 mb-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">MyShop</h1>
          </div>

          <nav className="flex flex-col gap-1 px-3 flex-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`p-2 rounded hover:bg-gray-800 transition-colors ${
                  pathname.startsWith(item.href)
                    ? "bg-gray-700 font-semibold text-white"
                    : "text-gray-200"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Nút đăng xuất luôn hiện */}
          <button
            onClick={handleLogout}
            className="mt-auto bg-red-600 text-white py-2 mx-3 mb-6 rounded hover:bg-red-700 transition"
          >
            Đăng xuất
          </button>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white p-4 flex justify-end items-center shadow-md border-b border-gray-200">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">{user.name}</span>
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                )}
              </div>
            ) : (
              <span className="text-gray-500">
                Chào mừng bạn đến trang quản lý
              </span>
            )}
          </header>

          {/* Page content */}
          <main className="flex-1 bg-gray-100 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
