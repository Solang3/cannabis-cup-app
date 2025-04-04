// routes/admin.js
const express = require('express');
const mongoose = require('mongoose'); // ✅ REQUIRED for ObjectId casting
const { authenticate, requireRole } = require('../middleware/auth');
const CupEvent = require('../models/CupEvent');
const User = require('../models/User');
const RatingForm = require('../models/RatingForm');

const router = express.Router();

// Only admins can use these routes
router.use(authenticate, requireRole('admin'));

// Create new Cup Event
router.post('/events', async (req, res) => {
  const { name, date } = req.body;
  try {
    const event = new CupEvent({ name, date });
    await event.save();
    res.status(201).json({ message: 'Event created', event });
  } catch (err) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Assign users to event
router.post('/events/:eventId/assign', async (req, res) => {
  const { judges = [], competitors = [] } = req.body;

  try {
    const event = await CupEvent.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.judges.push(...judges);
    event.competitors.push(...competitors);
    await event.save();

    res.json({ message: 'Users assigned', event });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning users' });
  }
});

router.get('/events/:id/scores', async (req, res) => {
    try {
      const eventId = req.params.id;
  
      const scores = await RatingForm.aggregate([
        { $match: { event: new mongoose.Types.ObjectId(eventId) } },
        {
          $group: {
            _id: '$competitor',
            avgFlavor: { $avg: '$flavor' },
            avgSmell: { $avg: '$smell' },
            avgAspect: { $avg: '$aspect' },
            avgEffect: { $avg: '$effect' },
            totalScore: {
              $avg: {
                $sum: ['$flavor', '$smell', '$aspect', '$effect']
              }
            }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'competitor'
          }
        },
        { $unwind: '$competitor' },
        {
          $project: {
            competitor: { _id: 1, username: '$competitor.username' },
            average: {
              flavor: { $round: ['$avgFlavor', 2] },
              smell: { $round: ['$avgSmell', 2] },
              aspect: { $round: ['$avgAspect', 2] },
              effect: { $round: ['$avgEffect', 2] }
            },
            total: { $round: ['$totalScore', 2] }
          }
        },
        { $sort: { total: -1 } }
      ]);
  
      // Add rank manually
      const ranked = scores.map((s, i) => ({
        rank: i + 1,
        ...s
      }));
  
      res.json(ranked);
    } catch (err) {
      console.error('Score error:', err);
      res.status(500).json({ message: 'Error calculating scores' });
    }
});

router.patch('/events/:id/visibility', async (req, res) => {
    const { publicScores } = req.body;
    const event = await CupEvent.findByIdAndUpdate(
      req.params.id,
      { publicScores },
      { new: true }
    );
  
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: `Scores are now ${publicScores ? 'public' : 'private'}` });
});

// PATCH /api/admin/users/:id/role
router.patch('/users/:id/role', authenticate, requireRole('admin'), async (req, res) => {
    const { role, approved } = req.body;
  
    if (!['competitor', 'judge', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
  
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, approved: approved ?? true },
      { new: true }
    ).select('username role approved');
  
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User role updated', user });
  });
  
// GET /api/admin/users
router.get('/users', authenticate, requireRole('admin'), async (req, res) => {
    try {
      const users = await User.find({})
        .select('username role approved bio displayName');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  });
    


module.exports = router;
