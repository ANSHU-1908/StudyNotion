// CourseDetails.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseDetails } from "../redux/slices/courseSlice";
import { createOrderAPI, verifyPaymentAPI } from "../services/paymentAPI";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCourse: course } = useSelector((s) => s.course);
  const { user, token } = useSelector((s) => s.auth);

  useEffect(() => { dispatch(fetchCourseDetails(courseId)); }, [courseId, dispatch]);

  const handleEnroll = async () => {
    if (!token) return navigate("/login");
    try {
      const { data } = await createOrderAPI({ courseId }, token);
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        name: "StudyNotion",
        description: data.courseDescription,
        image: data.thumbnail,
        order_id: data.orderId,
        handler: async (response) => {
          const verifyRes = await verifyPaymentAPI({ ...response, courseId }, token);
          if (verifyRes.data.success) {
            toast.success("Enrolled successfully!");
            navigate("/student/enrolled-courses");
          }
        },
        prefill: { name: `${user?.firstName} ${user?.lastName}`, email: user?.email },
        theme: { color: "#F6C90E" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Enrollment failed");
    }
  };

  if (!course) return <div style={{ padding: "5rem", textAlign: "center", color: "var(--text-secondary)" }}>Loading...</div>;

  const isEnrolled = course.studentsEnrolled?.includes(user?._id);

  return (
    <div style={{ padding: "2rem 5%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem" }}>
        <div>
          <span className="badge badge-info">{course.category}</span>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0" }}>{course.title}</h1>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{course.description}</p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
            <img src={course.instructor?.profilePicture || "https://via.placeholder.com/40"} alt="Instructor" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <p style={{ fontWeight: 600 }}>{course.instructor?.firstName} {course.instructor?.lastName}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Instructor</p>
            </div>
          </div>
          <h3 style={{ marginBottom: "1rem" }}>Course Content</h3>
          {course.sections?.map((section) => (
            <div key={section._id} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", marginBottom: "0.75rem", overflow: "hidden" }}>
              <div style={{ padding: "1rem", fontWeight: 600, background: "var(--bg-card2)" }}>{section.sectionName}</div>
              {section.subSections?.map((sub) => (
                <div key={sub._id} style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  🎬 {sub.title} {sub.videoDuration && `(${sub.videoDuration})`}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Enroll Card */}
        <div style={{ position: "sticky", top: "80px", height: "fit-content" }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
            <img src={course.thumbnail} alt={course.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} onError={(e) => e.target.src = "https://via.placeholder.com/400x200?text=Course"} />
            <div style={{ padding: "1.5rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--primary)", marginBottom: "1rem" }}>₹{course.price}</div>
              {isEnrolled ? (
                <button className="btn btn-primary btn-full" onClick={() => navigate(`/student/course-player/${courseId}`)}>Go to Course</button>
              ) : (
                <button className="btn btn-primary btn-full" onClick={handleEnroll}>Enroll Now</button>
              )}
              <div style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                <p>✅ Full lifetime access</p>
                <p>✅ Live classes included</p>
                <p>✅ Certificate of completion</p>
                <p>✅ {course.studentsEnrolled?.length || 0} students enrolled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
