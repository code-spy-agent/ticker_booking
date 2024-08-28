import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMovies from '../hooks/useMovies';

function GenrePage() {
  const { genre } = useParams();
  const { movies, loading, error } = useMovies();

  const genreMovies = useMemo(() => 
    movies.filter(movie => movie.genre.includes(genre))
      .sort((a, b) => b.imdb_rating - a.imdb_rating),
    [movies, genre]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{genre} Movies</h1>
      <div className="row">
        {genreMovies.map(movie => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={movie.images[0] || movie.image_url} className="card-img-top" alt={movie.title} style={{ height: '300px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">IMDb Rating: {movie.imdb_rating}</p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary mt-auto">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenrePage;