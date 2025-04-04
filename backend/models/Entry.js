// models/Entry.js
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  name: { type: String, required: true }, // name of flower
  method: { type: String, enum: ['indoor', 'outdoor'], required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'CupEvent', required: true },
  competitor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

entrySchema.index({ event: 1, competitor: 1 }, { unique: true });

module.exports = mongoose.model('Entry', entrySchema);
