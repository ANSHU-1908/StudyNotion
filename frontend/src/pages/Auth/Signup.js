import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP, signup } from "../../redux/slices/authSlice";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: "Student", otp: "" });
  const { loading, otpSent } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const result = await dispatch(sendOTP(form.email));
    if (result.meta.requestStatus === "fulfilled") setStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await dispatch(signup(form));
    if (result.meta.requestStatus === "fulfilled") navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{step === 1 ? "Create Account 🎓" : "Verify Email ✉️"}</h2>
        <p>{step === 1 ? "Join StudyNotion today" : `Enter the OTP sent to ${form.email}`}</p>

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>I am a</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor / Tutor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create a password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Enter OTP</label>
              <input type="text" placeholder="Enter 6-digit OTP" maxLength={6} value={form.otp} onChange={(e) => setForm({ ...form, otp: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
            <button type="button" className="btn btn-outline btn-full" style={{ marginTop: "0.75rem" }} onClick={() => dispatch(sendOTP(form.email))}>
              Resend OTP
            </button>
          </form>
        )}

        <p style={{ marginTop: "1.5rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--primary)" }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
