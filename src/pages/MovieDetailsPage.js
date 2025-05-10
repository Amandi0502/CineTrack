import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { useFavorites } from '../hooks/useFavorites';
import TrailerModal from '../components/TrailerModal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { getMovieDetails, loading, error } = useMovies();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites(movie);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await getMovieDetails(id);
      setMovie(details);
      
      // Find trailer video
      if (details && details.videos && details.videos.results) {
        const trailer = details.videos.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      }
    };
    
    fetchMovieDetails();
  }, [id, getMovieDetails]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" sx={{ mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  if (!movie) {
    return (
      <Typography variant="h6" sx={{ mt: 4 }}>
        Movie not found
      </Typography>
    );
  }

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Grid container spacing={4}>
        {/* Movie Poster */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'relative' }}>
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-poster.jpg'}
              alt={movie.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
              <IconButton
                onClick={toggleFavorite}
                sx={{ 
                  bgcolor: 'rgba(0,0,0,0.6)', 
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                }}
              >
                {isFavorite ? 
                  <FavoriteIcon color="error" /> : 
                  <FavoriteBorderIcon sx={{ color: 'white' }} />
                }
              </IconButton>
            </Box>
          </Box>
        </Grid>
        
        {/* Movie Details */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {movie.title} {movie.release_date && `(${new Date(movie.release_date).getFullYear()})`}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating 
              value={movie.vote_average / 2} 
              precision={0.5} 
              readOnly 
              sx={{ mr: 1 }} 
            />
            <Typography variant="body2">
              {movie.vote_average}/10 ({movie.vote_count} votes)
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {movie.genres && movie.genres.map(genre => (
              <Chip key={genre.id} label={genre.name} size="small" />
            ))}
          </Box>
          
          {trailerKey && (
            <Button 
              variant="contained" 
              startIcon={<PlayArrowIcon />} 
              onClick={() => setIsTrailerOpen(true)}
              sx={{ mb: 3 }}
            >
              Watch Trailer
            </Button>
          )}
          
          <Typography variant="h6" gutterBottom>Overview</Typography>
          <Typography paragraph>{movie.overview}</Typography>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Additional Movie Info */}
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <Typography variant="subtitle2">Release Date</Typography>
                          </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="subtitle2">Runtime</Typography>
              <Typography>{movie.runtime} minutes</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="subtitle2">Budget</Typography>
              <Typography>${movie.budget.toLocaleString()}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <TrailerModal
        open={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        videoKey={trailerKey}
      />
    </Paper>
  );
};

export default MovieDetailsPage;