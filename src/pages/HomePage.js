import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import MovieFilters from '../components/MovieFilters';
import { useMovies } from '../hooks/useMovies';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const HomePage = () => {
  const { movies, loading, error, searchMovies, loadMore, hasMorePages, genres } = useMovies();
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('lastSearch') || '';
  });
  const [activeFilters, setActiveFilters] = useState({
    genre: '',
    year: '',
    minRating: 0,
    maxRating: 10,
  });

  // Initial load of popular movies or last search
  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      setSearchQuery(lastSearch);
      searchMovies(lastSearch, activeFilters);
    } else {
      searchMovies('', activeFilters); // Load popular movies
    }
  }, [searchMovies]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchMovies(query, activeFilters);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    searchMovies(searchQuery, filters);
  };

  const handleLoadMore = () => {
    loadMore(searchQuery, activeFilters);
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
        {searchQuery ? `Search Results: "${searchQuery}"` : 'Popular Movies'}
      </Typography>
      
      <SearchBar onSearch={handleSearch} />
      
      <MovieFilters genres={genres} onApplyFilters={handleApplyFilters} />
      
      <MovieGrid movies={movies} loading={loading} error={error} />
      
      {hasMorePages && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleLoadMore} 
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </div>
  );
};

export default HomePage;