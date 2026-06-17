"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate cơ bản
    if (!formData.name || !formData.message) {
      setError("❌ Vui lòng nhập đầy đủ thông tin!");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          content: formData.message, // Laravel nhận 'content'
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gửi thất bại");

      setError("");
      setSuccess("✅ Gửi thông tin liên hệ thành công!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-600 text-center">
        Liên hệ với chúng tôi
      </h1>

      {/* Bản đồ */}
      <div className="mb-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9064283462695!2d105.82717221540295!3d21.0357613929527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab400ba4f0e3%3A0xb0e9d81d2a989d8!2zQ8O0bmcgVmllbiBT4buRIHRow6FpIEjGsG5n!5e0!3m2!1svi!2s!4v1700000000000"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Form liên hệ */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 border rounded-lg shadow p-6 space-y-4"
      >
        <div>
          <label className="block font-medium text-black">Họ tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2 text-black"
            placeholder="Nhập họ tên"
          />
        </div>

        <div>
          <label className="block font-medium text-black">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2 text-black"
            placeholder="Nhập email"
          />
        </div>

        <div>
          <label className="block font-medium text-black">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded p-2 text-black"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div>
          <label className="block font-medium text-black">Nội dung</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded p-2 text-black"
            placeholder="Nhập nội dung liên hệ"
          ></textarea>
        </div>

        {/* Hiển thị lỗi hoặc thành công */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          className="bg-yellow-400 text-black font-medium px-4 py-2 rounded hover:bg-black hover:text-yellow-400 transition"
        >
          Gửi liên hệ
        </button>
      </form>
    </div>
  );
}
