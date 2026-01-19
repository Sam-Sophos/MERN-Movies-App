// Footer Component
// Created: January 19, 2026

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} MERN Movies App. Built with React & Express.</p>
        <p className="footer-links">
          <a href="/about">About</a> | 
          <a href="/privacy">Privacy</a> | 
          <a href="/contact">Contact</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
