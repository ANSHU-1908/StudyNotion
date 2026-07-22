import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../redux/slices/courseSlice";
import { FaGraduationCap, FaChalkboardTeacher, FaGlobe, FaCertificate } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.course);

  useEffect(() => { 
    dispatch(fetchAllCourses()); 
  }, [dispatch]);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero" style={{ padding: "8rem 5% 6rem", minHeight: "80vh", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
            Master Your Future With <span style={{ color: "var(--primary)" }}>StudyNotion</span>
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "2.5rem", lineHeight: 1.6 }}>
            Empowering your learning journey with world-class instructors, interactive live classes, and industry-relevant courses. Build the skills you need today.
          </p>
          <div className="hero-btns" style={{ justifyContent: "center", gap: "1.5rem" }}>
            <Link to="/courses" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>Explore Courses</Link>
            <Link to="/signup" className="btn btn-outline" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>Join as Instructor</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us (Value Proposition) */}
      <section style={{ padding: "5rem 5%", background: "var(--bg-card)" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem", maxWidth: "600px", marginInline: "auto" }}>
          <h2 className="section-title">Why Learn With Us?</h2>
          <p className="section-subtitle">We provide everything you need to succeed in your career and personal growth.</p>
        </div>
        <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="stat-card" style={{ padding: "2rem" }}>
            <FaGraduationCap size={40} color="var(--primary)" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Learn Anywhere</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>Access your courses on any device, anytime, and learn at your own pace.</p>
          </div>
          <div className="stat-card" style={{ padding: "2rem" }}>
            <FaChalkboardTeacher size={40} color="var(--primary)" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Expert Instructors</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>Learn from industry professionals with real-world experience.</p>
          </div>
          <div className="stat-card" style={{ padding: "2rem" }}>
            <FaGlobe size={40} color="var(--primary)" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Global Community</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>Connect with peers worldwide, share ideas, and grow together.</p>
          </div>
          <div className="stat-card" style={{ padding: "2rem" }}>
            <FaCertificate size={40} color="var(--primary)" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Earn Certificates</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>Showcase your skills with completion certificates for every course.</p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section style={{ padding: "5rem 5%", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>Featured Courses</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>Start learning something new today.</p>
        </div>
        
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>Loading amazing courses...</div>
        ) : (
          <>
            <div className="courses-grid" style={{ padding: 0, gap: "2rem" }}>
              {courses.slice(0, 6).map((course) => (
                <Link to={`/courses/${course._id}`} key={course._id} style={{ textDecoration: "none", display: "block" }}>
                  <div className="course-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      style={{ height: "180px", objectFit: "cover" }}
                      onError={(e) => e.target.src = "https://via.placeholder.com/400x225?text=Course"} 
                    />
                    <div className="course-card-body" style={{ flex: 1, display: "flex", flexDirection: "column", padding: "1.5rem" }}>
                      <div style={{ marginBottom: "0.75rem" }}>
                        <span className="badge badge-info">{course.category?.name || course.category || "General"}</span>
                      </div>
                      <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-primary)", lineHeight: 1.4 }}>{course.title}</h3>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem", flex: 1 }}>
                        {course.description?.length > 100 ? `${course.description.substring(0, 100)}...` : course.description}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
                        <span className="course-price" style={{ fontSize: "1.25rem" }}>₹{course.price}</span>
                        <span style={{ color: "var(--primary)", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          ⭐ {course.avgRating ? course.avgRating.toFixed(1) : "New"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {courses.length === 0 && (
              <div style={{ textAlign: "center", padding: "3rem", background: "var(--bg-card)", borderRadius: "12px", border: "1px dashed var(--border)" }}>
                <p style={{ color: "var(--text-secondary)" }}>No courses found. Be the first to create one!</p>
              </div>
            )}
            <div style={{ textAlign: "center", marginTop: "3rem", display: "block" }}>
              <Link to="/courses" className="btn btn-primary" style={{ padding: "0.85rem 2rem" }}>Browse Catalog</Link>
            </div>
          </>
        )}
      </section>

      {/* CTA Section */}
      <section style={{ background: "linear-gradient(to right, var(--bg-card), #000814)", padding: "6rem 5%", textAlign: "center", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: 700 }}>Ready to Start Teaching?</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Share your knowledge, build your brand, and empower students worldwide by becoming an instructor on StudyNotion.
          </p>
          <Link to="/signup" className="btn btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}>Start Teaching Today</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
