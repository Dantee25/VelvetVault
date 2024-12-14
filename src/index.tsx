import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot for React 18
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import './index.css'; // Import global styles
import Home from './components/home'; // Import Home component
import Services from './components/services'; // Import Services component

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

