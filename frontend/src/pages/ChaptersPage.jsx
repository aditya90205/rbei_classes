import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Lock,
  CheckCircle,
} from "lucide-react";
import { useCourse } from "../context/CourseContext";

const ChaptersPage = () => {
  const { selectedCourse, selectedSubject, selectChapter } = useCourse();
  const navigate = useNavigate();

  if (!selectedSubject || !selectedCourse) {
    navigate("/courses");
    return null;
  }

  const handleChapterSelect = (chapter) => {
    if (chapter.isLocked) {
      alert(
        "This chapter is locked. Please complete the previous chapter test first."
      );
      return;
    }
    selectChapter(chapter.id);
    navigate("/course/lectures");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/course/subjects")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Subjects
        </button>

        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
          <BookOpen className="h-10 w-10 text-indigo-600" />
          {selectedSubject.title}
        </h1>
        <p className="text-gray-600 mt-2">{selectedSubject.description}</p>
      </div>

      {/* Course & Subject Info */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8 border-l-4 border-indigo-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-indigo-600">Course:</span>{" "}
              {selectedCourse.title}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-indigo-600">Chapters:</span>{" "}
              {selectedSubject.chapters.length}
            </p>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-4">
        {selectedSubject.chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`rounded-lg shadow-md transition-all ${
              chapter.isLocked
                ? "bg-gray-50 border border-gray-200"
                : "bg-white border border-gray-200 hover:shadow-lg hover:border-indigo-300"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {/* Chapter Number Badge */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        chapter.isLocked
                          ? "bg-gray-300 text-gray-600"
                          : "bg-indigo-600 text-white"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Title and Lock Status */}
                    <div>
                      <h3
                        className={`text-lg font-bold ${
                          chapter.isLocked ? "text-gray-600" : "text-gray-800"
                        }`}
                      >
                        {chapter.title}
                        {chapter.testPassed && (
                          <span className="ml-2">
                            <CheckCircle className="inline-block h-5 w-5 text-green-500" />
                          </span>
                        )}
                      </h3>
                      {chapter.isLocked && (
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Lock className="h-3 w-3" />
                          Locked - Complete previous chapter first
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`ml-13 ${
                      chapter.isLocked ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    {chapter.description}
                  </p>

                  {/* Chapter Stats */}
                  <div className="ml-13 mt-3 flex items-center gap-4 text-sm text-gray-600">
                    <span>
                      <span className="font-semibold text-indigo-600">
                        {chapter.videos.length}
                      </span>{" "}
                      videos
                    </span>
                    <span>
                      <span className="font-semibold">
                        {chapter.videos.reduce(
                          (sum, v) => sum + parseInt(v.duration.split(":")[0]),
                          0
                        )}
                      </span>{" "}
                      mins total
                    </span>
                    {chapter.testPassed ? (
                      <span className="text-green-600 font-semibold">
                        ✓ Test Passed
                      </span>
                    ) : (
                      <span className="text-orange-600">📝 Test Required</span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleChapterSelect(chapter)}
                  disabled={chapter.isLocked}
                  className={`ml-4 flex items-center gap-2 px-6 py-2 rounded-lg transition font-semibold whitespace-nowrap ${
                    chapter.isLocked
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {chapter.isLocked ? (
                    <>
                      <Lock className="h-4 w-4" />
                      Locked
                    </>
                  ) : (
                    <>
                      Start Learning
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Info */}
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
        <h3 className="text-lg font-bold text-indigo-900 mb-3">
          🎯 Chapter Requirements
        </h3>
        <ul className="space-y-2 text-indigo-800">
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold">✓</span>
            <span>Watch all lecture videos in the chapter</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold">✓</span>
            <span>Take the 15-question MCQ test after completing videos</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold">✓</span>
            <span>Score at least 60% (9 out of 15 questions) to pass</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold">✓</span>
            <span>Pass the test to unlock the next chapter</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChaptersPage;
