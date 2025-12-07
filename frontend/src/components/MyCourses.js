import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // reuse same card styles

export default function MyCourses() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  async function load() {
    try {
      const token = sessionStorage.getItem("sessionToken");

      const res = await authFetch(
        "/api/subscribe/my-courses",
        "GET",
        null,
        token
      );

      setList(res);
    } catch (err) {
      console.error("Error loading", err);
    }
  }
  load();
}, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h2 className="home-title">My Courses</h2>
        <button className="mycourse-btn" onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>

      <p className="subtitle">Courses you are enrolled in:</p>

      <div className="course-grid">
        {list.length === 0 && (
          <p className="no-courses">You haven't subscribed to any courses yet.</p>
        )}

        {list.map((s) => (
          <div key={s._id} className="course-card">
            <img
              src={s.courseId.image}
              alt={s.courseId.title}
              style={{ width: "100%", borderRadius: "10px", height: "250px" }}
            />

            <h3 className="course-title">{s.courseId.title}</h3>
            <p className="course-desc">{s.courseId.description}</p>

            <p className="course-price">
              Paid: ₹{s.pricePaid}
            </p>

            <p className="date-text">
              Enrolled on: {new Date(s.subscribedAt).toLocaleDateString()}
            </p>

            <button
              className="course-btn"
              onClick={() => navigate(`/courses/${s.courseId._id}`)}
            >
              Open Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
