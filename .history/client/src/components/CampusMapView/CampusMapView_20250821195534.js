// client/src/components/CampusMapView/CampusMapView.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api';
import BuildingButton from '../BuildingButton/BuildingButton';
import './CampusMapView.css';

const CampusMapView = () => {
  const [buildings, setBuildings] = useState([]);
  const [sensorsStatus, setSensorsStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCampusData();
    // Update sensors status every 30 seconds
    const interval = setInterval(loadSensorsStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadCampusData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [buildingsData, statusData] = await Promise.all([
        ApiService.getAllBuildings(),
        ApiService.getAllSensorsStatus()
      ]);
      
      // Buildings already have floorCount and sensorCount in mock data
      const enhancedBuildings = buildingsData.map(building => ({
        ...building,
        // Ensure mapX/mapY exist, with fallbacks
        mapX: building.mapX || (Math.random() * 60 + 20),
        mapY: building.mapY || (Math.random() * 60 + 20)
      }));
      
      setBuildings(enhancedBuildings);
      setSensorsStatus(statusData);
    } catch (err) {
      setError('שגיאה בטעינת נתוני הקמפוס');
      console.error('Error loading campus data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSensorsStatus = async () => {
    try {
      const statusData = await ApiService.getAllSensorsStatus();
      setSensorsStatus(statusData);
    } catch (err) {
      console.error('Error loading sensors status:', err);
    }
  };

  const handleBuildingClick = (buildingId) => {
    navigate(`/building/${buildingId}`);
  };

  const getBuildingStatus = (building) => {
    // Get sensors for this building by checking all floors
    const buildingSensors = Object.values(sensorsStatus).filter(sensor => {
      // Check if sensor belongs to any floor of this building
      const sensor_area_id = sensor.areaId;
      // In mock data, floors have IDs like 11,12,13 for building 1, 21,22,23 for building 2
      return Math.floor(sensor_area_id / 10) === building.id;
    });
    
    if (buildingSensors.length === 0) return 'unknown';
    
    const activeSensors = buildingSensors.filter(sensor => sensor.status === 'active');
    const alertSensors = buildingSensors.filter(sensor => sensor.alert);
    
    if (alertSensors.length > 0) return 'alert';
    if (activeSensors.length > 0) return 'active';
    return 'inactive';
  };

  const getOverallStats = () => {
    const sensorsArray = Object.values(sensorsStatus);
    const totalSensors = sensorsArray.length;
    const activeSensors = sensorsArray.filter(s => s.status === 'active').length;
    const alertSensors = sensorsArray.filter(s => s.alert).length;
    
    return {
      totalBuildings: buildings.length,
      totalSensors,
      activeSensors,
      alertSensors
    };
  };

  const handleImageLoad = () => {
    setMapLoaded(true);
  };

  const handleImageError = () => {
    console.warn('Campus map image failed to load');
    setMapLoaded(true); // Still show the interface
  };

  if (loading) {
    return (
      <div className="campus-map-view">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>טוען נתוני קמפוס...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="campus-map-view">
        <div className="error-container">
          <div className="error-icon">🏛️</div>
          <p className="error-message">{error}</p>
          <button onClick={loadCampusData} className="retry-button">
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  const stats = getOverallStats();

  return (
    <div className="campus-map-view">
      {/* Header Section */}
      <div className="campus-header">
        <div className="campus-title">
          <h1>🏛️ מפת הקמפוס החכם</h1>
          <p>מערכת ניטור וניהול בזמן אמת</p>
        </div>
        
        <div className="campus-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <span className="stat-number">{stats.totalBuildings}</span>
            <span className="stat-label">בניינים</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <span className="stat-number">{stats.activeSensors}</span>
            <span className="stat-label">סנסורים פעילים</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <span className="stat-number">{stats.totalSensors}</span>
            <span className="stat-label">סה"כ סנסורים</span>
          </div>
          {stats.alertSensors > 0 && (
            <div className="stat-card alert">
              <div className="stat-icon">⚠️</div>
              <span className="stat-number">{stats.alertSensors}</span>
              <span className="stat-label">התראות</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Map Section */}
      <div className="campus-map-container">
        <div className="map-header">
          <h2>מפת הקמפוס</h2>
          <div className="map-controls">
            <div className="live-indicator">
              <span className="pulse-dot"></span>
              נתונים בזמן אמת
            </div>
          </div>
        </div>

        <div className="campus-map">
          {/* Background Image */}
          <div className="campus-background">
            <img 
              src="/assets/images/campus-map.jpg" 
              alt="מפת קמפוס"
              className={`campus-image ${mapLoaded ? 'loaded' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {!mapLoaded && (
              <div className="image-placeholder">
                <div className="placeholder-icon">🗺️</div>
                <p>מפת הקמפוס</p>
              </div>
            )}
          </div>
          
          {/* Building Buttons Overlay */}
          <div className="buildings-overlay">
            {buildings.map((building) => (
              <BuildingButton
                key={building.id}
                building={building}
                status={getBuildingStatus(building)}
                onClick={() => handleBuildingClick(building.id)}
                position={{
                  x: building.mapX,
                  y: building.mapY
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="map-legend">
            <h3>מקרא</h3>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-color active"></span>
                <span>פעיל</span>
              </div>
              <div className="legend-item">
                <span className="legend-color alert"></span>
                <span>התראה</span>
              </div>
              <div className="legend-item">
                <span className="legend-color inactive"></span>
                <span>לא פעיל</span>
              </div>
              <div className="legend-item">
                <span className="legend-color unknown"></span>
                <span>לא ידוע</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buildings List */}
      <div className="buildings-list">
        <h2>רשימת בניינים</h2>
        <div className="buildings-grid">
          {buildings.map((building) => (
            <div 
              key={building.id} 
              className={`building-card ${getBuildingStatus(building)}`}
              onClick={() => handleBuildingClick(building.id)}
            >
              <div className="building-card-header">
                <h3>{building.name}</h3>
                <div className={`status-indicator ${getBuildingStatus(building)}`}>
                  {getBuildingStatus(building) === 'active' && '🟢'}
                  {getBuildingStatus(building) === 'alert' && '🔴'}
                  {getBuildingStatus(building) === 'inactive' && '🟡'}
                  {getBuildingStatus(building) === 'unknown' && '⚪'}
                </div>
              </div>
              
              {building.description && (
                <p className="building-description">{building.description}</p>
              )}
              
              <div className="building-stats">
                <div className="building-stat">
                  <span className="stat-label">קומות:</span>
                  <span className="stat-value">{building.floorCount}</span>
                </div>
                <div className="building-stat">
                  <span className="stat-label">סנסורים:</span>
                  <span className="stat-value">{building.sensorCount}</span>
                </div>
              </div>
              
              <div className="building-action">
                <span>צפה בפרטים →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>פעולות מהירות</h2>
        <div className="actions-grid">
          <button className="action-button" onClick={() => navigate('/reports')}>
            <span className="action-icon">📊</span>
            <span>דוחות</span>
          </button>
          <button className="action-button" onClick={() => navigate('/settings')}>
            <span className="action-icon">⚙️</span>
            <span>הגדרות</span>
          </button>
          <button className="action-button" onClick={() => navigate('/alerts')}>
            <span className="action-icon">🔔</span>
            <span>התראות</span>
          </button>
          <button className="action-button" onClick={() => window.location.reload()}>
            <span className="action-icon">🔄</span>
            <span>רענן</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampusMapView;