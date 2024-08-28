import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import useMovies from '../hooks/useMovies';
import LoadingSpinner from './LoadingSpinner';

function Home() {
  const { movies, loading, error } = useMovies();

  const topMovies = useMemo(() => 
    (movies || [])
      .sort((a, b) => b.imdb_rating - a.imdb_rating)
      .slice(0, 5),
    [movies]
  );

  const genreCategories = useMemo(() => {
    const categories = {};
    (movies || []).forEach(movie => {
      if (movie && movie.genre) {
        const genres = movie.genre.split(', ');
        genres.forEach(genre => {
          if (!categories[genre]) {
            categories[genre] = [];
          }
          categories[genre].push(movie);
        });
      }
    });
    return categories;
  }, [movies]);

  const topGenreMovies = useMemo(() => {
    const top = {};
    Object.keys(genreCategories).forEach(genre => {
      top[genre] = genreCategories[genre]
        .sort((a, b) => b.imdb_rating - a.imdb_rating)
        .slice(0, 4);
    });
    return top;
  }, [genreCategories]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <Carousel className="movie-carousel">
        {topMovies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <img
              className="d-block w-100"
              src={movie.images && movie.images[1] ? movie.images[1] : movie.image_url}
              alt={movie.title}
              style={{ objectFit: 'cover', height: '70vh' }}
            />
            <Carousel.Caption className="text-white p-5 fw-bold fs-2 bg-opacity-50 rounded p-3">
              <h3>{movie.title}</h3>
              <p>IMDb Rating: {movie.imdb_rating}</p>
              <Link to={`/movies/${movie.id}`} className="btn btn-primary mt-auto">
                View Details
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="container mt-5">
        <h1 className="display-4 mb-4 text-center">Welcome to the Modern Movie Database</h1>
        <p className="lead mb-4 text-center">Explore our vast collection of movies across various genres.</p>

        {Object.keys(topGenreMovies).map(genre => (
          <div key={genre} className="genre-section mb-5">
            <h2 className="mb-3">{genre} Movies</h2>
            <div className="row">
              {topGenreMovies[genre].map(movie => (
                <div key={movie.id} className="col-md-3 mb-3">
                  <div className="card h-100 shadow-sm">
                    <img src={movie.images[0] || movie.image_url} className="card-img-top" alt={movie.title} style={{ height: '300px', objectFit: 'cover' }} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">IMDb Rating: {movie.imdb_rating}</p>
                      <Link to={`/movies/${movie.id}`} className="btn btn-primary mt-auto">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <Link to={`/genre/${genre}`} className="btn btn-outline-primary">See All</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;