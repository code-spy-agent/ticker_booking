import axios from 'axios';

const API_BASE_URL = 'https://movie-backend-mcn9.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchMovies = async () => {
  try {
    const response = await api.get('/movies');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieById = async (id) => {
  try {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
};

// Add more API calls as needed

export default api;
