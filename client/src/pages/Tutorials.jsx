import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Card, CardContent, Grid, TextField, Typography, MenuItem, Select, CircularProgress } from "@mui/material";
import _ from 'lodash'; // Import lodash for debouncing

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchBodyParts = async () => {
      const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '68b2644d45msh18182d89d8cec6ap1c9d36jsnafec28820f7d',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setBodyParts(['all', ...result]);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch body parts');
      }
    };

    fetchBodyParts();
  }, []);

  const fetchExercises = async (term, bodyPart) => {
    setLoading(true);
    setError(null);

    const url = bodyPart === "all"
      ? `https://exercisedb.p.rapidapi.com/exercises`
      : `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '68b2644d45msh18182d89d8cec6ap1c9d36jsnafec28820f7d',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const filteredResults = result.filter(exercise =>
        exercise.name.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 30); // Limit to 30 exercises
      setExercises(filteredResults);
    } catch (error) {
      console.error(error);
      setExercises([]);
      setError('Failed to fetch exercises');
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    _.debounce((term, bodyPart) => {
      fetchExercises(term, bodyPart);
    }, 500), // Delay of 500ms
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value, selectedBodyPart);
  };

  const handleBodyPartChange = (e) => {
    setSelectedBodyPart(e.target.value);
    debouncedSearch(searchTerm, e.target.value);
  };

  return (
    <Box sx={{ padding: 3, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Search Gym Exercises
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
        <Select
          value={selectedBodyPart}
          onChange={handleBodyPartChange}
          fullWidth
        >
          {bodyParts.map(bodyPart => (
            <MenuItem key={bodyPart} value={bodyPart}>
              {bodyPart}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={() => fetchExercises(searchTerm, selectedBodyPart)} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
        {Array.isArray(exercises) && exercises.map((exercise) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.id}>
            <Card sx={{ maxWidth: 345, margin: 'auto', marginBottom: '20px' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {exercise.name}
                </Typography>
                <Typography color="text.secondary">
                  Category: {exercise.bodyPart}
                </Typography>
                <Typography>
                  Equipment needed: {exercise.equipment}
                </Typography>
                <Typography>
                  Target Muscle: {exercise.target}
                </Typography>
                {exercise.gifUrl && <img src={exercise.gifUrl} alt={exercise.name} style={{ width: '100%', height: 'auto' }} />}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Tutorials;
