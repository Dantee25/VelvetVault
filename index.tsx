import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import HomePage from './src/components/home'; // Import your HomePage component
import ServicesPage from './src/components/services'; // Import your ServicesPage component
import reportWebVitals from './src/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define routes for your app */}
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// Measure performance
reportWebVitals();