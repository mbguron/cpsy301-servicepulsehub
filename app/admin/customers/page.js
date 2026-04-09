"use client";
import { useState } from "react";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "(123) 456-7890",
      bookings: 5,
      totalSpent: "$399.95",
      joinDate: "Jan 15, 2026",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(234) 567-8901",
      bookings: 3,
      totalSpent: "$199.97",
      joinDate: "Feb 20, 2026",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "(345) 678-9012",
      bookings: 8,
      totalSpent: "$629.92",
      joinDate: "Dec 10, 2025",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "(456) 789-0123",
      bookings: 2,
      totalSpent: "$129.98",
      joinDate: "Mar 5, 2026",
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom@example.com",
      phone: "(567) 890-1234",
      bookings: 6,
      totalSpent: "$479.94",
      joinDate: "Jan 25, 2026",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "bookings") return b.bookings - a.bookings;
    if (sortBy === "spent")
      return parseFloat(b.totalSpent) - parseFloat(a.totalSpent);
    return 0;
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition">
          Export List
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Total Customers</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {customers.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {customers.reduce((sum, c) => sum + parseInt(c.bookings), 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            $
            {customers
              .reduce((sum, c) => sum + parseFloat(c.totalSpent.slice(1)), 0)
              .toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Avg. Bookings</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {(
              customers.reduce((sum, c) => sum + parseInt(c.bookings), 0) /
              customers.length
            ).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="bookings">Total Bookings</option>
              <option value="spent">Total Spent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Phone
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Bookings
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Total Spent
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Join Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCustomers.length > 0 ? (
                sortedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {customer.name}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {customer.email}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {customer.phone}
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {customer.bookings}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {customer.totalSpent}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {customer.joinDate}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm">
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
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
                  <td colSpan="7" className="py-8 text-center text-gray-600">
                    No customers found
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
