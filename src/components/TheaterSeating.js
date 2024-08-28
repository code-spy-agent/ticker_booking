import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import useMovies from '../hooks/useMovies';
import LoadingSpinner from './LoadingSpinner';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 10;
const SEAT_PRICE = 10;

function TheaterSeating() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { movies, loading, error } = useMovies();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const selectedShowtime = location.state?.selectedShowtime;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && !error) {
        const foundMovie = movies.find(m => m.id === parseInt(id));
        if (foundMovie) {
          setMovie(foundMovie);
        } else {
          navigate('/');
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, movies, loading, error]);

  const handleSeatClick = (row, seat) => {
    const seatId = `${row}${seat}`;
    setSelectedSeats(prevSeats => 
      prevSeats.includes(seatId)
        ? prevSeats.filter(s => s !== seatId)
        : [...prevSeats, seatId]
    );
  };

  const renderSeats = () => {
    return ROWS.map(row => (
      <div key={row} className="d-flex justify-content-center mb-2">
        <div className="seat-row-label me-2">{row}</div>
        {[...Array(SEATS_PER_ROW)].map((_, index) => {
          const seatNumber = index + 1;
          const seatId = `${row}${seatNumber}`;
          return (
            <button
              key={seatId}
              className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
              onClick={() => handleSeatClick(row, seatNumber)}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>
    ));
  };

  const handleContinue = () => {
    navigate(`/booking/${id}`, { state: { selectedSeats, selectedShowtime } });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{movie.title} - Select Your Seats</h2>
      <p className="text-center">Showtime: {selectedShowtime}</p>
      <div className="theater-container">
        <div className="screen mb-4">Screen</div>
        <div className="seats-container">{renderSeats()}</div>
      </div>
      <div className="mt-4 text-center">
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
        <p>Total: ${selectedSeats.length * SEAT_PRICE}</p>
        <button 
          className="btn btn-primary"
          onClick={handleContinue}
          disabled={selectedSeats.length === 0}
        >
          Continue to Snacks
        </button>
      </div>
    </div>
  );
}

export default TheaterSeating;