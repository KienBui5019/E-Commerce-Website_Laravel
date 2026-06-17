
"use client";

import "../../globals.css";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy user từ localStorage nếu đã login
    const adminUser = localStorage.getItem("admin_user");
    if (adminUser) {
      setUser(JSON.parse(adminUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    setUser(null);
    router.push("/admin/athen/login"); // quay về login sau logout
  };

  const menuItems = [
    { label: "Trang Admin", href: "/admin" },
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

          <nav className="flex flex-col gap-1 px-3">
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

          {user && (
            <button
              onClick={handleLogout}
              className="mt-auto bg-red-600 text-white py-2 mx-3 mb-6 rounded hover:bg-red-700 transition"
            >
              Đăng xuất
            </button>
          )}
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white p-4 flex justify-end items-center shadow-md border-b border-gray-200">
            {user && (
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">{user.name}</span>
                {/* {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                )} */}
              </div>
            )}
          </header>

          {/* Page content */}
          <main className="flex-1 bg-gray-100 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
