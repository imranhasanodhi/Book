import React from 'react'
import ReactDOM from 'react-dom/client'

//import the main application 
import App from './App.jsx'

//import css for styling
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Entry of the app */}
    <App />
  </React.StrictMode>,
)
