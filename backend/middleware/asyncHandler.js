// Async handler to avoid try-catch blocks
// Created: January 11, 2026

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
