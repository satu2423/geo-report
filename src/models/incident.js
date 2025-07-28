const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  mediaPath: {
    type: String
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours in seconds
  }
});

module.exports = mongoose.model('Incident', incidentSchema);
