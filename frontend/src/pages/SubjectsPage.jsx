import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, ArrowLeft } from "lucide-react";
import { useCourse } from "../context/CourseContext";

const SubjectsPage = () => {
  const { selectedCourse, selectSubject } = useCourse();
  const navigate = useNavigate();

  if (!selectedCourse) {
    navigate("/courses");
    return null;
  }

  const handleSubjectSelect = (subjectId) => {
    selectSubject(subjectId);
    navigate("/course/chapters");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => {
            navigate("/courses");
          }}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Courses
        </button>

        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
          <BookOpen className="h-10 w-10 text-indigo-600" />
          {selectedCourse.title}
        </h1>
        <p className="text-gray-600 mt-2">{selectedCourse.description}</p>
      </div>

      {/* Course Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-indigo-50 rounded-lg p-4">
          <p className="text-sm text-indigo-600 font-semibold">Duration</p>
          <p className="text-2xl font-bold text-indigo-700">
            {selectedCourse.duration}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-semibold">Subjects</p>
          <p className="text-2xl font-bold text-blue-700">
            {selectedCourse.subjects.length}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-semibold">Students</p>
          <p className="text-2xl font-bold text-purple-700">
            {selectedCourse.students}
          </p>
        </div>
      </div>

      {/* Subjects List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6">
          <h2 className="text-2xl font-bold">Course Subjects</h2>
          <p className="text-indigo-100 mt-1">
            Select a subject to explore chapters and lessons
          </p>
        </div>

        <div className="divide-y">
          {selectedCourse.subjects.map((subject, index) => (
            <div
              key={subject.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {subject.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 ml-11">{subject.description}</p>
                  <p className="text-sm text-gray-500 ml-11 mt-2">
                    <span className="font-semibold text-indigo-600">
                      {subject.chapters.length}
                    </span>{" "}
                    chapters
                  </p>
                </div>

                <button
                  onClick={() => handleSubjectSelect(subject.id)}
                  className="ml-4 flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-semibold whitespace-nowrap"
                >
                  Start
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path Info */}
      <div className="mt-8 bg-indigo-50 rounded-lg p-6 border border-indigo-200">
        <h3 className="text-lg font-bold text-indigo-900 mb-3">
          📚 Learning Path
        </h3>
        <ul className="space-y-2 text-indigo-800">
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold">1.</span>
            <span>Select a subject from above to view its chapters</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold">2.</span>
            <span>Each chapter contains lecture videos to complete</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold">3.</span>
            <span>After all videos, take a chapter test to progress</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold">4.</span>
            <span>Score at least 60% to unlock the next chapter</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubjectsPage;
