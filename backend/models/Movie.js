// Movie database schema
// Created: January 8, 2026
// Purpose: Define Movie model for MongoDB
// Status: Placeholder for post-exam implementation

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  genre: [String],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // TODO: Add more fields after exams
});

module.exports = mongoose.model('Movie', movieSchema);
