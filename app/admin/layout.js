"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 overflow-hidden relative`}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h1 className="text-xl font-bold">ServicePulse</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            {sidebarOpen ? "Dashboard" : "D"}
          </Link>

          <Link
            href="/admin/appointments"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            {sidebarOpen ? "Appointments" : "A"}
          </Link>

          <Link
            href="/admin/services"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            {sidebarOpen ? "Services" : "S"}
          </Link>

          <Link
            href="/admin/customers"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            {sidebarOpen ? "Customers" : "C"}
          </Link>

          <Link
            href="/admin/reports"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            {sidebarOpen ? "Reports" : "R"}
          </Link>

          <Link
            href="/admin/settings"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            {sidebarOpen ? "Settings" : "S"}
          </Link>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <Link
            href="/login"
            className={`block px-4 py-3 rounded-lg hover:bg-gray-800 ${
              !sidebarOpen && "text-center"
            }`}
          >
            {sidebarOpen ? "Logout" : "L"}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-md p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
}
