"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    router.push("/admin/athen/login");
  }, []);

  return <h1 className="text-center mt-10">Đang đăng xuất...</h1>;
}
