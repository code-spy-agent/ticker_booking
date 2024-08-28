import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  console.log(movies)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return { movies, loading, error };
};

export default useMovies;
