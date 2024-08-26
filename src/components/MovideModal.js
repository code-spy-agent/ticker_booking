import React from 'react';

function MovieModal({ movie, onClose }) {
  return (
    <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{movie.Title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <img src={movie.Images[0]} className="img-fluid rounded" alt={movie.Title} />
              </div>
              <div className="col-md-8">
                <p><strong>Released:</strong> {movie.Released}</p>
                <p><strong>Runtime:</strong> {movie.Runtime}</p>
                <p><strong>Rated:</strong> {movie.Rated}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Writer:</strong> {movie.Writer}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p><strong>Plot:</strong> {movie.Plot}</p>
                <p><strong>Language:</strong> {movie.Language}</p>
                <p><strong>Country:</strong> {movie.Country}</p>
                <p><strong>Awards:</strong> {movie.Awards}</p>
                <p><strong>Metascore:</strong> {movie.Metascore}</p>
                <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                <p><strong>IMDB Votes:</strong> {movie.imdbVotes}</p>
              </div>
            </div>
            <div className="movie-images">
              {movie.Images.map((img, index) => (
                <img key={index} src={img} alt={`${movie.Title} ${index + 1}`} className="img-fluid" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;