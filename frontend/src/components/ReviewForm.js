// ReviewForm Component
// Created: January 21, 2026

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const [rating, setRating] = useState(8);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      alert('Please enter a comment');
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReview = {
        _id: Date.now().toString(),
        user: { 
          name: 'You', 
          avatar: '😊' 
        },
        rating,
        comment,
        createdAt: new Date().toISOString()
      };
      
      onReviewAdded(newReview);
      setComment('');
      setRating(8);
      setSubmitting(false);
      
      alert('Review submitted successfully!');
    }, 1000);
  };

  return (
    <div className="review-form">
      <h4>Write a Review</h4>
      
      <form onSubmit={handleSubmit}>
        <div className="rating-input">
          <label>Your Rating:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${rating >= star ? 'active' : ''}`}
                onClick={() => setRating(star)}
              >
                {star}
              </button>
            ))}
          </div>
          <span className="rating-value">{rating}/10</span>
        </div>
        
        <div className="comment-input">
          <label htmlFor="comment">Your Review:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this movie..."
            rows="4"
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-submit-review"
            disabled={submitting || !comment.trim()}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => {
              setComment('');
              setRating(8);
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  movieId: PropTypes.string.isRequired,
  onReviewAdded: PropTypes.func.isRequired
};

export default ReviewForm;
