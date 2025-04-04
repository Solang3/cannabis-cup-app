// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: false },
  role: { type: String, enum: ['user', 'competitor', 'judge', 'admin', 'sponsor'], default: 'user' },
  approved: { type: Boolean, default: false }, // optional
  firstName: String,
  lastName: String,
  club: String,
  displayName: String,
  bio: String,
  photoUrl: String,
  bio: String,
    cupsWon: [{
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'CupEvent' },
    placement: Number // 1, 2, 3
    }]
});

module.exports = mongoose.model('User', userSchema);
