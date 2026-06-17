export const metadata = {
  title: "Giới thiệu | My Shop",
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      {/* Phần giới thiệu */}
      <section className="bg-yellow-400 text-black rounded-xl p-10 text-center">
        <h1 className="text-4xl font-extrabold">Về My Shop</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          My Shop được thành lập với sứ mệnh mang đến cho khách hàng những sản
          phẩm thời trang chất lượng, phong cách trẻ trung và giá cả hợp lý.
          Chúng tôi luôn cập nhật xu hướng mới nhất để bạn tự tin thể hiện cá
          tính.
        </p>
      </section>

      {/* Điểm mạnh */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">
          💡 Điểm nổi bật
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li className="bg-black text-yellow-400 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Sản phẩm chính hãng</h3>
            <p>Tất cả sản phẩm đều được cam kết chính hãng, chất lượng cao.</p>
          </li>
          <li className="bg-black text-yellow-400 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Giá cả cạnh tranh</h3>
            <p>Chúng tôi luôn mang đến mức giá tốt nhất cho khách hàng.</p>
          </li>
          <li className="bg-black text-yellow-400 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Dịch vụ tận tâm</h3>
            <p>Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ 24/7.</p>
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Hãy bắt đầu mua sắm ngay hôm nay!
        </h2>
        <a
          href="/main/products"
          className="inline-block px-6 py-3 bg-yellow-400 text-black font-medium rounded-lg shadow hover:bg-black hover:text-yellow-400 border border-yellow-400 transition"
        >
          🛒 Xem sản phẩm
        </a>
      </section>
    </div>
  );
}
