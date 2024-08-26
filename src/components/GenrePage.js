import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import movieData from '../data/movies.json';

function GenrePage() {
  const { genre } = useParams();

  const genreMovies = useMemo(() => 
    movieData.filter(movie => movie.Genre.includes(genre))
      .sort((a, b) => b.imdbRating - a.imdbRating),
    [genre]
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{genre} Movies</h1>
      <div className="row">
        {genreMovies.map(movie => (
          <div key={movie.imdbID} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={movie.Images[0]} className="card-img-top" alt={movie.Title} style={{ height: '300px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">IMDb Rating: {movie.imdbRating}</p>
                <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary mt-auto">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenrePage;
