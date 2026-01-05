import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  PlayCircle,
  Upload,
  Edit,
  Trash2,
  Plus,
  Eye,
  X,
} from "lucide-react";
import { coursesData } from "../../data/coursesData";

const AdminChapters = () => {
  const navigate = useNavigate();
  const { courseId, subjectId } = useParams();

  const course = coursesData.find((c) => c.id === parseInt(courseId));
  const subject = course?.subjects.find((s) => s.id === parseInt(subjectId));

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVideosModal, setShowVideosModal] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    duration: "",
    url: "",
  });
  const [videoToDelete, setVideoToDelete] = useState(null);

  if (!course || !subject) {
    navigate("/admin/courses");
    return null;
  }

  const handleUploadVideo = (chapter) => {
    setSelectedChapter(chapter);
    setShowUploadModal(true);
    setVideoData({ title: "", duration: "", url: "" });
  };

  const handleViewVideos = (chapter) => {
    setSelectedChapter(chapter);
    setShowVideosModal(true);
  };

  const handleSaveVideo = () => {
    // In real app, this would make an API call to save the video
    console.log("Uploading video:", {
      chapterId: selectedChapter.id,
      ...videoData,
    });
    alert(`Video "${videoData.title}" uploaded successfully!`);
    setShowUploadModal(false);
    setVideoData({ title: "", duration: "", url: "" });
  };

  const handleDeleteVideo = (videoId) => {
    // In real app, this would make an API call to delete the video
    if (window.confirm("Are you sure you want to delete this video?")) {
      console.log("Deleting video:", videoId);
      alert("Video deleted successfully!");
      // Here you would update the state/refetch data
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(`/admin/courses/${courseId}/subjects`)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Subjects
        </button>

        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {subject.title}
            </h1>
            <p className="text-sm text-gray-500">
              {course.title} • Chapter Management
            </p>
          </div>
        </div>
        <p className="text-gray-600">{subject.description}</p>
      </div>

      {/* Subject Stats */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8 border border-indigo-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-indigo-600 font-semibold mb-1">
              Total Chapters
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {subject.chapters.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-purple-600 font-semibold mb-1">
              Total Videos
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {subject.chapters.reduce((sum, ch) => sum + ch.videos.length, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-4">
        {subject.chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              {/* Chapter Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Chapter Number Badge - Always accessible for admin */}
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600">
                    {index + 1}
                  </div>

                  {/* Chapter Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {chapter.title}
                      </h3>
                      {chapter.isLocked && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Locked for Students
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {chapter.description}
                    </p>

                    {/* Video Count */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <PlayCircle className="h-4 w-4 text-indigo-500" />
                      <span>
                        <span className="font-semibold text-gray-800">
                          {chapter.videos.length}
                        </span>{" "}
                        video(s) uploaded
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {chapter.videos.length > 0 && (
                    <button
                      onClick={() => handleViewVideos(chapter)}
                      className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition text-sm font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      View Videos ({chapter.videos.length})
                    </button>
                  )}
                  <button
                    onClick={() => handleUploadVideo(chapter)}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Video Modal */}
      {showUploadModal && selectedChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Upload className="h-6 w-6 text-indigo-600" />
                Upload Video
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Chapter:{" "}
                <span className="font-semibold text-gray-800">
                  {selectedChapter.title}
                </span>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={videoData.title}
                    onChange={(e) =>
                      setVideoData({ ...videoData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter video title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (e.g., 15:30)
                  </label>
                  <input
                    type="text"
                    value={videoData.duration}
                    onChange={(e) =>
                      setVideoData({ ...videoData, duration: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="MM:SS"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL (YouTube Embed or Direct Link)
                  </label>
                  <input
                    type="text"
                    value={videoData.url}
                    onChange={(e) =>
                      setVideoData({ ...videoData, url: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs text-blue-800">
                    <strong>Note:</strong> For YouTube videos, use the embed URL
                    format:
                    <br />
                    <code className="bg-blue-100 px-2 py-1 rounded text-xs mt-1 inline-block">
                      https://www.youtube.com/embed/VIDEO_ID
                    </code>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVideo}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={
                  !videoData.title || !videoData.duration || !videoData.url
                }
              >
                <Upload className="h-4 w-4" />
                Upload Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View All Videos Modal */}
      {showVideosModal && selectedChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <PlayCircle className="h-6 w-6 text-indigo-600" />
                Videos in {selectedChapter.title}
              </h2>
              <button
                onClick={() => setShowVideosModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-semibold">
                    Total Videos
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {selectedChapter.videos.length}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowVideosModal(false);
                    handleUploadVideo(selectedChapter);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Add New Video
                </button>
              </div>
            </div>

            {/* Videos List - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              {selectedChapter.videos.length > 0 ? (
                <div className="space-y-3">
                  {selectedChapter.videos.map((video, idx) => (
                    <div
                      key={video.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-800 mb-1">
                              {video.title}
                            </h4>
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <PlayCircle className="h-3 w-3" />
                                Duration: {video.duration}
                              </span>
                            </div>
                            <div className="mt-2">
                              <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                              >
                                {video.url}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => {
                              // Edit functionality
                              console.log("Edit video:", video.id);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit Video"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteVideo(video.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete Video"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <PlayCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    No videos uploaded yet for this chapter
                  </p>
                  <button
                    onClick={() => {
                      setShowVideosModal(false);
                      handleUploadVideo(selectedChapter);
                    }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition mx-auto"
                  >
                    <Plus className="h-4 w-4" />
                    Upload First Video
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowVideosModal(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChapters;
