import Image from "next/image";

export default function Slider() {
  return (
    <div className="relative w-full h-96">
      <Image
        src="/images/slider-image.jpg"
        alt="Slider Image"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-lg">
        <h2 className="text-white text-4xl font-bold mb-4">
          Welcome to Our Store
        </h2>
        <p className="text-white text-lg mb-6">Find the best products here</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
}
