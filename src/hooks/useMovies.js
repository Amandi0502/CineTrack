import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [genres, setGenres] = useState([]);
  
  // Fetch movie genres when the hook is first used
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
          params: {
            api_key: API_KEY,
          }
        });
        setGenres(response.data.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    
    fetchGenres();
  }, []);

  const searchMovies = useCallback(async (query, filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      let endpoint = query ? `${BASE_URL}/search/movie` : `${BASE_URL}/movie/popular`;
      
      const params = {
        api_key: API_KEY,
        page: 1, // Reset to page 1 for new searches
        language: 'en-US',
        include_adult: false,
      };
      
      // Add search query if provided
      if (query) {
        params.query = query;
      }
      
      // Add filters if provided
      if (filters.genre) {
        params.with_genres = filters.genre;
      }
      
      if (filters.year) {
        params.primary_release_year = filters.year;
      }
      
      if (filters.minRating !== undefined) {
        params.vote_average_gte = filters.minRating;
      }
      
      if (filters.maxRating !== undefined) {
        params.vote_average_lte = filters.maxRating;
      }
      
      const response = await axios.get(endpoint, { params });
      
      setMovies(response.data.results);
      setPage(1);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError(err.message || 'Failed to fetch movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async (query, filters = {}) => {
    if (page >= totalPages) return;
    
    setLoading(true);
    
    try {
      const nextPage = page + 1;
      let endpoint = query ? `${BASE_URL}/search/movie` : `${BASE_URL}/movie/popular`;
      
      const params = {
        api_key: API_KEY,
        page: nextPage,
        language: 'en-US',
        include_adult: false,
      };
      
      // Add search query if provided
      if (query) {
        params.query = query;
      }
      
      // Add filters if provided
      if (filters.genre) {
        params.with_genres = filters.genre;
      }
      
      if (filters.year) {
        params.primary_release_year = filters.year;
      }
      
      if (filters.minRating !== undefined) {
        params.vote_average_gte = filters.minRating;
      }
      
      if (filters.maxRating !== undefined) {
        params.vote_average_lte = filters.maxRating;
      }
      
      const response = await axios.get(endpoint, { params });
      
      setMovies(prevMovies => [...prevMovies, ...response.data.results]);
      setPage(nextPage);
    } catch (err) {
      setError(err.message || 'Failed to load more movies');
    } finally {
      setLoading(false);
    }
  }, [page, totalPages]);

  const getMovieDetails = useCallback(async (movieId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          append_to_response: 'videos,credits',
        }
      });
      
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch movie details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const hasMorePages = page < totalPages;

  return {
    movies,
    loading,
    error,
    searchMovies,
    loadMore,
    getMovieDetails,
    hasMorePages,
    genres,
  };
};