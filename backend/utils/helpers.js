// Utility functions for MERN Movies App
// Created: January 9, 2026
// Purpose: Helper functions for API development
// Status: Placeholder for post-exam implementation

/**
 * Format movie data for response
 * @param {Object} movie - Movie object from database
 * @returns {Object} Formatted movie data
 */
const formatMovie = (movie) => {
  return {
    id: movie._id,
    title: movie.title,
    description: movie.description,
    releaseYear: movie.releaseYear,
    genre: movie.genre,
    rating: movie.rating,
    createdAt: movie.createdAt
  };
};

/**
 * Validate movie data
 * @param {Object} data - Movie data to validate
 * @returns {Array} Array of validation errors
 */
const validateMovie = (data) => {
  const errors = [];
  
  if (!data.title || data.title.trim().length < 2) {
    errors.push('Title must be at least 2 characters long');
  }
  
  if (!data.description || data.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }
  
  // TODO: Add more validation after exams
  
  return errors;
};

module.exports = {
  formatMovie,
  validateMovie
};
