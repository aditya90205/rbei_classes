import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle, CheckCircle, ArrowLeft, Clock } from "lucide-react";
import { useCourse } from "../context/CourseContext";

const LecturesPage = () => {
  const {
    selectedChapter,
    selectedCourse,
    selectedSubject,
    currentVideoIndex,
    setCurrentVideoIndex,
    markVideoCompleted,
    areAllVideosCompleted,
  } = useCourse();
  const navigate = useNavigate();
  const [completionMessage, setCompletionMessage] = useState("");

  if (!selectedChapter || !selectedCourse || !selectedSubject) {
    navigate("/courses");
    return null;
  }

  const currentVideo = selectedChapter.videos[currentVideoIndex];
  const totalVideos = selectedChapter.videos.length;
  const completedVideos = selectedChapter.videos.filter(
    (v) => v.completed
  ).length;
  const allCompleted = areAllVideosCompleted();

  const handleVideoComplete = () => {
    if (!currentVideo.completed) {
      markVideoCompleted(currentVideo.id);
    }

    // Move to next video if exists
    if (currentVideoIndex < totalVideos - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      // Show completion message
      setCompletionMessage(
        "All videos completed! Now take the test to progress."
      );
      setTimeout(() => {
        setCompletionMessage("");
      }, 3000);
    }
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < totalVideos - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const handleStartTest = () => {
    navigate("/course/test");
  };

  return (
    <div className="p-8">
      {/* Header Navigation */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/course/chapters")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Chapters
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {selectedChapter.title}
        </h1>
        <p className="text-gray-600">
          {selectedCourse.title} • {selectedSubject.title}
        </p>
      </div>

      {/* Completion Message */}
      {completionMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {completionMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-lg shadow-lg overflow-hidden">
            {/* Video Player */}
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src={currentVideo.url}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Title and Info */}
            <div className="bg-gray-800 text-white p-6">
              <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {currentVideo.duration}
                </span>
                <span>
                  Video {currentVideoIndex + 1} of {totalVideos}
                </span>
                {currentVideo.completed && (
                  <span className="flex items-center gap-1 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    Completed
                  </span>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-700 p-4 space-y-4">
              {/* Progress Bar */}
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{
                    width: `${((currentVideoIndex + 1) / totalVideos) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handlePreviousVideo}
                  disabled={currentVideoIndex === 0}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded transition"
                >
                  ← Previous
                </button>

                <button
                  onClick={handleVideoComplete}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition font-semibold"
                >
                  {currentVideo.completed ? "Completed ✓" : "Mark as Complete"}
                </button>

                <button
                  onClick={handleNextVideo}
                  disabled={currentVideoIndex === totalVideos - 1}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded transition"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Video Playlist */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Videos ({completedVideos}/{totalVideos})
          </h3>

          {/* Progress Stats */}
          <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">
                {completedVideos}/{totalVideos}
              </p>
              <p className="text-sm text-gray-600 mt-1">Videos Completed</p>
              <div className="mt-3 w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${(completedVideos / totalVideos) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Video List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {selectedChapter.videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-full text-left p-3 rounded-lg transition ${
                  index === currentVideoIndex
                    ? "bg-indigo-600 text-white"
                    : video.completed
                    ? "bg-green-50 text-gray-800 hover:bg-green-100"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1">
                    {video.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <PlayCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {video.title}
                    </p>
                    <p className="text-xs opacity-75">{video.duration}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Test Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleStartTest}
              className="w-full py-3 rounded-lg transition font-semibold bg-orange-600 hover:bg-orange-700 text-white"
            >
              📝 Start Chapter Test
            </button>
            {!allCompleted && (
              <p className="text-xs text-gray-600 mt-2 text-center">
                You can take the test anytime. Completing videos first is
                recommended.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturesPage;
