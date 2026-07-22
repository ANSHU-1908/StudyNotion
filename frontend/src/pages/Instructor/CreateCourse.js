// CreateCourse.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createCourseAPI } from "../../services/courseAPI";
import Sidebar from "../../components/Layout/Sidebar";
import toast from "react-hot-toast";

const CreateCourse = () => {
  const { token } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "", tags: "" });
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (thumbnail) formData.append("thumbnail", thumbnail);
      await createCourseAPI(formData, token);
      toast.success("Course created!");
      navigate("/instructor/my-courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create course");
    }
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-content">
        <h1 className="section-title">Create New Course</h1>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem", maxWidth: "700px" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Title</label>
              <input type="text" placeholder="e.g. Complete React Course 2024" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Describe what students will learn..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" placeholder="e.g. 999" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
                  <option value="">Select Category</option>
                  <option>Web Development</option>
                  <option>Mobile Development</option>
                  <option>Data Science</option>
                  <option>Machine Learning</option>
                  <option>Design</option>
                  <option>Business</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>Languages</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input type="text" placeholder="e.g. react, javascript, frontend" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Course Thumbnail</label>
              <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: "0.85rem 2rem" }}>
              {loading ? "Creating..." : "Create Course"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;
