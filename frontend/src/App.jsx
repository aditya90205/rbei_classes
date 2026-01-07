import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Router>
      <CourseProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* Public (unauthenticated) routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* Protected (authenticated) routes */}
          <Route element={<ProtectedRoute />}>
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
          </Route>
        </Routes>
      </CourseProvider>
    </Router>
  );
}

export default App;
