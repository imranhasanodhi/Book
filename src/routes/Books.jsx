import { useEffect, useState } from 'react';
import useAxios from "../services/useAxios";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
} from '@mui/material';

function Books() {
  const { data, loading, get } = useAxios('http://localhost:3000');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (data) {
      setBooks(data);
      setFilteredBooks(data);
    }
  }, [data]);

  const fetchBooks = async () => {
    await get('books');
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredBooks(
      books.filter(
        (book) =>
          book.name.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genres.some((genre) => genre.toLowerCase().includes(query))
      )
    );
  };

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {loading && <CircularProgress />}

      {!loading && (
        <>
          <TextField
            label="Search Books"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by title, author, or genre"
            sx={{ mb: 3 }}
          />

          {filteredBooks.length > 0 ? (
            <Stack
              sx={{ justifyContent: 'space-around' }}
              spacing={{ xs: 1 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              {filteredBooks.map((book) => (
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '15%',
                    minWidth: 200,
                  }}
                  key={book.name}
                >
                  <CardMedia
                    sx={{ height: 250 }}
                    image={book.img ? book.img : '/images/default-book.jpg'}  
                    title={book.name}
                  />
                  <Box sx={{ pt: 2, pl: 2 }}>
                    {book.genres.map((genre, i) => (
                      <Chip
                        key={i}
                        label={genre}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.author}
                    </Typography>
                  </Box>
                  <CardActions
                    sx={{
                      justifyContent: 'space-between',
                      mt: 'auto',
                      pl: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={Number(book.stars)}
                      readOnly
                      size="small"
                    />
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          ) : (
            <Typography variant="h6" color="text.secondary" align="center">
              No books found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default Books;
