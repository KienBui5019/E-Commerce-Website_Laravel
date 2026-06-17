"use client";
import "../globals.css";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  //
   const router = useRouter();

  useEffect(() => {
    const userAdmin = localStorage.getItem("userad"); // kiểm tra user admin
    if (!userAdmin) {
      router.push("/admin/login"); // chuyển sang trang login nếu chưa có
    }
  }, [router]);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* Header */}
        <header className="bg-gray-800 text-white h-14 flex items-center px-6 justify-between">
            <img src="/images/logo.png" alt="Logo" className="w-24"></img>
          <nav className="flex gap-4">
            <Link href="/admin/profile" className="hover:underline">
              Trang cá nhân
            </Link>
            <button
              className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
              onClick={() => {
                localStorage.removeItem("userad"); // đăng xuất
                router.push("/admin/login");
              }}
            >
              Đăng xuất
            </button>          </nav>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-md min-h-screen p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  📊 Bảng điều khiển
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/products"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  🍳 Quản lý sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/product_sales"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  💸 Quản lý khuyến mãi
                </Link>
              </li><li>
                <Link
                  href="/admin/product_store"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  🏬 Quản lý tồn kho
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/categories"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  🏷️ Quản lý danh mục
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/orders"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  📦 Quản lý đơn hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/banners"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  🎞️ Quản lý banner
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  👤 Quản lý người dùng
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/contacts"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  💬 Quản lý liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/posts"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  📰 Quản lý bài viết
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/topics"
                  className="block px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  📝 Quản lý chủ đề bài viết
                </Link>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-3">
          © 2025 Admin Dashboard. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
// "use client";
// import "../globals.css";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function AdminLayout({ children }) {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // null = chưa check

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (!isLoggedIn || !storedUser) {
//       console.warn("Chưa đăng nhập, chuyển về login...");
//       setIsAuthenticated(false);
//       router.push("/admin/login");
//       return;
//     }

//     if (storedUser.roles !== "admin") {
//       console.warn("Không có quyền admin");
//       setIsAuthenticated(false);
//       router.push("/");
//       return;
//     }

//     console.log("Đã đăng nhập:", storedUser);
//     setUser(storedUser);
//     setIsAuthenticated(true);
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("isLoggedIn");
//     console.log("Đã đăng xuất, xóa localStorage");
//     setIsAuthenticated(false);
//     router.push("/admin/login");
//   };

//   if (isAuthenticated === null) {
//     // đang check, tránh render sai
//     return null;
//   }

//   if (!isAuthenticated) {
//     return null; // đã redirect
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="bg-gray-800 text-white h-14 flex items-center px-6 justify-between">
//         <img src="/images/logo.png" alt="Logo" className="w-24" />
//         <nav className="flex gap-4 items-center">
//           <span className="text-sm">Xin chào, {user?.username}</span>
//           <Link href="/admin/profile" className="hover:underline">
//             Trang cá nhân
//           </Link>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
//           >
//             Đăng xuất
//           </button>
//         </nav>
//       </header>

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white shadow-md min-h-screen p-4">
//           <h2 className="font-semibold text-gray-700 mb-4">Menu</h2>
//           <ul className="space-y-2">
//             <li>
//               <Link href="/admin" className="block px-3 py-2 rounded-md hover:bg-gray-200">
//                 📊 Bảng điều khiển
//               </Link>
//             </li>
//             <li>
//               <Link href="/admin/products" className="block px-3 py-2 rounded-md hover:bg-gray-200">
//                 🍔 Quản lý sản phẩm
//               </Link>
//             </li>
//             <li>
//               <Link href="/admin/categories" className="block px-3 py-2 rounded-md hover:bg-gray-200">
//                 🏷️ Quản lý danh mục
//               </Link>
//             </li>
//             <li>
//               <Link href="/admin/orders/order" className="block px-3 py-2 rounded-md hover:bg-gray-200">
//                 📦 Quản lý đơn hàng
//               </Link>
//             </li>
//             <li>
//               <Link href="/admin/banners" className="block px-3 py-2 rounded-md hover:bg-gray-200">
//                 📦 Quản lý banner
//               </Link>
//             </li>
//             <li>
//               <Link href="/admin/users" className="block px-3 py-2 rounded-md hover:bg-gray-200">
//                 👤 Quản lý người dùng
//               </Link>
//             </li>
//             <li>
//               <Link href="/admin/contacts" className="block px-3 py-2 rounded-md hover:bg-gray-200">
//                 👤 Quản lý liên hệ
//               </Link>
//             </li>
//             <li>
//               <Link href="/admin/posts" className="block px-3 py-2 rounded-md hover:bg-gray-200">
//                 📰 Quản lý bài viết
//               </Link>
//             </li>
//             <li>
//               <Link href="/admin/topics" className="block px-3 py-2 rounded-md hover:bg-gray-200">
//                 📰 Quản lý chủ đề bài viết
//               </Link>
//             </li>
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">{children}</main>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white text-center py-3">
//         © 2025 Admin Dashboard. All rights reserved.
//       </footer>
//     </div>
//   );
// }
