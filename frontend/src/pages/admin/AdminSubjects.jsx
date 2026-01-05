import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, FolderOpen } from "lucide-react";
import { coursesData } from "../../data/coursesData";

const AdminSubjects = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const course = coursesData.find((c) => c.id === parseInt(courseId));

  if (!course) {
    navigate("/admin/courses");
    return null;
  }

  const handleSubjectClick = (subjectId) => {
    navigate(`/admin/courses/${courseId}/subjects/${subjectId}/chapters`);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin/courses")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Courses
        </button>

        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
        </div>
        <p className="text-gray-600">{course.description}</p>
      </div>

      {/* Course Info Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8 border border-indigo-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-indigo-600 font-semibold mb-1">
              Total Subjects
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {course.subjects.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-purple-600 font-semibold mb-1">
              Duration
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {course.duration}
            </p>
          </div>
          <div>
            <p className="text-sm text-blue-600 font-semibold mb-1">
              Students Enrolled
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {course.students}
            </p>
          </div>
        </div>
      </div>

      {/* Subjects List */}
      <div className="space-y-4">
        {course.subjects.map((subject, index) => {
          const totalChapters = subject.chapters.length;
          const totalVideos = subject.chapters.reduce(
            (sum, chapter) => sum + chapter.videos.length,
            0
          );

          return (
            <div
              key={subject.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => handleSubjectClick(subject.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Subject Number Badge */}
                    <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                      {index + 1}
                    </div>

                    {/* Subject Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                        {subject.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {subject.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FolderOpen className="h-4 w-4 text-indigo-500" />
                          <span>
                            <span className="font-semibold text-gray-800">
                              {totalChapters}
                            </span>{" "}
                            Chapters
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-purple-500" />
                          <span>
                            <span className="font-semibold text-gray-800">
                              {totalVideos}
                            </span>{" "}
                            Videos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Icon */}
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSubjects;
