const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  fullDescription: String, 
  coreConcepts: String,
  whoItFor: String,
  price: { type: Number, required: true },
  image: String,
});

module.exports = mongoose.model("Course", CourseSchema);
