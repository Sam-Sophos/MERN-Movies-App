// Validation Middleware
// Created: January 17, 2026
// Purpose: Request validation for API endpoints

const { validationResult } = require('express-validator');

/**
 * Validate request using express-validator
 */
const validateRequest = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
        location: err.location
      }))
    });
  };
};

/**
 * Validate movie data
 */
const validateMovie = validateRequest([
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  
  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  
  body('releaseYear')
    .isInt({ min: 1888, max: new Date().getFullYear() + 5 }).withMessage('Release year must be a valid year'),
  
  body('genre')
    .isArray().withMessage('Genre must be an array')
    .custom((genres) => {
      if (!genres || genres.length === 0) {
        throw new Error('At least one genre is required');
      }
      return true;
    }),
  
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10')
]);

/**
 * Validate user registration
 */
const validateRegister = validateRequest([
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]);

/**
 * Validate user login
 */
const validateLogin = validateRequest([
  body('email')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
]);

module.exports = {
  validateRequest,
  validateMovie,
  validateRegister,
  validateLogin
};
