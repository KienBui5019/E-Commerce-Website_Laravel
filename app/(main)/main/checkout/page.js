"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(30000);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // 🟢 Load giỏ hàng và user info
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    const subtotalPrice = storedCart.reduce(
      (sum, item) =>
        sum + (item.salePrice || item.price) * (item.quantity || 1),
      0
    );
    setSubtotal(subtotalPrice);
    setTotal(subtotalPrice + shippingFee);

    const userStr = localStorage.getItem("main_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setForm((f) => ({
        ...f,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "", // chỉ hiển thị sẵn
      }));
    }
  }, []);

  useEffect(() => {
    setTotal(subtotal + shippingFee);
  }, [subtotal, shippingFee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟩 Gửi đơn hàng (không update user)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("❌ Vui lòng nhập đầy đủ thông tin người nhận!");
      return;
    }

    if (cart.length === 0) {
      alert("🛒 Giỏ hàng trống!");
      return;
    }

    setLoading(true);
    setMessage("");

    const user = JSON.parse(localStorage.getItem("main_user"));

    try {
      // 🟩 Chỉ tạo đơn hàng, không update user.address
      const res = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address, // dùng địa chỉ mới nhập
          note: `Thanh toán: ${form.paymentMethod}`,
          total_price: total,
          products: cart.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            salePrice: i.salePrice,
            quantity: i.quantity,
          })),
          order_status: "Đang xử lý",
        }),
      });

      if (!res.ok) throw new Error("Không thể tạo đơn hàng");

      const data = await res.json();
      console.log("✅ Đơn hàng tạo thành công:", data);

      localStorage.removeItem("cart");
      setCart([]);
      setMessage("✅ Thanh toán thành công! Cảm ơn bạn đã mua hàng 💛");

      setTimeout(() => {
        router.push("/main/cart");
      }, 2000);
    } catch (err) {
      console.error("❌ Lỗi khi tạo đơn hàng:", err);
      setMessage("❌ Lỗi khi tạo đơn hàng! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Thanh toán</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Giỏ hàng */}
        <div className="col-span-2">
          <h2 className="font-semibold mb-4">Giỏ hàng</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">🛒 Giỏ hàng trống</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <h3>{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {(item.salePrice || item.price).toLocaleString()} đ x{" "}
                      {item.quantity || 1}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {(
                      (item.salePrice || item.price) * (item.quantity || 1)
                    ).toLocaleString()}{" "}
                    đ
                  </p>
                </div>
              ))}

              <div className="text-right font-semibold">
                <p>Tạm tính: {subtotal.toLocaleString()} đ</p>
                <p>Phí vận chuyển: {shippingFee.toLocaleString()} đ</p>
                <p className="text-lg font-bold">
                  Tổng thanh toán: {total.toLocaleString()} đ
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Thông tin nhận hàng */}
        <div>
          <h2 className="font-semibold mb-4">Thông tin người nhận</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <textarea
              name="address"
              placeholder="Địa chỉ nhận hàng"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <div>
              <h3 className="font-medium mb-2">Hình thức thanh toán</h3>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                Thanh toán khi nhận hàng (COD)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={form.paymentMethod === "bank"}
                  onChange={handleChange}
                />
                Chuyển khoản ngân hàng
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 py-2 rounded font-medium hover:bg-black hover:text-yellow-400 transition"
            >
              {loading ? "Đang xử lý..." : "Thanh toán"}
            </button>

            {message && (
              <p
                className={`text-center mt-4 ${
                  message.includes("✅")
                    ? "text-green-600 font-semibold"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
