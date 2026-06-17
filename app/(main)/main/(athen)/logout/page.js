// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function LogoutPage() {
//   const router = useRouter();

//   useEffect(() => {
//     // Xóa token
//     localStorage.removeItem("token");

//     // Bắn sự kiện để RootLayout biết user đã logout
//     window.dispatchEvent(new Event("authChange"));

//     // Chuyển hướng về trang chủ
//     router.push("/");
//   }, [router]);

//   return <h1 className="text-center mt-10">Đang đăng xuất...</h1>;
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // ❌ Không xài token nữa, xóa luôn dữ liệu user
    localStorage.removeItem("main_user");

    // ✅ Bắn sự kiện để layout cập nhật (ví dụ header đổi sang "Đăng nhập")
    window.dispatchEvent(new Event("authChange"));

    // ✅ Chuyển hướng về trang chủ hoặc trang đăng nhập
    router.push("/main/login");
  }, [router]);

  return <h1 className="text-center mt-10">Đang đăng xuất...</h1>;
}
