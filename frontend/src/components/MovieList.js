// MovieList Component
// Created: January 20, 2026
// Purpose: Display grid of movies with filtering and pagination

import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { movieAPI } from '../services/api';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Get unique genres from movies
  const getUniqueGenres = () => {
    const genres = movies.flatMap(movie => movie.genre);
    return ['all', ...new Set(genres)].slice(0, 10); // Limit to 10 genres
  };

  // Filter and sort movies
  const getFilteredMovies = () => {
    let filtered = [...movies];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie =>
        movie.genre.includes(selectedGenre)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'releaseYear':
          return b.releaseYear - a.releaseYear;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  };

  // Fetch movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await movieAPI.getAll({
          page: currentPage,
          limit: 12
        });
        setMovies(response.data.data);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        setError('Failed to load movies. Please try again later.');
        
        // Fallback to mock data for development
        setMovies([
          {
            _id: '1',
            title: 'Inception',
            description: 'A thief who steals corporate secrets through dream-sharing technology.',
            releaseYear: 2010,
            genre: ['Action', 'Sci-Fi', 'Thriller'],
            rating: 8.8,
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            title: 'The Shawshank Redemption',
            description: 'Two imprisoned men bond over a number of years.',
            releaseYear: 1994,
            genre: ['Drama'],
            rating: 9.3,
            createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const filteredMovies = getFilteredMovies();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error && movies.length === 0) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Unable to load movies</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn-retry">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      {/* Filters and Search */}
      <div className="movie-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>

        <div className="filter-controls">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="genre-select"
          >
            <option value="all">All Genres</option>
            {getUniqueGenres().map((genre, index) => (
              genre !== 'all' && (
                <option key={index} value={genre}>
                  {genre}
                </option>
              )
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="createdAt">Newest First</option>
            <option value="rating">Highest Rated</option>
            <option value="releaseYear">Release Year</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p>
          Showing {filteredMovies.length} of {movies.length} movies
          {searchTerm && ` for "${searchTerm}"`}
          {selectedGenre !== 'all' && ` in ${selectedGenre}`}
        </p>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🎬</div>
          <h3>No movies found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGenre('all');
            }}
            className="btn-clear-filters"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                ← Previous
              </button>
              
              <div className="page-numbers">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieList;
