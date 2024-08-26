import React from 'react';
import MovieCard from './MovieCard';
import movieData from '../data/movies.json';

function MovieList() {
  return (
    <div className="container my-5">
      <div className="row g-4">
        {movieData.map(movie => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;