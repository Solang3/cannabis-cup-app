// models/CupEvent.js
const mongoose = require('mongoose');

const cupEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: Date,
  slug: { type: String, unique: true },
  ticketPrice: { type: Number, default: 0 },
  judges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  competitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  publicScores: { type: Boolean, default: false }
});

module.exports = mongoose.model('CupEvent', cupEventSchema);
