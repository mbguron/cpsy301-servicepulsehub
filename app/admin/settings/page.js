"use client";
import { useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    companyName: "ServicePulse Hub",
    email: "admin@servicepulsehub.com",
    phone: "(555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    businessHoursStart: "09:00",
    businessHoursEnd: "18:00",
    appointmentDuration: 30,
    notificationsEmail: true,
    notificationsSMS: true,
    maintenanceMode: false,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          ✓ Settings saved successfully!
        </div>
      )}

      {/* Company Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Company Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Business Hours
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opening Time
            </label>
            <input
              type="time"
              value={settings.businessHoursStart}
              onChange={(e) =>
                handleChange("businessHoursStart", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Closing Time
            </label>
            <input
              type="time"
              value={settings.businessHoursEnd}
              onChange={(e) => handleChange("businessHoursEnd", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Duration (minutes)
            </label>
            <select
              value={settings.appointmentDuration}
              onChange={(e) =>
                handleChange("appointmentDuration", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNotif"
              checked={settings.notificationsEmail}
              onChange={(e) =>
                handleChange("notificationsEmail", e.target.checked)
              }
              className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
            />
            <label htmlFor="emailNotif" className="ml-3 text-gray-700">
              Send email notifications for new appointments
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="smsNotif"
              checked={settings.notificationsSMS}
              onChange={(e) =>
                handleChange("notificationsSMS", e.target.checked)
              }
              className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
            />
            <label htmlFor="smsNotif" className="ml-3 text-gray-700">
              Send SMS notifications to customers
            </label>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">System</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Maintenance Mode</p>
              <p className="text-sm text-gray-600">
                Disable access for all users except admins
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) =>
                handleChange("maintenanceMode", e.target.checked)
              }
              className="w-6 h-6 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

  {/*    
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-200">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Danger Zone</h2>
          <p className="text-gray-600 mb-4">
            These actions cannot be undone. Proceed with caution.
          </p>
          <div className="space-y-2">
            <button className="block w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition">
              Delete All Data
            </button>
            <button className="block w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition">
              Reset to Defaults
            </button>
          </div>
        </div> */}

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-orange-600 transition"
        >
          Save Settings
        </button>
        <button className="bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-400 transition">
          Cancel
        </button>
      </div>
    </div>
  );
}
