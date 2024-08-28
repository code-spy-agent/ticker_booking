import React from 'react';
import MovieCard from './MovieCard';
import useMovies from '../hooks/useMovies';
import LoadingSpinner from './LoadingSpinner';

function MovieList() {
  const { movies, loading, error } = useMovies();

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container my-5">
      <div className="row g-4">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;