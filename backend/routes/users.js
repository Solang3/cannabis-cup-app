// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Entry = require('../models/Entry');
const CupEvent = require('../models/CupEvent');

// GET /api/users/:username/public-profile
router.get('/:username/public-profile', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('username role bio cupsWon')
      .populate({
        path: 'cupsWon.event',
        select: 'name slug date'
      });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const entries = await Entry.find({ competitor: user._id })
      .populate('event', 'name slug date')
      .select('name method event');

    res.json({ user, entries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load profile' });
  }
});

module.exports = router;
