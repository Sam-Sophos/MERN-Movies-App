// MovieDetails Page
// Created: January 21, 2026
// Purpose: Display full movie information with reviews

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { movieAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch movie
        const movieResponse = await movieAPI.getById(id);
        setMovie(movieResponse.data.data);
        
        // Fetch reviews (in real app, this would be from reviews API)
        const mockReviews = [
          {
            _id: '1',
            user: { name: 'Alex Johnson', avatar: '👨‍💼' },
            rating: 9,
            comment: 'One of Nolan\'s best works! The concept is mind-blowing.',
            createdAt: '2026-01-15T10:30:00Z'
          },
          {
            _id: '2',
            user: { name: 'Sam Wilson', avatar: '👩‍🎓' },
            rating: 8,
            comment: 'Great acting and visuals, but the ending left me confused.',
            createdAt: '2026-01-10T14:20:00Z'
          },
          {
            _id: '3',
            user: { name: 'Movie Buff', avatar: '🎬' },
            rating: 10,
            comment: 'A masterpiece! I\'ve watched it 5 times and still find new details.',
            createdAt: '2026-01-05T19:45:00Z'
          }
        ];
        setReviews(mockReviews);
        
        // Fetch related movies
        const relatedResponse = await movieAPI.byGenre(movieResponse.data.data.genre[0]);
        setRelatedMovies(relatedResponse.data.data.slice(0, 4));
        
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
        setError('Movie not found or failed to load.');
        
        // Mock data for development
        setMovie({
          _id: id,
          title: 'Inception',
          description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
          releaseYear: 2010,
          genre: ['Action', 'Sci-Fi', 'Thriller'],
          rating: 8.8,
          duration: '148 min',
          director: 'Christopher Nolan',
          cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page', 'Tom Hardy'],
          createdAt: '2026-01-01T00:00:00Z'
        });
        
        setRelatedMovies([
          {
            _id: '2',
            title: 'Interstellar',
            description: 'A team of explorers travel through a wormhole in space.',
            rating: 8.6,
            releaseYear: 2014
          }
        ]);
        
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Handle adding a review
  const handleAddReview = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  // Handle deleting a review
  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter(review => review._id !== reviewId));
  };

  // Handle adding to watchlist
  const handleAddToWatchlist = () => {
    alert('Added to watchlist!');
    // In real app: API call to add to user's watchlist
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error && !movie) {
    return (
      <div className="error-container">
        <div className="error-icon">🎬</div>
        <h3>Movie Not Found</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="btn-back">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      {/* Back button */}
      <div className="back-section">
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Back
        </button>
        <Link to="/" className="btn-home">
          🏠 Home
        </Link>
      </div>

      {/* Movie Header */}
      <div className="movie-header">
        <div className="movie-poster-large">
          <div className="poster-large-placeholder">
            <span className="poster-icon">🎬</span>
          </div>
          <div className="movie-year-badge">{movie.releaseYear}</div>
        </div>
        
        <div className="movie-header-content">
          <h1 className="movie-title-large">{movie.title}</h1>
          
          <div className="movie-meta-large">
            <div className="rating-badge">
              ⭐ {movie.rating}/10
              <span className="rating-label">Rating</span>
            </div>
            
            <div className="duration-badge">
              ⏱️ {movie.duration || 'N/A'}
              <span className="duration-label">Duration</span>
            </div>
            
            <div className="year-badge">
              📅 {movie.releaseYear}
              <span className="year-label">Year</span>
            </div>
          </div>
          
          <div className="movie-actions">
            <button className="btn-watch-trailer" onClick={() => window.open('https://youtube.com', '_blank')}>
              ▶ Watch Trailer
            </button>
            <button className="btn-watchlist" onClick={handleAddToWatchlist}>
              {user ? '➕ Add to Watchlist' : '🔒 Login to Save'}
            </button>
            {user?.role === 'admin' && (
              <>
                <button className="btn-edit" onClick={() => navigate(`/movies/${id}/edit`)}>
                  ✏️ Edit
                </button>
                <button className="btn-delete" onClick={() => {
                  if (window.confirm('Delete this movie?')) {
                    movieAPI.delete(id);
                    navigate('/');
                  }
                }}>
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          📖 Details
        </button>
        <button
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          💬 Reviews ({reviews.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'cast' ? 'active' : ''}`}
          onClick={() => setActiveTab('cast')}
        >
          👥 Cast & Crew
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'details' && (
          <div className="details-tab">
            <div className="movie-description-full">
              <h3>Synopsis</h3>
              <p>{movie.description}</p>
            </div>
            
            <div className="movie-info-grid">
              <div className="info-card">
                <h4>🎭 Genre</h4>
                <div className="genre-tags">
                  {movie.genre.map((genre, index) => (
                    <span key={index} className="genre-tag-large">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="info-card">
                <h4>🎬 Director</h4>
                <p>{movie.director || 'Not specified'}</p>
              </div>
              
              <div className="info-card">
                <h4>⭐ Average Rating</h4>
                <div className="rating-display">
                  <div className="stars-large">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`star-large ${
                          i < Math.floor(movie.rating / 2) ? 'full' :
                          i === Math.floor(movie.rating / 2) && movie.rating % 2 >= 1 ? 'half' : 'empty'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-number">{movie.rating.toFixed(1)}/10</span>
                </div>
              </div>
              
              <div className="info-card">
                <h4>📅 Release Date</h4>
                <p>{movie.releaseYear} (Original Release)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-tab">
            <div className="reviews-header">
              <h3>User Reviews</h3>
              <p className="reviews-subtitle">
                What people are saying about "{movie.title}"
              </p>
            </div>
            
            {/* Review Form (only for logged in users) */}
            {user ? (
              <ReviewForm 
                movieId={id} 
                onReviewAdded={handleAddReview}
              />
            ) : (
              <div className="login-prompt">
                <p>Please <Link to="/login">login</Link> to submit a review.</p>
              </div>
            )}
            
            {/* Reviews List */}
            <ReviewList 
              reviews={reviews}
              currentUserId={user?._id}
              onDeleteReview={handleDeleteReview}
            />
          </div>
        )}

        {activeTab === 'cast' && (
          <div className="cast-tab">
            <h3>Cast & Crew</h3>
            {movie.cast ? (
              <div className="cast-grid">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="cast-member">
                    <div className="cast-avatar">
                      {actor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="cast-name">{actor}</div>
                    <div className="cast-role">Actor</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-cast">Cast information not available.</p>
            )}
          </div>
        )}
      </div>

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <div className="related-movies">
          <h2>You Might Also Like</h2>
          <div className="related-movies-grid">
            {relatedMovies.map(relatedMovie => (
              <MovieCard key={relatedMovie._id} movie={relatedMovie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
