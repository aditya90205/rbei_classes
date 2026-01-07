import React, { useState, useEffect } from "react";
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
  Loader,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../constant";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableCourses] = useState([
    "cfa-level-1",
    "cfa-level-2",
    "cfa-level-3",
    "frm-part-1",
    "frm-part-2",
  ]);
  const [selectedCoursesToAssign, setSelectedCoursesToAssign] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/admin/users`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      setActionLoading(true);
      const response = await axios.patch(
        `${BACKEND_URL}/admin/${userId}/status`,
        { status: "approved" },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("User approved successfully");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error(error.response?.data?.message || "Failed to approve user");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (userId) => {
    try {
      setActionLoading(true);
      const response = await axios.patch(
        `${BACKEND_URL}/admin/${userId}/status`,
        { status: "rejected" },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("User rejected successfully");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
      toast.error(error.response?.data?.message || "Failed to reject user");
    } finally {
      setActionLoading(false);
    }
  };

  const openAssignModal = (user) => {
    setSelectedUser(user);
    setSelectedCoursesToAssign([...(user.course || [])]);
    setShowModal(true);
  };

  const handleCourseToggle = (course) => {
    setSelectedCoursesToAssign((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const saveAssignedCourses = async () => {
    if (selectedUser) {
      try {
        setActionLoading(true);
        const response = await axios.patch(
          `${BACKEND_URL}/admin/${selectedUser._id}/course`,
          { course: selectedCoursesToAssign },
          { withCredentials: true }
        );

        if (response.data.success) {
          toast.success("Courses assigned successfully");
          setShowModal(false);
          setSelectedUser(null);
          fetchUsers();
        }
      } catch (error) {
        console.error("Error assigning courses:", error);
        toast.error(
          error.response?.data?.message || "Failed to assign courses"
        );
      } finally {
        setActionLoading(false);
      }
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCourseName = (courseId) => {
    const courseMap = {
      "cfa-level-1": "CFA Level 1",
      "cfa-level-2": "CFA Level 2",
      "cfa-level-3": "CFA Level 3",
      "frm-part-1": "FRM Part 1",
      "frm-part-2": "FRM Part 2",
    };
    return courseMap[courseId] || courseId;
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
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader className="h-8 w-8 text-indigo-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading users...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
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
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                          {user.fullname
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {user.fullname}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {user._id.slice(-6)}
                          </p>
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
                          {user.phoneNumber}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {formatDate(user.createdAt)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {user.course && user.course.length > 0 ? (
                          user.course.map((course, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                            >
                              {formatCourseName(course)}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">
                            No courses requested
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {user.course && user.course.length > 0 ? (
                          user.course.map((course, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                            >
                              {formatCourseName(course)}
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
                              onClick={() => handleApprove(user._id)}
                              disabled={actionLoading}
                              className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition disabled:opacity-50"
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleReject(user._id)}
                              disabled={actionLoading}
                              className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition disabled:opacity-50"
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
        )}
      </div>

      {/* Assign Courses Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-indigo-600" />
                Assign Courses to {selectedUser.fullname}
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
                {selectedUser.course && selectedUser.course.length > 0 ? (
                  selectedUser.course.map((course, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                    >
                      {formatCourseName(course)}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">
                    No courses requested
                  </span>
                )}
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
                    <span className="ml-3 text-gray-700">
                      {formatCourseName(course)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={actionLoading}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={saveAssignedCourses}
                disabled={actionLoading}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center gap-2 disabled:opacity-50"
              >
                <UserCheck className="h-4 w-4" />
                {actionLoading ? "Saving..." : "Save Assignment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
