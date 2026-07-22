import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", color: "var(--primary)", fontSize: "1.25rem", fontWeight: 700 }}>
            <Logo size={28} />
            StudyNotion
          </Link>
          <p className="footer-tagline">
            Empowering learners worldwide to achieve their goals with the best online courses, expert instructors, and a thriving community.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="GitHub"><FaGithub /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="#">About</Link></li>
            <li><Link to="#">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} StudyNotion. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
