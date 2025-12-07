import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CourseDetail.css";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [promo, setPromo] = useState("");
  const [promoValid, setPromoValid] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const applyPromo = () => {
    if (promo === "BFSALE25") {
      const newPrice = course.price * 0.5;
      setDiscountPrice(newPrice);
      setPromoValid(true);
    } else {
      alert("Invalid promo code");
      setPromoValid(false);
    }
  };

  const handleSubscribe = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      const payload = {
        userId: user.id,
        courseId: course._id,
        promo: promo,
      };
     
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Subscription failed");
        return;
      }

      alert(data.message);
      navigate("/my-courses");
    } catch (error) {
      alert("Subscription failed");
    }
  };

  if (!course) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="course-container">
      {/* Course Image */}
      <div className="course-image-wrapper">
        <img
          src={course.image}
          alt={course.title}
          className="course-image"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="course-content">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-short-desc">{course.description}</p>
        <p className="course-full-desc">{course.fullDescription}</p>

        {/* Core Concepts */}
        <div className="course-section">
          <h3>Core Concepts</h3>
          <ul>
            {course.coreConcepts?.split(".").map((point, i) =>
              point.trim() ? <li key={i}>{point.trim()}</li> : null
            )}
          </ul>
        </div>

        {/* Who This Course is For */}
        <div className="course-section">
          <h3>Who This Course is For?</h3>
           <ul>
              {course.whoItFor?.split(".").map((point, i) =>
                point.trim() ? <li key={i}>{point.trim()}</li> : null
              )}
            </ul>
        </div>

        {/* Price Section */}
        <h3 className="price-heading">
          Price:{" "}
          {course.price === 0 ? (
            <span className="free">FREE</span>
          ) : (
            <span className="paid">₹{course.price}</span>
          )}
        </h3>

        {/* FREE COURSE */}
        {course.price === 0 && (
          <button className="subscribe-btn" onClick={handleSubscribe}>
            Enroll for Free
          </button>
        )}

        {/* PAID COURSE */}
        {course.price > 0 && (
          <div className="promo-section">
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="promo-input"
            />

            <button onClick={applyPromo} className="apply-btn">
              Apply
            </button>

            <button
              onClick={handleSubscribe}
              className="subscribe-btn"
              disabled={!promoValid}
            >
              Subscribe
            </button>

            {promoValid && (
              <p className="discount-text">
                Promo Applied! Discounted Price: ₹{discountPrice}
              </p>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
