import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import StudentDashboard from "./pages/Student/Dashboard";
import InstructorDashboard from "./pages/Instructor/Dashboard";
import CreateCourse from "./pages/Instructor/CreateCourse";
import MyCourses from "./pages/Instructor/MyCourses";
import EnrolledCourses from "./pages/Student/EnrolledCourses";
import CoursePlayer from "./pages/Student/CoursePlayer";
import LiveRoom from "./pages/LiveRoom";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useSelector((state) => state.auth);
  if (!token || !user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<ProtectedRoute role="Student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/enrolled-courses" element={<ProtectedRoute role="Student"><EnrolledCourses /></ProtectedRoute>} />
        <Route path="/student/course-player/:courseId" element={<ProtectedRoute role="Student"><CoursePlayer /></ProtectedRoute>} />

        {/* Instructor Routes */}
        <Route path="/instructor/dashboard" element={<ProtectedRoute role="Instructor"><InstructorDashboard /></ProtectedRoute>} />
        <Route path="/instructor/create-course" element={<ProtectedRoute role="Instructor"><CreateCourse /></ProtectedRoute>} />
        <Route path="/instructor/my-courses" element={<ProtectedRoute role="Instructor"><MyCourses /></ProtectedRoute>} />

        {/* Live Room */}
        <Route path="/live/:roomId" element={<ProtectedRoute><LiveRoom /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
