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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>
    </div>
  );
}
