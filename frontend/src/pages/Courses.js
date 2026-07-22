// Courses.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../redux/slices/courseSlice";

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((s) => s.course);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => { dispatch(fetchAllCourses()); }, [dispatch]);

  const categories = ["All", ...new Set(courses.map((c) => c.category))];
  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || c.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div style={{ padding: "2rem 5%" }}>
      <h1 className="section-title">All Courses</h1>
      <p className="section-subtitle">Explore our wide range of courses</p>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <input
          type="text" placeholder="Search courses..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.6rem 1rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-primary)", flex: 1, minWidth: "200px" }}
        />
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button key={cat} className={`btn ${category === cat ? "btn-primary" : "btn-outline"}`} onClick={() => setCategory(cat)}>{cat}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-secondary)", textAlign: "center" }}>Loading courses...</p>
      ) : (
        <div className="courses-grid">
          {filtered.map((course) => (
            <Link to={`/courses/${course._id}`} key={course._id} style={{ textDecoration: "none" }}>
              <div className="course-card">
                <img src={course.thumbnail} alt={course.title} onError={(e) => e.target.src = "https://via.placeholder.com/400x200?text=Course"} />
                <div className="course-card-body">
                  <span className="badge badge-info">{course.category}</span>
                  <h3 style={{ marginTop: "0.5rem" }}>{course.title}</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    By {course.instructor?.firstName} {course.instructor?.lastName}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                    <span className="course-price">₹{course.price}</span>
                    <span style={{ color: "#F6C90E", fontSize: "0.85rem" }}>⭐ {course.avgRating?.toFixed(1) || "New"}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && <p style={{ color: "var(--text-secondary)" }}>No courses found.</p>}
        </div>
      )}
    </div>
  );
};

export default Courses;
