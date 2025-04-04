// models/RatingForm.js
const mongoose = require('mongoose');

const ratingFormSchema = new mongoose.Schema({
  judge: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'CupEvent', required: true },
  entry: { type: mongoose.Schema.Types.ObjectId, ref: 'Entry', required: true },
  flavor: { type: Number, min: 1, max: 5, required: true },
  smell: { type: Number, min: 1, max: 5, required: true },
  aspect: { type: Number, min: 1, max: 5, required: true },
  effect: { type: Number, min: 1, max: 5, required: true }
}, { timestamps: true });

ratingFormSchema.index({ judge: 1, competitor: 1, event: 1 }, { unique: true }); // prevent duplicates

module.exports = mongoose.model('RatingForm', ratingFormSchema);
