import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Clock,
  ArrowRight,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useCourse } from "../context/CourseContext";

const CoursesPage = () => {
  const { courses, selectCourse } = useCourse();
  const navigate = useNavigate();
  const [assignedCourseIds, setAssignedCourseIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's assigned courses
  useEffect(() => {
    const fetchAssignedCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "http://localhost:3000/api/v1/user/courses",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch assigned courses");
        }

        const data = await response.json();
        setAssignedCourseIds(data.data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching assigned courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedCourses();
  }, []);

  // Filter courses to show only assigned ones
  const assignedCourses = courses.filter((course) =>
    assignedCourseIds.includes(course.key)
  );

  const handleCourseSelect = (courseId) => {
    selectCourse(courseId);
    navigate("/course/subjects");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
          <BookOpen className="h-10 w-10 text-indigo-600" />
          Your Assigned Courses
        </h1>
        <p className="text-gray-600 mt-2">
          Choose a certification course and start your learning journey.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Loading your assigned courses...
            </p>
          </div>
        </div>
      ) : assignedCourses.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Courses Assigned
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            You haven't been assigned any courses yet. Please contact your
            administrator to get started.
          </p>
        </div>
      ) : (
        <>
          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
              >
                {/* Thumbnail */}
                <div
                  className={`${course.thumbnail} h-48 flex items-center justify-center relative overflow-hidden`}
                >
                  <BookOpen className="h-20 w-20 text-white opacity-80" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {course.description}
                  </p>

                  {/* Meta Information */}
                  <div className="space-y-2 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-600" />
                      <span>{course.students} students</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-indigo-700">
                      <span className="font-semibold">
                        {course.subjects.length}
                      </span>{" "}
                      subjects • Multiple chapters per subject
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleCourseSelect(course.id)}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition font-semibold"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Your Courses
              </h3>
              <p className="text-3xl font-bold text-indigo-600">
                {assignedCourses.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Total Subjects
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {assignedCourses.reduce((sum, c) => sum + c.subjects.length, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Total Chapters
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                {assignedCourses.reduce(
                  (sum, c) =>
                    sum +
                    c.subjects.reduce((s, sub) => s + sub.chapters.length, 0),
                  0
                )}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Subjects In Course
              </h3>
              <p className="text-3xl font-bold text-orange-600">
                {Math.round(
                  assignedCourses.reduce(
                    (sum, c) => sum + c.subjects.length,
                    0
                  ) / (assignedCourses.length || 1)
                )}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesPage;
