  import React, { useState } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import useMovie from '../hooks/useMovie';
  import LoadingSpinner from './LoadingSpinner';

  function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { movie, loading, error } = useMovie(id);
    const [showTrailer, setShowTrailer] = useState(false);

    const handleBookTickets = () => {
      navigate(`/booking/${id}`);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="container mt-5"><h2>Error: {error}</h2></div>;
    if (!movie) return <div className="container mt-5"><h2>Movie not found</h2></div>;

    return (
      <div className="movie-details">
        <div className="movie-hero" style={{
          backgroundImage: `url(${movie.images?.[0] || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '500px',  // Adjust this value as needed
          position: 'relative'
        }}>
          <div className="movie-hero-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Reduced opacity for better visibility
          }}></div>
          <div className="container h-100 position-relative" style={{ zIndex: 1 }}>
            <div className="row h-100 align-items-center">
              <div className="col-md-3">
                {movie.images?.[0] && (
                  <img src={movie.images[0]} alt={movie.title} className="movie-poster img-fluid rounded shadow" />
                )}
              </div>
              <div className="col-md-9">
                <h1 className="movie-title text-white">{movie.title}</h1>
                <p className="movie-meta text-white">
                  {movie.release_year || 'N/A'} | {movie.duration || 'N/A'} min | {movie.genre || 'N/A'}
                </p>
                {movie.imdb_rating && (
                  <div className="d-flex align-items-center mb-3">
                    <span className="movie-rating text-white">{movie.imdb_rating}/10</span>
                  </div>
                )}
                <div className="mt-4" style={{ gap: '15px' }}>
                  <button onClick={handleBookTickets} className="btn btn-primary btn-lg m-2">
                    Book Tickets
                  </button>
                  <button onClick={() => setShowTrailer(true)} className="btn btn-outline-light btn-lg m-2">
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8">
              <h3 className="section-title">Plot</h3>
              <p className="movie-plot">{movie.plot || 'No plot available.'}</p>

              <h3 className="section-title mt-5">Cast & Crew</h3>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Director:</strong> {movie.director || 'N/A'}</p>
                  <p><strong>Writer:</strong> {movie.writer || 'N/A'}</p>
                  <p><strong>Cast:</strong> {movie.cast?.join(', ') || 'N/A'}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Production:</strong> {movie.production_company || 'N/A'}</p>
                  <p><strong>Country:</strong> {movie.country || 'N/A'}</p>
                  <p><strong>Language:</strong> {movie.language || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card movie-stats">
                <div className="card-body">
                  <h5 className="card-title">Movie Stats</h5>
                  <p><strong>IMDb Rating:</strong> {movie.imdb_rating || 'N/A'}</p>
                  <p><strong>Box Office:</strong> {movie.box_office ? `$${movie.box_office.toLocaleString()}` : 'N/A'}</p>
                  <p><strong>Awards:</strong> {movie.awards || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {movie.images && movie.images.length > 1 && (
            <div className="mt-5">
              <h3 className="section-title">Gallery</h3>
              <div className="row">
                {movie.images.slice(1).map((image, index) => (
                  <div key={index} className="col-md-3 col-6 mb-4">
                    <div className="gallery-image-container">
                      <img 
                        src={image} 
                        alt={`${movie.title} - Image ${index + 2}`} 
                        className="img-fluid rounded shadow"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {showTrailer && (
          <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
            <div className="trailer-content">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default MovieDetails;