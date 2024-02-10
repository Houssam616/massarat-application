import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the App component
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>,
  document.getElementById('root') // Render inside the root div in your HTML
);
