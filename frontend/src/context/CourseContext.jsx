import React, { createContext, useState, useContext, useCallback } from "react";
import { coursesData, testQuestionsData } from "../data/coursesData";

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

  // Select a chapter
  const selectChapter = useCallback(
    (chapterId) => {
      if (!selectedSubject) return;
      const chapter = selectedSubject.chapters.find((c) => c.id === chapterId);
      setSelectedChapter(chapter);
      setCurrentVideoIndex(0);
    },
    [selectedSubject]
  );

  // Mark video as completed
  const markVideoCompleted = useCallback((videoId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => ({
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
      }))
    );
  }, []);

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
