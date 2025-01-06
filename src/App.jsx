import { useState, useEffect } from 'react'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';      
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  

import Root from './routes/Root';  
import Books from './routes/Books'; 
import Book from './routes/Book';  
import AddBook from './routes/AddBook'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40',
    },
    secondary: {
      main: '#ffab40',
    },
  },
});

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:3001/books');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]); 
  };

  const router = createBrowserRouter([
    {
      path: '/',  
      element: <Root />,  
      children: [ 
        { 
          path: '/', 
          element: <Books books={books} /> 
        },  
        { 
          path: '/book', 
          element: <Book /> 
        },
        { 
          path: '/addnew', 
          element: <AddBook onBookAdded={handleBookAdded} /> 
        },
      ],
    },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
