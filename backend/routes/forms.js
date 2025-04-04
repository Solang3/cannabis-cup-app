// routes/forms.js
const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const CupEvent = require('../models/CupEvent');
const RatingForm = require('../models/RatingForm');

const router = express.Router();
router.use(authenticate, requireRole('judge'));

// Get all assigned competitors for judge
router.get('/:eventId', async (req, res) => {
  const event = await CupEvent.findById(req.params.eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (!event.judges.includes(req.user.userId)) {
    return res.status(403).json({ message: 'You are not a judge for this event' });
  }

  const competitors = await require('../models/User').find({ _id: { $in: event.competitors } }, 'username');
  res.json(competitors);
});

// Submit a rating form
router.post('/:eventId/:competitorId', async (req, res) => {
  const { flavor, smell, aspect, effect } = req.body;

  try {
    const event = await CupEvent.findById(req.params.eventId);
    if (!event || !event.judges.includes(req.user.userId)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (!event.competitors.includes(req.params.competitorId)) {
      return res.status(400).json({ message: 'Invalid competitor' });
    }

    const form = new RatingForm({
      judge: req.user.userId,
      competitor: req.params.competitorId,
      event: req.params.eventId,
      flavor, smell, aspect, effect
    });

    await form.save();
    res.status(201).json({ message: 'Form submitted' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'You already rated this competitor' });
    }
    res.status(500).json({ message: 'Submission failed' });
  }
});

module.exports = router;
