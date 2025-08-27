import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Campus View ',
      description: 'תצוגה אינטראקטיבית של הקמפוס',
      action: () => navigate('/campus')
    },
    {
      title: 'Admin',
      description: 'מעקב אחר סנסורים וחדרים',
      action: () => navigate('/campus')
    },
    {
      title: 'Contact us',
      description: 'דוחות ואנליטיקה מתקדמת',
      action: () => navigate('/reports')
    },
    {
      title: 'Settings',
      description: 'ניהול מערכת והגדרות',
      action: () => navigate('/settings')
    },
    {
      title: 'Notifications',
      description: 'מרכז התראות ועדכונים',
      action: () => navigate('/alerts')
    },
    {
      title: 'Help',
      description: 'מדריכים ותמיכה טכנית',
      action: () => navigate('/help')
    }
  ];

  const handleMenuClick = (item, index) => {
    setActiveMenu(index);
    setTimeout(() => {
      item.action();
    }, 200);
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
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
                className={`nav-item ${activeMenu === index ? 'active' : ''}`}
                onClick={() => handleMenuClick(item, index)}
                onMouseEnter={() => setActiveMenu(index)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-title">{item.title}</span>
                <div className="nav-tooltip">
                  <span>{item.description}</span>
                </div>
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

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-background">
          <div className="background-overlay"></div>
          <img 
            src="/assets/images/hit-campus.jpg" 
            alt="HIT Campus" 
            className="hero-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('fallback-bg');
            }}
          />
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Smart Campus HIT
            </h1>
            
            <p className="hero-description">
              It’s an innovative solution that streamlines resource usage while improving comfort and quality of life. The smart campus leverages an adaptive AI system for detection, data processing, and decision-making, providing tailored results to users according to their roles. At more advanced stages, the system will act autonomously, taking preventive measures and notifying the appropriate officials.
            </p>

           
            <div className="hero-actions">
              <button 
                className="primary-action"
                onClick={() => navigate('/campus')}
              >
                <span className="action-icon"></span>
                כניסה למערכת
              </button>
              
              
            </div>
          </div>

         
        </div>

        
      </main>

    </div>
  );
};

export default HomePage;