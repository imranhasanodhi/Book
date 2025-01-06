import { useState } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Rating,
  Button,
  OutlinedInput,
  MenuItem,
  Select,
  Alert,
  Stack,
  Typography,
} from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';

function AddBook() {
  const { alert, post } = useAxios('http://localhost:3000');
  const [rateValue, setRateValue] = useState(3);
  const [book, setBook] = useState({
    author: '',
    name: '',
    genres: [],
    img: '',
    completed: false,
    start: null,
    end: null,
    stars: rateValue,
  });

  const handleGenreChange = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await post('books', { ...book, stars: rateValue });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ my: 2, mx: 'auto', width: '30%' }}>
        {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Add a New Book
        </Typography>
        <TextField
          name="name"
          label="Book Title"
          variant="outlined"
          value={book.name}
          onChange={handleChange}
        />
        <TextField
          name="author"
          label="Author"
          variant="outlined"
          value={book.author}
          onChange={handleChange}
        />
        <TextField
          name="img"
          label="Image URL"
          variant="outlined"
          value={book.img}
          onChange={handleChange}
        />
        <Select
          name="genres"
          multiple
          value={book.genres}
          onChange={handleGenreChange}
          input={<OutlinedInput label="Genres" />}
        >
          {bookGenres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={
            <Checkbox
              name="completed"
              checked={book.completed}
              onChange={handleChange}
            />
          }
          label="Completed"
        />
        <DateField
          name="start"
          label="Start Date"
          value={book.start}
          onChange={(newValue) => setBook({ ...book, start: newValue })}
        />
        <DateField
          name="end"
          label="End Date"
          disabled={!book.completed}
          value={book.end}
          onChange={(newValue) => setBook({ ...book, end: newValue })}
        />
        <Rating
          name="stars"
          value={rateValue}
          onChange={(event, newValue) => setRateValue(newValue)}
          size="large"
        />
        <Button variant="contained" type="submit">
          Add Book
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
