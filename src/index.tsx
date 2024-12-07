import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot for React 18
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import './index.css'; // Optional: for global styles
import Home from './components/home'; // Import your Home component
import Services from './components/services'; // Import your Services component

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define your routes for navigation */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
