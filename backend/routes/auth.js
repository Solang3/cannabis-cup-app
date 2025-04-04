// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
  

router.use((req, res, next) => {
    console.log('AUTH route hit:', req.method, req.url);
    next();
  });
  
// Register
router.post('/register', async (req, res) => {
    const { username, password, displayName, bio, photoUrl } = req.body;
  
    try {
      const existing = await User.findOne({ username });
      if (existing) return res.status(400).json({ message: 'User already exists' });
  
      const passwordHash = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        passwordHash,
        role: 'user', // default role
        displayName,
        bio,
        photoUrl
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      console.error('Register error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
