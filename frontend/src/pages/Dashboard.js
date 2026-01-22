// Dashboard Page
// Created: January 22, 2026

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    watchedMovies: 24,
    reviewsWritten: 8,
    watchlistItems: 15,
    badgesEarned: 3
  });
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'review', movie: 'Inception', time: '2 hours ago' },
    { id: 2, action: 'watchlist', movie: 'The Matrix', time: '1 day ago' },
    { id: 3, action: 'rating', movie: 'Parasite', time: '3 days ago' }
  ]);

  if (!user) {
    return (
      <div className="auth-required">
        <h2>Please log in to view your dashboard</h2>
        <Link to="/login" className="btn-login">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="user-welcome">
          <div className="user-avatar-large">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <h1>Welcome back, {user.name}!</h1>
            <p className="user-email">{user.email}</p>
            <div className="user-badges">
              <span className="badge">🎬 Movie Buff</span>
              {user.role === 'admin' && (
                <span className="badge admin">👑 Admin</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="dashboard-actions">
          <button className="btn-settings" onClick={() => setActiveTab('settings')}>
            ⚙️ Settings
          </button>
          <button className="btn-logout" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'watchlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('watchlist')}
        >
          📝 Watchlist
        </button>
        <button
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          💬 My Reviews
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🎬</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.watchedMovies}</div>
                  <div className="stat-label">Movies Watched</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.reviewsWritten}</div>
                  <div className="stat-label">Reviews Written</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.watchlistItems}</div>
                  <div className="stat-label">Watchlist Items</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.badgesEarned}</div>
                  <div className="stat-label">Badges Earned</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.action === 'review' && '💬'}
                      {activity.action === 'watchlist' && '➕'}
                      {activity.action === 'rating' && '⭐'}
                    </div>
                    <div className="activity-details">
                      <div className="activity-text">
                        {activity.action === 'review' && 'You reviewed '}
                        {activity.action === 'watchlist' && 'Added to watchlist: '}
                        {activity.action === 'rating' && 'Rated '}
                        <strong>{activity.movie}</strong>
                      </div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <Link to="/movies" className="btn-action">
                  🎬 Browse Movies
                </Link>
                <button className="btn-action" onClick={() => setActiveTab('watchlist')}>
                  📝 View Watchlist
                </button>
                <button className="btn-action">
                  ⭐ Write a Review
                </button>
                {user.role === 'admin' && (
                  <Link to="/admin" className="btn-action admin">
                    👑 Admin Panel
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'watchlist' && (
          <div className="watchlist-tab">
            <h2>My Watchlist</h2>
            <p className="empty-state">
              Your watchlist is empty. Start adding movies!
            </p>
            <Link to="/movies" className="btn-primary">
              🎬 Browse Movies to Add
            </Link>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-tab">
            <h2>My Reviews</h2>
            <p className="empty-state">
              You haven't written any reviews yet.
            </p>
            <button className="btn-primary">
              💬 Write Your First Review
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <h2>Account Settings</h2>
            
            <div className="settings-section">
              <h3>Profile Information</h3>
              <div className="setting-item">
                <label>Name</label>
                <input type="text" value={user.name} readOnly />
              </div>
              <div className="setting-item">
                <label>Email</label>
                <input type="email" value={user.email} readOnly />
              </div>
            </div>

            <div className="settings-section">
              <h3>Preferences</h3>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Email notifications for new movies
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Show adult content
                </label>
              </div>
            </div>

            <div className="settings-actions">
              <button className="btn-save">
                💾 Save Changes
              </button>
              <button className="btn-danger">
                🗑️ Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
