import { createBrowserRouter, RouterProvider } from 'react-router-dom'; //importing routing things from package
import { createTheme, ThemeProvider } from '@mui/material/styles';      //importing css modules(for theme)
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // for date picking
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  //for changing date in date pickers

//importing route componennts  for app routing structure
import Root from './routes/Root';  // for layout
import Books from './routes/Books'; // components for displaying books
import Book from './routes/Book';  // component for every book
import AddBook from './routes/AddBook'; // component for adding new book

// define material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40', // primary color for the app
    },
    secondary: {
      main: '#ffab40', // secondary color
    },
  },
});

// main application component
function App() {
  //define routes and paths
  const router = createBrowserRouter([
    {
      path: '/',  // root path
      element: <Root />,  // layout component for root path
      // for outlet
      children: [ 
        { path: '/', element: <Books /> },  //route for displayinfg book list
        { path: '/book', element: <Book /> },  //for viewing single book
        { path: '/addnew', element: <AddBook /> }, // route for adding new book
      ],
    },
  ]);

  // return providers.
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

//export the main app component
export default App;
