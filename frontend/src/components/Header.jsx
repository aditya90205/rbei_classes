import React from "react";
import { Bell, Mail, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left side - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Right side - User Menu */}
        <div className="flex items-center space-x-6 ml-8">
          {/* Notifications */}
          <button className="relative text-gray-600 hover:text-gray-900">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Messages */}
          <button className="relative text-gray-600 hover:text-gray-900">
            <Mail className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition">
              AD
            </div>
            <div>
              <p className="font-medium text-gray-800">Aditya</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
