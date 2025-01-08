import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardMedia, Box, Typography, Chip, Rating, Button } from '@mui/material';
import { useEffect, useState } from 'react';

function SinglePage() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      const response = await fetch(`http://localhost:3000/books/${bookId}`);
      const data = await response.json();
      setBook(data);
    };
    fetchBookDetails();
  }, [bookId]);

  if (!book) return <div>Loading...</div>;

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', my: 3 }}>
      <CardMedia
        sx={{ height: 400 }}
        image={book.img || '/images/default-book.jpg'}
        title={book.name}
      />
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h2">{book.name}</Typography>
        <Typography variant="subtitle1" gutterBottom>{book.author}</Typography>
        <Box>
          {book.genres.map((genre, index) => (
            <Chip key={index} label={genre} variant="outlined" size="small" sx={{ mr: 1 }} />
          ))}
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Start Date:</strong> {book.start}
        </Typography>
        <Typography variant="body1">
          <strong>End Date:</strong> {book.end}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Rating value={book.stars} readOnly sx={{ mr: 2 }} />
          <Button variant="contained" onClick={handleGoBack}>
            Go Back
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default SinglePage;
