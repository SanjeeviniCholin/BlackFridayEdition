const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const Course = require("../models/Course");

// POST /subscribe
router.post("/", async (req, res) => {
  try {
    const { userId, courseId, promo } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    let finalPrice = course.price;

    // FREE COURSE
    if (course.price === 0) {
      finalPrice = 0;
    }
    // PAID COURSE — CHECK PROMO
    else {
      if (!promo) {
        return res.status(400).json({ message: "Promo code required" });
      }

      if (promo === "BFSALE25") {
        finalPrice = course.price * 0.5;
      } else {
        return res.status(400).json({ message: "Invalid promo code" });
      }
    }

    // SAVE SUBSCRIPTION
    await Subscription.create({
      userId,
      courseId,
      pricePaid: finalPrice,
    });

    res.json({
      message: "Subscription successful!",
      pricePaid: finalPrice,
    });
  } catch (err) {
    res.status(500).json({ message: "Error subscribing" });
  }
});

router.get("/my-courses", async (req, res) => {
  try {
    console.log("my-courses called, req.user:", req.user && (req.user._id || req.user.id));
    const tokenUser = req.user;
    if (!tokenUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Ensure we use the proper id stored by your auth middleware
    const userId = tokenUser._id || tokenUser.id || tokenUser;

    const list = await Subscription.find({ userId }).populate("courseId");

    res.json(list);
  } catch (err) {
    console.error("My courses error:", err);
    res.status(500).json({ message: "Failed to load courses" });
  }
});
module.exports = router;
