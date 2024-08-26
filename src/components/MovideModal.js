import React, { useState } from 'react';

const SEAT_PRICE = 10;
const SNACK_COMBOS = [
  { id: 1, name: 'Popcorn + Soda', price: 8 },
  { id: 2, name: 'Nachos + Soda', price: 10 },
  { id: 3, name: 'Hot Dog + Fries + Soda', price: 12 },
];

function MovieModal({ movie, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCombo, setSelectedCombo] = useState(null);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 30; i++) {
      seats.push(
        <button
          key={i}
          className={`btn btn-sm m-1 ${selectedSeats.includes(i) ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleSeatClick(i)}
        >
          {i}
        </button>
      );
    }
    return seats;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h6>Select Your Seats:</h6>
            <div className="seat-selection">{renderSeats()}</div>
            <p className="mt-3">Selected Seats: {selectedSeats.join(', ')}</p>
          </>
        );
      case 2:
        return (
          <>
            <h6>Choose a Snack Combo:</h6>
            {SNACK_COMBOS.map(combo => (
              <button
                key={combo.id}
                className={`btn btn-outline-primary m-2 ${selectedCombo === combo.id ? 'active' : ''}`}
                onClick={() => setSelectedCombo(combo.id)}
              >
                {combo.name} - ${combo.price}
              </button>
            ))}
          </>
        );
      case 3:
        const seatsCost = selectedSeats.length * SEAT_PRICE;
        const comboCost = selectedCombo ? SNACK_COMBOS.find(c => c.id === selectedCombo).price : 0;
        const totalCost = seatsCost + comboCost;

        return (
          <>
            <h6>Booking Summary:</h6>
            <p>Movie: {movie.Title}</p>
            <p>Seats: {selectedSeats.join(', ')} (${seatsCost})</p>
            <p>Snack Combo: {selectedCombo ? SNACK_COMBOS.find(c => c.id === selectedCombo).name : 'None'} (${comboCost})</p>
            <h5>Total: ${totalCost}</h5>
            <button className="btn btn-success mt-3" onClick={() => alert('Payment processed successfully!')}>
              Proceed to Payment
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{movie.Title} - Booking</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <img src={movie.Images[0]} className="img-fluid rounded" alt={movie.Title} />
              </div>
              <div className="col-md-8">
                {renderStepContent()}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {step > 1 && (
              <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            {step < 3 && (
              <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;