import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, ChevronRight, PlayCircle } from "lucide-react";
import { coursesData } from "../../data/coursesData";

const AdminCourses = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/admin/courses/${courseId}/subjects`);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Course Management
        </h1>
        <p className="text-gray-600">
          Manage courses, subjects, chapters, and upload video content
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesData.map((course) => {
          const totalSubjects = course.subjects.length;
          const totalChapters = course.subjects.reduce(
            (sum, subject) => sum + subject.chapters.length,
            0
          );
          const totalVideos = course.subjects.reduce(
            (sum, subject) =>
              sum +
              subject.chapters.reduce(
                (chSum, chapter) => chSum + chapter.videos.length,
                0
              ),
            0
          );

          return (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => handleCourseClick(course.id)}
            >
              {/* Course Header */}
              <div className={`${course.thumbnail} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="h-8 w-8" />
                  <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-sm opacity-90">{course.description}</p>
              </div>

              {/* Course Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-600 font-semibold mb-1">
                      Duration
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {course.duration}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-purple-600 font-semibold mb-1">
                      Students
                    </p>
                    <p className="text-lg font-bold text-gray-800 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students}
                    </p>
                  </div>
                </div>

                {/* Content Stats */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Subjects</span>
                    <span className="font-semibold text-gray-800">
                      {totalSubjects}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Chapters</span>
                    <span className="font-semibold text-gray-800">
                      {totalChapters}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <PlayCircle className="h-4 w-4" />
                      Videos
                    </span>
                    <span className="font-semibold text-gray-800">
                      {totalVideos}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center gap-2">
                  <span>Manage Course</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminCourses;
