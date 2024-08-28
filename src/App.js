import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import TheaterSeating from './components/TheaterSeating';
import BookingPage from './components/BookingPage';
import GenrePage from './components/GenrePage';
import Login from './components/login';
import Signup from './components/signup';
import './App.css';
import MovieForm from './components/MovieForm';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/addmovie' element={<MovieForm />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/seating/:id" element={<TheaterSeating />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/genre/:genre" element={<GenrePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;