import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import FilterListIcon from '@mui/icons-material/FilterList';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 70 }, (_, i) => CURRENT_YEAR - i);

const MovieFilters = ({ genres, onApplyFilters }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [ratingRange, setRatingRange] = useState([0, 10]);
  
  const handleApplyFilters = () => {
    onApplyFilters({
      genre: selectedGenre,
      year: selectedYear,
      minRating: ratingRange[0],
      maxRating: ratingRange[1]
    });
  };
  
  const handleResetFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setRatingRange([0, 10]);
    onApplyFilters({ genre: '', year: '', minRating: 0, maxRating: 10 });
  };

  return (
    <Accordion sx={{ mb: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="filter-content"
        id="filter-header"
      >
        <FilterListIcon sx={{ mr: 1 }} />
        <Typography>Filter Movies</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="genre-select-label">Genre</InputLabel>
              <Select
                labelId="genre-select-label"
                id="genre-select"
                value={selectedGenre}
                label="Genre"
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <MenuItem value="">All Genres</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <MenuItem value="">All Years</MenuItem>
                {YEARS.map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ px: 2, pt: 1 }}>
            <Typography id="rating-slider" gutterBottom>
              Rating Range: {ratingRange[0]} - {ratingRange[1]}
            </Typography>
            <Slider
              value={ratingRange}
              onChange={(e, newValue) => setRatingRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              step={0.5}
              marks={[
                { value: 0, label: '0' },
                { value: 5, label: '5' },
                { value: 10, label: '10' },
              ]}
              aria-labelledby="rating-slider"
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <Button onClick={handleResetFilters} variant="outlined">
              Reset
            </Button>
            <Button onClick={handleApplyFilters} variant="contained">
              Apply Filters
            </Button>
          </Box>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

export default MovieFilters;