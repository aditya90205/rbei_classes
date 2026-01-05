import React from "react";
import { Users, BookOpen, Video, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Users",
      value: "156",
      icon: <Users className="h-8 w-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Total Courses",
      value: "5",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      textColor: "text-purple-600",
    },
    {
      title: "Total Videos",
      value: "342",
      icon: <Video className="h-8 w-8" />,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Pending Approvals",
      value: "12",
      icon: <CheckCircle className="h-8 w-8" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      textColor: "text-orange-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "John Doe",
      action: "Registered for CFA Level 1",
      time: "2 hours ago",
      type: "registration",
    },
    {
      id: 2,
      user: "Admin",
      action: "Uploaded new video for FRM Part 1",
      time: "4 hours ago",
      type: "upload",
    },
    {
      id: 3,
      user: "Jane Smith",
      action: "Completed CFA Level 2",
      time: "1 day ago",
      type: "completion",
    },
    {
      id: 4,
      user: "Admin",
      action: "Approved 5 new users",
      time: "2 days ago",
      type: "approval",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.bgColor} rounded-lg shadow-lg p-6 border border-opacity-20`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-semibold ${stat.textColor} mb-1`}>
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div
                className={`bg-gradient-to-br ${stat.color} rounded-full p-3 text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/admin/users")}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg transition flex items-center justify-between"
            >
              <span className="font-medium">Manage Users</span>
              <Users className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate("/admin/courses")}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-3 rounded-lg transition flex items-center justify-between"
            >
              <span className="font-medium">Manage Courses</span>
              <BookOpen className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0"
              >
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    {activity.user}
                  </p>
                  <p className="text-xs text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Course Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            "CFA Level 1",
            "CFA Level 2",
            "CFA Level 3",
            "FRM Part 1",
            "FRM Part 2",
          ].map((course, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 hover:shadow-md transition cursor-pointer"
              onClick={() => navigate("/admin/courses")}
            >
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                {course}
              </h3>
              <div className="space-y-1 text-xs text-gray-600">
                <p>Students: {50}</p>
                <p>Videos: {20}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
