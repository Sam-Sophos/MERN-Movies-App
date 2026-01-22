// Register Page
// Created: January 22, 2026

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain letters and numbers';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
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
      const result = await register(
        formData.name,
        formData.email,
        formData.password
      );
      
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        toast.error(result.message || 'Registration failed');
        setErrors({ server: result.message });
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (password) => {
    if (!password) return { score: 0, label: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return {
      score,
      label: labels[score],
      width: `${(score / 4) * 100}%`
    };
  };

  const strength = passwordStrength(formData.password);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p className="auth-subtitle">Join our movie community today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.server && (
            <div className="alert alert-error">
              ⚠️ {errors.server}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="John Doe"
              disabled={loading}
            />
            {errors.name && (
              <div className="form-error">⚠️ {errors.name}</div>
            )}
          </div>

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
            <label htmlFor="password" className="form-label">
              Password
            </label>
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
            
            {formData.password && (
              <div className="password-strength">
                <div className="strength-meter">
                  <div 
                    className={`strength-bar ${strength.label.toLowerCase()}`}
                    style={{ width: strength.width }}
                  ></div>
                </div>
                <div className="strength-label">
                  Strength: <span className={`strength-text ${strength.label.toLowerCase()}`}>
                    {strength.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="••••••••"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <div className="form-error">⚠️ {errors.confirmPassword}</div>
            )}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                disabled={loading}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="terms-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeTerms && (
              <div className="form-error">⚠️ {errors.agreeTerms}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading || !formData.agreeTerms}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
          
          <div className="auth-divider">
            <span>Or sign up with</span>
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
          <div className="side-panel-icon">🌟</div>
          <h2>Start Your Movie Journey</h2>
          <p className="side-panel-text">
            Create your personalized movie profile today and unlock all features:
          </p>
          
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Personalized movie recommendations</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Track movies you've watched</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💬</span>
              <span>Join community discussions</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏆</span>
              <span>Earn badges and achievements</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>Access on all your devices</span>
            </div>
          </div>
          
          <div className="testimonial">
            <div className="testimonial-text">
              "This platform transformed how I discover and enjoy movies. The community is amazing!"
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">SD</div>
              <div className="author-info">
                <div className="author-name">Sarah Davis</div>
                <div className="author-role">Movie Critic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
