// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function AddProductSale() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     product_id: "",
//     name: "",
//     price_sale: "",
//     date_begin: "",
//     date_end: "",
//     status: 1,
//   });
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Lấy danh sách sản phẩm
//   useEffect(() => {
//     fetch("http://localhost:8000/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data.data))
//       .catch(() => setError("Không tải được danh sách sản phẩm"));
//   }, []);

//   // Chuyển date từ input -> MySQL datetime format
//   const formatDateForMySQL = (dateStr) => {
//     const date = new Date(dateStr);
//     const yyyy = date.getFullYear();
//     const mm = String(date.getMonth() + 1).padStart(2, "0");
//     const dd = String(date.getDate()).padStart(2, "0");
//     const hh = String(date.getHours()).padStart(2, "0");
//     const mi = String(date.getMinutes()).padStart(2, "0");
//     const ss = String(date.getSeconds()).padStart(2, "0");
//     return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
//   };

//   const handleSelect = (e) => {
//     const id = e.target.value;
//     setForm({
//       ...form,
//       product_id: id,
//       name: "",
//       price_sale: "",
//       date_begin: "",
//       date_end: "",
//       status: 1,
//     });
//     const product = products.find((p) => p.id == id);
//     setSelectedProduct(product || null);

//     if (product) {
//       const now = new Date();
//       const in7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
//       setForm((prev) => ({
//         ...prev,
//         date_begin: formatDateForMySQL(now),
//         date_end: formatDateForMySQL(in7Days),
//       }));
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError("");

//       if (!selectedProduct) throw new Error("Chưa chọn sản phẩm");

//       const payload = {
//         product_id: parseInt(selectedProduct.id, 10),
//         name: form.name,
//         price_sale: parseFloat(form.price_sale),
//         date_begin: form.date_begin,
//         date_end: form.date_end,
//         status: 1,
//         // created_by: 1,
//       };

//       const res = await fetch("http://localhost:8000/api/product-sale", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(errorText || "Lỗi thêm sản phẩm khuyến mãi");
//       }

//       router.push("/productsale");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-yellow-600">
//         Thêm sản phẩm khuyến mãi
//       </h1>
//       {error && <p className="text-red-500">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <select
//           value={form.product_id}
//           onChange={handleSelect}
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="">Chọn sản phẩm</option>
//           {products.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.name} - {p.price_buy}đ
//             </option>
//           ))}
//         </select>

//         {selectedProduct && (
//           <div className="border p-2 rounded bg-gray-50">
//             <img
//               src={selectedProduct.thumbnail_url}
//               alt={selectedProduct.name}
//               className="w-32 mb-2"
//             />
//             <p>
//               <b>Tên:</b> {selectedProduct.name}
//             </p>
//             <p>
//               <b>Giá gốc:</b> {selectedProduct.price_buy}đ
//             </p>
//             <p>
//               <b>Ngày bắt đầu:</b>{" "}
//               <input
//                 type="datetime-local"
//                 name="date_begin"
//                 value={new Date(form.date_begin).toISOString().slice(0, 16)}
//                 onChange={(e) =>
//                   setForm((prev) => ({
//                     ...prev,
//                     date_begin: formatDateForMySQL(e.target.value),
//                   }))
//                 }
//                 className="border p-1 rounded w-full"
//               />
//             </p>
//             <p>
//               <b>Ngày kết thúc:</b>{" "}
//               <input
//                 type="datetime-local"
//                 name="date_end"
//                 value={new Date(form.date_end).toISOString().slice(0, 16)}
//                 onChange={(e) =>
//                   setForm((prev) => ({
//                     ...prev,
//                     date_end: formatDateForMySQL(e.target.value),
//                   }))
//                 }
//                 className="border p-1 rounded w-full"
//               />
//             </p>
//           </div>
//         )}

//         <input
//           type="text"
//           placeholder="ten khuyens mãi"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           name="price_sale"
//           placeholder="Giá khuyến mãi"
//           value={form.price_sale}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
//         >
//           {loading ? "Đang lưu..." : "Thêm"}
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProductSale() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_id: "",
    name: "",
    price_sale: "",
    date_begin: "",
    date_end: "",
    status: 1,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy danh sách sản phẩm
  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch(() => setError("Không tải được danh sách sản phẩm"));
  }, []);

  // Chuyển date từ input -> MySQL datetime format
  const formatDateForMySQL = (dateStr) => {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  };

  // Khi chọn sản phẩm
  const handleSelect = (e) => {
    const id = e.target.value;
    const product = products.find((p) => p.id == id) || null;
    setSelectedProduct(product);

    const now = new Date();
    const in7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    setForm((prev) => ({
      ...prev,
      product_id: id,
      name: prev.name || product?.name || "",
      price_sale: "",
      date_begin: formatDateForMySQL(now),
      date_end: formatDateForMySQL(in7Days),
      status: 1,
    }));
  };

  // Khi thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      if (!selectedProduct) throw new Error("Chưa chọn sản phẩm");

      const payload = {
        product_id: parseInt(selectedProduct.id, 10),
        name: form.name,
        price_sale: parseFloat(form.price_sale),
        date_begin: form.date_begin,
        date_end: form.date_end,
        status: form.status,
      };

      const res = await fetch("http://localhost:8000/api/product-sale-add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Lỗi thêm sản phẩm khuyến mãi");
      }

      router.push("/admin/productsale");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Chuyển date MySQL -> input datetime-local
  const toInputDateTime = (mysqlDate) => {
    if (!mysqlDate) return "";
    const date = new Date(mysqlDate);
    return date.toISOString().slice(0, 16);
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">
        Thêm sản phẩm khuyến mãi
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Chọn sản phẩm */}
        <div>
          <label className="block font-semibold mb-1">Chọn sản phẩm:</label>
          <select
            value={form.product_id}
            onChange={handleSelect}
            className="text-gray-900 w-full border p-2 rounded"
            required
          >
            <option value="">-- Chọn sản phẩm --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - {p.price_buy}đ
              </option>
            ))}
          </select>
        </div>

        {/* Preview sản phẩm */}
        {selectedProduct && (
          <div className="border p-3 rounded bg-gray-100">
            <p className="font-semibold text-lg mb-2">Thông tin sản phẩm</p>
            <img
              src={selectedProduct.thumbnail_url}
              alt={selectedProduct.name}
              className="w-32 mb-2"
            />
            <p>
              <b>Tên sản phẩm:</b> {selectedProduct.name}
            </p>
            <p>
              <b>Giá gốc:</b> {selectedProduct.price_buy}đ
            </p>

            <label className="block mt-3 font-semibold">Ngày bắt đầu:</label>
            <input
              type="datetime-local"
              name="date_begin"
              value={toInputDateTime(form.date_begin)}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />

            <label className="block mt-3 font-semibold">Ngày kết thúc:</label>
            <input
              type="datetime-local"
              name="date_end"
              value={toInputDateTime(form.date_end)}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
        )}

        {/* Tên khuyến mãi */}
        {/* <div>
          <label className="block font-semibold mb-1">Tên khuyến mãi:</label>
          <input
            type="text"
            name="name"
            placeholder="VD: Giảm giá Black Friday"
            value={form.name}
            onChange={handleChange}
            className="text-gray-900 w-full border p-2 rounded"
            required
          />
        </div> */}

        {/* Giá khuyến mãi */}
        <div>
          <label className="block font-semibold mb-1">Giá khuyến mãi:</label>
          <input
            type="number"
            name="price_sale"
            placeholder="Nhập giá khuyến mãi (VNĐ)"
            value={form.price_sale}
            onChange={handleChange}
            className="text-gray-900 w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded w-full font-semibold"
        >
          {loading ? "Đang lưu..." : "Thêm sản phẩm khuyến mãi"}
        </button>
      </form>
    </div>
  );
}
