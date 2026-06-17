"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Màu sắc
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const Dashboard = () => {
  // Mock data
  const revenueData = [
    { month: "Jan", revenue: 4000, expense: 2400 },
    { month: "Feb", revenue: 3000, expense: 1398 },
    { month: "Mar", revenue: 5000, expense: 2400 },
    { month: "Apr", revenue: 4780, expense: 2000 },
    { month: "May", revenue: 5890, expense: 2780 },
    { month: "Jun", revenue: 4390, expense: 1900 },
  ];

  const loginData = [
    { day: "Mon", users: 120 },
    { day: "Tue", users: 98 },
    { day: "Wed", users: 150 },
    { day: "Thu", users: 200 },
    { day: "Fri", users: 180 },
    { day: "Sat", users: 220 },
    { day: "Sun", users: 300 },
  ];

  const stockData = [
    { name: "Tivi", stock: 120 },
    { name: "Laptop", stock: 80 },
    { name: "Tủ lạnh", stock: 60 },
    { name: "Máy lạnh", stock: 150 },
    { name: "Máy xay ST", stock: 80}
  ];

  const categoryData = [
    { name: "Đồ gia dụng", sales: 400 },
    { name: "Điện lạnh", sales: 300 },
    { name: "Điện Tử", sales: 300 },
    { name: "Phụ kiện ", sales: 200 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          📊 Dashboard Quản trị
        </h1>
        <p className="text-gray-500">
          Tổng quan doanh thu, người dùng và sản phẩm trong hệ thống
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Doanh thu & chi tiêu */}
        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            💰 Doanh thu & Chi tiêu
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Đăng nhập */}
        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            👥 Lượt đăng nhập trong tuần
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loginData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tồn kho */}
        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-gray-700 mb-4">📦 Hàng tồn kho</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bán chạy theo danh mục */}
        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            🏷️ Bán chạy theo danh mục
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="sales"
                nameKey="name"
                outerRadius={120}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
