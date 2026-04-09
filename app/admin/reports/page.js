"use client";
import { useState } from "react";

export default function AdminReports() {
  const [dateRange, setDateRange] = useState("month");

  const reportData = {
    totalRevenue: "$12,459.80",
    totalAppointments: 156,
    completedAppointments: 132,
    pendingAppointments: 24,
    avgRating: "4.8/5",
    topService: "Screen Repair",
    topCustomer: "John Doe",
  };

  const monthlyData = [
    { month: "Jan", revenue: 8500, appointments: 95 },
    { month: "Feb", revenue: 9200, appointments: 108 },
    { month: "Mar", revenue: 12459, appointments: 156 },
  ];

  const serviceStats = [
    { name: "Screen Repair", count: 52, revenue: "$4,135.48" },
    { name: "Battery Replacement", count: 38, revenue: "$1,899.62" },
    { name: "Water Damage Repair", count: 28, revenue: "$3,639.72" },
    { name: "Charging Port Repair", count: 24, revenue: "$959.76" },
    { name: "Other Services", count: 14, revenue: "$1,824.22" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <div className="flex space-x-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition">
            Export PDF
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {reportData.totalRevenue}
          </p>
          <p className="text-sm text-gray-600 mt-2">+23% from last period</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">
            Total Appointments
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {reportData.totalAppointments}
          </p>
          <p className="text-sm text-gray-600 mt-2">+45% from last period</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {(
              (reportData.completedAppointments /
                reportData.totalAppointments) *
              100
            ).toFixed(1)}
            %
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {reportData.completedAppointments} completed
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Avg. Rating</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {reportData.avgRating}
          </p>
          <p className="text-sm text-gray-600 mt-2">From customer reviews</p>
        </div>
      </div>

      {/* Revenue & Appointments Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Revenue Trend
          </h3>
          <div className="h-64 bg-gradient-to-b from-green-100 to-green-50 rounded-lg flex items-end justify-around p-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="bg-green-500 rounded-t-lg w-12"
                  style={{ height: `${(data.revenue / 12459) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                <span className="text-xs font-semibold text-gray-900 mt-1">
                  ${(data.revenue / 1000).toFixed(1)}k
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Appointments Trend
          </h3>
          <div className="h-64 bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg flex items-end justify-around p-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="bg-blue-500 rounded-t-lg w-12"
                  style={{ height: `${(data.appointments / 156) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                <span className="text-xs font-semibold text-gray-900 mt-1">
                  {data.appointments}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Service Performance
        </h3>
        <div className="space-y-4">
          {serviceStats.map((service, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-600">
                    {service.count} appointments
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {service.revenue}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(
                      (service.count / reportData.totalAppointments) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{
                    width: `${(service.count / reportData.totalAppointments) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Service</h3>
          <p className="text-2xl font-bold text-orange-600">
            {reportData.topService}
          </p>
          <p className="text-sm text-gray-600 mt-2">52 bookings this month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Customer</h3>
          <p className="text-2xl font-bold text-blue-600">
            {reportData.topCustomer}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            5 bookings, $399.95 spent
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Pending Items
          </h3>
          <p className="text-2xl font-bold text-red-600">
            {reportData.pendingAppointments}
          </p>
          <p className="text-sm text-gray-600 mt-2">appointments to confirm</p>
        </div>
      </div>
    </div>
  );
}
