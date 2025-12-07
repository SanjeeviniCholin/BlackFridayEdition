const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// GET /api/me 
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (err) {
    console.error("Me Route Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
