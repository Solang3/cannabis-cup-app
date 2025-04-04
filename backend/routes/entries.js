const express = require('express');
const Entry = require('../models/Entry');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate, requireRole('competitor'));

router.post('/:eventId', async (req, res) => {
    const { name, strainType, description } = req.body;
  
    try {
      const existing = await Entry.findOne({
        competitor: req.user.userId,
        event: req.params.eventId
      });
  
      if (existing) {
        return res.status(400).json({ message: 'You already submitted a flower for this event' });
      }
  
      const entry = new Entry({
        name,
        strainType,
        description,
        event: req.params.eventId,
        competitor: req.user.userId
      });
  
      await entry.save();
      res.status(201).json({ message: 'Flower submitted', entry });
    } catch (err) {
      console.error('Entry submit error:', err);
      res.status(500).json({ message: 'Error submitting flower' });
    }
  });
  

// GET /api/entries/my
router.get('/my', async (req, res) => {
    try {
        const entries = await Entry.find({ competitor: req.user.userId })
        .populate('event', 'name date slug');

        res.json(entries);
    } catch (err) {
        console.error('Entry fetch error:', err);
        res.status(500).json({ message: 'Failed to fetch entries' });
    }
});

const CupEvent = require('../models/CupEvent');

// GET /api/entries/my-events
router.get('/my-events', async (req, res) => {
  try {
    const events = await CupEvent.find({
      competitors: req.user.userId
    }, 'name date slug');

    res.json(events);
  } catch (err) {
    console.error('Event fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch your events' });
  }
});

  

module.exports = router;
