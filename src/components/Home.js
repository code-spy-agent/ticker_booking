import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import movieData from '../data/movies.json';

function Home() {
  // Select top 5 rated movies for the carousel
  const topMovies = useMemo(() => 
    movieData
      .sort((a, b) => b.imdbRating - a.imdbRating)
      .slice(0, 5),
    []
  );

  // Extract unique genres and categorize movies
  const genreCategories = useMemo(() => {
    const categories = {};
    movieData.forEach(movie => {
      const genres = movie.Genre.split(', ');
      genres.forEach(genre => {
        if (!categories[genre]) {
          categories[genre] = [];
        }
        categories[genre].push(movie);
      });
    });
    return categories;
  }, []);

  // Select top 4 movies for each genre
  const topGenreMovies = useMemo(() => {
    const top = {};
    Object.keys(genreCategories).forEach(genre => {
      top[genre] = genreCategories[genre]
        .sort((a, b) => b.imdbRating - a.imdbRating)
        .slice(0, 4);
    });
    return top;
  }, [genreCategories]);

  return (
    <div className="home-container">
      <Carousel className="movie-carousel">
        {topMovies.map((movie) => (
          <Carousel.Item key={movie.imdbID}>
            <img
              className="d-block w-100"
              src={movie.Images[1]}
              alt={movie.Title}
              style={{ objectFit: 'cover', height: '70vh' }}
            />
            <Carousel.Caption className="text-white p-5 fw-bold fs-2 bg-opacity-50 rounded p-3">
              <h3>{movie.Title}</h3>
              <p>IMDb Rating: {movie.imdbRating}</p>
              <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary mt-auto">
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
                <div key={movie.imdbID} className="col-md-3 mb-3">
                  <div className="card h-100 shadow-sm">
                    <img src={movie.Images[0]} className="card-img-top" alt={movie.Title} style={{ height: '300px', objectFit: 'cover' }} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{movie.Title}</h5>
                      <p className="card-text">IMDb Rating: {movie.imdbRating}</p>
                      <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary mt-auto">
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