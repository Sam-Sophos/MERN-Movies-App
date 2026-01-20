// Home Page
// Created: January 20, 2026
// Purpose: Main landing page with movie listings

import React from 'react';
import MovieList from '../components/MovieList';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MERN Movies</h1>
          <p className="hero-subtitle">
            Discover, rate, and review your favorite movies
          </p>
          {!user && (
            <div className="hero-cta">
              <p>Join our community to create watchlists and share reviews!</p>
              <div className="cta-buttons">
                <a href="/register" className="btn-primary">
                  Get Started Free
                </a>
                <a href="/login" className="btn-secondary">
                  Sign In
                </a>
              </div>
            </div>
          )}
          {user && (
            <div className="welcome-back">
              <p>Welcome back, <strong>{user.name}</strong>! Ready to discover new movies?</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Movies</h2>
          <p className="section-subtitle">
            Curated collection of top-rated films
          </p>
        </div>
        <MovieList />
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">1,000+</div>
            <div className="stat-label">Movies</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Reviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.8</div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
