import React from "react";
import { Bell, Mail, Settings, Shield } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left side - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users, courses..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right side - Admin Menu */}
        <div className="flex items-center space-x-6 ml-8">
          {/* Settings */}
          <button className="text-gray-600 hover:text-gray-900 transition">
            <Settings className="h-6 w-6" />
          </button>

          {/* Notifications */}
          <button className="relative text-gray-600 hover:text-gray-900 transition">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>

          {/* Messages */}
          <button className="relative text-gray-600 hover:text-gray-900 transition">
            <Mail className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
              5
            </span>
          </button>

          {/* Admin Profile */}
          <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
