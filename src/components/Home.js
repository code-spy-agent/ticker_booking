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

  // Extract unique genres from the movie data
  const genres = useMemo(() => {
    const allGenres = movieData.flatMap(movie => movie.Genre.split(', '));
    return [...new Set(allGenres)].sort();
  }, []);

  // Select the first 8 genres for featured categories
  const featuredGenres = genres.slice(0, 8);

  // Select a random movie for the featured section
  const featuredMovie = useMemo(() => 
    movieData[Math.floor(Math.random() * movieData.length)],
    []
  );

  // Calculate some statistics
  const stats = useMemo(() => ({
    totalMovies: movieData.length,
    avgRating: (movieData.reduce((sum, movie) => sum + parseFloat(movie.imdbRating), 0) / movieData.length).toFixed(1),
    totalGenres: genres.length,
  }), [genres]);

  return (
    <div className="home-container"> {/* Add pt-5 class here */}
      <Carousel className="movie-carousel">
        {topMovies.map((movie) => (
          <Carousel.Item key={movie.imdbID}>
            <img
              className="d-block w-100"
              src={movie.Images[1]}
              alt={movie.Title}
            />
            <Carousel.Caption>
              <h3>{movie.Title}</h3>
              <p>IMDb Rating: {movie.imdbRating}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="container">
        <h1 className="display-4 mb-4 pt-5 text-center">Welcome to the Modern Movie Database</h1>
        <p className="lead mb-4 text-center">Explore our vast collection of movies, from classics to the latest releases.</p>
        
        <div className="row mb-5 pt-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"><i className="fas fa-film me-2"></i>Extensive Collection</h5>
                <p className="card-text">Browse through thousands of movies across various genres and eras.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"><i className="fas fa-star me-2"></i>Ratings & Reviews</h5>
                <p className="card-text">Get insights from IMDb ratings and user reviews for each movie.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"><i className="fas fa-info-circle me-2"></i>Detailed Information</h5>
                <p className="card-text">Access comprehensive details including cast, crew, plot, and more.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-5">
          <Link to="/movies" className="btn btn-primary btn-lg">
            Browse Movies
          </Link>
        </div>

        <div className="featured-movie mb-5 pt-5">
          <h2 className="text-center mb-4">Featured Movie</h2>
          <div className="card">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={featuredMovie.Poster} className="img-fluid rounded-start" alt={featuredMovie.Title} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{featuredMovie.Title}</h5>
                  <p className="card-text">{featuredMovie.Plot}</p>
                  <p className="card-text"><small className="text-muted">IMDb Rating: {featuredMovie.imdbRating}</small></p>
                  <Link to={`/movies/${featuredMovie.imdbID}`} className="btn btn-outline-primary">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="genre-cloud mb-5 pt-5">
          <h2 className="text-center mb-4">Explore Genres</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {genres.map((genre) => (
              <Link 
                key={genre} 
                to={`/movies?genre=${genre}`} 
                className="btn btn-outline-secondary m-1"
                style={{fontSize: `${1 + Math.random()}rem`}}
              >
                {genre}
              </Link>
            ))}
          </div>
        </div>

        <div className="movie-stats mb-5 pt-5">
          <h2 className="text-center mb-4">Movie Database Stats</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <h3>{stats.totalMovies}</h3>
              <p>Total Movies</p>
            </div>
            <div className="col-md-4">
              <h3>{stats.avgRating}</h3>
              <p>Average IMDb Rating</p>
            </div>
            <div className="col-md-4">
              <h3>{stats.totalGenres}</h3>
              <p>Unique Genres</p>
            </div>
          </div>
        </div>

        <div className="featured-categories pt-5">
          <h2 className="text-center mb-4">Featured Categories</h2>
          <div className="row">
            {featuredGenres.map((genre) => (
              <div key={genre} className="col-md-3 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{genre}</h5>
                    <Link to={`/movies?genre=${genre}`} className="btn btn-outline-primary">Explore</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;