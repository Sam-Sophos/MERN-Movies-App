// Navbar Component
// Created: January 19, 2026

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          🎬 MERN Movies
        </Link>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
              <span className="user-greeting">Hi, {user.name}!</span>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn-register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
