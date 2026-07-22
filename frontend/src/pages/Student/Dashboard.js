// Student Dashboard
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserEnrolledCoursesAPI } from "../../services/profileAPI";
import Sidebar from "../../components/Layout/Sidebar";

const StudentDashboard = () => {
  const { user, token } = useSelector((s) => s.auth);
  const [enrolled, setEnrolled] = React.useState([]);

  useEffect(() => {
    getUserEnrolledCoursesAPI(token)
      .then((res) => setEnrolled(res.data.courses || []));
  }, [token]);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-content">
        <h1 className="section-title">Welcome back, {user?.firstName}! 👋</h1>
        <p className="section-subtitle">Continue your learning journey</p>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num">{enrolled.length}</div><div className="stat-label">Enrolled Courses</div></div>
          <div className="stat-card"><div className="stat-num">0</div><div className="stat-label">Completed</div></div>
          <div className="stat-card"><div className="stat-num">0</div><div className="stat-label">Certificates</div></div>
        </div>
        <h2 style={{ marginBottom: "1rem" }}>My Courses</h2>
        <div className="courses-grid">
          {enrolled.slice(0, 3).map((course) => (
            <Link to={`/student/course-player/${course._id}`} key={course._id} style={{ textDecoration: "none" }}>
              <div className="course-card">
                <img src={course.thumbnail} alt={course.title} onError={(e) => e.target.src = "https://via.placeholder.com/400x200?text=Course"} />
                <div className="course-card-body">
                  <h3>{course.title}</h3>
                  <p style={{ color: "var(--primary)", fontSize: "0.85rem" }}>Continue Learning →</p>
                </div>
              </div>
            </Link>
          ))}
          {enrolled.length === 0 && (
            <div style={{ color: "var(--text-secondary)" }}>
              <p>No courses yet. <Link to="/courses" style={{ color: "var(--primary)" }}>Browse courses</Link></p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
