import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((s) => s.auth);
  const location = useLocation();

  const studentLinks = [
    { name: "🏠 Dashboard", path: "/student/dashboard" },
    { name: "📚 My Courses", path: "/student/enrolled-courses" },
    { name: "🔍 Browse Courses", path: "/courses" },
    { name: "👤 Profile", path: "/profile" },
  ];

  const instructorLinks = [
    { name: "🏠 Dashboard", path: "/instructor/dashboard" },
    { name: "📚 My Courses", path: "/instructor/my-courses" },
    { name: "➕ Create Course", path: "/instructor/create-course" },
    { name: "👤 Profile", path: "/profile" },
  ];

  const adminLinks = [
    { name: "🏠 Dashboard", path: "/admin/dashboard" },
    { name: "👤 Profile", path: "/profile" },
  ];

  let links = [];
  if (user?.role === "Student") links = studentLinks;
  else if (user?.role === "Instructor") links = instructorLinks;
  else if (user?.role === "Admin") links = adminLinks;

  return (
    <aside className="sidebar">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`sidebar-item ${location.pathname === link.path ? "active" : ""}`}
        >
          {link.name}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
