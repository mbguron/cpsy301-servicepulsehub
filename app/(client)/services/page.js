"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const initialCustomers = [
  {
    id: 1001,
    firstName: "John",
    lastName: "Doe",
    phone: "403-555-1001",
    email: "john@example.com",
    status: "Active",
  },
  {
    id: 1002,
    firstName: "Jane",
    lastName: "Smith",
    phone: "403-555-1002",
    email: "jane@example.com",
    status: "Active",
  },
  {
    id: 1003,
    firstName: "Mike",
    lastName: "Johnson",
    phone: "403-555-1003",
    email: "mike@example.com",
    status: "Suspended",
  },
  {
    id: 1004,
    firstName: "Sarah",
    lastName: "Williams",
    phone: "403-555-1004",
    email: "sarah@example.com",
    status: "Active",
  },
  {
    id: 1005,
    firstName: "Tom",
    lastName: "Brown",
    phone: "403-555-1005",
    email: "tom@example.com",
    status: "Active",
  },
  {
    id: 1006,
    firstName: "Emily",
    lastName: "Parker",
    phone: "403-555-1006",
    email: "emily@example.com",
    status: "Suspended",
  },
  {
    id: 1007,
    firstName: "Liam",
    lastName: "Taylor",
    phone: "403-555-1007",
    email: "liam@example.com",
    status: "Active",
  },
  {
    id: 1008,
    firstName: "Olivia",
    lastName: "Martin",
    phone: "403-555-1008",
    email: "olivia@example.com",
    status: "Active",
  },
  {
    id: 1009,
    firstName: "Noah",
    lastName: "Anderson",
    phone: "403-555-1009",
    email: "noah@example.com",
    status: "Active",
  },
  {
    id: 1010,
    firstName: "Ava",
    lastName: "Thomas",
    phone: "403-555-1010",
    email: "ava@example.com",
    status: "Active",
  },
];

export default function AdminCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(
    initialCustomers[0].id,
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const fullName =
        `${customer.firstName} ${customer.lastName}`.toLowerCase();
      const term = searchTerm.toLowerCase();

      return (
        fullName.includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.phone.includes(searchTerm) ||
        String(customer.id).includes(searchTerm)
      );
    });
  }, [customers, searchTerm]);

  const selectedCustomer =
    customers.find((customer) => customer.id === selectedCustomerId) || null;

  function resetForm() {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });
    setEditingId(null);
    setShowAddForm(false);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateCustomer() {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      alert("Please fill in all customer fields.");
      return false;
    }

    const emailExists = customers.some(
      (customer) =>
        customer.email.toLowerCase() === formData.email.trim().toLowerCase() &&
        customer.id !== editingId,
    );

    if (emailExists) {
      alert("A customer with this email already exists.");
      return false;
    }

    return true;
  }

  function handleAddCustomer() {
    if (!validateCustomer()) return;

    const newCustomer = {
      id: Date.now(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      status: "Active",
    };

    const updated = [newCustomer, ...customers];
    setCustomers(updated);
    setSelectedCustomerId(newCustomer.id);
    resetForm();
  }

  function handleStartEdit(customer) {
    setEditingId(customer.id);
    setShowAddForm(true);
    setFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      email: customer.email,
    });
  }

  function handleSaveEdit() {
    if (!validateCustomer()) return;

    const updatedCustomers = customers.map((customer) =>
      customer.id === editingId
        ? {
            ...customer,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
          }
        : customer,
    );

    setCustomers(updatedCustomers);
    resetForm();
  }

  function handleDeleteCustomer(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );
    if (!confirmed) return;

    const remaining = customers.filter((customer) => customer.id !== id);
    setCustomers(remaining);

    if (selectedCustomerId === id && remaining.length > 0) {
      setSelectedCustomerId(remaining[0].id);
    }
  }

  function handleToggleStatus(id) {
    const updatedCustomers = customers.map((customer) =>
      customer.id === id
        ? {
            ...customer,
            status: customer.status === "Active" ? "Suspended" : "Active",
          }
        : customer,
    );

    setCustomers(updatedCustomers);
  }

  return (
<<<<<<< HEAD
    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Administration
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Customers</h1>
          <p className="mt-2 text-sm text-slate-600">
            Search, add, update, remove, and manage customer accounts.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Dashboard
          </Link>
          <button
            onClick={() => {
              setShowAddForm((prev) => !prev);
              setEditingId(null);
              setFormData({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
              });
            }}
            className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            {showAddForm ? "Close Form" : "Add Customer"}
          </button>
        </div>
      </div>

      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Customers</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {customers.length}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {
              customers.filter((customer) => customer.status === "Active")
                .length
            }
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Suspended</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {
              customers.filter((customer) => customer.status === "Suspended")
                .length
            }
          </p>
        </div>
      </div>

      {showAddForm ? (
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            {editingId ? "Edit Customer" : "Add New Customer"}
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleFormChange}
              placeholder="First Name"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleFormChange}
              placeholder="Last Name"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder="Phone"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Email"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={editingId ? handleSaveEdit : handleAddCustomer}
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              {editingId ? "Save Changes" : "Add Customer"}
            </button>
            <button
              onClick={resetForm}
              className="rounded-xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold text-slate-900">Customer List</h2>
            <input
              type="text"
              placeholder="Search by name, email, phone, or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 md:max-w-sm"
            />
          </div>

          <div className="space-y-3">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => setSelectedCustomerId(customer.id)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    selectedCustomerId === customer.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {customer.firstName} {customer.lastName}
                      </p>
                      <p className="text-sm text-slate-600">{customer.email}</p>
                    </div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
                No customers found.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Customer Details</h2>

          {selectedCustomer ? (
            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Customer ID</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedCustomer.id}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">First Name</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedCustomer.firstName}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Last Name</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedCustomer.lastName}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Phone</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedCustomer.phone}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Email</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedCustomer.email}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Account Status</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedCustomer.status}
                </p>
              </div>

              <div className="grid gap-3 pt-2">
                <button
                  onClick={() => handleStartEdit(selectedCustomer)}
                  className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Edit Customer
                </button>

                <button
                  onClick={() => handleToggleStatus(selectedCustomer.id)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
                    selectedCustomer.status === "Active"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {selectedCustomer.status === "Active"
                    ? "Suspend Customer"
                    : "Activate Customer"}
                </button>

                <button
                  onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                  className="rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  Delete Customer
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
              Select a customer to view details.
            </div>
          )}
        </section>
      </div>
    </main>
=======
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>
    </div>
>>>>>>> 1e1d6acfb12adb37284e29a4d0ddb853245ccc8f
  );
}
