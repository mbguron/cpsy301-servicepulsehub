"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function AppointmentBooking() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    device: "",
    date: "",
    time: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const services = [
    "Screen Repair",
    "Battery Replacement",
    "Water Damage Repair",
    "Charging Port Repair",
    "Speaker/Microphone Repair",
    "Camera Repair",
    "Software Issues",
    "Other",
  ];

  const devices = [
    "iPhone",
    "Samsung Galaxy",
    "Google Pixel",
    "OnePlus",
    "Motorola",
    "iPad",
    "Android Tablet",
    "Other",
  ];

  const BUSINESS_HOURS = {
    start: 9,
    end: 18,
    interval: 30,
  };

  const bookedSlots = {
    "2024-04-10": ["09:00", "09:30", "14:00", "14:30"],
    "2024-04-11": ["10:00", "11:00", "15:00"],
    "2024-04-12": ["09:00", "13:00", "16:00", "16:30"],
  };

  const today = new Date().toISOString().split("T")[0];

  const isTimeSlotAvailable = (date, time) => {
    const bookedForDate = bookedSlots[date] || [];
    return !bookedForDate.includes(time);
  };

  const availableTimeSlots = useMemo(() => {
    if (!formData.date) return [];

    const slots = [];
    const { start, end, interval } = BUSINESS_HOURS;
    const bookedForDate = bookedSlots[formData.date] || [];

    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeStr = `${String(hour).padStart(2, "0")}:${String(
          minute,
        ).padStart(2, "0")}`;

        if (!bookedForDate.includes(timeStr)) {
          let endHour = hour;
          let endMinute = minute + interval;

          if (endMinute >= 60) {
            endHour += 1;
            endMinute = 0;
          }

          const endTimeStr = `${String(endHour).padStart(2, "0")}:${String(
            endMinute,
          ).padStart(2, "0")}`;

          const timeRange = `${timeStr} - ${endTimeStr}`;

          slots.push({
            value: timeStr,
            label: timeRange,
            available: isTimeSlotAvailable(formData.date, timeStr),
          });
        }
      }
    }

    return slots;
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "date" && { time: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        device: "",
        date: "",
        time: "",
        description: "",
      });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Book Your Appointment
          </h1>
          <p className="text-gray-600">
            Schedule a convenient time for your device repair
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-12">
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Appointment Booked!
              </h2>

              <p className="text-gray-600 mb-6">
                Thank you for booking with ServicePulse Hub. We'll contact you
                soon to confirm your appointment.
              </p>

              <Link
                href="/dashboard"
                className="inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition"
              >
                Back to Dashboard
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b-2 border-orange-200">
                  Your Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      placeholder="Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
              </div>

              {/* Device & Service Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b-2 border-orange-200">
                  Device & Service
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="device"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Device Type *
                    </label>
                    <select
                      id="device"
                      name="device"
                      value={formData.device}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    >
                      <option value="">Select a device</option>
                      {devices.map((device) => (
                        <option key={device} value={device}>
                          {device}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Appointment Details Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b-2 border-orange-200">
                  Appointment Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={today}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Preferred Time *
                    </label>

                    {!formData.date ? (
                      <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                        Select a date first
                      </div>
                    ) : availableTimeSlots.length > 0 ? (
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={(e) => {
                          const selectedSlot = availableTimeSlots.find(
                            (slot) => slot.value === e.target.value,
                          );

                          if (selectedSlot && selectedSlot.available) {
                            handleChange(e);
                          }
                        }}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      >
                        <option value="">Select a time</option>
                        {availableTimeSlots.map((slot) => (
                          <option
                            key={slot.value}
                            value={slot.value}
                            disabled={!slot.available}
                          >
                            {slot.label}{" "}
                            {!slot.available ? "(Booked)" : "(Available)"}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="w-full px-4 py-3 border border-red-300 rounded-lg bg-red-50 text-red-600 font-medium">
                        No available slots for this date
                      </div>
                    )}
                  </div>
                </div>

                {formData.date && availableTimeSlots.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">
                        {availableTimeSlots.length} slots available
                      </span>{" "}
                      on{" "}
                      {new Date(formData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Business hours: 9:00 AM - 6:00 PM | 30-minute intervals
                    </p>
                  </div>
                )}
              </div>

              {/* Additional Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b-2 border-orange-200">
                  Additional Information
                </h3>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Describe the Issue (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none"
                    placeholder="Tell us more about the issue with your device..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formData.time}
                >
                  Book Appointment
                </button>
              </div>

              {/* Info Text */}
              <p className="text-center text-sm text-gray-500">
                * Required fields. We'll contact you shortly to confirm your
                appointment.
              </p>
            </form>
          )}
        </div>

        {/* Additional Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Service</h3>
            <p className="text-sm text-gray-600">
              Most repairs completed within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Warranty</h3>
            <p className="text-sm text-gray-600">
              All repairs backed by warranty
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Affordable</h3>
            <p className="text-sm text-gray-600">
              Competitive pricing on all services
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
