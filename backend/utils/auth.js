// Authentication Utilities
// Created: January 17, 2026
// Purpose: Helper functions for authentication

const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

/**
 * Generate Cookie with Token
 */
const generateAuthCookie = (res, token) => {
  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.cookie('token', token, options);
};

/**
 * Hash Password (already in User model, but useful as utility)
 */
const hashPassword = async (password) => {
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare Passwords
 */
const comparePassword = async (enteredPassword, hashedPassword) => {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = {
  generateToken,
  generateAuthCookie,
  hashPassword,
  comparePassword
};
