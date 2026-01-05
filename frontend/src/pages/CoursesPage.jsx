import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Clock, ArrowRight } from "lucide-react";
import { useCourse } from "../context/CourseContext";

const CoursesPage = () => {
  const { courses, selectCourse } = useCourse();
  const navigate = useNavigate();

  const handleCourseSelect = (courseId) => {
    selectCourse(courseId);
    navigate("/course/subjects");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
          <BookOpen className="h-10 w-10 text-indigo-600" />
          Available Courses
        </h1>
        <p className="text-gray-600 mt-2">
          Choose a certification course and start your learning journey.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
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
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>

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
            Total Courses
          </h3>
          <p className="text-3xl font-bold text-indigo-600">{courses.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Total Subjects
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {courses.reduce((sum, c) => sum + c.subjects.length, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Total Chapters
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {courses.reduce(
              (sum, c) =>
                sum + c.subjects.reduce((s, sub) => s + sub.chapters.length, 0),
              0
            )}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Total Students
          </h3>
          <p className="text-3xl font-bold text-orange-600">
            {courses.reduce((sum, c) => sum + c.students, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
