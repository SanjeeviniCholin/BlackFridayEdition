import React, { useState, useEffect } from "react";
import { authFetch } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
 const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const token = sessionStorage.getItem("sessionToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Load user info
        const res = await authFetch("/api/me", "GET", null, token);
        setUser(res.user);

        // Load courses
        const courseRes = await fetch(
          (process.env.REACT_APP_API_BASE || "http://localhost:5000") + "/api/courses"
        );
        const courseData = await courseRes.json();
        setCourses(courseData);
      } catch (err) {
        console.error("Unauthorized", err);
        sessionStorage.removeItem("sessionToken");
        sessionStorage.removeItem("user");
        navigate("/login");
      }
    }
    load();
  }, [navigate]);

  const handleLogout = async () => {
    const token = sessionStorage.getItem("sessionToken");
    try {
      await fetch(
        (process.env.REACT_APP_API_BASE || "http://localhost:5000") +
          "/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        }
      );
    } catch (e) {}
    sessionStorage.removeItem("sessionToken");
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="home-container">
      <div className="home-header">
        <h2 className="home-title">Welcome, {user?.name} </h2>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button 
            className="mycourse-btn"
            onClick={() => navigate("/my-courses")}
          >
            My Courses
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <p className="subtitle">Here are your available courses:</p>

      {/* Courses Grid */}
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <img src={course.image} alt={course.title} style={{ width: "100%", borderRadius: "10px", height: "250px" }} />
            <h3 className="course-title">{course.title}</h3>
            <p className="course-desc">{course.description}</p>

            <p className="course-price">
              {course.price === 0 ? (
                <span className="free-tag">Free</span>
              ) : (
                <span>₹{course.price}</span>
              )}
            </p>

            <button 
              className="course-btn"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
