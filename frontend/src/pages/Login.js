// Login Page
// Created: January 22, 2026

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix form errors');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(result.message || 'Login failed');
        setErrors({ server: result.message });
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Demo accounts for testing
  const useDemoAccount = (type) => {
    const accounts = {
      user: { email: 'user@example.com', password: 'password123' },
      admin: { email: 'admin@example.com', password: 'admin123' }
    };
    
    setFormData(accounts[type]);
    toast.info(`Using ${type} demo account`);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>
        </div>

        <div className="demo-accounts">
          <p className="demo-label">Quick test accounts:</p>
          <div className="demo-buttons">
            <button 
              type="button"
              className="btn-demo-user"
              onClick={() => useDemoAccount('user')}
            >
              👤 User Account
            </button>
            <button 
              type="button"
              className="btn-demo-admin"
              onClick={() => useDemoAccount('admin')}
            >
              👑 Admin Account
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.server && (
            <div className="alert alert-error">
              ⚠️ {errors.server}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="you@example.com"
              disabled={loading}
            />
            {errors.email && (
              <div className="form-error">⚠️ {errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <div className="password-label-row">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="••••••••"
              disabled={loading}
            />
            {errors.password && (
              <div className="form-error">⚠️ {errors.password}</div>
            )}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up here
            </Link>
          </p>
          
          <div className="auth-divider">
            <span>Or continue with</span>
          </div>
          
          <div className="social-auth">
            <button type="button" className="btn-social google">
              <span className="social-icon">G</span>
              Google
            </button>
            <button type="button" className="btn-social github">
              <span className="social-icon">Git</span>
              GitHub
            </button>
          </div>
        </div>
      </div>

      <div className="auth-side-panel">
        <div className="side-panel-content">
          <div className="side-panel-icon">🎬</div>
          <h2>Welcome to MERN Movies</h2>
          <p className="side-panel-text">
            Join our community of movie enthusiasts. Rate films, write reviews, 
            and build your personal watchlist.
          </p>
          
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">⭐</span>
              <span>Rate and review movies</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📝</span>
              <span>Create personal watchlists</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <span>Join discussion forums</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Get personalized recommendations</span>
            </div>
          </div>
          
          <div className="stats-preview">
            <div className="stat-preview">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-preview">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Movie Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
