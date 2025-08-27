// client/src/components/HomePage/HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'מפת קמפוס',
      icon: '',
      description: 'תצוגה אינטראקטיבית של הקמפוס',
      action: () => navigate('/campus')
    },
    {
      title: 'ניטור בזמן אמת',
      icon: '',
      description: 'מעקב אחר סנסורים וחדרים',
      action: () => navigate('/campus')
    },
    {
      title: 'דוחות',
      icon: '',
      description: 'דוחות ואנליטיקה מתקדמת',
      action: () => navigate('/reports')
    },
    {
      title: 'הגדרות',
      icon: '',
      description: 'ניהול מערכת והגדרות',
      action: () => navigate('/settings')
    },
    {
      title: 'התראות',
      icon: '',
      description: 'מרכז התראות ועדכונים',
      action: () => navigate('/alerts')
    },
    {
      title: 'עזרה',
      icon: '',
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
          <div className="logo-section">
            <div className="logo">
              <span className="logo-hit">HIT</span>
              <span className="logo-text">SMART CAMPUS</span>
            </div>
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

          <div className="header-actions">
            <button className="user-profile">
              <span className="profile-icon"></span>
              <span>משתמש</span>
            </button>
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
              Smart Campus
              <span className="title-highlight">HIT</span>
            </h1>
            
            <p className="hero-description">
              מערכת ניהול חכמה למכון הטכנולוגי חולון. 
              טכנולוגיה מתקדמת לניטור ובקרה של משאבי הקמפוס,
              אופטימיזציה של השימוש באנרגיה ושיפור חוויית הלמידה.
              המערכת משלבת בינה מלאכותית, IoT וניתוח נתונים 
              לקבלת החלטות חכמות ויצירת סביבת לימוד מתקדמת.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">בניינים</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">חדרים</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">סנסורים</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">ניטור</span>
              </div>
            </div>

            <div className="hero-actions">
              <button 
                className="primary-action"
                onClick={() => navigate('/campus')}
              >
                <span className="action-icon"></span>
                כניסה למערכת
              </button>
              
              <button 
                className="secondary-action"
                onClick={() => navigate('/demo')}
              >
                <span className="action-icon">▶</span>
                צפייה בדמו
              </button>
            </div>
          </div>

          <div className="hero-features">
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>ניטור סביבתי</h3>
              <p>מעקב אחר טמפרטורה, לחות ואיכות אוויר</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>חיסכון באנרגיה</h3>
              <p>אופטימיזציה אוטומטית של צריכת חשמל</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>בטיחות ואבטחה</h3>
              <p>מערכת בקרת גישה ומעקב מתקדמת</p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          
          
          <div className="floating-stat">
            <span className="floating-icon"></span>
            <span className="floating-text">קמפוס ירוק</span>
          </div>
          
         
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow">↓</div>
          <span>גלה עוד</span>
        </div>
      </main>

      {/* Quick Access Panel */}
      <div className="quick-access-panel">
        <div className="panel-content">
          <h3>גישה מהירה</h3>
          <div className="quick-actions">
            <button onClick={() => navigate('/campus')} className="quick-btn">
               מפת קמפוס
            </button>
            <button onClick={() => navigate('/emergency')} className="quick-btn emergency">
               חירום
            </button>
            <button onClick={() => navigate('/support')} className="quick-btn">
               תמיכה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;