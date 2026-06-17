export const metadata = {
  title: "Giới thiệu | My Shop",
  description:
    "Tìm hiểu thêm về My Shop - cửa hàng thời trang trẻ trung, phong cách và chất lượng.",
};

export default function AboutLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Nội dung */}
      <main className="flex-1 container mx-auto px-4 py-10">{children}</main>
    </div>
  );
}
