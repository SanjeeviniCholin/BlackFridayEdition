require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const authMiddleware = require("./middleware/auth");

app.use(cors());
app.use(express.json());

// ---- ROUTES ----
app.use('/auth', require('./routes/auth')); 
app.use("/api/subscribe", authMiddleware, require("./routes/subscriptions"));                 
app.use('/api/courses', require('./routes/courses'));
app.use('/api', require('./routes/user'));

// ---- MONGODB CONNECT ----
const MONGO = process.env.MONGO_URI;
if (!MONGO) {
  console.error("Missing MONGO_URI in .env — add it and restart.");
  process.exit(1);
}

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// ---- START SERVER ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
