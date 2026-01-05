import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCw, CheckCircle, AlertCircle } from "lucide-react";
import { useCourse } from "../context/CourseContext";

const TestPage = () => {
  const {
    selectedChapter,
    selectedCourse,
    selectedSubject,
    getTestQuestions,
    markChapterTestPassed,
  } = useCourse();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedChapter) {
      navigate("/courses");
      return;
    }

    // Get test questions
    let testQuestions = getTestQuestions(selectedChapter.id);

    // Shuffle questions
    testQuestions = shuffleArray([...testQuestions]);

    // Take only 15 questions
    testQuestions = testQuestions.slice(0, 15);

    // Shuffle options for each question
    testQuestions = testQuestions.map((q) => ({
      ...q,
      options: shuffleArray([...q.options]),
    }));

    setQuestions(testQuestions);
    setLoading(false);
  }, [selectedChapter, getTestQuestions, navigate]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleAnswerChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmitTest = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const percentage = Math.round((correctAnswers / questions.length) * 100);
    const passed = percentage >= 60;

    setTestResults({
      totalQuestions: questions.length,
      correctAnswers: correctAnswers,
      percentage: percentage,
      passed: passed,
      answers: answers,
    });

    setTestSubmitted(true);

    // Mark test as passed if score >= 60%
    if (passed && selectedCourse && selectedSubject) {
      markChapterTestPassed(
        selectedChapter.id,
        selectedCourse.id,
        selectedSubject.id
      );
    }
  };

  const handleRetakeTest = () => {
    setTestSubmitted(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTestResults(null);
    // Shuffle and reload questions
    let testQuestions = getTestQuestions(selectedChapter.id);
    testQuestions = shuffleArray([...testQuestions]);
    testQuestions = testQuestions.slice(0, 15);
    testQuestions = testQuestions.map((q) => ({
      ...q,
      options: shuffleArray([...q.options]),
    }));
    setQuestions(testQuestions);
  };

  const handleBackToLectures = () => {
    navigate("/course/lectures");
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading test questions...</p>
        </div>
      </div>
    );
  }

  if (!selectedChapter) {
    return null;
  }

  if (testSubmitted && testResults) {
    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-2xl mx-auto">
          {/* Results Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div
              className={`p-8 text-center text-white ${
                testResults.passed
                  ? "bg-gradient-to-r from-green-600 to-green-700"
                  : "bg-gradient-to-r from-red-600 to-red-700"
              }`}
            >
              <div className="flex justify-center mb-4">
                {testResults.passed ? (
                  <CheckCircle className="h-16 w-16 text-white opacity-90" />
                ) : (
                  <AlertCircle className="h-16 w-16 text-white opacity-90" />
                )}
              </div>
              <h1 className="text-4xl font-bold mb-2">
                {testResults.passed ? "Test Passed! 🎉" : "Test Failed"}
              </h1>
              <p className="text-lg opacity-90">
                {testResults.passed
                  ? "Great job! You can now proceed to the next chapter."
                  : "Don't worry, you can retake the test and improve your score."}
              </p>
            </div>

            {/* Results Details */}
            <div className="p-8">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-indigo-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600 text-sm font-semibold mb-1">
                    Score
                  </p>
                  <p className="text-4xl font-bold text-indigo-600">
                    {testResults.percentage}%
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600 text-sm font-semibold mb-1">
                    Correct
                  </p>
                  <p className="text-4xl font-bold text-blue-600">
                    {testResults.correctAnswers}/{testResults.totalQuestions}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600 text-sm font-semibold mb-1">
                    Passing Score
                  </p>
                  <p className="text-4xl font-bold text-orange-600">60%</p>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="mb-8 bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Answer Review
                </h3>
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const userAnswer = testResults.answers[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;

                    return (
                      <div
                        key={question.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          isCorrect
                            ? "bg-green-50 border-green-500"
                            : "bg-red-50 border-red-500"
                        }`}
                      >
                        <p className="font-semibold text-gray-800 mb-2">
                          Q{index + 1}. {question.question}
                        </p>
                        <div className="text-sm space-y-1">
                          <p>
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {userAnswer || "Not answered"}
                          </p>
                          {!isCorrect && (
                            <p className="text-green-700">
                              <span className="font-semibold">Correct:</span>{" "}
                              {question.correctAnswer}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleBackToLectures}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition font-semibold"
                >
                  <ArrowLeft className="inline-block h-5 w-5 mr-2" />
                  Back to Lectures
                </button>

                {!testResults.passed && (
                  <button
                    onClick={handleRetakeTest}
                    className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-semibold"
                  >
                    <RotateCw className="inline-block h-5 w-5 mr-2" />
                    Retake Test
                  </button>
                )}
              </div>

              {testResults.passed && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <p className="font-semibold">
                    ✓ Congratulations! Next chapter is now unlocked.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredQuestions = Object.keys(answers).length;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackToLectures}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Lectures
          </button>

          <h1 className="text-3xl font-bold text-gray-800">
            {selectedChapter.title} - Test
          </h1>
          <p className="text-gray-600 mt-1">
            Answer all 15 questions. Shuffle each time. Pass with 60% or more.
          </p>
        </div>

        {/* Test Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-indigo-600 h-1">
            <div
              className="bg-green-500 h-1 transition-all"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>

          {/* Question Counter */}
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              <p className="text-sm text-gray-600">
                Answered: {answeredQuestions}/{questions.length}
              </p>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-8">
            {/* Question */}
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition border-2 ${
                    answers[currentQuestion.id] === option
                      ? "bg-indigo-50 border-indigo-600"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={() =>
                      handleAnswerChange(currentQuestion.id, option)
                    }
                    className="h-5 w-5 text-indigo-600 cursor-pointer"
                  />
                  <span className="ml-3 text-gray-800">{option}</span>
                </label>
              ))}
            </div>

            {/* Question Navigation and Submit */}
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex - 1)
                }
                disabled={currentQuestionIndex === 0}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 rounded-lg transition font-semibold"
              >
                ← Previous
              </button>

              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={() =>
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                  }
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-semibold"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmitTest}
                  disabled={answeredQuestions < questions.length}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white rounded-lg transition font-semibold"
                >
                  {answeredQuestions < questions.length
                    ? `Submit Test (${answeredQuestions}/${questions.length} answered)`
                    : "Submit Test"}
                </button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Quick Navigation
            </p>
            <div className="flex flex-wrap gap-2">
              {questions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg transition font-semibold text-sm ${
                    index === currentQuestionIndex
                      ? "bg-indigo-600 text-white"
                      : answers[question.id]
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
