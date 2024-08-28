import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import useMovies from '../hooks/useMovies';
import TicketPDF from './TicketPDF';
import TheaterSeating from './TheaterSeating';
import LoadingSpinner from './LoadingSpinner';

const SEAT_PRICE = 10;
const GST_RATE = 0.18; // 18% GST
const SNACK_COMBOS = [
  { id: null, name: 'None', price: 0 },
  { id: 1, name: 'Popcorn + Soda', price: 8 },
  { id: 2, name: 'Nachos + Soda', price: 10 },
  { id: 3, name: 'Hot Dog + Fries + Soda', price: 12 },
];

const SHOWTIMES = [
  '10:00 AM',
  '1:00 PM',
  '4:00 PM',
  '7:00 PM',
  '10:00 PM'
];

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { movies, loading, error } = useMovies();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [step, setStep] = useState(1);
  const [bookingCode, setBookingCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [address] = useState('123 Movie Theater St, Cityville, ST 12345');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !error) {
      const foundMovie = movies.find(m => m.id === parseInt(id));
      if (foundMovie) {
        setMovie(foundMovie);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate, movies, loading, error]);

  useEffect(() => {
    if (location.state?.selectedSeats && location.state?.selectedShowtime) {
      setSelectedSeats(location.state.selectedSeats);
      setSelectedShowtime(location.state.selectedShowtime);
      setStep(3); // Move to snack selection after seat selection
    }
  }, [location.state]);

  useEffect(() => {
    if (bookingCode) {
      QRCode.toDataURL(bookingCode).then(setQrCodeUrl).catch(console.error);
    }
  }, [bookingCode]);

  const handleShowtimeSelection = (showtime) => {
    setSelectedShowtime(showtime);
    navigate(`/seating/${id}`, { state: { selectedShowtime: showtime } });
  };

  const handleComboSelection = (comboId) => {
    setSelectedCombo(comboId);
  };

  const calculateTotal = () => {
    const ticketCost = selectedSeats.length * SEAT_PRICE;
    const snackCost = selectedCombo !== null ? SNACK_COMBOS.find(c => c.id === selectedCombo)?.price || 0 : 0;
    const subtotal = ticketCost + snackCost;
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;
    return {
      ticketCost,
      snackCost,
      subtotal,
      gst,
      total
    };
  };

  const generateBookingCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setBookingCode(code);
    return code;
  };

  const handlePayment = async () => {
    const code = generateBookingCode();
    try {
      await saveBookingToDatabase();
      alert(`Payment processed successfully! Your booking code is: ${code}`);
      setStep(5);
    } catch (error) {
      alert('Failed to process payment. Please try again.');
    }
  };

  const renderShowtimeSelection = () => (
    <div className="showtime-selection">
      <h3>Select a Showtime</h3>
      <div className="row">
        {SHOWTIMES.map((showtime, index) => (
          <div key={index} className="col-md-4 mb-3">
            <button
              className={`btn btn-outline-primary w-100 ${selectedShowtime === showtime ? 'active' : ''}`}
              onClick={() => handleShowtimeSelection(showtime)}
            >
              {showtime}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSnackSelection = () => (
    <div className="snack-selection">
      <h3>Choose a Snack Combo</h3>
      <div className="row">
        {SNACK_COMBOS.map(combo => (
          <div key={combo.id ?? 'none'} className="col-md-3 mb-3">
            <div 
              className={`card ${selectedCombo === combo.id ? 'border-primary' : ''}`}
              onClick={() => handleComboSelection(combo.id)}
              style={{cursor: 'pointer'}}
            >
              <div className="card-body">
                <h5 className="card-title">{combo.name}</h5>
                <p className="card-text">${combo.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={() => setStep(4)}>
        Continue to Summary
      </button>
    </div>
  );

  const renderBookingSummary = () => {
    const { ticketCost, snackCost, subtotal, gst, total } = calculateTotal();
    return (
      <div className="booking-summary">
        <h3 className="mb-4">Booking Summary</h3>
        <div className="row">
          <div className="col-md-4">
            {movie && movie.images && movie.images.length > 0 && (
              <img src={movie.images[0]} alt={movie.title} className="img-fluid mb-3" />
            )}
          </div>
          <div className="col-md-8">
            <p><strong>Movie:</strong> {movie?.title}</p>
            <p><strong>Showtime:</strong> {selectedShowtime}</p>
            <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
            <p><strong>Snack Combo:</strong> {SNACK_COMBOS.find(c => c.id === selectedCombo)?.name || 'None'}</p>
            <hr />
            <p><strong>Ticket Cost:</strong> ${ticketCost.toFixed(2)}</p>
            <p><strong>Snack Cost:</strong> ${snackCost.toFixed(2)}</p>
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            <p><strong>GST (18%):</strong> ${gst.toFixed(2)}</p>
            <h4><strong>Total:</strong> ${total.toFixed(2)}</h4>
            <button className="btn btn-success mt-3" onClick={handlePayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderBookingConfirmation = () => (
    <div className="booking-confirmation">
      <h3>Booking Confirmed!</h3>
      <p>Your booking code is: <strong>{bookingCode}</strong></p>
      <div className="qr-code-container mt-3 mb-3">
        <QRCodeSVG 
          value={bookingCode} 
          size={200} 
          bgColor={"#ffffff"} 
          fgColor={"#000000"} 
          level={"L"} 
          includeMargin={false}
        />
      </div>
      <p>Please show this QR code at the theater for verification.</p>
      {qrCodeUrl && movie && (
        <PDFDownloadLink
          document={
            <TicketPDF
              movie={movie}
              showTime={selectedShowtime}
              address={address}
              bookingCode={bookingCode}
              qrCodeUrl={qrCodeUrl}
            />
          }
          fileName={`ticket_${bookingCode}.pdf`}
          className="btn btn-primary mt-3"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Generating PDF...' : 'Download PDF Ticket'
          }
        </PDFDownloadLink>
      )}
    </div>
  );

  const saveBookingToDatabase = async () => {
    try {
      const bookingData = {
        movieId: id,
        movieTitle: movie.title,
        showtime: selectedShowtime,
        seats: selectedSeats,
        snackCombo: SNACK_COMBOS.find(combo => combo.id === selectedCombo),
        totalPrice: calculateTotal().total,
        bookingCode: bookingCode,
        userId: 'user_id_here', // Replace with actual user ID when authentication is implemented
        bookingDate: new Date().toISOString()
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to save booking');
      }

      const result = await response.json();
      console.log('Booking saved:', result);
      // You can add additional logic here, such as showing a success message
    } catch (error) {
      console.error('Error saving booking:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleConfirmBooking = () => {
    const newBookingCode = generateBookingCode();
    setBookingCode(newBookingCode);
    saveBookingToDatabase(); // Add this line
    setStep(5);
  };

  useEffect(() => {
    // Simulating an API call or data loading
    const fetchData = async () => {
      try {
        // Your data fetching logic here
        // For example: await fetchBookingData();
        
        // Simulating a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{movie.title} - Booking</h2>
      {step === 1 && renderShowtimeSelection()}
      {step === 2 && (
        <TheaterSeating
          movieId={id}
          selectedShowtime={selectedShowtime}
          onContinue={(seats) => {
            setSelectedSeats(seats);
            setStep(3);
          }}
        />
      )}
      {step === 3 && renderSnackSelection()}
      {step === 4 && renderBookingSummary()}
      {step === 5 && renderBookingConfirmation()}
    </div>
  );
}

export default BookingPage;