// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate(user.role === "Instructor" ? "/instructor/dashboard" : "/student/dashboard");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (result.meta.requestStatus === "fulfilled") {
      const u = result.payload.user;
      navigate(u.role === "Instructor" ? "/instructor/dashboard" : "/student/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue your learning journey</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ marginTop: "1.5rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Don't have an account? <Link to="/signup" style={{ color: "var(--primary)" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
