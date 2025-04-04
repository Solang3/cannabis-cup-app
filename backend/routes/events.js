// routes/events.js
const express = require('express');
const CupEvent = require('../models/CupEvent');
const RatingForm = require('../models/RatingForm');
const User = require('../models/User');

const router = express.Router();

// Public GET by slug
router.get('/:slug', async (req, res) => {
  try {
    const event = await CupEvent.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// routes/events.js
router.get('/', async (req, res) => {
    const events = await CupEvent.find({}, 'name slug date').sort({ date: 1 });
    res.json(events);
  });
  

const { authenticate } = require('../middleware/auth');

router.post('/:id/join', authenticate, async (req, res) => {
  const { role } = req.body;

  if (!['judge', 'competitor'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Must be judge or competitor.' });
  }

  try {
    const event = await CupEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const field = role === 'judge' ? 'judges' : 'competitors';
    const alreadyJoined = event[field].some(id => id.toString() === req.user.userId);

    if (alreadyJoined) {
      return res.status(400).json({ message: `Already joined as ${role}` });
    }

    event[field].push(req.user.userId);
    await event.save();

    res.json({ message: `Successfully joined as ${role}` });
  } catch (err) {
    res.status(500).json({ message: 'Join failed' });
  }
});

router.get('/:slug/scores', async (req, res) => {
    try {
      const event = await CupEvent.findOne({ slug: req.params.slug });
      if (!event) return res.status(404).json({ message: 'Event not found' });
      if (!event.publicScores) return res.status(403).json({ message: 'Scores not public yet' });
  
      const scores = await RatingForm.aggregate([
        { $match: { event: event._id } },
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
  
      const ranked = scores.map((s, i) => ({ rank: i + 1, ...s }));
      res.json(ranked);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching scores' });
    }
  });
  

module.exports = router;
