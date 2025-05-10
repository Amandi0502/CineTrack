import React from 'react';
import Typography from '@mui/material/Typography';

const FavoritesPage = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Favorites
      </Typography>
      <Typography variant="body1">
        This page will display the list of your favorite movies.
      </Typography>
    </div>
  );
};

export default FavoritesPage;