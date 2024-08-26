import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieModal from './MovideModal';
import movieData from '../data/movies.json';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genre = searchParams.get('genre');

    if (genre) {
      const filteredMovies = movieData.filter(movie => 
        movie.Genre.split(', ').includes(genre)
      );
      setMovies(filteredMovies);
    } else {
      setMovies(movieData);
    }
  }, [location]);

  const genre = new URLSearchParams(location.search).get('genre');
  const headerText = genre ? `${genre} Movies` : 'All Movies';

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">{headerText}</h2>
      {movies.length === 0 ? (
        <p className="text-center">No movies found in this category.</p>
      ) : (
        <div className="row g-4">
          {movies.map(movie => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
              onShowDetails={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      )}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default MovieList;