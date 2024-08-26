import React from 'react';

function MovieCard({ movie, onShowDetails }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="movie-card h-100">
        <img src={movie.Images[0]} className="card-img-top movie-poster" alt={movie.Title} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{movie.Title} <small className="text-muted">({movie.Year})</small></h5>
          <p className="card-text mb-1"><i className="fas fa-film me-2"></i>{movie.Genre}</p>
          <p className="card-text mb-1"><i className="fas fa-user me-2"></i>{movie.Director}</p>
          <p className="card-text mb-3"><i className="fas fa-star me-2 rating"></i>{movie.imdbRating}</p>
          <button className="btn btn-details mt-auto" onClick={onShowDetails}>More Details</button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;