import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Logo from "./Logo";

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "Instructor") return "/instructor/dashboard";
    return "/student/dashboard";
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Logo size={32} />
        StudyNotion
      </Link>
      <div className="navbar-links">
        <Link to="/courses">Courses</Link>
        {token && user ? (
          <>
            <Link to={getDashboardLink()}>Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
