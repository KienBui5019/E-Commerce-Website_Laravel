// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // export default function LoginPage() {
// //   const router = useRouter();

// //   const [formData, setFormData] = useState({
// //     usernameOrEmail: "",
// //     password: "",
// //   });

// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");

// //     if (!formData.usernameOrEmail || !formData.password) {
// //       setError("❌ Vui lòng nhập đầy đủ thông tin!");
// //       return;
// //     }

// //     try {
// //       const res = await fetch("http://localhost:8000/api/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Accept: "application/json",
// //         },
// //         body: JSON.stringify({
// //           usernameOrEmail: formData.usernameOrEmail,
// //           password: formData.password,
// //         }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         setError("❌ " + (data.message || "Đăng nhập thất bại!"));
// //         return;
// //       }

// //       // ✅ Lưu token + user vào localStorage
// //       localStorage.setItem("main_token", data.token);
// //       localStorage.setItem("main_user", JSON.stringify(data.user));

// //       // ✅ Bắn sự kiện để layout cập nhật ngay
// //       window.dispatchEvent(new Event("authChange"));
// //       console.log("🔥 authChange event fired");

// //       setSuccess(`✅ Đăng nhập thành công! Chào ${data.user.name}`);

// //       setTimeout(() => {
// //         router.push("/main"); // quay về trang chính
// //       }, 1000);
// //     } catch (err) {
// //       console.error(err);
// //       setError("❌ Có lỗi xảy ra. Vui lòng thử lại!");
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto p-6">
// //       <h1 className="text-2xl font-bold mb-6 text-center">
// //         Đăng nhập thành viên
// //       </h1>

// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-gray-50 border rounded-lg shadow p-6 space-y-4"
// //       >
// //         <div>
// //           <label className="text-gray-900 block font-medium">
// //             Email / Số điện thoại / Username
// //           </label>
// //           <input
// //             type="text"
// //             name="usernameOrEmail"
// //             value={formData.usernameOrEmail}
// //             onChange={handleChange}
// //             className="w-full border rounded p-2"
// //             placeholder="Nhập email, sđt hoặc tên đăng nhập"
// //           />
// //         </div>

// //         <div>
// //           <label className=" text-gray-900  block font-medium">Mật khẩu</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             className="w-full border rounded p-2"
// //             placeholder="Nhập mật khẩu"
// //           />
// //         </div>

// //         {error && <p className="text-red-500">{error}</p>}
// //         {success && <p className="text-green-600">{success}</p>}

// //         <button
// //           type="submit"
// //           className="w-full bg-yellow-400 text-black font-medium px-4 py-2 rounded hover:bg-black hover:text-yellow-400 transition"
// //         >
// //           Đăng nhập
// //         </button>
// //       </form>

// //       <p className="mt-4 text-center">
// //         Chưa có tài khoản?{" "}
// //         <a href="/main/register" className="text-blue-600 hover:underline">
// //           Đăng ký ngay
// //         </a>
// //       </p>
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!formData.email || !formData.password) {
//       setError("❌ Vui lòng nhập email/username và mật khẩu!");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:8000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError("❌ " + (data.message || "Đăng nhập thất bại!"));
//         return;
//       }

//       if (data.user)
//         localStorage.setItem("main_user", JSON.stringify(data.user));

//       setSuccess(`✅ Đăng nhập thành công! Chào ${data.user.name}`);

//       window.dispatchEvent(new Event("authChange"));

//       setTimeout(() => router.push("/main"), 1000);
//     } catch (err) {
//       console.error(err);
//       setError("❌ Có lỗi xảy ra. Vui lòng thử lại!");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center text-yellow-500">
//         Đăng nhập thành viên
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-50 border rounded-lg shadow p-6 space-y-4"
//       >
//         <input
//           type="text"
//           name="email"
//           placeholder="Email / Username"
//           value={formData.email}
//           onChange={handleChange}
//           className="text-black w-full border p-2 rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Mật khẩu"
//           value={formData.password}
//           onChange={handleChange}
//           className="text-black w-full border p-2 rounded"
//         />

//         {error && <p className="text-red-500">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button
//           type="submit"
//           className="w-full bg-yellow-400 text-black p-2 rounded hover:bg-black hover:text-yellow-400 transition"
//         >
//           Đăng nhập
//         </button>
//       </form>

//       <p className="mt-4 text-center text-white">
//         Chưa có tài khoản?{" "}
//         <a href="/main/register" className="text-yellow-600 hover:underline">
//           Đăng ký ngay
//         </a>
//       </p>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Kiểm tra người dùng có nhập đầy đủ thông tin
    if (!formData.email || !formData.password) {
      setError("❌ Vui lòng nhập email/username và mật khẩu!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      // ❌ Sai thông tin đăng nhập
      if (!res.ok) {
        setError("❌ " + (data.message || "Đăng nhập thất bại!"));
        return;
      }

      // ❌ Tài khoản không khả dụng (chưa active hoặc role không đúng)
      if (!data.user || data.user.roles !== "customer") {
        setError("❌ Tài khoản không khả dụng");
        return;
      }

      // ✅ Đăng nhập thành công
      localStorage.setItem("main_user", JSON.stringify(data.user));
      setSuccess(`✅ Đăng nhập thành công! Chào ${data.user.name}`);

      // Thông báo thay đổi auth cho layout/ứng dụng
      window.dispatchEvent(new Event("authChange"));

      setTimeout(() => router.push("/main"), 1000);
    } catch (err) {
      console.error(err);
      setError("❌ Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   if (!formData.email || !formData.password) {
  //     setError("❌ Vui lòng nhập email/username và mật khẩu!");
  //     return;
  //   }

  //   try {
  //     const res = await fetch("http://localhost:8000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         password: formData.password,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setError("❌ " + (data.message || "Đăng nhập thất bại!"));
  //       return;
  //     }

  //     if (data.user)
  //       localStorage.setItem("main_user", JSON.stringify(data.user));

  //     setSuccess(`✅ Đăng nhập thành công! Chào ${data.user.name}`);

  //     window.dispatchEvent(new Event("authChange"));

  //     setTimeout(() => router.push("/main"), 1000);
  //   } catch (err) {
  //     console.error(err);
  //     setError("❌ Có lỗi xảy ra. Vui lòng thử lại!");
  //   }
  // };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-yellow-500">
        Đăng nhập thành viên
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 border rounded-lg shadow p-6 space-y-4"
      >
        <input
          type="text"
          name="email"
          placeholder="Email / Username"
          value={formData.email}
          onChange={handleChange}
          className="text-black w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          className="text-black w-full border p-2 rounded"
        />

        {/* Hiển thị lỗi */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black p-2 rounded hover:bg-black hover:text-yellow-400 transition"
        >
          Đăng nhập
        </button>
      </form>

      <p className="mt-4 text-center text-white">
        Chưa có tài khoản?{" "}
        <a href="/main/register" className="text-yellow-600 hover:underline">
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
}
