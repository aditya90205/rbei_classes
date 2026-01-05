import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import CoursesPage from "./pages/CoursesPage";
import DashboardPage from "./pages/DasboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SingupPage";
import SubjectsPage from "./pages/SubjectsPage";
import ChaptersPage from "./pages/ChaptersPage";
import LecturesPage from "./pages/LecturesPage";
import TestPage from "./pages/TestPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserPage from "./pages/admin/UserPage";
import AdminCourses from "./pages/admin/Courses";
import AdminSubjects from "./pages/admin/AdminSubjects";
import AdminChapters from "./pages/admin/AdminChapters";
import { CourseProvider } from "./context/CourseContext";

function App() {
  return (
    <Router>
      <CourseProvider>
        <Routes>
          {/* Auth Routes - without layout */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* User Dashboard Routes - with user layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/subjects" element={<SubjectsPage />} />
            <Route path="/course/chapters" element={<ChaptersPage />} />
            <Route path="/course/lectures" element={<LecturesPage />} />
            <Route path="/course/test" element={<TestPage />} />
          </Route>

          {/* Admin Routes - with admin layout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserPage />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route
              path="/admin/courses/:courseId/subjects"
              element={<AdminSubjects />}
            />
            <Route
              path="/admin/courses/:courseId/subjects/:subjectId/chapters"
              element={<AdminChapters />}
            />
          </Route>
        </Routes>
      </CourseProvider>
    </Router>
  );
}

export default App;
