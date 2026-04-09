"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  // Mock data
  const stats = [
    {
      title: "Total Appointments",
      value: 128,
      change: "+12%",
      icon: "📅",
      color: "bg-blue-500",
    },
    {
      title: "Completed",
      value: 96,
      change: "+8%",
      icon: "✅",
      color: "bg-green-500",
    },
    {
      title: "Pending",
      value: 24,
      change: "-2%",
      icon: "⏳",
      color: "bg-yellow-500",
    },
    {
      title: "Customers",
      value: 342,
      change: "+15%",
      icon: "👥",
      color: "bg-purple-500",
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      customer: "John Doe",
      service: "Screen Repair",
      date: "Apr 10, 2026",
      time: "9:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: "Jane Smith",
      service: "Battery Replacement",
      date: "Apr 10, 2026",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      service: "Water Damage Repair",
      date: "Apr 11, 2026",
      time: "2:00 PM",
      status: "Pending",
    },
    {
      id: 4,
      customer: "Sarah Williams",
      service: "Camera Repair",
      date: "Apr 11, 2026",
      time: "3:30 PM",
      status: "Confirmed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                <p className="text-green-600 text-sm mt-2">{stat.change}</p>
              </div>
              <div
                className={`${stat.color} w-14 h-14 rounded-full flex items-center justify-center text-2xl`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Recent Appointments
            </h3>
            <Link
              href="/admin/appointments"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date & Time
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((apt) => (
                  <tr
                    key={apt.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 text-gray-900">{apt.customer}</td>
                    <td className="py-4 px-4 text-gray-600">{apt.service}</td>
                    <td className="py-4 px-4 text-gray-600">
                      {apt.date}, {apt.time}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          apt.status,
                        )}`}
                      >
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/admin/appointments"
              className="block bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition text-center"
            >
              + New Appointment
            </Link>
            <Link
              href="/admin/services"
              className="block bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition text-center"
            >
              Manage Services
            </Link>
            <Link
              href="/admin/customers"
              className="block bg-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-600 transition text-center"
            >
              View Customers
            </Link>
            <Link
              href="/admin/reports"
              className="block bg-purple-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-600 transition text-center"
            >
              Generate Reports
            </Link>
          </div>
        </div>
      </div>

      {/* Chart Area (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Monthly Appointments
          </h3>
          <div className="h-64 bg-gradient-to-b from-orange-100 to-orange-50 rounded-lg flex items-end justify-around p-4">
            {[65, 78, 92, 88, 95, 102].map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="bg-orange-500 rounded-t-lg w-8"
                  style={{ height: `${(value / 102) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">
                  {["W1", "W2", "W3", "W4", "W5", "W6"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Services Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Services Distribution
          </h3>
          <div className="space-y-4">
            {[
              { name: "Screen Repair", count: 45, percent: 35 },
              { name: "Battery Replacement", count: 32, percent: 25 },
              { name: "Water Damage", count: 26, percent: 20 },
              { name: "Others", count: 26, percent: 20 },
            ].map((service, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {service.name}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {service.count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${service.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
