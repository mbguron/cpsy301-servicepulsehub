"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    if (!isLoggedIn || userRole !== "admin") {
      router.push("/login");
    }
  }, [router]);

  const stats = [
    { title: "Total Customers", value: 15, color: "bg-blue-500" },
    { title: "Active Accounts", value: 12, color: "bg-green-500" },
    { title: "Suspended Accounts", value: 3, color: "bg-red-500" },
    { title: "Available Services", value: 10, color: "bg-purple-500" },
  ];

  const recentActivity = [
    {
      id: 1,
      text: "John Doe account information was updated",
      time: "Today, 9:20 AM",
    },
    {
      id: 2,
      text: "Battery Replacement service was added",
      time: "Today, 10:45 AM",
    },
    {
      id: 3,
      text: "Sarah Parker account was suspended",
      time: "Yesterday, 4:15 PM",
    },
    {
      id: 4,
      text: "Screen Repair pricing was updated",
      time: "Yesterday, 2:30 PM",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Overview
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Dashboard</h2>
          <p className="mt-2 text-sm text-slate-600">
            Monitor customer records, services, and operational activity.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/customers"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Manage Customers
          </Link>
          <Link
            href="/admin/services"
            className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Manage Services
          </Link>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className={`mb-4 h-3 w-16 rounded-full ${stat.color}`} />
            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
          <div className="mt-5 space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="font-medium text-slate-800">{activity.text}</p>
                <p className="mt-1 text-sm text-slate-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Quick Access</h3>
          <div className="mt-5 grid gap-4">
            <Link
              href="/admin/customers"
              className="rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Open Customer Management
            </Link>

            <Link
              href="/admin/services"
              className="rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Open Service Management
            </Link>

            <div className="rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
              Booking control center
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
              Technician operations
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
