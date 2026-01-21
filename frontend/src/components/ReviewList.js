// ReviewList Component
// Created: January 21, 2026

import React from 'react';
import PropTypes from 'prop-types';

const ReviewList = ({ reviews, currentUserId, onDeleteReview }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="review-stars">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`review-star ${
              i < Math.floor(rating / 2) ? 'full' :
              i === Math.floor(rating / 2) && rating % 2 >= 1 ? 'half' : 'empty'
            }`}
          >
            ★
          </span>
        ))}
        <span className="review-rating-number">{rating}/10</span>
      </div>
    );
  };

  if (reviews.length === 0) {
    return (
      <div className="no-reviews">
        <div className="no-reviews-icon">💬</div>
        <h4>No reviews yet</h4>
        <p>Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review._id} className="review-item">
          <div className="review-header">
            <div className="reviewer-info">
              <div className="reviewer-avatar">
                {review.user.avatar || review.user.name.charAt(0)}
              </div>
              <div className="reviewer-details">
                <h5 className="reviewer-name">{review.user.name}</h5>
                <span className="review-date">{formatDate(review.createdAt)}</span>
              </div>
            </div>
            
            <div className="review-rating">
              {renderStars(review.rating)}
            </div>
          </div>
          
          <div className="review-content">
            <p>{review.comment}</p>
          </div>
          
          <div className="review-actions">
            <button 
              className="btn-like"
              onClick={() => alert('Liked!')}
            >
              👍 Helpful
            </button>
            
            {currentUserId === review.user._id && (
              <button 
                className="btn-delete-review"
                onClick={() => {
                  if (window.confirm('Delete this review?')) {
                    onDeleteReview(review._id);
                  }
                }}
              >
                🗑️ Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.array.isRequired,
  currentUserId: PropTypes.string,
  onDeleteReview: PropTypes.func
};

export default ReviewList;
