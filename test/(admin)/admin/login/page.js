"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default function LoginAdminPage() {
  const [identifier, setIdentifier] = useState(""); // email / username / phone
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); // lỗi/thành công
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/login-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.message || "Đăng nhập thất bại" });
        setLoading(false);
        return;
      }

      // Thành công
      setMessage({ type: "success", text: "Đăng nhập thành công!" });

    //   // Lưu thông tin user
      localStorage.setItem("userad", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");
    //   // ✅ Kiểm tra user đã được lưu chưa
console.log("Trạng thái đăng nhập:", localStorage.getItem("isLoggedIn"));
console.log("Tên user:", JSON.parse(localStorage.getItem("userad")).username);
console.log("Vai trò:", JSON.parse(localStorage.getItem("userad")).roles);
console.log("Trạng thái:", JSON.parse(localStorage.getItem("userad")).status);


      setTimeout(() => router.push("/admin"), 1000);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Không kết nối được server" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-md rounded-lg w-96"
      >
        <FaUser className="text-4xl text-pink-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

        {message && (
          <p
            className={`text-sm mb-4 ${
              message.type === "error" ? "text-red-400" : "text-blue-400"
            }`}
          >
            {message.text}
          </p>
        )}

        <input
          type="text"
          placeholder="Email / Username / Phone"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-6 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Login"}
        </button>
      </form>
    </div>
  );
}
