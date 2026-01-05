import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Edit,
  UserCheck,
} from "lucide-react";

const UserPage = () => {
  // Sample user data - in real app, this would come from API
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      registeredDate: "2025-01-01",
      status: "pending",
      requestedCourses: ["CFA Level 1", "FRM Part 1"],
      assignedCourses: [],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 234 567 8901",
      registeredDate: "2025-01-02",
      status: "approved",
      requestedCourses: ["CFA Level 2"],
      assignedCourses: ["CFA Level 1", "CFA Level 2"],
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      phone: "+1 234 567 8902",
      registeredDate: "2024-12-28",
      status: "rejected",
      requestedCourses: ["FRM Part 2"],
      assignedCourses: [],
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      phone: "+1 234 567 8903",
      registeredDate: "2025-01-02",
      status: "pending",
      requestedCourses: ["CFA Level 3", "FRM Part 1"],
      assignedCourses: [],
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [availableCourses] = useState([
    "CFA Level 1",
    "CFA Level 2",
    "CFA Level 3",
    "FRM Part 1",
    "FRM Part 2",
  ]);
  const [selectedCoursesToAssign, setSelectedCoursesToAssign] = useState([]);

  const handleApprove = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "approved" } : user
      )
    );
  };

  const handleReject = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "rejected" } : user
      )
    );
  };

  const openAssignModal = (user) => {
    setSelectedUser(user);
    setSelectedCoursesToAssign([...user.assignedCourses]);
    setShowModal(true);
  };

  const handleCourseToggle = (course) => {
    setSelectedCoursesToAssign((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const saveAssignedCourses = () => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? { ...user, assignedCourses: selectedCoursesToAssign }
            : user
        )
      );
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending:
        "bg-yellow-100 text-yellow-800 border border-yellow-300 flex items-center gap-1",
      approved:
        "bg-green-100 text-green-800 border border-green-300 flex items-center gap-1",
      rejected:
        "bg-red-100 text-red-800 border border-red-300 flex items-center gap-1",
    };
    const icons = {
      pending: <Clock className="h-3 w-3" />,
      approved: <CheckCircle className="h-3 w-3" />,
      rejected: <XCircle className="h-3 w-3" />,
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const pendingCount = users.filter((u) => u.status === "pending").length;
  const approvedCount = users.filter((u) => u.status === "approved").length;
  const rejectedCount = users.filter((u) => u.status === "rejected").length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          User Management
        </h1>
        <p className="text-gray-600">
          Approve, reject, and manage user course assignments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-semibold">Pending</p>
              <p className="text-3xl font-bold text-yellow-800">
                {pendingCount}
              </p>
            </div>
            <Clock className="h-12 w-12 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-semibold">Approved</p>
              <p className="text-3xl font-bold text-green-800">
                {approvedCount}
              </p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-semibold">Rejected</p>
              <p className="text-3xl font-bold text-red-800">{rejectedCount}</p>
            </div>
            <XCircle className="h-12 w-12 text-red-400" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  User Info
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Registered
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Requested Courses
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Assigned Courses
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        {user.email}
                      </p>
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        {user.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {user.registeredDate}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {user.requestedCourses.map((course, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {user.assignedCourses.length > 0 ? (
                        user.assignedCourses.map((course, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                          >
                            {course}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">
                          No courses assigned
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {user.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(user.id)}
                            className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition"
                            title="Approve"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleReject(user.id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      {user.status === "approved" && (
                        <button
                          onClick={() => openAssignModal(user)}
                          className="p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition flex items-center gap-1 text-xs font-medium"
                          title="Assign Courses"
                        >
                          <Edit className="h-4 w-4" />
                          Assign
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Courses Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-indigo-600" />
                Assign Courses to {selectedUser.name}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Requested Courses:
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedUser.requestedCourses.map((course, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Select Courses to Assign:
              </h3>
              <div className="space-y-2">
                {availableCourses.map((course) => (
                  <label
                    key={course}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCoursesToAssign.includes(course)}
                      onChange={() => handleCourseToggle(course)}
                      className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-gray-700">{course}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={saveAssignedCourses}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center gap-2"
              >
                <UserCheck className="h-4 w-4" />
                Save Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
