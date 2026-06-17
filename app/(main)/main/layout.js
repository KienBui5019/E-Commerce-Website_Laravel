
"use client";

import "../../globals.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default function RootLayout({ children }) {
  const router = useRouter();
  const dropdownRef = useRef(null);

  // ===== STATE =====
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // ===== CHECK LOGIN & FETCH USER FROM LOCALSTORAGE =====
  useEffect(() => {
    if (typeof window === "undefined") return;

    const userDataRaw = localStorage.getItem("main_user");
    if (userDataRaw) {
      try {
        const userData = JSON.parse(userDataRaw);
        setUser(userData);
        setIsLoggedIn(true);
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }

    const handleAuthChange = () => {
      const updatedUserRaw = localStorage.getItem("main_user");
      if (updatedUserRaw) {
        setUser(JSON.parse(updatedUserRaw));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  // ===== LOGOUT =====
  const handleLogout = () => {
    localStorage.removeItem("main_user");
    window.dispatchEvent(new Event("authChange"));
    router.push("/main/login");
  };

  // ===== SEARCH PRODUCTS =====
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/products?search=${encodeURIComponent(
            searchTerm
          )}&limit=5`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setResults(data.data || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", err);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // ===== CLICK OUTSIDE DROPDOWN =====
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <html lang="vi">
      <body className="bg-black text-yellow-400">
        {/* HEADER */}
        <header className="bg-yellow-400 text-black p-4 shadow-md">
          <div className="container mx-auto flex items-center justify-between relative">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link href="/main" className="text-2xl font-extrabold">
                MyShop
              </Link>
              <span className="hidden md:inline text-sm italic">
                Thời trang trẻ trung
              </span>
            </div>

            {/* Search */}
            <div className="flex-1 mx-6 relative" ref={dropdownRef}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full p-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-black"
                onFocus={() => results.length > 0 && setShowDropdown(true)}
              />
              {showDropdown && results.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white text-black rounded-md shadow-lg z-50 max-h-60 overflow-auto mt-1">
                  {results.map((product) => (
                    <li
                      key={product.id}
                      onMouseDown={() =>
                        (window.location.href = `/main/product/${product.slug}`)
                      }
                      className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <img
                        src={product.thumbnail_url || "/placeholder.png"}
                        alt={product.name}
                        className="w-12 h-12 object-cover mr-2"
                      />
                      <span>{product.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* User */}
            <div className="flex items-center space-x-4">
              <Link href="/main/cart" className="hover:underline">
                🛒
              </Link>

              {isLoggedIn && user ? (
                <>
                  <Link
                    href="/main/profile"
                    className="flex items-center gap-2 px-2 py-1 rounded-full bg-white hover:bg-gray-700 transition"
                    title={user?.name}
                  >
                    {user?.avatar ? (
                      <img
                        src={`http://localhost:8000/${
                          user.avatar
                        }?t=${Date.now()}`}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full object-cover border border-yellow-400"
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-yellow-400">
                        <FaUser />
                      </div>
                    )}
                    <span className="text-yellow-400 font-medium truncate max-w-[100px]">
                      {user?.name}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hover:underline ml-2"
                    title="Đăng xuất"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link href="/main/register" className="hover:underline">
                    Đăng ký
                  </Link>
                  <Link href="/main/login" className="hover:underline">
                    Đăng nhập
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* NAV */}
          <nav className="mt-3 border-t border-black pt-2">
            <ul className="flex justify-center space-x-6 font-medium">
              <li>
                <Link href="/main/about" className="hover:underline">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/main/products" className="hover:underline">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/main/sale" className="hover:underline">
                  Khuyến mãi
                </Link>
              </li>
              <li>
                <Link href="/main/contact" className="hover:underline">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/main/post" className="hover:underline">
                  Bài viết
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* MAIN */}
        <main className="container mx-auto p-6">{children}</main>

        {/* FOOTER */}
        <footer className="bg-yellow-400 text-black mt-10 p-10">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-2xl font-extrabold">MyShop</h2>
              <p className="mt-2">
                Thời trang trẻ trung – Giày dép & quần áo hot trend
              </p>
              <p className="mt-4">📍 123 Đường ABC, Quận 1, TP.HCM</p>
              <p>📞 0123 456 789</p>
              <p>📧 hotro@myshop.vn</p>
              <p>🕑 8:00 - 22:00 (T2 - CN)</p>
            </div>

            <div>
              <h3 className="font-bold mb-3">Danh mục</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/gioi-thieu" className="hover:underline">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link href="/lien-he" className="hover:underline">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/chinh-sach-bao-mat" className="hover:underline">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link href="/dieu-khoan" className="hover:underline">
                    Điều khoản sử dụng
                  </Link>
                </li>
                <li>
                  <Link href="/chinh-sach-doi-tra" className="hover:underline">
                    Chính sách đổi trả
                  </Link>
                </li>
                <li>
                  <Link href="/huong-dan-mua-hang" className="hover:underline">
                    Hướng dẫn mua hàng
                  </Link>
                </li>
                <li>
                  <Link href="/thanh-toan" className="hover:underline">
                    Phương thức thanh toán
                  </Link>
                </li>
                <li>
                  <Link
                    href="/chinh-sach-van-chuyen"
                    className="hover:underline"
                  >
                    Chính sách vận chuyển
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3">Hỗ trợ khách hàng</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/ho-tro" className="hover:underline">
                    Trung tâm hỗ trợ
                  </Link>
                </li>
                <li>
                  <Link href="/bao-hanh" className="hover:underline">
                    Bảo hành
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="hover:underline">
                    Chat trực tuyến
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3">Kết nối với chúng tôi</h3>
              <div className="flex space-x-4 text-2xl">
                <Link href="https://facebook.com" target="_blank">
                  🌐
                </Link>
                <Link href="https://instagram.com" target="_blank">
                  📷
                </Link>
                <Link href="https://tiktok.com" target="_blank">
                  🎵
                </Link>
                <Link href="https://youtube.com" target="_blank">
                  ▶️
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 border-t border-black pt-4">
            <p>© 2025 MyShop. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
