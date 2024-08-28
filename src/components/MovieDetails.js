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
        <div className="movie-hero p-2">
          <div className="movie-hero-overlay"></div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-4 col-lg-3 mb-4 mb-md-0">
                {movie.images?.[0] && (
                  <img 
                    src={movie.images[0]} 
                    alt={movie.title} 
                    className="movie-poster img-fluid rounded shadow-sm"
                  />
                )}
              </div>
              <div className="col-12 col-md-8 col-lg-9">
                <h1 className="movie-title">{movie.title}</h1>
                <p className="movie-meta">
                  {movie.release_year} | {movie.duration} min | {movie.genre}
                </p>
                {movie.imdb_rating && (
                  <p className="movie-rating">IMDb: {movie.imdb_rating}/10</p>
                )}
                <div className="movie-actions">
                  <button onClick={handleBookTickets} className="btn btn-primary me-2 mb-2">
                    Book Tickets
                  </button>
                  <button onClick={() => setShowTrailer(true)} className="btn btn-outline-primary mb-2">
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-8">
              <section className="movie-plot mb-5">
                <h2 className="section-title">Plot</h2>
                <p>{movie.plot || 'No plot available.'}</p>
              </section>

              <section className="movie-cast-crew mb-5">
                <h2 className="section-title">Cast & Crew</h2>
                <p><strong>Director:</strong> {movie.director || 'N/A'}</p>
                <p><strong>Writer:</strong> {movie.writer || 'N/A'}</p>
                <p><strong>Cast:</strong> {movie.cast?.join(', ') || 'N/A'}</p>
              </section>
            </div>
            <div className="col-lg-4">
              <div className="movie-stats mb-5">
                <h2 className="section-title">Movie Details</h2>
                <p><strong>Box Office:</strong> {movie.box_office ? `$${movie.box_office.toLocaleString()}` : 'N/A'}</p>
                <p><strong>Awards:</strong> {movie.awards || 'N/A'}</p>
                <p><strong>Production:</strong> {movie.production_company || 'N/A'}</p>
                <p><strong>Country:</strong> {movie.country || 'N/A'}</p>
                <p><strong>Language:</strong> {movie.language || 'N/A'}</p>
              </div>
            </div>
          </div>

          {movie.images && movie.images.length > 1 && (
            <section className="movie-gallery mb-5">
              <h2 className="section-title">Gallery</h2>
              <div className="row g-4">
                {movie.images.slice(1).map((image, index) => (
                  <div key={index} className="col-6 col-md-4 col-lg-3">
                    <img 
                      src={image} 
                      alt={`${movie.title} - Image ${index + 2}`} 
                      className="img-fluid rounded"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {showTrailer && (
          <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
            <div className="trailer-content">
              <iframe
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