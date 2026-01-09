import React, { createContext, useState, useContext, useCallback } from "react";
import { coursesData, testQuestionsData } from "../data/coursesData";

const API_BASE = "http://localhost:3000/api/v1"; // Backend base URL

// Create the context
const CourseContext = createContext();

// Provider component
export const CourseProvider = ({ children }) => {
  // Ensure the first chapter of every subject is always unlocked
  const normalizeCourses = useCallback((data) => {
    return data.map((course) => ({
      ...course,
      subjects: course.subjects.map((subject) => ({
        ...subject,
        chapters: subject.chapters.map((chapter, index) =>
          index === 0 ? { ...chapter, isLocked: false } : chapter
        ),
      })),
    }));
  }, []);

  const [courses, setCourses] = useState(() => normalizeCourses(coursesData));
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userProgress, setUserProgress] = useState({});

  const mapVideosFromApi = useCallback((videosFromApi) => {
    return (videosFromApi || []).map((video) => ({
      id: video._id,
      title: video.videoTitle,
      duration: video.videoDuration,
      url: video.videoUrl,
      lectureOrder: video.lectureOrder,
      completed: false,
    }));
  }, []);

  const fetchVideosForChapter = useCallback(
    async (courseId, subjectId, chapterId) => {
      try {
        const response = await fetch(
          `${API_BASE}/user/videos/${courseId}/${subjectId}/${chapterId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chapter videos");
        }

        const data = await response.json();
        return mapVideosFromApi(data.data);
      } catch (error) {
        console.error("Error fetching chapter videos:", error);
        return [];
      }
    },
    [mapVideosFromApi]
  );

  // Select a course
  const selectCourse = useCallback(
    (courseId) => {
      const course = courses.find((c) => c.id === courseId);
      setSelectedCourse(course);
      setSelectedSubject(null);
      setSelectedChapter(null);
    },
    [courses]
  );

  // Select a subject
  const selectSubject = useCallback(
    (subjectId) => {
      if (!selectedCourse) return;
      const subject = selectedCourse.subjects.find((s) => s.id === subjectId);
      setSelectedSubject(subject);
      setSelectedChapter(null);
    },
    [selectedCourse]
  );

  // Select a chapter and hydrate it with videos from the backend
  const selectChapter = useCallback(
    async (chapterId) => {
      if (!selectedSubject || !selectedCourse) return;

      const videos = await fetchVideosForChapter(
        selectedCourse.id,
        selectedSubject.id,
        chapterId
      );

      let nextSelectedCourse = null;
      let nextSelectedSubject = null;
      let nextSelectedChapter = null;

      setCourses((prevCourses) => {
        const updatedCourses = prevCourses.map((course) => {
          if (course.id !== selectedCourse.id) return course;

          const updatedSubjects = course.subjects.map((subject) => {
            if (subject.id !== selectedSubject.id) return subject;

            const updatedChapters = subject.chapters.map((chapter) =>
              chapter.id === chapterId ? { ...chapter, videos } : chapter
            );

            return { ...subject, chapters: updatedChapters };
          });

          return { ...course, subjects: updatedSubjects };
        });

        nextSelectedCourse = updatedCourses.find(
          (c) => c.id === selectedCourse.id
        );
        nextSelectedSubject = nextSelectedCourse?.subjects.find(
          (s) => s.id === selectedSubject.id
        );
        nextSelectedChapter = nextSelectedSubject?.chapters.find(
          (c) => c.id === chapterId
        );

        return updatedCourses;
      });

      if (nextSelectedCourse) setSelectedCourse(nextSelectedCourse);
      if (nextSelectedSubject) setSelectedSubject(nextSelectedSubject);
      if (nextSelectedChapter) setSelectedChapter(nextSelectedChapter);
      setCurrentVideoIndex(0);
    },
    [fetchVideosForChapter, selectedCourse, selectedSubject]
  );

  // Mark video as completed
  const markVideoCompleted = useCallback(
    (videoId) => {
      let nextSelectedCourse = null;
      let nextSelectedSubject = null;
      let nextSelectedChapter = null;

      setCourses((prevCourses) => {
        const updatedCourses = prevCourses.map((course) => ({
          ...course,
          subjects: course.subjects.map((subject) => ({
            ...subject,
            chapters: subject.chapters.map((chapter) => ({
              ...chapter,
              videos: chapter.videos.map((video) =>
                video.id === videoId ? { ...video, completed: true } : video
              ),
            })),
          })),
        }));

        if (selectedCourse) {
          nextSelectedCourse = updatedCourses.find(
            (c) => c.id === selectedCourse.id
          );
          nextSelectedSubject = nextSelectedCourse?.subjects.find(
            (s) => selectedSubject && s.id === selectedSubject.id
          );
          nextSelectedChapter = nextSelectedSubject?.chapters.find(
            (c) => selectedChapter && c.id === selectedChapter.id
          );
        }

        return updatedCourses;
      });

      if (nextSelectedCourse) setSelectedCourse(nextSelectedCourse);
      if (nextSelectedSubject) setSelectedSubject(nextSelectedSubject);
      if (nextSelectedChapter) setSelectedChapter(nextSelectedChapter);
    },
    [selectedChapter, selectedCourse, selectedSubject]
  );

  // Check if all videos in chapter are completed
  const areAllVideosCompleted = useCallback(() => {
    if (!selectedChapter) return false;
    return selectedChapter.videos.every((video) => video.completed);
  }, [selectedChapter]);

  // Mark chapter test as passed
  const markChapterTestPassed = useCallback(
    (chapterId, courseId, subjectId) => {
      setCourses((prevCourses) =>
        normalizeCourses(
          prevCourses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  subjects: course.subjects.map((subject) =>
                    subject.id === subjectId
                      ? {
                          ...subject,
                          chapters: subject.chapters.map((chapter, idx) => {
                            const passedIndex = subject.chapters.findIndex(
                              (c) => c.id === chapterId
                            );

                            if (chapter.id === chapterId) {
                              // Mark current chapter test as passed
                              return {
                                ...chapter,
                                testPassed: true,
                              };
                            }

                            // Unlock the next chapter after a pass
                            if (idx === passedIndex + 1) {
                              return { ...chapter, isLocked: false };
                            }

                            return chapter;
                          }),
                        }
                      : subject
                  ),
                }
              : course
          )
        )
      );
    },
    [normalizeCourses]
  );

  // Get test questions for a chapter
  const getTestQuestions = useCallback((chapterId) => {
    return testQuestionsData[chapterId] || [];
  }, []);

  // Reset course progress
  const resetProgress = useCallback(() => {
    setSelectedCourse(null);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setCurrentVideoIndex(0);
  }, []);

  const value = {
    courses,
    selectedCourse,
    selectedSubject,
    selectedChapter,
    currentVideoIndex,
    selectCourse,
    selectSubject,
    selectChapter,
    setCurrentVideoIndex,
    markVideoCompleted,
    areAllVideosCompleted,
    markChapterTestPassed,
    getTestQuestions,
    resetProgress,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

// Custom hook to use the context
export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
