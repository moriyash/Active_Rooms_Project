// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CampusMapView from './components/CampusMapView/CampusMapView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campus" element={<CampusMapView />} />
          {/* Add more routes later */}
          <Route path="/building/:buildingId" element={<div style={{color: 'white', padding: '2rem'}}>Building View</div>} />
          <Route path="/floor/:floorId" element={<div style={{color: 'white', padding: '2rem'}}>Floor View</div>} />
          <Route path="/reports" element={<div style={{color: 'white', padding: '2rem'}}>Reports </div>} />
          <Route path="/settings" element={<div style={{color: 'white', padding: '2rem'}}>Settings </div>} />
          <Route path="/alerts" element={<div style={{color: 'white', padding: '2rem'}}>Alerts </div>} />
          <Route path="/demo" element={<div style={{color: 'white', padding: '2rem'}}>Demo </div>} />
          <Route path="/help" element={<div style={{color: 'white', padding: '2rem'}}>Help </div>} />
          <Route path="/emergency" element={<div style={{color: 'white', padding: '2rem'}}>Emergency </div>} />
          <Route path="/support" element={<div style={{color: 'white', padding: '2rem'}}>Support </div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;