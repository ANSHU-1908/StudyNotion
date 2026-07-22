// MyCourses.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getInstructorCoursesAPI, createSectionAPI, createSubSectionAPI, toggleCourseStatusAPI } from "../../services/courseAPI";
import { scheduleLiveAPI } from "../../services/liveAPI";
import Sidebar from "../../components/Layout/Sidebar";
import toast from "react-hot-toast";

const MyCourses = () => {
  const { token } = useSelector((s) => s.auth);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [liveTitle, setLiveTitle] = useState("");
  const [liveDate, setLiveDate] = useState("");

  useEffect(() => {
    getInstructorCoursesAPI(token)
      .then((res) => setCourses(res.data.courses || []));
  }, [token]);

  const handleAddSection = async (courseId) => {
    if (!sectionName) return toast.error("Section name required");
    await createSectionAPI({ courseId, sectionName }, token);
    toast.success("Section added!");
    setSectionName("");
  };

  const handleUploadVideo = async (sectionId) => {
    if (!videoFile || !videoTitle) return toast.error("Video and title required");
    const formData = new FormData();
    formData.append("sectionId", sectionId);
    formData.append("title", videoTitle);
    formData.append("video", videoFile);
    await createSubSectionAPI(formData, token);
    toast.success("Lecture uploaded!");
    setVideoFile(null); setVideoTitle("");
  };

  const handleScheduleLive = async (courseId) => {
    if (!liveTitle || !liveDate) return toast.error("Title and date required");
    await scheduleLiveAPI({ courseId, title: liveTitle, scheduledAt: liveDate }, token);
    toast.success("Live class scheduled!");
    setLiveTitle(""); setLiveDate("");
  };

  const handleToggleStatus = async (courseId) => {
    await toggleCourseStatusAPI(courseId, token);
    toast.success("Status updated!");
    const res = await getInstructorCoursesAPI(token);
    setCourses(res.data.courses);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-content">
        <h1 className="section-title">My Courses</h1>
        {courses.map((course) => (
          <div key={course._id} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", marginBottom: "1.5rem", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "var(--bg-card2)", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img src={course.thumbnail} alt={course.title} style={{ width: 60, height: 45, objectFit: "cover", borderRadius: 6 }} onError={(e) => e.target.src = "https://via.placeholder.com/60x45"} />
                <div>
                  <h3>{course.title}</h3>
                  <span className={`badge ${course.status === "Published" ? "badge-success" : "badge-warning"}`}>{course.status}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn btn-outline" style={{ fontSize: "0.8rem" }} onClick={() => setSelectedCourse(selectedCourse === course._id ? null : course._id)}>Manage</button>
                <button className="btn btn-primary" style={{ fontSize: "0.8rem" }} onClick={() => handleToggleStatus(course._id)}>
                  {course.status === "Published" ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>

            {selectedCourse === course._id && (
              <div style={{ padding: "1.5rem" }}>
                {/* Add Section */}
                <h4 style={{ marginBottom: "0.75rem" }}>Add Section</h4>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  <input type="text" placeholder="Section name" value={sectionName} onChange={(e) => setSectionName(e.target.value)} style={{ flex: 1, padding: "0.6rem", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--text-primary)" }} />
                  <button className="btn btn-primary" onClick={() => handleAddSection(course._id)}>Add</button>
                </div>

                {/* Upload Lecture */}
                {course.sections?.map((section) => (
                  <div key={section._id} style={{ marginBottom: "1rem" }}>
                    <h4 style={{ marginBottom: "0.5rem", color: "var(--primary)" }}>📁 {section.sectionName}</h4>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <input type="text" placeholder="Lecture title" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} style={{ padding: "0.5rem", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--text-primary)", flex: 1 }} />
                      <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} style={{ color: "var(--text-secondary)" }} />
                      <button className="btn btn-primary" style={{ fontSize: "0.85rem" }} onClick={() => handleUploadVideo(section._id)}>Upload Lecture</button>
                    </div>
                    {section.subSections?.map((sub) => (
                      <div key={sub._id} style={{ padding: "0.5rem 0.75rem", marginTop: "0.5rem", background: "var(--bg-dark)", borderRadius: 6, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        🎬 {sub.title}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Schedule Live Class */}
                <h4 style={{ margin: "1.5rem 0 0.75rem" }}>🔴 Schedule Live Class</h4>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <input type="text" placeholder="Live class title" value={liveTitle} onChange={(e) => setLiveTitle(e.target.value)} style={{ flex: 1, padding: "0.6rem", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--text-primary)" }} />
                  <input type="datetime-local" value={liveDate} onChange={(e) => setLiveDate(e.target.value)} style={{ padding: "0.6rem", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--text-primary)" }} />
                  <button className="btn btn-danger" onClick={() => handleScheduleLive(course._id)}>Schedule</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default MyCourses;
