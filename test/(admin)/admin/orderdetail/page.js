import { useEffect, useState } from "react";

export default function OrderDetailModal({ orderId, onClose }) {
  const [order, setOrder] = useState(null);

  const fetchOrderDetail = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/order/${orderId}`);
    const data = await res.json();
    setOrder(data);
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await fetch(`http://127.0.0.1:8000/api/order/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOrderDetail();
  };

  if (!order) return <div>Đang tải...</div>;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[700px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Chi tiết đơn hàng #{order.id}</h2>
        <p><b>Khách hàng:</b> {order.name}</p>
        <p><b>Email:</b> {order.email}</p>
        <p><b>SĐT:</b> {order.phone}</p>
        <p><b>Địa chỉ:</b> {order.address}</p>
        <p><b>Ghi chú:</b> {order.note}</p>

        <div className="mt-3">
          <label><b>Trạng thái:</b></label>
          <select
            value={order.status}
            onChange={handleStatusChange}
            className="ml-2 border p-1"
          >
            <option value="1">Mới</option>
            <option value="2">Đang xử lý</option>
            <option value="3">Hoàn tất</option>
          </select>
        </div>

        <h3 className="mt-4 font-bold">Danh sách sản phẩm</h3>
        <table className="w-full border mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th>Ảnh</th>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.details.map((d) => (
              <tr key={d.id} className="border-t">
                <td>
                  {d.product?.thumbnail && (
                    <img
                      src={`http://127.0.0.1:8000/images/${d.product.thumbnail}`}
                      width="50"
                      alt={d.product.name}
                    />
                  )}
                </td>
                <td>{d.product?.name}</td>
                <td>{Number(d.price).toLocaleString()}vnđ</td>
                <td>{d.choseqty}</td>
                <td>{Number(d.amount).toLocaleString()}vnđ</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
