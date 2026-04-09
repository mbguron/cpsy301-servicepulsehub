"use client";
import { useState } from "react";

export default function AdminServices() {
  const [services, setServices] = useState([
    { id: 1, name: "Screen Repair", price: "$79.99", category: "Repair" },
    {
      id: 2,
      name: "Battery Replacement",
      price: "$49.99",
      category: "Replacement",
    },
    {
      id: 3,
      name: "Water Damage Repair",
      price: "$129.99",
      category: "Repair",
    },
    {
      id: 4,
      name: "Charging Port Repair",
      price: "$39.99",
      category: "Repair",
    },
    {
      id: 5,
      name: "Speaker/Microphone Repair",
      price: "$49.99",
      category: "Repair",
    },
    { id: 6, name: "Camera Repair", price: "$89.99", category: "Repair" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Repair",
  });

  const handleAddService = () => {
    if (formData.name && formData.price) {
      setServices([...services, { id: services.length + 1, ...formData }]);
      setFormData({ name: "", price: "", category: "Repair" });
      setShowForm(false);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition"
        >
          + Add Service
        </button>
      </div>

      {/* Add Service Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Add New Service
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Screen Repair"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="e.g., $79.99"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>Repair</option>
                <option>Replacement</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddService}
              className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition"
            >
              Add Service
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{service.category}</p>
              </div>
              <span className="text-2xl font-bold text-orange-500">
                {service.price}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-sm font-medium">
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
