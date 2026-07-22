// EnrolledCourses.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserEnrolledCoursesAPI } from "../../services/profileAPI";
import Sidebar from "../../components/Layout/Sidebar";

const EnrolledCourses = () => {
  const { token } = useSelector((s) => s.auth);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getUserEnrolledCoursesAPI(token)
      .then((res) => setCourses(res.data.courses || []));
  }, [token]);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-content">
        <h1 className="section-title">My Enrolled Courses</h1>
        <div className="courses-grid">
          {courses.map((course) => (
            <Link to={`/student/course-player/${course._id}`} key={course._id} style={{ textDecoration: "none" }}>
              <div className="course-card">
                <img src={course.thumbnail} alt={course.title} onError={(e) => e.target.src = "https://via.placeholder.com/400x200?text=Course"} />
                <div className="course-card-body">
                  <h3>{course.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                    By {course.instructor?.firstName} {course.instructor?.lastName}
                  </p>
                  <span className="badge badge-success">Enrolled</span>
                </div>
              </div>
            </Link>
          ))}
          {courses.length === 0 && <p style={{ color: "var(--text-secondary)" }}>No enrolled courses yet.</p>}
        </div>
      </main>
    </div>
  );
};

export default EnrolledCourses;
