import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'; // Optional: Import global styles

// Create a root for the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the Router
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
