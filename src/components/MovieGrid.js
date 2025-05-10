import React from 'react';
import Grid from '@mui/material/Grid';
import MovieCard from './MovieCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const MovieGrid = ({ movies, loading, error }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography color="error" variant="h6" align="center">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6" align="center">
          No movies found. Try another search.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;