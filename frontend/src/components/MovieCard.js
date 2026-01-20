// MovieCard Component
// Created: January 20, 2026
// Purpose: Display individual movie card

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  // Generate star rating display
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full">★</span>
        ))}
        {halfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty">☆</span>
        ))}
        <span className="rating-text">{rating.toFixed(1)}/10</span>
      </div>
    );
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {/* Placeholder for movie poster - in real app would be an image */}
        <div className="poster-placeholder">
          <span className="poster-text">🎬</span>
        </div>
        <div className="movie-year">{movie.releaseYear}</div>
      </div>
      
      <div className="movie-content">
        <h3 className="movie-title">{movie.title}</h3>
        
        <div className="movie-meta">
          {renderStars(movie.rating)}
          
          <div className="movie-genres">
            {movie.genre.slice(0, 3).map((genre, index) => (
              <span key={index} className="genre-tag">
                {genre}
              </span>
            ))}
            {movie.genre.length > 3 && (
              <span className="genre-more">+{movie.genre.length - 3} more</span>
            )}
          </div>
        </div>
        
        <p className="movie-description">
          {movie.description.length > 150
            ? `${movie.description.substring(0, 150)}...`
            : movie.description}
        </p>
        
        <div className="movie-actions">
          <Link to={`/movies/${movie._id}`} className="btn-view">
            View Details
          </Link>
          <button className="btn-watchlist" onClick={() => console.log('Added to watchlist')}>
            + Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    genre: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
    createdAt: PropTypes.string
  }).isRequired
};

export default MovieCard;
