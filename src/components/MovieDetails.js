import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import movieData from '../data/movies.json';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movieData.find(m => m.imdbID === id);

  console.log("Movie ID:", id);
  console.log("Found movie:", movie);

  if (!movie) {
    return (
      <div className="container mt-5">
        <h2>Movie not found</h2>
        <p>We couldn't find a movie with ID: {id}</p>
        <p>Available movie IDs: {movieData.map(m => m.imdbID).join(', ')}</p>
      </div>
    );
  }

  const handleBookTickets = () => {
    navigate(`/booking/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          {movie.Images && movie.Images[0] ? (
            <img src={movie.Images[0]} alt={movie.Title} className="img-fluid" />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="col-md-8">
          <h1>{movie.Title}</h1>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Rated:</strong> {movie.Rated}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Writer:</strong> {movie.Writer}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Country:</strong> {movie.Country}</p>
          <p><strong>Awards:</strong> {movie.Awards}</p>
          <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          <p><strong>IMDb Votes:</strong> {movie.imdbVotes}</p>
        </div>
      </div>
      {movie.Images && movie.Images.length > 0 && (
        <div className="row mt-5">
          <h2>Images</h2>
          {movie.Images.map((image, index) => (
            <div key={index} className="col-md-4 mb-3">
              <img src={image} alt={`${movie.Title} ${index + 1}`} className="img-fluid" />
            </div>
          ))}
        </div>
      )}
      <button onClick={handleBookTickets} className="btn btn-primary mt-3">
        Book Tickets
      </button>
    </div>
  );
}

export default MovieDetails;