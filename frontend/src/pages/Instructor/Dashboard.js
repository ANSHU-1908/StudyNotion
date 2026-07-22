// Instructor Dashboard
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getInstructorCoursesAPI } from "../../services/courseAPI";
import Sidebar from "../../components/Layout/Sidebar";

const InstructorDashboard = () => {
  const { user, token } = useSelector((s) => s.auth);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getInstructorCoursesAPI(token)
      .then((res) => setCourses(res.data.courses || []));
  }, [token]);

  const totalStudents = courses.reduce((sum, c) => sum + (c.studentsEnrolled?.length || 0), 0);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-content">
        <h1 className="section-title">Instructor Dashboard</h1>
        <p className="section-subtitle">Welcome back, {user?.firstName}! 🎓</p>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num">{courses.length}</div><div className="stat-label">Total Courses</div></div>
          <div className="stat-card"><div className="stat-num">{totalStudents}</div><div className="stat-label">Total Students</div></div>
          <div className="stat-card"><div className="stat-num">{courses.filter((c) => c.status === "Published").length}</div><div className="stat-label">Published</div></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2>My Courses</h2>
          <Link to="/instructor/create-course" className="btn btn-primary">+ Create New Course</Link>
        </div>
        <div className="table-container">
          <table>
            <thead><tr><th>Course</th><th>Students</th><th>Status</th><th>Price</th></tr></thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id}>
                  <td style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <img src={c.thumbnail} alt={c.title} style={{ width: 48, height: 36, objectFit: "cover", borderRadius: 4 }} onError={(e) => e.target.src = "https://via.placeholder.com/48x36"} />
                    {c.title}
                  </td>
                  <td>{c.studentsEnrolled?.length || 0}</td>
                  <td><span className={`badge ${c.status === "Published" ? "badge-success" : "badge-warning"}`}>{c.status}</span></td>
                  <td>₹{c.price}</td>
                </tr>
              ))}
              {courses.length === 0 && <tr><td colSpan={4} style={{ textAlign: "center", color: "var(--text-secondary)" }}>No courses yet. Create one!</td></tr>}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
