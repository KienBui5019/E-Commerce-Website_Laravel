"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Import component
import ProductNew from "./_components/ProductNew";
import PostNew from "./_components/PostNew";
import ProductSale from "./_components/ProductSale";
import ProductCategory from "./_components/ProductCategory";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Banner giới thiệu */}
      <section className="relative bg-yellow-400 text-black rounded-xl p-10 text-center">
        <h1 className="text-5xl font-extrabold">MyShop</h1>
        <p className="mt-4 text-xl">
          Thời trang trẻ trung – Giày dép & quần áo hot trend
        </p>
        <div className="mt-6">
          <Link
            href="/main/products"
            className="px-6 py-3 bg-black text-yellow-400 font-bold rounded-lg shadow hover:bg-yellow-300 hover:text-black transition"
          >
            🚀 Bắt đầu mua sắm
          </Link>
        </div>
      </section>

      {/* Gọi thêm component */}
      {/* Section sản phẩm mới */}
      <section className="max-w-7xl mx-auto px-4">
        <ProductNew />
      </section>

      {/* Section sản phẩm sale */}
      <section className="max-w-7xl mx-auto px-4">
        <ProductSale />
      </section>
      {/* Danh mục sản phẩm */}
      <section className="max-w-7xl mx-auto px-4">
        <ProductCategory />
      </section>

      {/* Bài viết mới */}
      <section className="max-w-7xl mx-auto px-4">
        <PostNew />
      </section>
    </div>
  );
}
