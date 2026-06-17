// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // export default function RegisterPage() {
// //   const router = useRouter();

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     phone: "",
// //     username: "",
// //   });

// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");

// //     // Frontend validate
// //     if (!formData.name || !formData.email || !formData.password) {
// //       setError("❌ Vui lòng nhập đầy đủ thông tin!");
// //       return;
// //     }
// //     if (formData.password.length < 6) {
// //       setError("❌ Mật khẩu phải có ít nhất 6 ký tự!");
// //       return;
// //     }
// //     if (formData.password !== formData.confirmPassword) {
// //       setError("❌ Mật khẩu xác nhận không khớp!");
// //       return;
// //     }

// //     try {
// //       const res = await fetch("http://localhost:8000/api/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           name: formData.name,
// //           email: formData.email,
// //           password: formData.password,
// //           phone: formData.phone,
// //           username: formData.username,
// //         }),
// //       });

// //       let data;
// //       try {
// //         data = await res.json();
// //       } catch {
// //         setError("❌ Server trả về dữ liệu không hợp lệ!");
// //         return;
// //       }

// //       if (!res.ok) {
// //         const msg =
// //           data.message || JSON.stringify(data.errors) || "Đăng ký thất bại!";
// //         setError("❌ " + msg);
// //         return;
// //       }

// //       setSuccess("✅ Đăng ký thành công! Chuyển sang đăng nhập...");
// //       setTimeout(() => router.push("/main/login"), 2000);
// //     } catch (err) {
// //       setError("❌ Có lỗi xảy ra. Vui lòng thử lại!");
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto p-6">
// //       <h1 className="text-2xl font-bold mb-6 text-center">
// //         Đăng ký thành viên
// //       </h1>

// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-gray-50 border rounded-lg shadow p-6 space-y-4"
// //       >
// //         <div>
// //           <label className="text-black block font-medium">Họ tên</label>
// //           <input
// //             type="text"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             className=" text-black w-full border rounded p-2"
// //             placeholder="Nhập họ tên"
// //           />
// //         </div>

// //         <div>
// //           <label className="text-black block font-medium">Email</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="text-black w-full border rounded p-2"
// //             placeholder="Nhập email"
// //           />
// //         </div>

// //         <div>
// //           <label className="text-black block font-medium">Username</label>
// //           <input
// //             type="text"
// //             name="username"
// //             value={formData.username}
// //             onChange={handleChange}
// //             className="text-black w-full border rounded p-2"
// //             placeholder="Nhập username (tùy chọn)"
// //           />
// //         </div>

// //         <div>
// //           <label className="text-black block font-medium">Số điện thoại</label>
// //           <input
// //             type="text"
// //             name="phone"
// //             value={formData.phone}
// //             onChange={handleChange}
// //             className="text-black w-full border rounded p-2"
// //             placeholder="Nhập số điện thoại (tùy chọn)"
// //           />
// //         </div>

// //         <div>
// //           <label className="text-black block font-medium">Mật khẩu</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             className="text-black w-full border rounded p-2"
// //             placeholder="Nhập mật khẩu"
// //           />
// //         </div>

// //         <div>
// //           <label className="text-black block font-medium">
// //             Xác nhận mật khẩu
// //           </label>
// //           <input
// //             type="password"
// //             name="confirmPassword"
// //             value={formData.confirmPassword}
// //             onChange={handleChange}
// //             className="text-black w-full border rounded p-2"
// //             placeholder="Nhập lại mật khẩu"
// //           />
// //         </div>

// //         {error && <p className="text-red-500">{error}</p>}
// //         {success && <p className="text-green-600">{success}</p>}

// //         <button
// //           type="submit"
// //           className="w-full bg-yellow-400 text-black font-medium px-4 py-2 rounded hover:bg-black hover:text-yellow-400 transition"
// //         >
// //           Đăng ký
// //         </button>
// //       </form>

// //       <p className="mt-4 text-center">
// //         Đã có tài khoản?{" "}
// //         <a href="/main/login" className="text-blue-600 hover:underline">
// //           Đăng nhập
// //         </a>
// //       </p>
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     username: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
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

//     // Frontend validate
//     if (!formData.name || !formData.email || !formData.password) {
//       setError("❌ Vui lòng nhập đầy đủ thông tin!");
//       return;
//     }
//     if (formData.password.length < 6) {
//       setError("❌ Mật khẩu phải có ít nhất 6 ký tự!");
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError("❌ Mật khẩu xác nhận không khớp!");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:8000/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           username: formData.username || null,
//           phone: formData.phone || null,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(
//           "❌ " +
//             (data.message || JSON.stringify(data.errors) || "Đăng ký thất bại!")
//         );
//         return;
//       }

//       if (data.user) {
//         localStorage.setItem("main_user", JSON.stringify(data.user));
//       }

//       setSuccess("✅ Đăng ký thành công! Chuyển sang đăng nhập...");

//       setTimeout(() => router.push("/main/login"), 1500);
//     } catch (err) {
//       console.error(err);
//       setError("❌ Có lỗi xảy ra. Vui lòng thử lại!");
//     }
//   };

//   return (
//     <div className=" max-w-md mx-auto p-6">
//       <h1 className=" text-2xl font-bold mb-6 text-center">
//         Đăng ký thành viên
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-900 border rounded-lg shadow p-6 space-y-4"
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="Họ tên"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="username"
//           placeholder="Username (tùy chọn)"
//           value={formData.username}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Số điện thoại (tùy chọn)"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Mật khẩu"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Xác nhận mật khẩu"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {error && <p className="text-red-500">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button
//           type="submit"
//           className="w-full bg-yellow-400 text-black p-2 rounded hover:bg-black hover:text-yellow-400 transition"
//         >
//           Đăng ký
//         </button>
//       </form>

//       <p className="mt-4 text-center text-black">
//         Đã có tài khoản?{" "}
//         <a href="/main/login" className="text-blue-600 hover:underline">
//           Đăng nhập
//         </a>
//       </p>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    address: "", // 🟡 Thêm địa chỉ
    password: "",
    confirmPassword: "",
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

    // Validate đơn giản
    if (!formData.name || !formData.email || !formData.password) {
      setError("❌ Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (formData.password.length < 6) {
      setError("❌ Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          username: formData.username || null,
          phone: formData.phone || null,
          address: formData.address || null, // 🟡 Gửi địa chỉ
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          "❌ " +
            (data.message || JSON.stringify(data.errors) || "Đăng ký thất bại!")
        );
        return;
      }

      if (data.user) {
        localStorage.setItem("main_user", JSON.stringify(data.user));
      }

      setSuccess("✅ Đăng ký thành công! Chuyển sang đăng nhập...");

      setTimeout(() => router.push("/main/login"), 1500);
    } catch (err) {
      console.error(err);
      setError("❌ Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-yellow-600 text-2xl font-bold mb-6 text-center">
        Đăng ký thành viên
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border rounded-lg shadow p-6 space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Họ tên"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username (tùy chọn)"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại (tùy chọn)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ (tùy chọn)"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {/* 🟡 Thêm input địa chỉ */}

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black p-2 rounded hover:bg-black hover:text-yellow-400 transition"
        >
          Đăng ký
        </button>
      </form>

      <p className="mt-4 text-center text-white">
        Đã có tài khoản?{" "}
        <a href="/main/login" className="text-yellow-600 hover:underline">
          Đăng nhập
        </a>
      </p>
    </div>
  );
}
