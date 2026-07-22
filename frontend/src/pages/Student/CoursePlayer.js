import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCourseDetailsAPI } from "../../services/courseAPI";
import { getLiveClassesAPI } from "../../services/liveAPI";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const { token } = useSelector((s) => s.auth);
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [liveClasses, setLiveClasses] = useState([]);

  useEffect(() => {
    getCourseDetailsAPI(courseId).then((res) => {
      setCourse(res.data.course);
      const first = res.data.course?.sections?.[0]?.subSections?.[0];
      if (first) setActiveVideo(first);
    });
    getLiveClassesAPI(courseId, token)
      .then((res) => setLiveClasses(res.data.liveClasses || []));
  }, [courseId, token]);

  if (!course) return <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>Loading...</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", minHeight: "calc(100vh - 64px)" }}>
      {/* Main Content */}
      <div style={{ padding: "1.5rem" }}>
        {activeVideo ? (
          <>
            <div className="video-container" style={{ marginBottom: "1rem" }}>
              <video controls src={activeVideo.videoUrl} style={{ width: "100%", height: "100%" }} />
            </div>
            <h2 style={{ marginBottom: "0.5rem" }}>{activeVideo.title}</h2>
            <p style={{ color: "var(--text-secondary)" }}>{activeVideo.description}</p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)" }}>Select a lecture to watch</div>
        )}

        {/* Live Classes */}
        {liveClasses.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>🔴 Live Classes</h3>
            {liveClasses.map((live) => (
              <div key={live._id} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem", marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontWeight: 600 }}>{live.title}</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{new Date(live.scheduledAt).toLocaleString()}</p>
                </div>
                {live.status === "Live" ? (
                  <Link to={`/live/${live.roomId}`} className="btn btn-danger" style={{ fontSize: "0.85rem" }}>Join Live</Link>
                ) : (
                  <span className={`badge ${live.status === "Scheduled" ? "badge-info" : "badge-success"}`}>{live.status}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar - Course Content */}
      <div style={{ background: "var(--bg-card)", borderLeft: "1px solid var(--border)", overflow: "auto" }}>
        <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", fontWeight: 700 }}>{course.title}</div>
        {course.sections?.map((section) => (
          <div key={section._id}>
            <div style={{ padding: "0.75rem 1rem", background: "var(--bg-card2)", fontWeight: 600, fontSize: "0.9rem" }}>{section.sectionName}</div>
            {section.subSections?.map((sub) => (
              <div key={sub._id}
                onClick={() => setActiveVideo(sub)}
                style={{ padding: "0.75rem 1rem", cursor: "pointer", fontSize: "0.85rem", color: activeVideo?._id === sub._id ? "var(--primary)" : "var(--text-secondary)", background: activeVideo?._id === sub._id ? "rgba(246,201,14,0.1)" : "transparent", borderLeft: activeVideo?._id === sub._id ? "3px solid var(--primary)" : "3px solid transparent" }}>
                🎬 {sub.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePlayer;
