import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Target,
  Award,
  TrendingUp,
  Play,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useCourse } from "../context/CourseContext";

const DashboardPage = () => {
  const { courses, selectCourse } = useCourse();
  const navigate = useNavigate();

  // Calculate user stats
  const totalCoursesAvailable = courses.length;
  const enrolledCourses = courses.slice(0, 2); // User is enrolled in first 2 courses
  const totalChaptersAvailable = courses.reduce(
    (sum, c) => sum + c.subjects.reduce((s, sub) => s + sub.chapters.length, 0),
    0
  );
  const chaptersCompleted = Math.floor(totalChaptersAvailable * 0.35); // 35% completed
  const testsCompleted = Math.floor(chaptersCompleted * 0.8); // 80% of completed chapters have tests passed
  const overallProgress = Math.round(
    (chaptersCompleted / totalChaptersAvailable) * 100
  );

  const handleCourseClick = (courseId) => {
    selectCourse(courseId);
    navigate("/course/subjects");
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome Back! 👋</h1>
        <p className="text-gray-600 mt-2">
          Continue your learning journey and master financial certifications.
        </p>
      </div>

      {/* User Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Courses Enrolled
              </h3>
              <p className="text-3xl font-bold text-indigo-600">
                {enrolledCourses.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                of {totalCoursesAvailable} available
              </p>
            </div>
            <BookOpen className="h-12 w-12 text-indigo-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Chapters Completed
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {chaptersCompleted}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                of {totalChaptersAvailable} chapters
              </p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Tests Passed
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {testsCompleted}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((testsCompleted / totalChaptersAvailable) * 100)}%
                pass rate
              </p>
            </div>
            <Award className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Overall Progress
              </h3>
              <p className="text-3xl font-bold text-orange-600">
                {overallProgress}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Keep it up!</p>
            </div>
            <TrendingUp className="h-12 w-12 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Enrolled Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Your Enrolled Courses
              </h2>
              <p className="text-indigo-100 mt-1">
                Continue learning with your active courses
              </p>
            </div>

            {/* Courses List */}
            <div className="divide-y">
              {enrolledCourses.map((course) => {
                const courseChapters = course.subjects.reduce(
                  (sum, sub) => sum + sub.chapters.length,
                  0
                );
                const completedInCourse = Math.floor(courseChapters * 0.4);
                const progressPercent = Math.round(
                  (completedInCourse / courseChapters) * 100
                );

                return (
                  <div
                    key={course.id}
                    className="p-6 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {course.subjects.length} subjects • {courseChapters}{" "}
                          chapters
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          progressPercent >= 80
                            ? "bg-green-100 text-green-700"
                            : progressPercent >= 50
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {progressPercent}% Done
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {completedInCourse} of {courseChapters} chapters
                        completed
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleCourseClick(course.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-semibold text-sm"
                    >
                      <Play className="h-4 w-4" />
                      Continue Learning
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learning Streak & Goals */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-8 w-8 text-orange-500" />
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">
                    Learning Streak
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">7 days 🔥</p>
                </div>
              </div>
              <p className="text-xs text-gray-600">Keep it going!</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">
                    Monthly Goal
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">3 chapters</p>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                {chaptersCompleted} completed this month
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar - Recent Activity & Recommendations */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
              <h3 className="text-lg font-bold">Recent Activity</h3>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              <div className="pb-3 border-b hover:bg-gray-50 p-2 rounded transition">
                <p className="text-sm font-medium text-gray-800">
                  ✓ Completed Chapter: Code of Ethics
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="pb-3 border-b hover:bg-gray-50 p-2 rounded transition">
                <p className="text-sm font-medium text-gray-800">
                  ✓ Test Passed: 85%
                </p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
              <div className="pb-3 border-b hover:bg-gray-50 p-2 rounded transition">
                <p className="text-sm font-medium text-gray-800">
                  📺 Watched 3 Videos
                </p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
              <div className="pb-3 border-b hover:bg-gray-50 p-2 rounded transition">
                <p className="text-sm font-medium text-gray-800">
                  🎯 Chapter Started: GIPS Standards
                </p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
              <div className="hover:bg-gray-50 p-2 rounded transition">
                <p className="text-sm font-medium text-gray-800">
                  ✓ Enrolled: CFA Level 2
                </p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
          </div>

          {/* Next Chapter Recommendation */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow-md p-6 border border-indigo-200">
            <h3 className="text-lg font-bold text-indigo-900 mb-3">
              📚 Next Up
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-indigo-800">
                  CFA Level 1
                </p>
                <p className="text-xs text-indigo-700 mt-1">
                  Global Investment Performance Standards
                </p>
              </div>
              <button
                onClick={() => handleCourseClick(1)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-semibold text-sm"
              >
                Start Chapter
              </button>
            </div>
          </div>

          {/* Learning Tips */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              💡 Tips for Success
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">✓</span>
                <span>Study at the same time daily</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">✓</span>
                <span>Complete all videos before the test</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">✓</span>
                <span>Aim for 60%+ on chapter tests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">✓</span>
                <span>Review failed test questions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
