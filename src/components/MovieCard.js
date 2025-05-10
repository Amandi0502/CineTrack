import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useFavorites } from '../hooks/useFavorites';

const MovieCard = ({ movie }) => {
  const { isFavorite, toggleFavorite } = useFavorites(movie);
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="300"
        image={movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : '/no-poster.jpg'}
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Chip 
            label={`${movie.vote_average}/10`} 
            size="small" 
            color={movie.vote_average >= 7 ? "success" : "primary"}
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {movie.release_date && new Date(movie.release_date).getFullYear()}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {movie.overview && movie.overview.length > 120
            ? `${movie.overview.substring(0, 120)}...`
            : movie.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={RouterLink} to={`/movie/${movie.id}`}>
          View Details
        </Button>
        <Box sx={{ ml: 'auto' }}>
          <IconButton 
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={() => toggleFavorite()}
            color={isFavorite ? "error" : "default"}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default MovieCard;