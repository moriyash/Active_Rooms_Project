// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CampusMapView from './components/CampusMapView/CampusMapView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/campus" replace />} />
          <Route path="/campus" element={<CampusMapView />} />
          {/* Add more routes later */}
          <Route path="/building/:buildingId" element={<div style={{color: 'white', padding: '2rem'}}>Building View - Coming Soon</div>} />
          <Route path="/floor/:floorId" element={<div style={{color: 'white', padding: '2rem'}}>Floor View - Coming Soon</div>} />
          <Route path="/reports" element={<div style={{color: 'white', padding: '2rem'}}>Reports - Coming Soon</div>} />
          <Route path="/settings" element={<div style={{color: 'white', padding: '2rem'}}>Settings - Coming Soon</div>} />
          <Route path="/alerts" element={<div style={{color: 'white', padding: '2rem'}}>Alerts - Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;