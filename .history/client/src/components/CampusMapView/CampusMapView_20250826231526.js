import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api';
import './CampusMapView.css';

const CampusMapView = () => {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [sensorsStatus, setSensorsStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const demoBuildings = [
    {
      id: 1,
      name: 'בניין מחשבים',
      description: 'בניין מחלקת מדעי המחשב',
      imageUrl: '/assets/images/building-computers.jpg',
      floors: [
        { 
          id: 11, 
          name: 'קומה 1', 
          floorImageUrl: '/assets/images/floor-1-computers.jpg',
          sensors: [
            { id: 111, name: 'חדר 101', x: 20, y: 30, occupied: true, count: 15, maxCapacity: 30 },
            { id: 112, name: 'חדר 102', x: 60, y: 30, occupied: false, count: 0, maxCapacity: 25 },
            { id: 113, name: 'חדר 103', x: 40, y: 70, occupied: true, count: 8, maxCapacity: 20 }
          ]
        },
        { 
          id: 12, 
          name: 'קומה 2', 
          floorImageUrl: '/assets/images/floor-2-computers.jpg',
          sensors: [
            { id: 121, name: 'חדר 201', x: 25, y: 40, occupied: true, count: 12, maxCapacity: 30 },
            { id: 122, name: 'חדר 202', x: 65, y: 25, occupied: true, count: 18, maxCapacity: 25 },
            { id: 123, name: 'חדר 203', x: 45, y: 65, occupied: false, count: 0, maxCapacity: 20 }
          ]
        },
        { 
          id: 13, 
          name: 'קומה 3', 
          floorImageUrl: '/assets/images/floor-3-computers.jpg',
          sensors: [
            { id: 131, name: 'מעבדה A', x: 30, y: 35, occupied: true, count: 22, maxCapacity: 40 },
            { id: 132, name: 'מעבדה B', x: 70, y: 35, occupied: false, count: 0, maxCapacity: 40 },
            { id: 133, name: 'חדר מרצים', x: 50, y: 75, occupied: true, count: 5, maxCapacity: 10 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'בניין עיצוב',
      description: 'בניין מחלקת עיצוב תעשייתי',
      imageUrl: '/assets/images/building-design.jpg',
      floors: [
        { 
          id: 21, 
          name: 'קומה 1', 
          floorImageUrl: '/assets/images/floor-1-design.jpg',
          sensors: [
            { id: 211, name: 'סטודיו 1', x: 25, y: 25, occupied: true, count: 20, maxCapacity: 35 },
            { id: 212, name: 'סטודיו 2', x: 75, y: 25, occupied: true, count: 16, maxCapacity: 30 },
            { id: 213, name: 'חדר כלים', x: 50, y: 70, occupied: false, count: 0, maxCapacity: 15 }
          ]
        },
        { 
          id: 22, 
          name: 'קומה 2', 
          floorImageUrl: '/assets/images/floor-2-design.jpg',
          sensors: [
            { id: 221, name: 'אולם הרצאות', x: 50, y: 30, occupied: true, count: 45, maxCapacity: 80 },
            { id: 222, name: 'חדר מחשבים', x: 20, y: 70, occupied: false, count: 0, maxCapacity: 25 },
            { id: 223, name: 'ספרייה', x: 80, y: 70, occupied: true, count: 8, maxCapacity: 15 }
          ]
        },
        { 
          id: 23, 
          name: 'קומה 3', 
          floorImageUrl: '/assets/images/floor-3-design.jpg',
          sensors: [
            { id: 231, name: 'מעבדת צילום', x: 30, y: 40, occupied: false, count: 0, maxCapacity: 10 },
            { id: 232, name: 'מעבדת דפוס', x: 70, y: 40, occupied: true, count: 6, maxCapacity: 12 },
            { id: 233, name: 'חדר תצוגה', x: 50, y: 75, occupied: false, count: 0, maxCapacity: 50 }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'בניין הנדסת חשמל',
      description: 'בניין מחלקת הנדסת חשמל',
      imageUrl: '/assets/images/building-electrical.jpg',
      floors: [
        { 
          id: 31, 
          name: 'קומה 1', 
          floorImageUrl: '/assets/images/floor-1-electrical.jpg',
          sensors: [
            { id: 311, name: 'מעבדה 1', x: 20, y: 25, occupied: true, count: 14, maxCapacity: 25 },
            { id: 312, name: 'מעבדה 2', x: 80, y: 25, occupied: true, count: 11, maxCapacity: 25 },
            { id: 313, name: 'חדר ציוד', x: 50, y: 75, occupied: false, count: 0, maxCapacity: 5 }
          ]
        },
        { 
          id: 32, 
          name: 'קומה 2', 
          floorImageUrl: '/assets/images/floor-2-electrical.jpg',
          sensors: [
            { id: 321, name: 'אולם 201', x: 30, y: 30, occupied: true, count: 35, maxCapacity: 60 },
            { id: 322, name: 'מעבדת מחשבים', x: 70, y: 30, occupied: false, count: 0, maxCapacity: 30 },
            { id: 323, name: 'חדר פרויקטים', x: 50, y: 70, occupied: true, count: 8, maxCapacity: 15 }
          ]
        },
        { 
          id: 33, 
          name: 'קומה 3', 
          floorImageUrl: '/assets/images/floor-3-electrical.jpg',
          sensors: [
            { id: 331, name: 'מעבדה ', x: 25, y: 35, occupied: true, count: 9, maxCapacity: 20 },
            { id: 332, name: 'מעבדת בקרה', x: 75, y: 35, occupied: false, count: 0, maxCapacity: 15 },
            { id: 333, name: 'חדר נוסף', x: 50, y: 75, occupied: true, count: 12, maxCapacity: 20 }
          ]
        }
      ]
    }
  ];

  const menuItems = [
    {
      title: 'Campus view ',
      action: () => {}
    },
    {
      title: 'Admin',
      action: () => navigate('/monitoring')
    },
    {
      title: 'Contact us',
      action: () => navigate('/reports')
    },
    {
      title: 'Notifications',
      action: () => navigate('/alerts')
    },
    {
      title: 'Settings',
      action: () => navigate('/settings')
    },
    {
      title: 'Help',
      action: () => navigate('/help')
    }
  ];

  useEffect(() => {
    loadCampusData();
  }, []);

  const loadCampusData = async () => {
    try {
      setLoading(true);
      // Using demo data for now
      setBuildings(demoBuildings);
    } catch (err) {
      setError('שגיאה בטעינת נתוני הקמפוס');
      console.error('Error loading campus data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    setSelectedFloor(building.floors[0]); 
  };

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
  };

  const handleSensorClick = (sensor) => {
    alert(`${sensor.name}\nסטטוס: ${sensor.occupied ? 'פעיל' : 'לא פעיל'}\nכמות אנשים: ${sensor.count}/${sensor.maxCapacity}`);
  };

  const handleBackToBuildings = () => {
    setSelectedBuilding(null);
    setSelectedFloor(null);
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
          <div className="error-icon"></div>
          <p className="error-message">{error}</p>
          <button onClick={loadCampusData} className="retry-button">
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="campus-map-view">
      {/* Header Navigation */}
      <header className="campus-header">
        <div className="header-container">
          <div className="header-actions">
            <button className="user-profile">
              <span className="profile-icon"></span>
              <span>Login</span>
            </button>
          </div>
          
          <nav className="main-navigation">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
              >
                <span className="nav-title">{item.title}</span>
              </button>
            ))}
          </nav>
          
          <div className="logo-section">
           <div className="logo">
            <span className="logo-text">SMART CAMPUS</span>
            <img 
              src="/assets/images/hit-logo.webp" 
              alt="HIT Logo" 
              className="logo-hit"
            />
          </div>
          </div>
        </div>
      </header>

      <div className="main-content">
        {!selectedBuilding ? (
          /* Buildings List */
          <div className="buildings-section">
            <div className="section-header">
              <h1>בחר בניין</h1>
              <p>לחץ על בניין כדי לצפות בקומות והסנסורים</p>
            </div>
            
            <div className="buildings-grid">
              {buildings.map((building) => (
                <div 
                  key={building.id} 
                  className="building-card"
                  onClick={() => handleBuildingClick(building)}
                >
                  <div className="building-image">
                    <img 
                      src={building.imageUrl} 
                      alt={building.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="image-placeholder" style={{display: 'none'}}>
                      <span className="placeholder-icon"></span>
                      <span>תמונת בניין</span>
                    </div>
                  </div>
                  
                  <div className="building-info">
                    <h3>{building.name}</h3>
                    <p>{building.description}</p>
                    <div className="building-stats">
                      <span>קומות: {building.floors.length}</span>
                      <span>חדרים: {building.floors.reduce((total, floor) => total + floor.sensors.length, 0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Floor View */
          <div className="floor-section">
            <div className="floor-header">
              <button className="back-button" onClick={handleBackToBuildings}>
                ← חזור לבניינים
              </button>
              <div className="floor-title">
                <h1>{selectedBuilding.name}</h1>
                <p>{selectedBuilding.description}</p>
              </div>
            </div>

            {/* Floor Selection */}
            <div className="floor-tabs">
              {selectedBuilding.floors.map((floor) => (
                <button
                  key={floor.id}
                  className={`floor-tab ${selectedFloor?.id === floor.id ? 'active' : ''}`}
                  onClick={() => handleFloorSelect(floor)}
                >
                  {floor.name}
                </button>
              ))}
            </div>

            {/* Floor Map */}
            {selectedFloor && (
              <div className="floor-map-container">
                <div className="floor-map">
                  <img 
                    src={selectedFloor.floorImageUrl} 
                    alt={`${selectedFloor.name} של ${selectedBuilding.name}`}
                    className="floor-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="floor-image-placeholder" style={{display: 'none'}}>
                    <span className="placeholder-icon"></span>
                    <span>תמונת קומה</span>
                  </div>
                  
                  {/* Sensors Overlay */}
                  <div className="sensors-overlay">
                    {selectedFloor.sensors.map((sensor) => (
                      <button
                        key={sensor.id}
                        className={`sensor-button ${sensor.occupied ? 'occupied' : 'empty'}`}
                        style={{ left: `${sensor.x}%`, top: `${sensor.y}%` }}
                        onClick={() => handleSensorClick(sensor)}
                      >
                        <div className="sensor-count">{sensor.count}</div>
                        <div className="sensor-tooltip">
                          <div className="tooltip-content">
                            <strong>{sensor.name}</strong>
                            <div>סטטוס: {sensor.occupied ? 'פעיל' : 'לא פעיל'}</div>
                            <div>אנשים: {sensor.count}/{sensor.maxCapacity}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floor Statistics */}
                <div className="floor-stats">
                  <div className="stat-card">
                    <span className="stat-number">{selectedFloor.sensors.length}</span>
                    <span className="stat-label">חדרים</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{selectedFloor.sensors.filter(s => s.occupied).length}</span>
                    <span className="stat-label">פעילים</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{selectedFloor.sensors.reduce((total, s) => total + s.count, 0)}</span>
                    <span className="stat-label">סה"כ אנשים</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{selectedFloor.sensors.reduce((total, s) => total + s.maxCapacity, 0)}</span>
                    <span className="stat-label">קיבולת מקסימלית</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusMapView;