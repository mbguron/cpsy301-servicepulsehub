"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customer: "John Doe",
      email: "john@example.com",
      phone: "(123) 456-7890",
      service: "Screen Repair",
      device: "iPhone 14",
      date: "Apr 10, 2026",
      time: "9:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: "Jane Smith",
      email: "jane@example.com",
      phone: "(234) 567-8901",
      service: "Battery Replacement",
      device: "Samsung Galaxy S23",
      date: "Apr 10, 2026",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      email: "mike@example.com",
      phone: "(345) 678-9012",
      service: "Water Damage Repair",
      device: "iPad Pro",
      date: "Apr 11, 2026",
      time: "2:00 PM",
      status: "Pending",
    },
    {
      id: 4,
      customer: "Sarah Williams",
      email: "sarah@example.com",
      phone: "(456) 789-0123",
      service: "Camera Repair",
      device: "Google Pixel 7",
      date: "Apr 11, 2026",
      time: "3:30 PM",
      status: "Confirmed",
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = filter === "All" || apt.status === filter;
    const matchesSearch =
      apt.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt,
      ),
    );
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((apt) => apt.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition">
          + New Appointment
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Customer & Service
            </label>
            <input
              type="text"
              placeholder="Search by name, email, phone, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-
              
              
              rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filter by Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Service
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Device
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Date & Time
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt) => (
                  <tr
                    key={apt.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {apt.customer}
                        </p>
                        <p className="text-sm text-gray-600">{apt.email}</p>
                        <p className="text-sm text-gray-600">{apt.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{apt.service}</td>
                    <td className="py-4 px-4 text-gray-600">{apt.device}</td>
                    <td className="py-4 px-4 text-gray-600">
                      {apt.date}
                      <br />
                      {apt.time}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={apt.status}
                        onChange={(e) =>
                          handleStatusChange(apt.id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-full text-sm font-medium border-none focus:outline-none ${getStatusColor(
                          apt.status,
                        )}`}
                      >
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(apt.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-600">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
