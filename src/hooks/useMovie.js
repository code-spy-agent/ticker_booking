import { useState, useEffect } from 'react';
import useMovies from './useMovies';

function useMovie(id) {
  const { movies, loading, error } = useMovies();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movies.length > 0 && id) {
      const foundMovie = movies.find(m => m.id === parseInt(id));
      setMovie(foundMovie || null);
    }
  }, [movies, id]);

  return { movie, loading, error };
}

export default useMovie;
