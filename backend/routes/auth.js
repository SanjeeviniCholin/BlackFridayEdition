const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const Session = require('../models/Session');
const auth = require('../middleware/auth'); // ADD THIS

const SESSION_TTL_DAYS = parseInt(process.env.SESSION_TOKEN_TTL_DAYS || '7', 10);

// Create session
async function createSession(userId) {
  const token = uuidv4() + '.' + Math.random().toString(36).slice(2);
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  const session = new Session({ userId, token, createdAt, expiresAt });
  await session.save();
  return { token, expiresAt };
}

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name = '', email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists)
      return res.status(409).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email: email.toLowerCase(), password: hashed });
    await user.save();

    const session = await createSession(user._id);

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token: session.token,
      expiresAt: session.expiresAt
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Invalid credentials' });

    const session = await createSession(user._id);

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token: session.token,
      expiresAt: session.expiresAt
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.body.token;

    if (!token)
      return res.status(400).json({ message: "Token required" });

    await Session.deleteOne({ token });

    res.json({ message: "Logged out" });

  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
